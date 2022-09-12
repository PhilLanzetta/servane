import React from "react"
import { useState, useEffect } from "react"
import Header from "./header"
import SlideShow from "./slideshow"

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [idleTime, setIdleTime] = useState(0)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (idleTime < 9) {
      const timer = setTimeout(() => {
        setIdleTime(idleTime + 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [idleTime])

  return (
    <>
      <Header toggleMenu={toggleMenu} isOpen={isOpen} />
      <main
        role="presentation"
        onMouseMove={() => setIdleTime(0)}
        onKeyDown={() => setIdleTime(0)}
      >
        {children}
        {idleTime > 8 && (
          <SlideShow
            onMouseMove={() => setIdleTime(0)}
            onKeyDown={() => setIdleTime(0)}
          ></SlideShow>
        )}
      </main>
    </>
  )
}

export default Layout
