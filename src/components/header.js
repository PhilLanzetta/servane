import * as React from "react"
import { Link } from "gatsby"

const Header = ({ isOpen, toggleMenu }) => (
  <header>
    <nav>
      <Link to="/" className="nav-logo">
        Servane Mary
      </Link>
      <div className="menu">
        <button className="info-btn" onClick={toggleMenu}>
          Info
        </button>
        <ul className={`sub-menu ${isOpen ? "open" : "closed"}`}>
          <li>
            <Link to="/biography">Biography</Link>
          </li>
          {/* <li>
            <Link to="/essays-press">Essays & Press</Link>
          </li> */}
          <li>
            <a href="mailto:servane@servanemary.com">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
)

export default Header
