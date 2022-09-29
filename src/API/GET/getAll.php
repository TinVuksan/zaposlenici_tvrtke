<?php
ini_set('memory_limit', '2048M');
header('Content-type: text/json');
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin:*');
include "../connection.php";


$oJson=array();

		$sQuery="SELECT * FROM zaposlenici";
		$oRecord=$conn->query($sQuery);
		while($oRow=$oRecord->fetch(PDO::FETCH_ASSOC))
		{
		
			$oZaposlenik=new Zaposlenik( 
					$oRow['ime'],
					$oRow['prezime'],
					$oRow['godina_rodenja'],
					$oRow['spol'],
					$oRow['id'],
					$oRow['slika'],
					$oRow['pocetak_rada'],
                    $oRow['vrsta_ugovora'],
                    $oRow['trajanje_ugovora'],
                    $oRow['odjel'],
                    $oRow['broj_godisnji'],
                    $oRow['broj_slobodno'],
                    $oRow['broj_dopust'],
					
				);

			array_push($oJson, $oZaposlenik);
		}
		
	
		echo json_encode($oJson);
	
?>