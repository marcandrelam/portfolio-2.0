import { useEffect, useRef, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface PageShellProps {
  title: string
  children: ReactNode
}

const isTextInput = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))

// Shared frame for every section page: a "Main Menu" back button, and Esc or
// Backspace as the remote's back key.
export function PageShell({ title, children }: PageShellProps) {
  const navigate = useNavigate()
  const backRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    // Like a DVD, something on screen is always selected; start on the back button.
    backRef.current?.focus({ preventScroll: true })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || (event.key === 'Backspace' && !isTextInput(event.target))) {
        event.preventDefault()
        navigate('/')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigate])

  return (
    <div className="page">
      <header className="page-header">
        <Link ref={backRef} to="/" className="back-button">
          <span aria-hidden="true">◀</span> Main Menu
        </Link>
      </header>
      <main className="page-body">
        <h1 className="page-title">{title}</h1>
        {children}
      </main>
    </div>
  )
}
