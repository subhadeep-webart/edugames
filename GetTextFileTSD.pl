#!/usr/bin/perl
use strict;
use warnings;
use CGI qw(:standard);
#www.edugames.com/cgi-bin/GetTextFileTSD.pl?SampleText.txt
# Enable CORS - origin is configured in CorsConfig.pl
require "CorsConfig.pl";
&printCorsHeaders();
# Create a new CGI object
my $cgi = CGI->new;

# Retrieve the file name from the query parameters
my $file_path = $cgi->param('file');

#print "file_path=  $file_path";
print "XXXX";

# Print the HTTP headers
print $cgi->header('text/plain');


# Check if the file name is provided
if (!$file_path) {
    print "No file specified.\n";
    exit;
}

# Open the file for reading
open(my $fh, '<', $file_path) or die "Could not open file '$file_path': $!";

# Read and print each line from the file
while (my $line = <$fh>) {
    print $line;
}

# Close the filehandle
close($fh);