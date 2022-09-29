<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers:*");
 header("Access-Control-Allow-Methods: *");
 header("Content-type: text/json");
 header("Content-type: application/json; charset=utf-8");
 include "../connection.php";


$sQuery ="UPDATE zaposlenici SET ime=:ime, prezime=:prezime, slika=:slika, spol=:spol, godina_rodenja=:godina_rodenja, 
pocetak_rada=:pocetak_rada, vrsta_ugovora=:vrsta_ugovora, trajanje_ugovora=:trajanje_ugovora, odjel=:odjel, 
broj_godisnji=:broj_godisnji, broj_slobodno=:broj_slobodno, broj_dopust=:broj_dopust WHERE id=:id";
		$oData = array
		(
			'id'=>$_POST['id'],
			'ime'=>$_POST['ime'],
			'prezime'=>$_POST['prezime'],
            'slika'=>$_POST['slika'],
            'spol'=>$_POST['spol'],
			'godina_rodenja'=>$_POST['godina_rodenja'],
            'pocetak_rada'=>$_POST['pocetak_rada'],
            'vrsta_ugovora'=>$_POST['vrsta_ugovora'],
            'trajanje_ugovora'=>$_POST['trajanje_ugovora'],
            'odjel'=>$_POST['odjel'],
            'broj_godisnji'=>$_POST['broj_godisnji'],
            'broj_slobodno'=>$_POST['broj_slobodno'],
            'broj_dopust'=>$_POST['broj_dopust'],
		);
		try
		{
            $oStatement=$conn->prepare($sQuery);
			$oStatement->execute($oData);

			echo 1;
			
		} catch (PDOException $error) 
		{
			echo ($error->getMessage());
			echo 0;
		}

?>