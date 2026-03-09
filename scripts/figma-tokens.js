'use strict'

/**
 * Figma → SCSS токены
 *
 * Использование:
 *   1. Скопируй .env.example в .env и заполни переменные
 *   2. npm run figma:tokens
 *
 * Что генерирует:
 *   src/scss/global/_tokens.scss — переменные из Figma (цвета, типографика, тени)
 *
 * Подключение в style.scss:
 *   @import 'global/tokens.scss';
 */

require('dotenv').config()

const https = require('https')
const fs = require('fs')
const path = require('path')

const FIGMA_TOKEN = process.env.FIGMA_TOKEN
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID
const OUTPUT_FILE = path.join(__dirname, '../src/scss/global/_tokens.scss')

// ─── Валидация окружения ──────────────────────────────────────────────────────

if (!FIGMA_TOKEN || !FIGMA_FILE_ID) {
    console.error(
        '\n❌  Переменные окружения не заданы.\n' +
        '   Скопируй .env.example → .env и заполни:\n' +
        '   FIGMA_TOKEN=...\n' +
        '   FIGMA_FILE_ID=...\n'
    )
    process.exit(1)
}

// ─── HTTP-запрос к Figma API ──────────────────────────────────────────────────

function figmaGet(endpoint) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.figma.com',
            path: `/v1/${endpoint}`,
            headers: { 'X-Figma-Token': FIGMA_TOKEN },
        }
        https.get(options, (res) => {
            let data = ''
            res.on('data', (chunk) => { data += chunk })
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data)
                    if (parsed.status === 403 || parsed.err) {
                        reject(new Error(parsed.err || 'Доступ запрещён. Проверь FIGMA_TOKEN.'))
                    } else {
                        resolve(parsed)
                    }
                } catch (e) {
                    reject(new Error('Не удалось разобрать ответ API'))
                }
            })
        }).on('error', reject)
    })
}

// ─── Утилиты ──────────────────────────────────────────────────────────────────

