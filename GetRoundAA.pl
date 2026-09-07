# Enable CORS — origin is configured in CorsConfig.pl
require "CorsConfig.pl";
&printCorsHeaders();
print "Content-Type: text/html\n\n";

if ($debug) {print "This is the Top of RtnRnd\n<BR><BR>";}

$buffer = $ENV{ 'QUERY_STRING' };
@serNbrList = split(/,/,$buffer);

foreach $sn (@serNbrList){#AA.Aen00005
	if ($debug) {print "sn = $sn $newLn";}
	
	($db) = split(/\./,$sn);
	$ltr = substr($sn,3,1);
	$snNbr = substr($sn,6);
	$fileNbr = int($snNbr/10000);
	$dataBase = &rtnDbName($db);
	$fileName = "../DataBase/$dataBase/Rounds/$ltr/$ltr"."0$fileNbr.csv";
	if ($debug) {print "[GetRound] fileName = $fileName $newLn";}
	
	if(-r $fileName){
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
		} else {
			print "*[GetRound] Could Not Open $fileName $newLn";
		}
	} else {
		print "*[GetRound] $fileName is Missing $newLn";
	}
}

# Return the output
print $output;