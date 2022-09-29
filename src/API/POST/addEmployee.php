<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers:*");
 header("Access-Control-Allow-Methods: *");
 header("Content-type: text/json");
 header("Content-type: application/json; charset=utf-8");

 include '../connection.php';

$sQuery= "INSERT INTO zaposlenici (id,ime,prezime,slika,spol,godina_rodenja,pocetak_rada,vrsta_ugovora,trajanje_ugovora,odjel) VALUES 
(:id,:ime,:prezime,:slika,:spol,:godina_rodenja,:pocetak_rada,:vrsta_ugovora,:trajanje_ugovora,:odjel)";

 $oData=array
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