import { useState, type ReactNode } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SECTIONS, type SectionId } from './content'
import { MainMenu } from './components/MainMenu'
import { PageShell } from './components/PageShell'
import { WorkPage } from './pages/WorkPage'
import { ExperiencePage } from './pages/ExperiencePage'
import { AboutPage } from './pages/AboutPage'
import { FunPage } from './pages/FunPage'

const PAGES: Record<SectionId, ReactNode> = {
  work: <WorkPage />,
  experience: <ExperiencePage />,
  about: <AboutPage />,
  fun: <FunPage />,
}

export default function App() {
  const location = useLocation()
  // Remembered across screens so "Main Menu" returns to the item you left from, like a DVD player.
  const [menuIndex, setMenuIndex] = useState(0)

  return (
    <MotionConfig reducedMotion="user">
      {/* Fade to black between screens: the body is black, each screen fades out then the next fades in. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className="screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.35, delay: 0.1, ease: 'easeOut' } }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } }}
        >
          <Routes location={location}>
            <Route path="/" element={<MainMenu initialIndex={menuIndex} onSelect={setMenuIndex} />} />
            {SECTIONS.map((section) => (
              <Route
                key={section.id}
                path={section.path}
                element={<PageShell title={section.label}>{PAGES[section.id]}</PageShell>}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}
