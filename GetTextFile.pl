use strict;
use warnings;
use LWP::Simple;
# Enable CORS - origin is configured in CorsConfig.pl
require "CorsConfig.pl";
&printCorsHeaders();

# URL of the CSV file
#my $url = 'https://www.edugames.com/DataBase/A65AA65A/ResLibry/An/Ge/No/No/US/CiStMo/CiStMo.AL.csv';
my $url = 'SampleText.txt';

# Fetch the content of the CSV file
my $content = get($url);

# Check if the content was successfully fetched
if (defined $content) {
    print $content;
} else {
    die "Failed to fetch the content from the URL: $url\n";
}
