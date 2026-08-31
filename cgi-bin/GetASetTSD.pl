#!/usr/local/bin/perl

#www.edugames.com/cgi-bin/GetASet.pl?PRA1_0019
# Enable CORS — origin is configured in CorsConfig.pl
require "CorsConfig.pl";
&printCorsHeaders();

#if ($debug) {print " = $  $newLn";}
$debug = 0;
$newLn = "<BR><BR>\n";

print "Content-type: text/html\n\n";
if ($debug) {print "This is the Top of GetASet.pl$newLn";}

require "GetSetSub.pl";
require "PrintSummary.pl";

$buffer = $ENV{'QUERY_STRING'};
$buffer =~ tr/+/ /; #Replace the +'s with spaces

if ($debug) {print "buffer = $buffer  $newLn";}
($setSerNbr) = split(/,/,$buffer);

if ($debug) {print "gmICode = $gmICode  $newLn";}

$theSetLine = &getSetSub($setSerNbr);

print $theSetLine;

if ($debug) {print "This is the Bottom of GetASet.pl$newLn";}
