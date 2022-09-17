import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "./header"
import SlideShow from "./slideshow"

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [idleTime, setIdleTime] = useState(0)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const resetTimer = () => {
    setIdleTime(0)
  }

  useEffect(() => {
    if (idleTime < 10) {
      const timer = setTimeout(() => {
        setIdleTime(idleTime + 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [idleTime])

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.addEventListener("scroll", resetTimer)
      return () => window.removeEventListener("scroll", resetTimer)
    }
  })

  return (
    <>
      <Header toggleMenu={toggleMenu} isOpen={isOpen} />
      <main
        role="presentation"
        onMouseMove={resetTimer}
        onTouchStart={resetTimer}
        onClick={resetTimer}
      >
        {children}
        <AnimatePresence>
          {idleTime === 10 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="modal"
              className="modal"
            >
              <SlideShow
                onMouseMove={resetTimer}
                onClick={resetTimer}
                onTouchStart={resetTimer}
              ></SlideShow>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}

export default Layout
