import React from "react"
import Form from "react-bootstrap/Form"
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import {useState} from "react"
import Button from "react-bootstrap/Button"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import './AddEmployee.css'
import Navbar from '../Navbar/Navbar'


export default function DodajVozilo() {
    const short = require('short-uuid');
    const Navigate = useNavigate()
    const [formData, setFormData] = useState([{
        id: "", ime: "", prezime: "", slika: "", spol: "", godina_rodenja: "",  
        pocetak_rada: "", vrsta_ugovora: "", trajanje_ugovora: "", odjel: "", broj_godisnji: "", broj_slobodno: "", broj_dopust: ""
    }])
   
    const handleChange = (e) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
            
        })
        
    }
    const addVehicle = (id,ime,prezime,slika,spol,godina_rodenja,pocetak_rada,vrsta_ugovora,trajanje_ugovora,odjel) => {
        var params = new URLSearchParams();
        
        
         params.append('id', id)
         params.append('ime', ime);
         params.append('prezime', prezime);
         params.append('slika', slika);
         params.append('spol', spol);
         params.append('godina_rodenja', godina_rodenja);
         params.append('pocetak_rada', pocetak_rada);
         params.append('vrsta_ugovora', vrsta_ugovora);
         params.append('trajanje_ugovora', trajanje_ugovora);
         params.append('odjel', odjel);
         Axios.post("http://localhost/zaposlenici_tvrtke/src/API/POST/addEmployee.php", params)
         .then((response) => {
			
                console.log(response)
				Navigate("/", {replace:true})
			
		})
    }
    const handleSubmit = (event) => {
        
        event.preventDefault();
        addVehicle(short.generate(), formData.ime, formData.prezime, formData.slika, formData.spol, formData.godina_rodenja, formData.pocetak_rada, formData.vrsta_ugovora != 'N/A' ? formData.vrsta_ugovora : 'Nije definirano', formData.trajanje_ugovora ? formData.trajanje_ugovora : 0, formData.odjel, )

    }
    
    return (
        <>
        <Navbar />
        <Form className = "dodajform">
        <h3 className = "dodajform-title">Dodaj zaposlenika</h3>
        <Form.Group className = "mb-3">
            <FloatingLabel
            label = "Ime">

            <Form.Control 
            onChange = {handleChange} 
            name = "ime" 
            type = "text" 
            placeholder = "Ime zaposlenika" 
            value = {formData.ime}
            />
            </FloatingLabel>
        </Form.Group>

        <Form.Group className = "mb-3">
            <FloatingLabel
            label = "Prezime"
            >
            <Form.Control 
            onChange = {handleChange} 
            name = "prezime" 
            type = "text" 
            placeholder = "Prezime zaposlenika" 
            value = {formData.prezime}
            />
            </FloatingLabel>
        </Form.Group>

        <Form.Group className = "mb-3">
            <FloatingLabel
            label = "URL slike"
            >
            <Form.Control 
            onChange = {handleChange} 
            name = "slika" 
            type = "text" 
            placeholder = "URL slike" 
            value = {formData.slika}
            />
            </FloatingLabel>
        </Form.Group>

        <Form.Group className = "mb-3">
            
            <Form.Select 
            onChange = {handleChange} 
            name = "spol" 
            value = {formData.spol || 'Muško'}
            >
                <option>Muško</option>
                <option>Žensko</option>
                <option>Ostalo</option>

            </Form.Select>
            
        </Form.Group>

        <Form.Group className = "mb-3">
            <Form.Label>Godina rodenja</Form.Label>
            <Form.Control 
            onChange = {handleChange} 
            type="number" 
            name = "godina_rodenja" 
            value = {formData.godina_rodenja}
            />
        </Form.Group>

        <Form.Group className = "mb-3">
            <Form.Label>Datum pocetka rada</Form.Label>
            <Form.Control 
            onChange = {handleChange} 
            type="date" 
            name = "pocetak_rada" 
            value = {formData.pocetak_rada}
            />
        </Form.Group>

        <Form.Group className = "mb-3">
            <Form.Label>Vrsta ugovora</Form.Label>
            <Form.Select 
            onChange = {handleChange} 
            name = "vrsta_ugovora" 
            value = {formData.vrsta_ugovora}
            >
                <option>Neodredeno</option>
                <option>Odredeno</option>
            </Form.Select>
            
        </Form.Group>

         <Form.Group className = "mb-3">
            <Form.Label>Trajanje ugovora (u mjesecima)</Form.Label>
            <Form.Control 
            onChange = {handleChange} 
            type="number" 
            name = "trajanje_ugovora" 
            value = {formData.trajanje_ugovora}
            />
        </Form.Group>

        <Form.Group className = "mb-3">
            <Form.Label>Odjel</Form.Label>
            <Form.Control 
            onChange = {handleChange} 
            type="text" 
            name = "odjel" 
            value = {formData.odjel}
            />
        </Form.Group>
        <Button variant = "success" onClick = {handleSubmit}>Submit</Button>
        </Form>
        </>
           
    )
}