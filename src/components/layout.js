import React from "react"
import { useState } from "react"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Header toggleMenu={toggleMenu} isOpen={isOpen} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
