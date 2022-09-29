import React from "react"
import { BrowserRouter as Router, Routes,  Route } from "react-router-dom"
import Datatable from "../Components/Datatable/Datatable"
import AddEmployee from "./AddEmployee/AddEmployee"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export default function App() {
    return (
        <>
        <Router>
            <Routes>
                <Route path = "/" element = {<Datatable></Datatable>} />
                <Route path = "/Add" element = {<AddEmployee></AddEmployee>} />
            </Routes>
        </Router>
        </>
    )
}