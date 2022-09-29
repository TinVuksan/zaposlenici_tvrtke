import React from "react"
import {Link} from "react-router-dom"
import "./Navbar.css"
export default function Navbar() {

    return (
        <nav className = "navbar">
            <Link style = {{textDecoration:'none'}} to = "/"><h3 className = "navbar-logo">END2END</h3></Link>
            <div className = "navbar-routing">
                <Link style = {{textDecoration:'none', color:'black'}}to = "/Add"><h3 className = "navbar-link" >Dodaj novog zaposlenika</h3></Link>
            </div>  
        </nav>
    )
}