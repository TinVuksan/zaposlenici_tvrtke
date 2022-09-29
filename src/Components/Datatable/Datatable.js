import React from "react"
import Axios from "axios"
import {useState, useEffect} from "react"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import {useNavigate} from "react-router-dom"
import {Modal,Col, Row,FloatingLabel, Form} from 'react-bootstrap'
import Navbar from '../Navbar/Navbar'
import "./Datatable.css"


export default function Datatable() {

    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [detalji, setDetalji] = useState([{
        id: "", ime: "", prezime: "", slika: "", spol: "", godina_rodenja: "",  
        pocetak_rada: "", vrsta_ugovora: "", trajanje_ugovora: "", odjel: "", broj_godisnji: "", broj_slobodno: "", broj_dopust: ""
    }])
    const navigate = useNavigate();

    useEffect(() => {
        getData()
    }, [])
    
    const headers = ["#", "Ime", "Prezime", "Spol", "Godina rođenja", "Više"]

    const getData = () => {
        Axios.get("http://localhost/zaposlenici_tvrtke/src/API/GET/getAll.php")
        .then((res) => {
            console.log(res.data);
            setData(res.data)
        })
        .catch((error) => {
            console.log(error)
        })

    }

    const handleChange = (e) => {
        setDetalji(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
            
        })
        
    }

    const handleSubmit = () => {
        var params = new URLSearchParams();
        console.log(detalji.broj_godisnji);
        params.append('id', detalji.id);
        params.append('ime', detalji.ime);
        params.append('prezime', detalji.prezime);
        params.append('slika', detalji.slika);
        params.append('spol', detalji.spol);        
        params.append('godina_rodenja', detalji.godina_rodenja);
        params.append('pocetak_rada', detalji.pocetak_rada);
        params.append('vrsta_ugovora', detalji.vrsta_ugovora);
        params.append('trajanje_ugovora', detalji.trajanje_ugovora);
        params.append('odjel', detalji.odjel);
        params.append('broj_godisnji', detalji.broj_godisnji != 'N/A' ? detalji.broj_godisnji : 0);
        params.append('broj_slobodno', detalji.broj_slobodno != 'N/A' ? detalji.broj_slobodno : 0);
        params.append('broj_dopust', detalji.broj_dopust  != 'N/A'? detalji.broj_dopust : 0);
         Axios.post("http://localhost/zaposlenici_tvrtke/src/API/PUT/edit.php", params)
         .then((response) => {
			
                console.log(response.data)
                console.log(detalji.vrsta_ugovora)
                console.log(detalji.trajanje_ugovora)
				setShow(false)
                getData()
			
		})
        .catch((error) => {
            console.log(error)
        })
        
    }
    const Detaljnije = (id) => {
      
        var params = new URLSearchParams()
        params.append('id', id)
        Axios.post("http://localhost/zaposlenici_tvrtke/src/API/GET/getById.php", params)
        .then((res) => {
            const Array = res.data
            console.log(res.data);
            setDetalji(Array[0])
            console.log(id)
        })
        .catch((error) => {
            console.log(error)
        })
        
        setShow(true)
        
        
    }

    return (
        <>
        <Navbar />
        <Table responsive striped hover className = "tablica">
        <thead>
            <tr>
            {headers.map(header => <th>{header}</th>)}
            </tr>
        </thead>
        <tbody>
            {data.map(zaposlenik => 
            <tr key = {zaposlenik.id}>
                <td>
                    {data.indexOf(zaposlenik) + 1}
                </td>
                <td>
                    {zaposlenik.ime}
                </td>
                <td>
                    {zaposlenik.prezime}
                </td>
                <td>
                    {zaposlenik.spol}
                </td>
                <td>
                    {zaposlenik.godina_rodenja}
                </td>
                <td className = "table-buttons">
                    <Button variant = "info" onClick = {() => Detaljnije(zaposlenik.id)}>Detaljnije</Button>
                    
                </td>
            </tr>)}
            
        </tbody>
        </Table>

        <Modal size = "lg" show={show} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Informacije o zaposleniku</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <FloatingLabel controlId="floatingInput" label="Šifra zaposlenika" className="mb-3" >
                        <Form.Control type="text" placeholder="Id" name="id" value={detalji.id || ""}  readOnly onChange={handleChange}/>
                    </FloatingLabel>
                    <Row>
                        <Col className="col-md-4">
                            <Form.Group className="mb-3">
                                <img src={detalji.slika} style={{'width':180, 'height': 180}}/>
                            </Form.Group>
                            
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                    <FloatingLabel controlId="floatingInput" label="URL slike" className="mb-3" >
                                        <Form.Control as="textarea" height= {150} size="lg" placeholder="URL slike" name="slika" value={detalji.slika} onChange={handleChange}/>
                                    </FloatingLabel>
                            </Form.Group>
                        </Col> 
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="select2">
                                <FloatingLabel controlId="floatingInput" label="Ime" className="mb-3" >
                                    <Form.Control type="text" placeholder="Ime" name="ime" value={detalji.ime} onChange={handleChange} />
                                </FloatingLabel>                               
                            </Form.Group>
                        </Col>
                        
                        <Col>
                            <Form.Group className="mb-3" controlId="select2">
                                <FloatingLabel controlId="floatingInput" label="Prezime" className="mb-3" >
                                    <Form.Control type="text" placeholder="Prezime" name="prezime" value={detalji.prezime} onChange={handleChange} />
                                </FloatingLabel>                               
                            </Form.Group>
                        </Col> 
                        <Col className = "col-sm-3">
                            <Form.Group className="mb-3" controlId="select3">
                                <FloatingLabel controlId="floatingInput" label="Godina rođenja" className="mb-3" >
                                    <Form.Control type="number" placeholder="Godina rodenja" name="godina_rodenja" value={detalji.godina_rodenja} onChange={handleChange} />
                                </FloatingLabel>            
                            </Form.Group>
                        </Col>
                        <Col className="col-sm-3">
                            <Form.Group className="mb-3" controlId="select3">
                                <FloatingLabel controlId="floatingInput" label="Spol" className="mb-3" >
                                    <Form.Control type="text" placeholder="Spol" name="spol" value={detalji.spol} onChange={handleChange} />
                                </FloatingLabel>            
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="select3">
                                    <FloatingLabel controlId="floatingInput" label="Odjel" className="mb-3" >
                                        <Form.Control type="text" placeholder="Odjel" name="odjel" value={detalji.odjel} onChange={handleChange} />
                                    </FloatingLabel>            
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-sm-4">
                                <Form.Group className="mb-3" controlId="select3">
                                    <FloatingLabel controlId="floatingInput" label="Dani godišnjeg" className="mb-3" >
                                        <Form.Control type="number" placeholder="Dani godišnjeg" name="broj_godisnji" value={detalji.broj_godisnji} onChange={handleChange} />
                                    </FloatingLabel>            
                                </Form.Group>
                        </Col>
                        <Col className="col-sm-4">
                                <Form.Group className="mb-3" controlId="select3">
                                    <FloatingLabel controlId="floatingInput" label="Slobodni dani" className="mb-3" >
                                        <Form.Control type="number" placeholder="Slobodni dani" name="broj_slobodno" value={detalji.broj_slobodno} onChange={handleChange} />
                                    </FloatingLabel>            
                                </Form.Group>
                        </Col> 
                        <Col className="col-sm-4">
                                <Form.Group className="mb-3" controlId="select3">
                                    <FloatingLabel controlId="floatingInput" label="Dani dopusta" className="mb-3" >
                                        <Form.Control type="number" placeholder="Dani dopusta" name="broj_dopust" value={detalji.broj_dopust} onChange={handleChange} />
                                    </FloatingLabel>            
                                </Form.Group>
                        </Col>    
                    </Row>

                    <Row>
                        <Col className="col-sm-4">
                                <Form.Group className="mb-3" controlId="select3">
                                    <FloatingLabel controlId="floatingInput" label="Pocetak rada" className="mb-3" >
                                        <Form.Control type="date" placeholder="Pocetak rada" name="pocetak_rada" value={detalji.pocetak_rada} onChange={handleChange} />
                                    </FloatingLabel>            
                                </Form.Group>
                        </Col> 
                        <Col className="col-sm-4">
                                <Form.Group className="mb-3" controlId="select3">
                                    <FloatingLabel controlId="floatingInput" label="Vrsta ugovora" className="mb-3" >
                                        <Form.Control type="text" placeholder="Vrsta ugovora" name="vrsta_ugovora" value={detalji.vrsta_ugovora || ''} onChange={handleChange} />
                                    </FloatingLabel>            
                                </Form.Group>
                        </Col> 
                        {detalji.vrsta_ugovora == 'Odredeno' && <Col className="col-sm-4">
                                <Form.Group className="mb-3" controlId="select3">
                                    <FloatingLabel controlId="floatingInput" label="Trajanje ugovora (mjeseci)" className="mb-3" >
                                        <Form.Control type="number" placeholder="Trajanje ugovora" name="trajanje_ugovora" value={detalji.trajanje_ugovora || ''} onChange={handleChange} />
                                    </FloatingLabel>            
                                </Form.Group>
                        </Col>}   
                    </Row>                    
                    </Form> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick = {() => setShow(false)}>Close</Button>
                    <Button variant="success" onClick = {handleSubmit} >Save changes</Button>                   
                </Modal.Footer>
            </Modal>
   
        </>
        
        

         
            
        
    )
}