function toVarName(styleName) {
    return '$token-' + styleName
        .toLowerCase()
        .replace(/[\s/]+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

function figmaColorToValue(color) {
    if (!color) return null
    const r = Math.round((color.r || 0) * 255)
    const g = Math.round((color.g || 0) * 255)
    const b = Math.round((color.b || 0) * 255)
    const a = color.a !== undefined ? Math.round(color.a * 100) / 100 : 1

    if (a < 1) {
        return `rgba(${r}, ${g}, ${b}, ${a})`
    }

    const hex = [r, g, b]
        .map((v) => v.toString(16).padStart(2, '0'))
        .join('')

    // Сокращаем до 3 символов если возможно (#aabbcc → #abc)
    if (hex[0] === hex[1] && hex[2] === hex[3] && hex[4] === hex[5]) {
        return `#${hex[0]}${hex[2]}${hex[4]}`
    }
    return `#${hex}`
}

// ─── Основная логика ──────────────────────────────────────────────────────────

async function main() {
    console.log('\n🔍  Загружаем стили из Figma...')

    // 1. Список стилей (имена, типы, node_id)
    const stylesResp = await figmaGet(`files/${FIGMA_FILE_ID}/styles`)
    const styles = stylesResp.meta?.styles

    if (!styles?.length) {
        console.warn('⚠️   В файле не найдено локальных стилей.')
        console.warn('    Убедись, что стили опубликованы в библиотеке Figma.')
        process.exit(0)
    }
    console.log(`    Найдено стилей: ${styles.length}`)

    // 2. Значения нод (батчами по 100 — лимит Figma API)
    const BATCH_SIZE = 100
    const allNodes = {}

    for (let i = 0; i < styles.length; i += BATCH_SIZE) {
        const batch = styles.slice(i, i + BATCH_SIZE)
        const ids = batch.map((s) => s.node_id).join(',')
        const resp = await figmaGet(`files/${FIGMA_FILE_ID}/nodes?ids=${encodeURIComponent(ids)}`)
        Object.assign(allNodes, resp.nodes || {})
    }

    // 3. Разбираем стили
    const colorVars = []
    const textVars = []
    const shadowVars = []
    const unknown = []

    for (const style of styles) {
        const node = allNodes[style.node_id]?.document
        if (!node) continue

        const varName = toVarName(style.name)

        if (style.style_type === 'FILL') {
            const fill = node.fills?.[0]
            if (fill?.type === 'SOLID') {
                const value = figmaColorToValue(fill.color)
                if (value) colorVars.push({ varName, value, label: style.name })
            } else if (fill?.type === 'GRADIENT_LINEAR') {
                // Линейные градиенты — оставляем как комментарий
                colorVars.push({ varName, value: null, label: style.name, gradient: true })
            }
        }

        if (style.style_type === 'TEXT') {
            const s = node.style
            if (s) {
                textVars.push({
                    varName,
                    label: style.name,
                    fontSize: s.fontSize || null,
                    fontWeight: s.fontWeight || null,
                    lineHeight: s.lineHeightUnit === 'PIXELS' ? Math.round(s.lineHeightPx * 10) / 10 : null,
                    lineHeightPercent: s.lineHeightUnit === 'PERCENT' ? s.lineHeightPercentFontSize : null,
                    letterSpacing: s.letterSpacing ? Math.round(s.letterSpacing * 10) / 10 : null,
                    fontFamily: s.fontFamily || null,
                })
            }
        }

        if (style.style_type === 'EFFECT') {
            const effect = node.effects?.find((e) => e.visible !== false)
            if (effect?.type === 'DROP_SHADOW' || effect?.type === 'INNER_SHADOW') {
                const { color, offset, radius, spread } = effect
                const colorVal = figmaColorToValue(color)
                const inset = effect.type === 'INNER_SHADOW' ? ' inset' : ''
                const x = offset?.x || 0
                const y = offset?.y || 0
                const r = radius || 0
                const s = spread || 0
                shadowVars.push({
                    varName,
                    value: `${x}px ${y}px ${r}px ${s}px ${colorVal}${inset}`,
                    label: style.name,
                })
            }
        }

        if (!['FILL', 'TEXT', 'EFFECT'].includes(style.style_type)) {
            unknown.push(style.name)
        }
    }

    // 4. Генерируем SCSS
    const timestamp = new Date().toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' })
    const lines = [
        '// Токены из Figma — не редактировать вручную',
        `// Обновить: npm run figma:tokens`,
        `// Последнее обновление: ${timestamp}`,
        '// ================================================',
    ]

    if (colorVars.length) {
        lines.push('', '// Цвета')
        for (const v of colorVars) {
            if (v.gradient) {
                lines.push(`// ${v.varName}: ...; // ${v.label} (градиент — задай вручную)`)
            } else {
                lines.push(`${v.varName}: ${v.value}; // ${v.label}`)
            }
        }
    }

    if (textVars.length) {
        const withSize = textVars.filter((v) => v.fontSize)
        const withWeight = textVars.filter((v) => v.fontWeight)
        const withLineH = textVars.filter((v) => v.lineHeight || v.lineHeightPercent)
        const withLetterS = textVars.filter((v) => v.letterSpacing)

        if (withSize.length) {
            lines.push('', '// Размеры шрифтов')
            for (const v of withSize) {
                lines.push(`${v.varName}-size: ${v.fontSize}px; // ${v.label}`)
            }
        }
        if (withWeight.length) {
            lines.push('', '// Насыщенность шрифтов')
            for (const v of withWeight) {
                lines.push(`${v.varName}-weight: ${v.fontWeight}; // ${v.label}`)
            }
        }
        if (withLineH.length) {
            lines.push('', '// Межстрочный интервал')
            for (const v of withLineH) {
                const val = v.lineHeight
                    ? `${v.lineHeight}px`
                    : `${Math.round(v.lineHeightPercent)}%`
                lines.push(`${v.varName}-line-height: ${val}; // ${v.label}`)
            }
        }
        if (withLetterS.length) {
            lines.push('', '// Межбуквенный интервал')
            for (const v of withLetterS) {
                lines.push(`${v.varName}-letter-spacing: ${v.letterSpacing}px; // ${v.label}`)
            }
        }
    }

    if (shadowVars.length) {
        lines.push('', '// Тени')
        for (const v of shadowVars) {
            lines.push(`${v.varName}: ${v.value}; // ${v.label}`)
        }
    }

    lines.push('')

    fs.writeFileSync(OUTPUT_FILE, lines.join('\n'), 'utf8')

    // 5. Итог
    console.log(`\n✅  Токены сохранены → src/scss/global/_tokens.scss`)
    console.log(`    Цвета: ${colorVars.length}  Типографика: ${textVars.length}  Тени: ${shadowVars.length}`)

    if (unknown.length) {
        console.warn(`\n⚠️   Пропущено стилей неизвестного типа: ${unknown.length}`)
    }

    console.log(`
📌  Подключи в src/scss/style.scss (один раз):
    @import 'global/tokens.scss';

    Переменные доступны как:
    $token-<имя-стиля>: value;
`)
}

main().catch((err) => {
    console.error('\n❌  Ошибка:', err.message)
    process.exit(1)
})
