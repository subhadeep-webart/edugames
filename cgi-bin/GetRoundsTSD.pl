#!/usr/local/bin/perl
  
#www.edugames.com/cgi-bin/GetRounds.pl?AA.Aen00001,AA.Aen00002
#www.edugames.com/cgi-bin/GetRoundsTSD.pl?AA.Aen00001,AA.Aen00002
#if ($debug) {print " = $newLn";}

require "RtnDbName.pl";
require "CorsConfig.pl";

$debug = 0;
$newLn = "             <BR><BR>\n";
print "Content-type: text/html\n\n";
if ($debug) {print "This is the Top of RtnRnd\n<BR><BR>";}#if ($debug) {print " = $newLn";}

$buffer = $ENV{ 'QUERY_STRING' };
$buffer =  "AA.Aen00001";
if ($debug) {print "buff =   $buffer $newLn";}
#AA.Men00003,AA.Aen00003

@serNbrList = split(/,/,$buffer);

$output = "Content-Type: application/json\n";
$output .= &corsHeaderString();
$output .= "\n";

#$output = "<p>Content-type: text/plain\nAccess-Control-Allow-Origin: trivia-smackdown.com\nAccess-Control-Allow-Methods: GET, POST, OPTIONS\nAccess-Control-Allow-Headers: Content-Type\n\n";


foreach $sn (@serNbrList){#AA.Aen00005
	if ($debug) {print "sn = $sn $newLn";}
	
	($db) = split(/\./,$sn);
	$ltr = substr($sn,3,1);
	$snNbr = substr($sn,6);
	$fileNbr = int($snNbr/10000);
	$dataBase = &rtnDbName($db);
	$fileName = "../edugames.com/DataBase/$dataBase/Rounds/$ltr/$ltr"."0$fileNbr.csv";
	if ($debug) {print "[GetRound] fileName = $fileName $newLn";}
	
	if(-r $fileName){#if ($debug) {print " = $   $newLn";}
		if (open(FILE,$fileName)){
			@lines = <FILE>;
			close FILE;
			foreach $line (@lines){
				@flds = split(/,/,$line);
				if ($flds[1] eq $sn){
					$output .= "$line|";
					last;
				}
			}
		} else {print "*[GetRound] Could Not Open $fileName $newLn";}
	}else {print "*[GetRound] $fileName is Missing $newLn";}
}

$output .= "</p>";
print $output;
