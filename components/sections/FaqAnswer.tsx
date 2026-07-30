import { Fragment } from 'react'

// Lightweight markup for FAQ answers:
//   blank line   -> paragraph break
//   "- item"     -> bullet list item
//   "+ item"     -> checkmark list item
//   "1. item"    -> numbered list item
//   **bold**     -> <strong>
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: '#111' }}>{part.slice(2, -2)}</strong>
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

export default function FaqAnswer({ text }: { text: string }) {
  const blocks = text.split('\n\n').map((b) => b.trim()).filter(Boolean)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {blocks.map((block, bi) => {
        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)

        if (lines.length > 0 && lines.every((l) => l.startsWith('- '))) {
          return (
            <ul key={bi} style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {lines.map((l, li) => (
                <li key={li} style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.7 }}>{renderInline(l.slice(2))}</li>
              ))}
            </ul>
          )
        }

        if (lines.length > 0 && lines.every((l) => /^\d+\.\s/.test(l))) {
          return (
            <ol key={bi} style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {lines.map((l, li) => (
                <li key={li} style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.7 }}>{renderInline(l.replace(/^\d+\.\s/, ''))}</li>
              ))}
            </ol>
          )
        }

        if (lines.length > 0 && lines.every((l) => l.startsWith('+ '))) {
          return (
            <ul key={bi} style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {lines.map((l, li) => (
                <li key={li} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#555', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  <i className="fas fa-check" style={{ color: '#2a9d5c', fontSize: '0.8rem', marginTop: '0.35rem', flexShrink: 0 }} />
                  <span>{renderInline(l.slice(2))}</span>
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p key={bi} style={{ margin: 0, color: '#555', fontSize: '0.9rem', lineHeight: 1.7 }}>
            {renderInline(lines.join(' '))}
          </p>
        )
      })}
    </div>
  )
}
