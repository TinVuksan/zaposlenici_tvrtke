<?php
class Configuration
{
	public $host="localhost";
	public $dbName="zaposlenici_db";
	public $username="root";
	public $password="";	
}

class Osoba
{
	public $ime="N/A";
	public $prezime="N/A";
	public $godina_rodenja ="N/A";
    public $spol = "N/A";
	public function __construct($ime=null,$prezime=null, $godina_rodenja=null, $spol=null)
	{		
		if($ime) $this->ime=$ime;
		if($prezime) $this->prezime=$prezime;
		if($godina_rodenja) $this->godina_rodenja = $godina_rodenja;
        if($spol) $this->spol = $spol; 
	}
}

class Zaposlenik extends Osoba
{
	public $id= "N/A";
	public $slika = "N/A";
    public $pocetak_rada = "N/A";
    public $vrsta_ugovora = "N/A";
    public $trajanje_ugovora = "N/A";
    public $odjel = "N/A";
    public $broj_godisnji = "N/A";
    public $broj_slobodno = "N/A";
    public $broj_dopust = "N/A";

	public function __construct(
        $ime=null,$prezime=null,$godina_rodenja=null,$spol=null,$id=null, $slika=null, $pocetak_rada=null, $vrsta_ugovora=null,$trajanje_ugovora=null,
        $odjel=null,$broj_godisnji=null,$broj_slobodno=null,$broj_dopust=null
        )
	{
		parent::__construct($ime,$prezime, $godina_rodenja,$spol);
		if($id) $this->id=$id;
		if($slika) $this->slika = $slika;
        if($pocetak_rada) $this->pocetak_rada = $pocetak_rada;
        if($vrsta_ugovora) $this->vrsta_ugovora = $vrsta_ugovora;
        if($trajanje_ugovora) $this->trajanje_ugovora = $trajanje_ugovora;
        if($odjel) $this->odjel = $odjel;
        if($broj_godisnji) $this->broj_godisnji = $broj_godisnji;
        if($broj_slobodno) $this->broj_slobodno = $broj_slobodno;
        if($broj_dopust) $this->broj_dopust = $broj_dopust;
	}
}

?>