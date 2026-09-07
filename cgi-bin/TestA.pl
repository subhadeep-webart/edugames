#!/usr/bin/perl

use 5.010;
use strict;
#use warnings;

#www.trivia-smackdown.com/cgi-bin/TestA.pl?ABC,DE,FG+12,345
my $debug = 1;
my $newLn = "             <BR><BR>\n";
if ($debug) {print " = $newLn";}

my $buffer = $ENV{ 'QUERY_STRING' };

print "Content-type: text/html\n\n";
if ($debug) {print "This is the Top of TestA\n<BR><BR>";}
my @list = split(/,/,$buffer);

foreach my $item (@list){	
	print "$item\n\n";	}

print "Hello World!\n";

