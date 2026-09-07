# CorsConfig.pl — single source of truth for the CORS origin.
#
# Change $ALLOWED_ORIGIN here and every CGI script picks it up; there is no
# need to edit the individual Get*.pl files any more.
#
#   Production : https://trivia-smackdown.com
#   Local dev  : *          (allows localhost / 127.0.0.1 / Live Server)
#
# Remember to set this back to the production origin before deploying.

$ALLOWED_ORIGIN  = "https://trivia-smackdown.com";
$ALLOWED_METHODS = "GET, OPTIONS";

# Prints the CORS headers. Call this before printing Content-type.
sub printCorsHeaders {
	print "Access-Control-Allow-Origin: $ALLOWED_ORIGIN\n";
	print "Access-Control-Allow-Methods: $ALLOWED_METHODS\n";
}

# Same headers as a string, for scripts that build their header block up in a
# variable (e.g. GetRoundsTSD.pl) instead of printing directly.
sub corsHeaderString {
	return "Access-Control-Allow-Origin: $ALLOWED_ORIGIN\n"
	     . "Access-Control-Allow-Methods: $ALLOWED_METHODS\n";
}

1;
