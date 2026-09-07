

require "RtnDbName.pl";

sub getRound{
	($sn) = @_;
	
	if ($debug) {print "sn = $sn $newLn";}
	
	($db) = split(/\./,$sn);
	$ltr = substr($sn,3,1);
	$snNbr = substr($sn,6);
	$fileNbr = int($snNbr/10000);
	$dataBase = &rtnDbName($db);
	$fileName = "../DataBase/$dataBase/Rounds/$ltr/$ltr"."0$fileNbr.csv";
	if ($debug) {print "[GetRound] fileName = $fileName $newLn";}
	
	if(-r $fileName){#if ($debug) {print " = $   $newLn";}
		if (open(FILE,$fileName)){
			@lines = <FILE>;
			close FILE;
			foreach $line (@lines){
				@flds = split(/,/,$line);
				if ($flds[1] eq $sn){
					$output = $line;
					last;
				}
			}
		} else {$filesCouldNotOpen .= "$fileName\n";}
	}else {$filesCouldNotOpen .= "$fileName\n";}
	
	$output =$output;
}
1;
