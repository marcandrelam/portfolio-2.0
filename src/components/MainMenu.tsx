import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SECTIONS, SITE } from '../content'

interface MainMenuProps {
  initialIndex: number
  onSelect: (index: number) => void
}

// A type alias (not an interface) so it fits Framer Motion's animate target type.
type Box = {
  x: number
  y: number
  width: number
  height: number
}

// DVD-style main menu: exactly one item is always selected. Hover, focus and
// arrow keys all move the selection; Enter or click plays it.
export function MainMenu({ initialIndex, onSelect }: MainMenuProps) {
  const [selected, setSelected] = useState(initialIndex)
  const [highlight, setHighlight] = useState<Box | null>(null)
  const selectedRef = useRef(initialIndex)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  // Selection follows focus, so focusing an item is how we select it.
  const focusItem = (index: number) => itemRefs.current[index]?.focus({ preventScroll: true })

  const handleFocus = (index: number) => {
    selectedRef.current = index
    setSelected(index)
    onSelect(index)
  }

  useEffect(() => {
    focusItem(selectedRef.current)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
      event.preventDefault()
      const step = event.key === 'ArrowDown' ? 1 : -1
      focusItem((selectedRef.current + step + SECTIONS.length) % SECTIONS.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // One highlight block that slides to the selected item. (A shared layoutId
  // would be simpler, but it blocks AnimatePresence from finishing the exit.)
  useLayoutEffect(() => {
    const measure = () => {
      const item = itemRefs.current[selected]
      if (!item) return
      setHighlight({ x: item.offsetLeft, y: item.offsetTop, width: item.offsetWidth, height: item.offsetHeight })
    }
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [selected])

  return (
    <main className="menu">
      <h1 className="menu-title">{SITE.name}</h1>
      <nav aria-label="Main menu" className="menu-nav">
        {highlight && (
          <motion.span
            aria-hidden="true"
            className="menu-highlight"
            initial={false}
            animate={highlight}
            transition={{ type: 'spring', stiffness: 520, damping: 42 }}
          />
        )}
        <ul className="menu-list">
          {SECTIONS.map((section, index) => (
            <li key={section.id}>
              <Link
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                to={section.path}
                className="menu-item"
                aria-current={index === selected ? 'true' : undefined}
                onMouseEnter={() => focusItem(index)}
                onFocus={() => handleFocus(index)}
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="menu-hint" aria-hidden="true">
        ↑ ↓ select &nbsp;·&nbsp; enter play
      </p>
    </main>
  )
}
