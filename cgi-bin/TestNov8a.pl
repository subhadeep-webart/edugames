#!/usr/bin/perl -w  

#TestNov8a.pl 

print "Content-type: text/html\n\n"; 

print "Content-type: text/plain\n"; 
require "CorsConfig.pl";
print "Access-Control-Allow-Origin: $ALLOWED_ORIGIN\n";
print "Access-Control-Allow-Methods: GET, POST, OPTIONS\n"; 
print "Access-Control-Allow-Headers: Content-Type\n\n"; 

print "exit(0);";
  

print "<html><head>"; 

print "<title>CGI Test</title>";   

print "</head><body>"; 


print "<p>Test page using Perl</p>"; 


#print "<p>&PRA1_1782,2024.05.12,PRA1_1782;Set;16;8.5625;1600;;16TestRnds,,AvgGrade=8.5625 Points=1600 TotalRounds=16 SubSets=0 SubSetRnds=0 WebPages=0 Instructions=0 Commands=0 Comments=0 ,AbTe;;;;,gPRA1_130 ,,Fu2,Rnd;AA.Oen00001;1;2;100;0;Test/Order;Place the numbers on the LEFT in order on the RIGHT with the largest number on the bottom Make a mistake or two and press the CHECK button to see what happens.;,Rnd;AA.Oen00002;1;12;100;0;Emotions/Grief;Put the five stages of grief in order.;,Rnd;AA.Oen00004;1;9;100;0;US/Navy/USNA;Reconstruct USNA's Mission statement.;,Rnd;AA.Oen00005;1;9;100;0;Boats/Sailboats/Terms;Put the masts of a seven masted sailing ship in order.;,Rnd;AA.Oen00006;1;8;100;0;Navy;Put the ranks of the Navy in order with the highest on top.;,Rnd;AA.Oen00007;1;13;100;0;US/Navy/USNA;How long have you been in the Navy Midshipman Door?;,Rnd;AA.Oen00008;1;13;100;0;US/NAVY/USNA;Why Didn't you say sir Midshipman Door?;,Rnd;AA.Oen00009;1;4;100;0;Science/Measurements;Rank the following standard volume measurements with the largest on top.;,Rnd;AA.Oen00010;1;4;100;0;Science/Measurements;Rank the following standard volume measurements with the largest on top.;,Rnd;AA.Oen00011;1;9;100;0;Poems/American Classic;Place the lines to the poem by Clark Clement Moore in their proper order.;,Rnd;AA.Oen00012;1;9;100;0;Poems/American Classic;Place the lines to the poem by Clark Clement Moore in their proper order.;,Rnd;AA.Oen00013;1;9;100;0;Poems/American Classic;Place the first lines to Hiaweatha by Henry Wadsworth Longfellow in the proper order.;,Rnd;AA.Oen00014;1;9;100;0;Poems/American Classic;Place the lines to The Raven by Edgar Allan Poe in their proper order.;,Rnd;AA.Oen00015;1;9;100;0;Poems/American Classic;Place the lines to The Raven by Edgar Allan Poe in their proper order.;,Rnd;AA.Oen00016;1;9;100;0;Poems/American Classic;Place the lines to the Stephen Foster song in their order.;,Rnd;AA.Oen00017;1;9;100;0;Poems/American Classic;Place the lines to Clementine in their order.^^^;</p>";

$fileName = "../../edugames.com/cgi-bin/GetRounds.pl?AA.Aen00001";


#$fileName = "../edugames.com/cgi-bin/TestText.txt";

print "<p>fileName = $fileName</p>";
print "fileName = $fileName";

$stringBuffer .= "\n";

if (open(OUT,">>$fileName")) {
	print OUT $stringBuffer;
	close OUT;
}else {
 print "could not open file $filename" ;
}
  

print "</body></html>";



