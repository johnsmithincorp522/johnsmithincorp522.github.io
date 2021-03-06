import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
//import parse from "html-react-parser"
import logo from "./logo.jpg"

const Layout = ({ isHomePage, children }) => {
  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)
   
  // If we need to have the site name generate via graphql add this under main-heading
  // <Link to="/">{parse(title)}</Link>

  return (
    <div className="global-wrapper" data-is-root-path={isHomePage}>
      <header className="global-header">
        {isHomePage ? (
          <h1 className="main-heading">
	    <center><img src={logo} alt="Logo"/></center>
          </h1>
        ) : (
          <Link className="header-link-home" to="/">
	     <center><img src={logo} alt="Logo"/></center>
          </Link>
        )}
      </header>

      <main>{children}</main>

      <footer>
        © {new Date().getFullYear()}, Proudly offered by
        {` `}
        <a href="https://downloadproxy.cf/">Download Proxy</a>
        {` `}
        And <a href="https://gamingorigin.cf/">Gaming Origin</a>
      </footer>
    </div>
  )
}

export default Layout
