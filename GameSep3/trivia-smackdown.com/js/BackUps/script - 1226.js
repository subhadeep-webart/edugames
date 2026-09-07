'use strict';

// JavaScript source code
console.log('This is the Top');

//const theButton = document.getElementById("butTest");

//console.log('This is the Button' + theButton);

//theButton.addEventListener("click", console.log('buttonClicked'));  AA.Uen00027
//http://edugames.com/cgi-bin/GetRounds.pl?AA.Ben000328 
//http://edugames.com/cgi-bin/GetRounds.pl?AA.Uen00027

//lPRA1 5,6/8/99,2:45 PM,Copyright 1999 by Peter Antoniak, 196,A 2 13,B 15 11,C 26 15,D 41 9,E 50 3,F 53 3,G 56 2,H 58 10,I 68 6,J 74 4,K 78 6,L 84 12,M 96 21,N 117 13,O 130 10,P 140 12,Q 152 0,R 152 5,S 157 20,T 177 10,U 187 1,V 188 2,W 190 6,X 196 0,Y 196 0,Z 196 0, Akron Alabama Alaska Albany Anaheim Annapolis Ardmore Arizona Arkansas Atlanta Atlantic City Augusta Austin Baltimore Baton Rouge Benton Harbor Bethlehem Birhamington Bismark Boise Boston Boynton Beach Buffalo Burlingame California Carmel Carson City Charleston Cheyenne Chicago Cincinnati Clementon Cleveland Colma Colorado Columbia Columbus Concord Connecticut Daily City Dallas Delaware Denver Des Moines Detroit District of Columbia Dover Dublin East Rutherford Edmond Englewood Florida Fort Worth Frankfort Georgia Green Bay Harrisburg Hartford Hawaii Helena Highland Park Hilton Head Island Honolulu Hot Springs Houston Hutchinson Idaho Illinois Indiana Indianapolis Iowa Iwo Jima-Memorial Jackson Jefferson City Juneau Jupiter Kansas Kansas Kansas City Kentucky Kiamesha Lake Knasas City Lancaster Lansing Las Vegas Lemont Ligonier Lincoln Lincoln-Memorial Little Rock Long Island Los Altos Los Angeles Louisiana Madison Madison Mahan Hall at US Naval Academy Maine Mamaroneck Maryland Massachusetts Memphis Miami Miami Beach Michigan Milwaukee Minneapolis Minnesota Mississippi Missouri Montana Montgomery Montpelier Morgan Hills Mt View Nashville Nebraska Nevada New Hampshire New Jersey New Mexico New Orleans New York City New York State Newark North Carolina North Dakota North Palm Beach Oak Brook Oakland Oakmont Ohio Oklahoma City Oklahoma State Olympia Orange County Oregon Orlando Pacific Palasades Palm Springs Palo Alto Pebble Beach Pennsylvania Philadelphia Phoenix Pierre Pinehurst Pittsburgh Portland Providence Raleigh Rhode Island Richmond Rochester Rushmore-Mt. Sacramento Saint Louis Saint Paul Salem Salt Lake City San Antonio San Bruno San Diego San Francisco San Jose San Mateo San%20Bruno Sante Fe Scarsdale Seattle Shoal Creek South Carolina South Dakota Southampton Springfield Tacoma Tallahassee Tampa Tecumseh-Statue at US Naval Academy Tennessee Texas Toledo Topeka Trenton Tulsa Utah Vermont Virginia Washington Washington-DC West Virginia Wichita Wisconsin Wyoming

const sampleAnsLst = "lPRA1 5,6/8/99,2:45 PM,Copyright 1999 by Peter Antoniak, 196,A 2 13,B 15 11,C 26 15,D 41 9,E 50 3,F 53 3,G 56 2,H 58 10,I 68 6,J 74 4,K 78 6,L 84 12,M 96 21,N 117 13,O 130 10,P 140 12,Q 152 0,R 152 5,S 157 20,T 177 10,U 187 1,V 188 2,W 190 6,X 196 0,Y 196 0,Z 196 0,| Akron,Alabama,Alaska,Albany,Anaheim,Annapolis,Ardmore,Arizona,Arkansas,Atlanta,Atlantic City,Augusta,Austin,Baltimore,Baton Rouge,Benton Harbor,Bethlehem,Birhamington,Bismark,Boise,Boston,Boynton Beach,Buffalo,Burlingame,California,Carmel,Carson City,Charleston,Cheyenne,Chicago,Cincinnati,Clementon,Cleveland,Colma,Colorado,Columbia,Columbus,Concord,Connecticut,Daily City,Dallas,Delaware,Denver,Des Moines,Detroit,District of Columbia,Dover,Dublin,East Rutherford,Edmond,Englewood,Florida,Fort Worth,Frankfort,Georgia,Green Bay,Harrisburg,Hartford,Hawaii,Helena,Highland Park,Hilton Head Island,Honolulu,Hot Springs,Houston,Hutchinson,Idaho,Illinois,Indiana,Indianapolis,Iowa,Iwo Jima-Memorial,Jackson,Jefferson City,Juneau,Jupiter,Kansas,Kansas,Kansas City,Kentucky,Kiamesha Lake,Knasas City,Lancaster,Lansing,Las Vegas,Lemont,Ligonier,Lincoln,Lincoln-Memorial,Little Rock,Long Island,Los Altos,Los Angeles,Louisiana,Madison,Madison,Mahan Hall at US Naval Academy,Maine,Mamaroneck,Maryland,Massachusetts,Memphis,Miami,Miami Beach,Michigan,Milwaukee,Minneapolis,Minnesota,Mississippi,Missouri,Montana,Montgomery,Montpelier,Morgan Hills,Mt View,Nashville,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New Orleans,New York City,New York State,Newark,North Carolina,North Dakota,North Palm Beach,Oak Brook,Oakland,Oakmont,Ohio,Oklahoma City,Oklahoma State,Olympia,Orange County,Oregon,Orlando,Pacific Palasades,Palm Springs,Palo Alto,Pebble Beach,Pennsylvania,Philadelphia,Phoenix,Pierre,Pinehurst,Pittsburgh,Portland,Providence,Raleigh,Rhode Island,Richmond,Rochester,Rushmore-Mt.,Sacramento,Saint Louis,Saint Paul,Salem,Salt Lake City,San Antonio,San Bruno,San Diego,San Francisco,San Jose,San Mateo,San%20Bruno,Sante Fe,Scarsdale,Seattle,Shoal Creek,South Carolina,South Dakota,Southampton,Springfield,Tacoma,Tallahassee,Tampa,Tecumseh-Statue at US Naval Academy,Tennessee,Texas,Toledo,Topeka,Trenton,Tulsa,Utah,Vermont,Virginia,Washington-DC,West Virginia,Wichita,Wisconsin,Wyoming";

//AA.Uen01219 Pair the name with what the person is know for.,SuperQuiz,Rows=8 Cols=2 FntSize=18 FntColor=black BkGndColor=white LnCnt=1 FlushNbr=1 SingleScreen=No Sort=Yes,Jean Paul Getty;Oil tycoon;,Rudolf Nureyev;Ballet dancer;,Kareem Abdul Jabbar;Basketball player;,Mike Bossy;Hockey player;,Al Pacino;Actor;,Lesley Gore;Singer;,Harriet Tubman ;US abolitionist;,Emmett Kelly;Clown;,Julia Child;Chef;,John Paul Jone;Naval hero;,Mel Allen ;Sportscaster;,Martina Navratilova ;Tennis player;,Mort Sahl;Comedian;,Michel Legrand ;Composer;,James Joycs;Author;,Art Buchwald ;Journalist;,Thomas Hobbes ;Philosopher;,Margaret Mead ;Anthropologist;,Etienne Brule ;Explorer;,Alvin York ;Soldier;,Niccolo Machiavelli ;Statesman;,Pancho Villa ;Mexican revolutionary;,Roger Vadi;Movie director;,Clarence Darrow ;Lawyer;,Carl Sandburg ;Poet;,Lauren Hutton ;Model;,Louis Leakey ;Archaeologist;,Arnold Toynbee

//const bxInput ="auricle;oracle,colonel;kernel,sleight;slight,main;Maine,taught;taut,dear;deer,gnu;knew,genes;jeans,right;rite,might;mite,grease;Greece,throes;throws,bell;belle,scene;seen,pail;pale,raise;raze,choral;coral,fisher;fissure,dense;dents,boar;bore,palate;palette,toe;tow,laps;lapse,knows;noes,chews;choose,cense;cents,ware;wear,karat;caret,ewe;yew,for;fore,grate;great,load;lode,adds;ads,step;steppe,stake;steak,wade;weighed,knight;night,frees;freeze,desert;dessert,bloc;block,frays;phrase,road;rode,suite;sweet,rain;reign,capital;capitol,core;corps,coarse;course,bail;bale,fair;fare,tracked;tract,cue;queue,soar;sore,cedar;ceder,beer;bier,ring;wring,one;won,peer;pier,gamble;gambol,loan;lone,serf;surf,made;maid,marshall;martial,better;bettor,sundae;Sunday,tic;tick";
//const bxParm = "Rows=3 Cols=3 FntSize=16 FntColor=blue BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes";

//,AA.Men00021,EdUGames tm,20020802,7,ThLaWoHo ,LaVo,ThWrWo,,words;homonyms;esl,,aPRA1_0 zPRA1_15,,,,,Words/Compound,Pair the Homonyms,,Rows=5 Cols=4 FntSize=16 FntColor=blue BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes ,auricle;oracle,colonel;kernel,sleight;slight,main;Maine,taught;taut,dear;deer,gnu;knew,genes;jeans,right;rite,might;mite,grease;Greece,throes;throws,bell;belle,scene;seen,pail;pale,raise;raze,choral;coral,fisher;fissure,dense;dents,boar;bore,palate;palette,toe;tow,laps;lapse,knows;noes,chews;choose,cense;cents,ware;wear,karat;caret,ewe;yew,for;fore,grate;great,load;lode,adds;ads,step;steppe,stake;steak,wade;weighed,knight;night,frees;freeze,desert;dessert,bloc;block,frays;phrase,road;rode,suite;sweet,rain;reign,capital;capitol,core;corps,coarse;course,bail;bale,fair;fare,tracked;tract,cue;queue,soar;sore,cedar;ceder,beer;bier,ring;wring,one;won,peer;pier,gamble;gambol,loan;lone,serf;surf,made;maid,marshall;martial,better;bettor,sundae;Sunday,tic;tick 
//,AA.Pen00006,EdUGames tm,20020426,9,,,,Te,,,aPRA1_32 zPRA1_15,,,,,[12 Boxes]Numbers,Select the even numbers. Watch how the score increases. Try to Make a mistake or two and press the Check button to see what happens.,,Rows=4 Cols=3 FntSize=36 FntColor=blue BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes ,R-Two,R-Four,W-One,W-Three,W-Five,R-Six,W-Seven,R-Eight,W-Nine,R-Ten,W-Eleven,R-Twelve,,,,,,,,, |

//const sampleRound = ",AA.Men00021,EdUGames tm,20020802,7,ThLaWoHo ,LaVo,ThWrWo,,words;homonyms;esl,,aPRA1_0 zPRA1_15,,,,,Words/Compound,Pair the Homonyms,,Rows=3 Cols=4 FntSize=16 FntColor=blue BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes ,auricle;oracle,colonel;kernel,sleight;slight,main;Maine,taught;taut,dear;deer,gnu;knew,genes;jeans,right;rite,might;mite,grease;Greece,throes;throws,bell;belle,scene;seen,pail;pale,raise;raze,choral;coral,fisher;fissure,dense;dents,boar;bore,palate;palette,toe;tow,laps;lapse,knows;noes,chews;choose,cense;cents,ware;wear,karat;caret,ewe;yew,for;fore,grate;great,load;lode,adds;ads,step;steppe,stake;steak,wade;weighed,knight;night,frees;freeze,desert;dessert,bloc;block,frays;phrase,road;rode,suite;sweet,rain;reign,capital;capitol,core;corps,coarse;course,bail;bale,fair;fare,tracked;tract,cue;queue,soar;sore,cedar;ceder,beer;bier,ring;wring,one;won,peer;pier,gamble;gambol,loan;lone,serf;surf,made;maid,marshall;martial,better;bettor,sundae;Sunday,tic;tick,,,,,,,,,,,,,,,";
//const sampleRound = ",AA.Pen00016,Ed-U-Games tm,20060707,10,ThUn,ScAs,,ScFa,planet;sun;mercury;venus;earth;mars;jupiter;saturn;uranus;neptune;pluto,,aPRA1_70 zPRA1_30,,,,,Science/Astronomy/Solar System,Which are the three inner planets?,,Rows=5 Cols=4 FntSize=20 FntColor=magenta BkGndColor=yellow LnCnt=1 SingleScreen=No Sort=Yes ,W-Mars,W-Sun,R-Mercury,W-Moon,W-Jupiter,R-Venus,W-Saturn,R-Earth,W-Despina,W-Titania,W-Caliban,W-Larissa,W-Stephano,W-Cordelia,W-Sycorax,W-Ganymede,W-Bianca,W-Umbriel,W-Desdemona,W-Ophelia,,,,,";
//const sampleRound = ",AA.Een00002,EdUGames tm,20020501,9.00,,,,Te,,,aPRA1_40 zPRA1_15,,,,,Test/GameE,Select the single letter [No Sort] Multi-Screen No Zones,,Rows=3 Cols=3 FntSize=35 FntColor=blue BkGndColor=yellow LnCnt=1 SingleScreen=No Sort=No ,A;AA;AAA;,B;BB;BBB;,C;CC;CCC;,D;DD;DDD;,E;EE;EEE;,F;FF;FFF;,G;GG;GGG;,H;HH;HHH;,I;II;III;,J;JJ;JJJ;,K;KK;KKK;,L;LL;LLL;,M;MM;MMM;,N;NN;NNN;,O;OO;OOO;,P;PP;PPP;,Q;QQ;QQQ;,R;RR;RRR;,S;SS;SSS;,T;TT;TTT;,U;UU;UUU;,V;VV;VVV;,W;WW;WWW;,X;XX;XXX;,Y;YY;YYY;,Z;ZZ;ZZZ;";
//planet;sun;mercury;venus;earth;mars;jupiter;saturn;uranus;neptune;pluto
//const sampleRound = ",AA.Een00010,EdUGames tm,20021015,10,ThStHi LoPoCo,HiWo GeWo,,,country;historic items,,aPRA1_50 zPRA1_15,,,,,Countries/Historic Things,Pick the one item in each row that is not in the same Country as the others in the row,^AA.DCL.C.332374,Rows=4 Cols=3 FntSize=16 FntColor=blue BkGndColor=yellow LnCnt=1 SingleScreen=No Sort=No ,Taj Mahal:^AA.DCL.A.185153;The Globe Theater:^AA.DCL.A.120022;Saint Paul's Cathedral:^AA.DCL.A.182063;Big Ben:^AA.DCL.A.160023,The Acropolis:^AA.DCL.A.156043;The Holy See:^AA.DCL.A.092133;The Colosseum:^AA.DCL.A.163153;Sistine Chapel:^AA.DCL.A.183023,Great Wall of China:^AA.DCL.A.168103;Maginot Line:^AA.DCL.A.218013;Eiffel Tower:^AA.DCL.A.166013;Cathedral of Chartres:^AA.DCL.A.163043,Sphinx:^AA.DCL.A.183112;The Pentagon:^AA.DCL.A.323052;The Watergate:^AA.DCL.A.284093;Transcontinental Railroad:^AA.DCL.A.283012";
const sampleRound = ",AA.Uen00045,EdUGames tm,20030103,9,ThWrReBi,Re,,ReBi,bible sayings,,aPRA1_58 zPRA1_15,,,,,Bible/Sayings,Complete the Bible sayings.,^AA.DCL.E,Rows=4 Cols=3 FntSize=14 FntColor=blue BkGndColor=lightGray LnCnt=1 SingleScreen=No Sort=Yes ,I am;the voice of one;crying in the wilderness;^AA.DCL.A.026032,Wither;thou goest;I will go;^AA.DCL.A.026052,It is better;to give;than to receive.;^AA.DCL.A.009063,Get thee;behind me;Satan.;^AA.DCL.A.009053,Read;the handwriting;on the wall ;^AA.DCL.A.010033,You are;the salt;of the earth;^AA.DCL.A.023073,Physician;heal;thyself.;^AA.DCL.A.021043,By their fruits;ye shall;know them;^AA.DCL.A.009022,Let there;be;light.;^AA.DCL.A.016013,Man;does not live;by bread alone.;^AA.DCL.A.052103,Dust thou art;and unto dust;shalt thou return.;^AA.DCL.A.007063,Cast not;ye pearls;before swine;^AA.DCL.A.020073,Render therefore;unto Caesar the things;which are Caesar's.;^AA.DCL.A.023013,My God;My God why;hast thou forsaken me?;^AA.DCL.A.018033,Many are called;but few;are chosen.;^AA.DCL.A.017023,The wolf;shall also dwell;with the lamb;^AA.DCL.A.026072,The meek;shall inherit;the earth.;^AA.DCL.A.017073,There is nothing;new;under the sun.;^AA.DCL.A.019043,The last;shall be first;and the first shall be last;^AA.DCL.A.015033,Vanity;of vanities;all is vanity;^AA.DCL.A.026022,,,,,,,";
//,AA.Oen00005,EdUGames tm,20020919,9,ThTrNa,PhSaTe,,SpSa,masts;sailing ship,,aPRA1_0 zPRA1_15,,,,,Boats/Sailboats/Terms,Put the masts of a seven masted sailing ship in order.,,Rows=7 Cols=1 FntSize=36 FntColor=blue BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes ,Fore,Main,Mizzen,Jigger,Kicker,Spanker,Pusher,,,,,,,,,,,, |
//,AA.Ben00001,EdUGames tm,20020605,9,,,,Te,,}P.AA.Pi.Pe.Le.Po.US.Pr.16PopPres.NK.gif,aPRA1_50 iPRA1_45 oPDF1_20 zPRA1_15,,,,,US Presidents,Which seven presidents are Democrats?,,Type=Grid Rows=4 Cols=4,}P.AA.Pi.Pe.Le.Po.US.Pr.16PopPres.NK.gif,R1C1;R1C4;R2C3;R2C4;R3C2;R3C3;R3C4,,,,,,,,,,
//,AA.Ben00478,Ed-U-Games tm,20210410,9,LoStQu ,GeNoNoUSKS GeNoNoUSKY GeNoNoUSLA ,NoNoUSKS NoNoUSKY NoNoUSLA ,GeStKS GeStKY GeStLA,quarters;kansas;kentucky;louisiana,}P.AA.Pi.Th.Cu.US.Co.Qu.St.NM.EE.jpg;}P.AA.Pi.Th.Cu.US.Co.Qu.St.LA.EE.jpg;}P.AA.Pi.Th.Cu.US.Co.Qu.St.WY.EE.jpg;}P.AA.Pi.Th.Cu.US.Co.Qu.St.KY.EE.jpg;}P.AA.Pi.Th.Cu.US.Co.Qu.St.IL.EE.jpg;}P.AA.Pi.Th.Cu.US.Co.Qu.St.KS.EE.jpg,aPRA1_125 zPRA1_30,,,,Pick out 3 of 6 quarters for Kansas` Kentucky and Louisiana,US/States/Quarters,Check the quarter from the state of Kansas` Kentucky and Louisiana.,,Type=MultipleResourcess,}P.AA.Pi.Th.Cu.US.Co.Qu.St.NM.EE.jpg selected=No,}P.AA.Pi.Th.Cu.US.Co.Qu.St.LA.EE.jpg selected=Yes,}P.AA.Pi.Th.Cu.US.Co.Qu.St.WY.EE.jpg selected=No,}P.AA.Pi.Th.Cu.US.Co.Qu.St.KY.EE.jpg selected=Yes,}P.AA.Pi.Th.Cu.US.Co.Qu.St.IL.EE.jpg selected=No,}P.AA.Pi.Th.Cu.US.Co.Qu.St.KS.EE.jpg selected=Yes,,,,
//,AA.Aen00003,EdUGames tm,20021014,4,,,,,boats;sailboats;bow,}P.AA.Pi.Th.Tr.Na.SailBoat.KG.gif,aPRA1_80 dPRA1_15 zPRA1_15,,,PRA1;Boats/Sailboats/sailboat_terms.html,,Boats/Sailboats,Which is the Bow?,,Sort=Yes ,}P.AA.Pi.Th.Tr.Na.SailBoat.KGDB.gif,{A-4red 009118038066 180,{A-4red 373118038066 180,{R-4red 004054057057,{W-4red 361055057057,,,,,,,, |
//,AA.Cen00004,EdUGames tm,20030213,9,LoMoPa LoPoSt,GeNoNoUS,NoNoUS,GePa,national park,,aPRA1_140 zPRA1_15,,,,,Geography/US/National Parks,Place the National Parks by State.,,Rows=16 Cols=1 FntSize=12 FntColor=black BkGndColor=white BoxWidth=131 BoxHeight=23 BoxWidth=131 BoxHeight=23 CatRows=3 CatCols=2 CatFntSize=24 CatFntColor=magenta CatLabOpaque=No PanelBkGndColor=white Sort=Yes ,Washington;Mount Ranier;North Cascades;Olympic;,Arizona;Grand Canyon;Petrified Forest;,Wyoming;Yellowstone;Grand Teton;,Utah;Arches;Bryce Canyon;Canyonlands;Capitol Reef;Zion;,California;Channel Islands;Kings Canyon;Lassen Volcanic;Redwood;Sequoia;Yosemite;,,, 
//,AA.Den00002,EdUGames tm,20020822,9,EvScDi,ScEaAs,,ScFa CuAc,moon landing,}P.AA.Pi.Ev.Ex.19690716-MoonLanding.GF.gif,aPRA1_40 dPRA1_30 zPRA1_15,,,,,Science/Astronomy,When was the first moon landing?,,Answer=19690720,}P.AA.Pi.Th.Sy.Ta.DateLine-1.PD.gif,}P.AA.Pi.Ev.Ex.19690716-MoonLanding.GF.gif |
//,AA.Ien00005,EdUGames tm,,9,,,,Te,,}P.AA.Pi.Ge.No.No.US.SD.Mo.MtRushmore-1.PI.gif,aPRA1_70 iPRA1_15 oPDF1_5 zPRA1_15,,,,,US/Monuments,What is this American Monument?,,DisplayType=Grid TypeSelection=Player Rows=8 Cols=10,}L.AA.An.Ge.No.No.US.CiStMo.AL.csv Rushmore-Mt.,}P.AA.Pi.Ge.No.No.US.SD.Mo.MtRushmore-1.PI.gif,{H-Northern State;-;4 Presidents;In Stone,,,,,,,
//,AA.Nen00001,EdUGames tm,,9,,,,,,,aPRA1_0 zPRA1_15 ,,,,,Races/Automobile,How many miles in the Memorial Day weekend race at Indianapolis?,,Answer=500 Type=Integer LowBracket=200 HiBracket=1200,}P.AA.Pi.Th.Sy.Ta.NbrLine1KWidth-1.fD.jpg,,,,,, |
//,AA.Qen00002,EdUGames tm,20020802,10,PeLePoUSPr,HiNoNoUS,NoNoUS,PoAm,us presidents,,aPRA1_370 zPRA1_15,,,,,Leaders/US Presidents,Answer these questions about these well know US Presidents.,Various books on Presidents.,Rows=6 Cols=1 FntSize=12 FntColor=black BkGndColor=white LnCnt=2 SingleScreen=No Sort=Yes,}B.AA.Bu.Pe.Le.Po.US.Pr.16PopPres.BL.csv,Who was President when Congress defeated a request for military aid to the contras?;;Reagan,What Twentieth Century President attained the rank of general?;;Eisenhower,What Twentieth Century President did not attend college?;;Truman,What two presidents saw military action in WWI?;;Truman;Eisenhower,What President started the Civilian Conservation Corps?;;Roosevelt-F,What President is on a 500 dollar US Savings Bond?;;Wilson,What President resigned from office?;;Nixon,What President is on a million dollar Treasury Bond?;;Roosevelt-T,What president has a first name of Thomas?;;Jefferson,The U-2 incident wrecked what Presidents summit conference?;;Eisenhower,What President ordered the Atom bomb dropped on Hiroshima?;;Truman,What president has a first name of Richard.?;;Nixon,What president is on a $1.00 coin?;;Eisenhower,What two presidents carried the most states ever in an election?;;Nixon;Reagan,What Presidents is on a thousand dollar Treasury Note?;;Lincoln,What six Presidents served as governor?;;Reagan;Carter;Clinton;Wilson;Roosevelt-T;Roosevelt-F,What six Presidents were elected/reelected in war time?;;Lincoln;Wilson;Roosevelt-F;Nixon;Eisenhower;Johnson-L,Who became President in 1861?;;Lincoln,Who was President when World War I started?;;Wilson,What president is on a 50 cent coin?;;Kennedy,What president is on a $5.00 bill?;;Lincoln,What president has a first name of Jimmy?;;Carter,What five presidents played football for their college teams?;;Eisenhower;Nixon;Ford;Reagan;Bush,What three presidential incumbents were defeated for reelection?;;Ford;Carter;Bush,What three Twentieth Century Presidents were elected in war time?;;Wilson;Roosevelt-F;Nixon,What President signed the Social Security Act?;;Roosevelt-F,What President started the Works Progress Administration?;;Roosevelt-F,What 4 presidents have memorials in Washington DC?;Roosevelt Island is the hard one.;Washington;Lincoln;Jefferson;Roosevelt-T,Who was president during the Civil War?;;Lincoln,Who was President when MacArthur was driven from Corregidor?;;Roosevelt-F,What President is on a 75 dollar US Savings Bond?;;Truman,What President signed the Taft-Hartley Act?;;Truman,,,,,,,,,,,,,,,,
//,AA.Qen00004,EdUGames tm,20020808,11,LoPoCo,GeNoUS,NoNoUS,GeAm,us;state,}B.AA.Bu.Ge.No.No.US.States.BL.csv,aPRA1_190 lPRA1_5 zPRA1_15,,,,,US/States,Answer these questions about the United States,Various Books on the subject.,Rows=6 Cols=1 FntSize=12 FntColor=black BkGndColor=white LnCnt=3 SingleScreen=No Sort=Yes,}B.AA.Bu.Ge.No.No.US.States.BL.csv,Topeka is a major urban areas in what state?;;Kansas,What state's highest point is Mt. McKinley at 20320 feet?;;Alaska,What state name is a Spanish name of an imaginary island?;;California,Moscow USA is in what state?;;Idaho,The Columbia is the border between what two states?;;Washington;Oregon,What state has the longest coastline?;;Alaska,What 4 states are named after kings?;;Georgia;Louisiana;North Carolina;South Carolina,What is the Golden State?;;California,What was the 48th state to join the Union?;;Arizona,The Yucca is the state flower and the Land of Enchantment is the nick name of what state?;;New Mexico,Haleakala National park is located in what state?;;Hawaii,The Badger State is the nick name of what state?;;Wisconsin,What state means -mountain region- in Latin?;;Montana,What state name is derived from the name of a president?;;Washington,Ft. Wayne is a major urban areas in what state?;;Indiana,Des Moines and Davenport are major urban areas in what state?;1;Iowa,The Baseball Hall of Fame is located in what state?;;New York,The Bluebonnet is the state flower of what state that starts with the letter T?;;Texas,What state name comes from French Royalty?;;Louisiana,,,,,,
//,AA.Qen00003,EdUGames tm,20020807,11,ThMi,ScCh,,SiFa,science;elements,}B.AA.Bu.Th.Ba.El.PeriodicTblOfElements.BL.csv,aPRA1_130 lPRA1_5 zPRA1_15,,,,,Science/Chemistry,Answer these questions about the Elements.(Image Grid),,Rows=6 Cols=1 FntSize=9 FntColor=black BkGndColor=white LnCnt=4 SingleScreen=No Sort=Yes ,}B.AA.Bu.Th.Ba.El.PeriodicTblOfElements.BL.csv,What are the two elements in table salt?;^AA.DCL.A.46306;Sodium (Na);Chlorine (Cl),What is the major gas in air?;;Nitrogen (N),An isotope of this element is often used to date dead things:;;Carbon (C),A Single molecule of this element and oxygen forms a colorless-odorless gas that is often fatal to humans:;;Carbon (C),What element did Marie Curie discover?;;Radium (Ra),What is named after the person who developed the General Theories of Relativity?;;Einsteinium (Es),Water is composed of what two elements?;;Hydrogen (H);Oxygen (O),What element combines to form Helium in a fusion reaction?;;Hydrogen (H),What element doomed the Hindenburg?;;Hydrogen (H),What is the most abundant element in the Universe?;;Hydrogen (H),What element shares a name with the closest planet to the sun?;;Mercury (Hg),The Ozone Layer is composed of what element?;;Oxygen (O),The 235 isotope of this element is used in making energy:;;Uranium (U),,,,,,,,,,,,,,

/*
20 Round Data     : }P.AA.Pi.Th.Cu.US.Co.Qu.St.NH.EE.jpg selected=Yes
21 Round Data     : }P.AA.Pi.Th.Cu.US.Co.Qu.St.AL.EE.jpg selected=No
22 Round Data     : }P.AA.Pi.Th.Cu.US.Co.Qu.St.RI.EE.jpg selected=No
bufURL.toString()= http://edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Cu/US/Co/Qu/St/NH/NH.EE.jpg
AA.Aen00017 Which is the Appendix?	^AA.DCL.A.50713	Sort=Yes 	}P.AA.Pi.Th.Hu.Bo.GITract-1.JK.gif	{R-3magenta 077301038038	{A-3magenta 048296031031 315	{W-3magenta 018014038038	{A-3magenta 053045031031 135	{W-3magenta 249113038038	{A-3magenta 215104031031 315	{W-3magenta 225301038038	{A-3magenta 176306046031 270	
Whichis the bow?		Sort=Yes 	}P.AA.Pi.Th.Tr.Na.SailBoat.KG.gif	{R-5red 011105036036	{W-5red 271108036036	
B Pick out 1 of 4 quarters for New York	US/States/Quarters	Check the quarter from the state of New York.		Type=MultipleResourcess	}P.AA.Pi.Th.Cu.US.Co.Qu.St.HI.EE.jpg selected=No	}P.AA.Pi.Th.Cu.US.Co.Qu.St.NY.EE.jpg selected=Yes	}P.AA.Pi.Th.Cu.US.Co.Qu.St.WY.EE.jpg selected=No	}P.AA.Pi.Th.Cu.US.Co.Qu.St.MN.EE.jpg selected=No		
1 of 4 Flags from the state of Vermont.	US/States/Flags	Check the flag from the state of Vermont.		Type=MultipleResourcess	}P.AA.Pi.Th.Fl.US.St.Bl.MT.ED.jpg selected=No	}P.AA.Pi.Th.Fl.US.St.Bl.VT.ED.jpg selected=Yes	}P.AA.Pi.Th.Fl.US.St.Bl.KY.ED.jpg selected=No	}P.AA.Pi.Th.Fl.US.St.Bl.HI.ED.jpg selected=No				
C Sports/Ski Areas	Place the ski area with the state.		Rows=8 Cols=1 FntSize=12 FntColor=black BkGndColor=yellow BoxWidth=146 BoxHeight=28 BoxWidth=146 BoxHeight=28 CatRows=3 CatCols=2 CatFntSize=30 CatFntColor=blue CatLabOpaque=No PanelBkGndColor=white Sort=Yes 	Wyoming;Jackson Hole;	Utah;Alta;Park City;Snowbird;	New York;Hunter Mt.;	Idaho;Sun Valley;	Washington;Snoqualmie Summit;Mission Ridge;			
D When was the first moon landing?		Answer=19690720	}P.AA.Pi.Th.Sy.Ta.DateLine-1.PD.gif	}P.AA.Pi.Ev.Ex.19690716-MoonLanding.GF.gif
E Pick the item that is not similar to the other items in the row.		Rows=4 Cols=3 FntSize=12 FntColor=black BkGndColor=white LnCnt=1 SingleScreen=Yes Sort=Yes	One;Red;Blue	San Diego;California;Oregon	Tree;Car;Bus	Yellow;One;Two	Radio;Chair;Bed	George Washington;Superman;Spiderman			
F }P.AA.Pi.Ge.No.No.US.DC.Bu.SupremeCourt-5.ED.gif }P.AA.Pi.Ge.No.No.US.DC.Bu.CapitalBuilding-1.ED.gif }P.AA.Pi.Ge.No.No.US.DC.Bu.WhiteHouse-1.ED.gif	aPRA1_60 iPRA1_45 oPDF1_15 zPRA1_15					Cities	What is this city?			}L.AA.Li.An.Ge.No.No.US.CiStMo.AL.csv Washington-DC	A Capital;On a River	}P.AA.Pi.Ge.No.No.US.DC.Bu.SupremeCourt-5.EDBB.gif	}P.AA.Pi.Ge.No.No.US.DC.Bu.CapitalBuilding-1.EDBB.gif	}P.AA.Pi.Ge.No.No.US.DC.Bu.WhiteHouse-1.EDBB.gif				
G What is the name of this Classical Work?	a Ref	Rows=7 Cols=1 FntSize=14 FntColor=black BkGndColor=white LnCnt=1 FlushNbr=1 SingleScreen=Yes Sort=Yes	R-Beethoven-Symphony No 1;W-Saint-Saens-Saens- The Carnivalofthe Animals- Wild Asses;W-Wagner-Rienzi- Overture;W-Verdi-La Traviata- Drinking Song;W-Puccini-Madama Butterfly- Humming Chorus;W-Bach-Brandenburg Concerto No4;W-Ravel-Bolero	}M.AA.Mi.Cl.Be.Sy.Beethoven-SymphonyNo1_1stMov_StartA.4.mid skipQuarterSeconds=0 playQuarterSeconds=100 answer=	
H Who was Yorba Linda's most famous son?		HintsToStart=0	}A.AA.An.Pe.WorldFamousPeople.AL.csv Nixon-Richard	{T-From California; FntSize=12 FntColor=Black BkGndColor=White BlockWidth=160 BlockHeight=128	{T-Wife's Maiden Name was `Thelma Catherine Ryan.; FntSize=12 FntColor=Black BkGndColor=White BlockWidth=192 BlockHeight=128	}S.AA.So.Vo.Le.Po.US.Pr.Ni.IAmNotACrook.0008.wav				
I Who is this former world leader?,^AA.DCL.A.28502,DisplayType=Grid TypeSelection=Random
J You will have two chances to view an outline.		Delay=3 Count=2 Rows=5 Cols=1 FntSize=24 FntColor=black BkGndColor=white LnCnt=1 SingleScreen=No Sort=No 	R-Nevada;W-Germany;W-California;W-Ohio;W-Washington	What is this state?	}P.AA.Pi.Ge.No.No.US.NV.Ma.USNVMap.DHBB.gif
K Which three have been US Senators?			}P.AA.Pi.Pe.Le.Po.US.Se.Goldwater-Barry.EF-a.gif selected=Yes	}P.AA.Pi.Pe.Ex.Sp.Glenn-John.EDAA.gif selected=Yes	}P.AA.Pi.Pe.Le.Po.US.Pr.Kennedy-John1.DDAA.gif selected=Yes	}P.AA.Pi.Pe.Le.Po.US.Co.Gingrich-Newt.CDBA.gif selected=No
L Approximately where was the third Atom Bomb exploded?	^AA.DCL.A.27305	Scale=6 Units=Miles Map=}P.AA.Pi.Ge.As.Ea.Ma.General-1.QJ.gif Loc=282271	
M Words/Compound	Pair the Homonyms		Rows=5 Cols=4 FntSize=16 FntColor=blue BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes 	auricle;oracle	colonel;kernel	sleight;slight	main;Maine	taught;taut	dear;deer	gnu;knew	genes;jeans	right;rite	might;mite	grease;Greece	throes;throws	bell;belle	scene;seen	pail;pale	raise;raze	choral;coral	fisher;fissure	dense;dents	boar;bore	palate;palette	toe;tow	laps;lapse	knows;noes	chews;choose	cense;cents	ware;wear	karat;caret	ewe;yew	for;fore	grate;great	load;lode	adds;ads	step;steppe	stake;steak	wade;weighed	knight;night	frees;freeze	desert;dessert	bloc;block	frays;phrase	road;rode	suite;sweet	rain;reign	capital;capitol	core;corps	coarse;course	bail;bale	fair;fare	tracked;tract	cue;queue	soar;sore	cedar;ceder	beer;bier	ring;wring	one;won	peer;pier	gamble;gambol	loan;lone	serf;surf	made;maid	marshall;martial	better;bettor	sundae;Sunday
N In what year did Hernando de Soto discover the Mississippi?		Answer=1539 Type=Integer LowBracket=1500 HiBracket=2000	}P.AA.Pi.Th.Sy.Ta.NbrLine1KWidth-1.fD.jpg			
O Place the nursery rhyme in the proper order.	^AA.DCL.A.121113	Rows=7 Cols=1 FntSize=24 FntColor=blue BkGndColor=yellow LnCnt=1 SingleScreen=No Sort=Yes 	Hickory Dickory 	Dock	The mouse ran up the 	clock	The clock struck one	The mouse ran down	Hickory dickory D...	
P Which are the only eight heavily bodies that were know prior to 1600?		Rows=5 Cols=4 FntSize=20 FntColor=magenta BkGndColor=yellow LnCnt=1 SingleScreen=No Sort=Yes 	R-Mars	R-Sun	R-Mercury	R-Moon	R-Jupiter	R-Venus	R-Saturn	R-Earth	W-Despina	W-Titania	W-Caliban	W-Larissa	W-Stephano	W-Cordelia	W-Sycorax	W-Ganymede	W-Bianca	W-Umbriel	W-Desdemona	W-Ophelia
Q Leaders/US Presidents	Answer these questions about these well know US Presidents.	Various books on Presidents.	Rows=6 Cols=1 FntSize=12 FntColor=black BkGndColor=white LnCnt=2 SingleScreen=No Sort=No	}B.AA.Bu.Pe.Le.Po.US.Pr.16PopPres.BL.csv	}S.AA.So.Vo.Le.Po.US.Pr.Ni.IAmNotACrook.008.au 4.0.99:Who said this?;;Nixon	Who was President when Congress defeated a request for military aid to the contras?;;Reagan	What Twentieth Century President attained the rank of general?;;Eisenhower	What Twentieth Century President did not attend college?;;Truman	What two presidents saw military action in WWI?;;Truman;Eisenhower	What President started the Civilian Conservation Corps?;;Roosevelt-F	What President is on a 500 dollar US Savings Bond?;;Wilson	What President resigned from office?;;Nixon	What President is on a  million dollar Treasury Bond?;;Roosevelt-T	What president has a first name of Thomas?;;Jefferson	The U-2 incident wrecked what Presidents summit conference?;;Eisenhower	What President ordered the Atom bomb dropped on Hiroshima?;;Truman	What president has a first name of Richard.?;;Nixon	What president is on a $1.00 coin?;;Eisenhower	What two presidents carried the most states ever in an election?;;Nixon;Reagan	What Presidents is on a thousand dollar Treasury Note?;;Lincoln	What six Presidents served as governor?;;Reagan;Carter;Clinton;Wilson;Roosevelt-T;Roosevelt-F	What six Presidents were elected/reelected in war time?;;Lincoln;Wilson;Roosevelt-F;Nixon;Eisenhower;Johnson-L	Who became President in 1861?;;Lincoln	Who was President when World War I started?;;Wilson	What president is on a 50 cent coin?;;Kennedy	What president is on a $5.00 bill?;;Lincoln	What president has a first name of Jimmy?;;Carter	What five presidents played football for their college teams?;;Eisenhower;Nixon;Ford;Reagan;Bush	What three presidential incumbents were defeated for reelection?;;Ford;Carter;Bush	What three Twentieth Century Presidents were elected in war time?;;Wilson;Roosevelt-F;Nixon	What President signed the Social Security Act?;;Roosevelt-F	What President started the Works Progress Administration?;;Roosevelt-F	What 4 presidents have memorials in Washington DC?;Roosevelt Island is the hard one.;Washington;Lincoln;Jefferson;Roosevelt-T	Who was president during the Civil War?;;Lincoln	Who was President when MacArthur was driven from Corregidor?;;Roosevelt-F	What President is on a 75 dollar US Savings Bond?;;Truman	What President signed the Taft-Hartley Act?;;Truman			
R Answer the Questions [No Sort]SingleScreen No Zones		Rows=4 Cols=4 FntSize=16 FntColor=magenta BkGndColor=white LnCnt=1 SingleScreen=Yes Sort=No FirstCol=0.25	The Answer is A;A;B;C;	The Answer is B;B;C;D;	The Answer is C;C;D;E;	The Answer is D;D;E;F;	The Answer is E;E;F;G;	The Answer is F;F;G;H;	The Answer is G;G;H;I;	The Answer is H;H;I;J;	The Answer is I;I;J;K;	The Answer is J;J;K;L;	The Answer is K;K;L;M;	The Answer is L;L;M;N;
S Who composed this?		FileType=M	}A.AA.An.Pe.Ar.Au.Co.ComposerNames.AL.csv Beethoven-Ludwig van	file=}M.AA.Mi.Cl.Be.Sy.Beethoven-SymphonyNo1_1stMov_StartB.8.mid firstSegment=750 stopTimes=750.1892.3034.4176.5318.6460.7602.8744.	{H--;-;-;-;-;from Germany;born in Bonn
T Parts of speach	The underlined word is A:		Rows=4 Cols=1 FntSize=18 FntColor=magenta BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes 	W-Noun;W-Adverb;R-Verb;W-Adjective		The quick brown fox jumped~over the lazy dog.~	U-bla 001021006000
U Complete the Names of Famous Authors	^AA.DCL.E	Rows=5 Cols=2 FntSize=24 FntColor=white BkGndColor=magenta LnCnt=1 SingleScreen=No Sort=Yes 	George;Eliot;^AA.DCL.A.117133	Samuel;Johnson;^AA.DCL.A.12303	Gertrude;Stein;^AA.DCL.A.133093	Stephen;Foster;^AA.DCL.A.167043	Eugene;O'Neill;^AA.DCL.A.128103	Tennessee;Williams;^AA.DCL.A.138043	Joseph;Conrad;^AA.DCL.A.116053	Giacomo;Puccini;^AA.DCL.A.179123	Scott;Joplin;^AA.DCL.A.171083	Aldous;Huxley;^AA.DCL.A.122103	Johannes;Brahms;^AA.DCL.A.161033	Herman;Melville;^AA.DCL.A.126063	Francis;Bacon;^AA.DCL.A.191042	Thornton;Wilder;^AA.DCL.A.138032	Ogden;Nash;^AA.DCL.A.127052	Robert;Browning;^AA.DCL.A.114083	Clarence;Darrow;^AA.DCL.A.263083	Antonio;Vivaldi;^AA.DCL.A.187152	Leonard;Bernstein;^AA.DCL.A.160013	Georges;Bizet;^AA.DCL.A.160053	Washington;Irving;^AA.DCL.A.123043	Edith;Wharton;^AA.DCL.A.137143	John;Donne;^AA.DCL.A.117033	Willa;Cather;^AA.DCL.A.115063	Franz;Schubert;^AA.DCL.A.182113	Jules;Verne;^AA.DCL.A.109113	Igor;Stravinsky;^AA.DCL.A.185013	Grimm;Brothers;^AA.DCL.A.091163	Desiderius;Erasmus;^AA.DCL.A.193123	Rube;Goldberg;^AA.DCL.A.168013	Carl;Sandburg;^AA.DCL.A.131133	Sinclair;Lewis;^AA.DCL.A.125063	Omar;Khayyam;^AA.DCL.A.100023	Leo;Tolstoy;^AA.DCL.A.108023	Dante;Alighieri;^AA.DCL.A.088133	Gustave;Flaubert;^AA.DCL.A.091033	Duke;Ellington;^AA.DCL.A.166022	Anne;Frank;^AA.DCL.A.091063	Gloria;Steinem;^AA.DCL.A.133112	Ernest;Hemingway;^AA.DCL.A.121073	Thomas;Paine;^AA.DCL.A.250103	Mark;Twain;^AA.DCL.A.136073	Ralph;Ellison;^AA.DCL.A.118012	Giuseppe;Verdi;^AA.DCL.A.187093	Dale;Carnegie;^AA.DCL.A.394073	Maya;Angelou;^AA.DCL.A.112093	Frederic;Chopin;^AA.DCL.A.163053	Claude;Debussy;^AA.DCL.A.164172	Alexander;Pope;^AA.DCL.A.130033		


const bxInput ="auricle;oracle,colonel;kernel,sleight;slight,main;Maine,taught;taut,dear;deer,gnu;knew,genes;jeans,right;rite,might;mite,grease;Greece,throes;throws,bell;belle,scene;seen,pail;pale,raise;raze,choral;coral,fisher;fissure,dense;dents,boar;bore,palate;palette,toe;tow,laps;lapse,knows;noes,chews;choose,cense;cents,ware;wear,karat;caret,ewe;yew,for;fore,grate;great,load;lode,adds;ads,step;steppe,stake;steak,wade;weighed,knight;night,frees;freeze,desert;dessert,bloc;block,frays;phrase,road;rode,suite;sweet,rain;reign,capital;capitol,core;corps,coarse;course,bail;bale,fair;fare,tracked;tract,cue;queue,soar;sore,cedar;ceder,beer;bier,ring;wring,one;won,peer;pier,gamble;gambol,loan;lone,serf;surf,made;maid,marshall;martial,better;bettor,sundae;Sunday,tic;tick";
const bxParm = "Rows=5 Cols=4 FntSize=16 FntColor=blue BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes";




//const theString = "500,400,Rows=8 Cols=2 FntSize=18 FntColor=black BkGndColor=white LnCnt=1 FlushNbr=1 SingleScreen=No Sort=Yes,Jean Paul Getty;Oil tycoon;,Rudolf Nureyev;Ballet dancer;,Kareem Abdul Jabbar;Basketball player;,Mike Bossy;Hockey player;,Al Pacino;Actor;,Lesley Gore;Singer;,Harriet Tubman ;US abolitionist;,Emmett Kelly;Clown;,Julia Child;Chef;,John Paul Jone;Naval hero;,Mel Allen ;Sportscaster;,Martina Navratilova ;Tennis player;,Mort Sahl;Comedian;,Michel Legrand ;Composer;,James Joycs;Author;,Art Buchwald ;Journalist;,Thomas Hobbes ;Philosopher;,Margaret Mead ;Anthropologist;,Etienne Brule ;Explorer;,Alvin York ;Soldier;,Niccolo Machiavelli ;Statesman;,Pancho Villa ;Mexican revolutionary;,Roger Vadi;Movie director;,Clarence Darrow ;Lawyer;,Carl Sandburg ;Poet;,Lauren Hutton ;Model;,Louis Leakey ;Archaeologist;,Arnold Toynbee ;Historian;,Thomas Huxley ;Biologist";

*/


document.getElementById('butSerNbr').addEventListener("click", function(){ startGame(); });//console.log(" =" + );


//console.log("XXX =" + document.getElementById("butA").name );//      console.log(" =" + );

document.getElementById("test").addEventListener("click", function(){ test(); });



class ControlPanel{            //          console.log(" = " + );
	constructor (utl){
		this.gameInPlay;
		this.gameSerNbr;
		this.gameType;
		this.playerArray = [];
		this.utl = utl;
		this.playerNbr = 0;
		this.playerLineUp;
	}

	init(){
        console.log("CP.init TOP"  );
		this.playerArray = [];
		this.addEventListeners();
        console.log("CP.init BOTTOM" + this.utl )
	}

	addPlayerLineUp(playerLineUp){
		this.playerLineUp = playerLineUp;

	}

	

	addEventListeners(){
		console.log("CP.addEventListeners TOP" );//getElementById()
		let el = document.getElementById("butReg");
         console.log("el.value = " + el.value );
          console.log("butReg != null = " + (el != null) );
		if(el != null)el.addEventListener("click", function(){
			regPlayers();
		});
          console.log("(butReg != null) = " + ((el != null)) )
		el = document.getElementById("butStart");
        console.log("butStart = " + el.value);
		if(el != null)el.addEventListener("click", function(){
			startGame();
		});

      console.log("CP.addEventListeners BOTTOM"  );
	}
		startGame(aRound){
		console.log("CP.startGame TOP " + aRound);
		const dataArray = aRound.split(',');
		//const serNbr = document.getElementById('tbSerNbr').value;
		const serNbr = dataArray[1];
		console.log("startGame() =" + serNbr);
		const gameType = serNbr.charAt(3);
		//At this point download the data
		//const data = sampleRound;
		switch (gameType) {
			case 'M':
				gameM = new GameM(aRound,this,this.utl);
				gameM.init();
			break;
			case 'P':
				gameP = new GameP(aRound,this,this.utl);
				gameP.init();
			break;
			case 'E':
				gameE = new GameE(aRound,this,this.utl);
				gameE.init();
			break;
			case 'U':
				gameU = new GameU(aRound,this,this.utl);
				gameU.init();
			break;

			default:
			console.log("GameType " + gameType + " not yet implemented.");//console.log(" =" + );
		}
		console.log("CP.startGame BOTTOM ");
	}


	regPlayer(player){
		console.log("CP.regPlayers TOP ");
		this.playerArray.push(player);
		console.log("CP.regPlayers BOTTOM ");
	}

}


class PlayerLineUp{

	constructor (cp,utl){
		this.players = [];
		this.pNbr = 0;
		this.pMax;////	           console.log("  "  );
	}

	changePlayer(){
		this.pNbr++;
		if(this.pNbr >this.pMax)this.pNbr = 0; 

	}

	setPNbr(n){
		this.pNbr = n;
	}

	getPlayerUpName(){
		const player= this.players[this.pNbr].name;
	}

	addToPlayerScore(pNbr,points){
		this.players[pNbr].addToScore(Number(points));
	}

	init(){
     console.log("PlayerLineUp init() "  );

	}

	addPlayer(player){
		this.players.push(player);
		this.pMax++;
	}

	logPlayerScore(pNbr,score){
		this.players[pNbr].logScore(score);

	}

	getPlayerScore(n){
		return this.players[n].score;
	}


	setPlayerDisplay(){

	}

	getStatusLine(){
		const nbrOfPlayers = playerArray.length;
		const buf = `The game being played serNbr is ${this.gameSerNbr}.  There are ${nbrOfPlayers} players with scores as follows:`;
		for(let i = 0 ;i < nbrOfPlayers;i++){
			buf+= playerArray[i].getStatus();//          console.log(" = " + );
		}
		return buf;
	}

}




class Utl{//Utility Class
	constructor (){
		this.selected ="style='background-color:#DC143C'";
		this.notSelected = "style='background-color:aquamarine'";
	}
	init(){

	}
	sayHellow(){
      console.log("Utl.sayHellow()"  );
	}

	getMixArrayOfNumbers(n){//creates an array of numbers and then mixes them up
		const array = [];
		for (let i = 0;i<n;i++){
			array.push(i);
		}
		for (let i = n - 1; i > 0; i--) { 
			const j = Math.floor(Math.random() * (i + 1)); 
			[array[i], array[j]] = [array[j],array[i]]; 
		}
	return array;
	}
	//mixUpArray(  getArrayOfNumbers(n,prefix,sufix)

	mixUpArray(array){
		//console.log("Utl.mixUpArray.array TOP = " + array);
		const n = array.length;
		for (let i = n - 1; i > 0; i--) { 
			const j = Math.floor(Math.random() * (i + 1)); 
			[array[i], array[j]] = [array[j],array[i]]; 
		}
		//console.log("Utl.mixUpArray.array BOTTOM= " + array);
	return array;
	}

	getArrayOfNumbers(n,prefix,sufix){//Returns a list of numbers Example 1,2,3,4,5 with the prefix or sufix. Empty just returns the numbers
		const array = [];
		for (let i = 0;i<n;i++){
			array.push(prefix + i + sufix);
		}
		return array;
	}
}

class Player{//#P
	constructor (pInfo){
		const pInfoArray = pInfo.split(',');
		this.name = pInfoArray[0];
		this.gradeLev = pInfoArray[1]
		this.zip = pInfoArray[2];
		this.score = 0.0;
		this.log = [];
	}

	getName(){
		return thisname;

	}

	getScore(){
		return this.score;
	}

	displayLog(){
      console.log("Game Log: " +  this.log );

	}


	
	logScore(score){//serNbrQuestionScore
		this.log.push(serNbrQuestionScore);

	}

	addToScore(amt){
		this.score+=amt;
	}
	getStatus(){
		const buf = `There `;

	}

	sumScoreToDate(){
		const str = `${this.name} = ${getScore()} `;
		return str;

	}

}



class Game{
	constructor (round,cp,utl){//         console.log(" =" + );
		console.log("Game.constructor TOP"  );
		this.round = round;
		this.cp = cp;
		this.utl = utl;
		this.question;
		this.reference;
		this.gameParm;
		this.gameData;
		this.parmMap;
		this.trysPerPlayer = 3;//Default for now
		this.ptAwd = 100;//default
		this.ptAwdInc = 2;;
		this.rows;
		this.cols;
		this.gameInPlay = "ABC";
		this.gameType = 'Z';
		this.nbrOfInsrtPts;
		this.nbrOfButs = 0;
		this.insrtIdArray = [];
		this.singlePlayer = true;
		console.log("Game.constructor BOTTOM"  );
	}

	init(){
		console.log("Game init TOP ***************" );//    console.log(" =" + );
		//console.log("Game init TO utl  =" + this.utl.sayHellow());
		this.resetPage();
		this.breakOutRound();
		this.mapTheParms();
		this.insertTheQuestion();
		if(this.rows != null){
			this.nbrOfInsrtPts = this.rows*this.cols;
			for (let i = 0;i<this.rows;i++){
				for (let j = 0;j<this.cols;j++){
					this.insrtIdArray.push(i + ':' + j);
				}
			}
		}
		document.getElementById('ptAwd').value = this.ptAwd;
		this.nbrOfButs = this.nbrOfInsrtPts;
		console.log("Game init BOTTOM this.gameInPlay= " + this.gameInPlay + "this.nbrOfButs = " + this.nbrOfButs);
	}

	roundOver(){
		console.log("Game.roundOver() Top" );

	}

	
	gameOver(){
		console.log("Game.gameOver Top" );

	}

	helloWorld(){
		console.log("Game.helloWorld" );
		this.testA();
	}

	testA(){
		console.log("Game.Test" );

	}


	endPlay(){
        console.log("Game.endPlay Top" );
        console.log("Game.endPlay Bottom" );
	}

	insertTheQuestion(){
		document.getElementById('question').value = this.question;
	}
	
	resetPage(){
		document.getElementById('question').value = "";
		document.getElementById('ptAwd').value = this.ptAwd;
	}

	insertQuestion(str){
		document.getElementById('question').value = str;
	}

	awdPoints(amt){
		console.log("awdPoints TOP amt=" + amt);

		const n = document.getElementById('ptAwd').value;
		document.getElementById('ptAwd').value = amt + 0;
		console.log("awdPoints BOTTOM amt=" + amt);
	}

	breakOutRound(){
		console.log("Game.breakOutRound TOP"  );
		const gameInput = this.round.split(',');//console.log(" =" + );
		const roundCount = gameInput.length;
		//This is to remove the training commas
		for (let i = roundCount-1; i--; i > 20){
			if(gameInput[i].length == 0){
				gameInput.pop();
			}else{
				break;
			}
		}
		this.question  = gameInput[17];
		console.log("this.question =" + this.question);
		this.reference = gameInput[18];
		this.gameParm  = gameInput[19];
		this.gameData  = gameInput.slice(20,gameInput.length-1);
		console.log("Game.breakOutRound BOTTOM"  );
	}

	mapTheParms(){
		console.log("mapTheParms() TOP");
		const parms = this.gameParm.split(' ');
		this.parmMap = new Map();

		for (let i = 0;i < parms.length; i++){
			const twoParts = parms[i].split('=');
			this.parmMap.set(twoParts[0],twoParts[1]);//console.log("  = " +  );
		}
		//Break out the often used rows and cols as numbers
		this.rows = Number(this.parmMap.get('Rows'))
		this.cols = Number(this.parmMap.get('Cols'))
		console.log("mapTheParms() BOTTOM");
	}
	



}//Bottom of Game

class BoxGame extends Game{//console.log(" =" + ); console.log(" TOP"  );
	constructor (round,cp,utl){
		console.log("BoxGame.constructor TOP"  );
		super (round,cp,utl);
		this.nbrOfButs = 0;
		this.insrtId = [];
		this.insrtPtArray = [];
		this.butArray = [];
		this.trysLeft;
		console.log("BoxGame.constructor BOTTOM"  );
	}
	
	init(){
		console.log("BoxGame.init TOP"  );
		//console.log("BoxGame init TO utl  =" + this.utl.sayHellow());
		super.init();
		this.nbrOfBut = this.rows * this.cols;
		this.trysLeft = this.trysPerPlayer;
		this.createInsrtIds();
		this.createGrid();
		this.createInsrtPtArray();
		this.loadButtonsIntoGrid(this.gameType);//
		document.getElementById('trys').value = this.trysPerPlayer;
		console.log("BoxGame.init BOTTOM"  );
	}

	gameOver(){
		console.log("BoxGame.gameOver Top" );

	}

	createInsrtIds(){
		for (let i = 0;i<this.rows;i++){
			for (let j = 0;j<this.cols;j++){
				this.insrtId.push(i + ":" + j);
			}
		}
		console.log("this.insrtId"  + this.insrtId );
	}

	createInsrtPtArray(){//This is where we create the insert points for  buttons, images etc
		const nodeList = document.getElementsByClassName('gridInsrtPt');
		this.insrtPtArray = Array.prototype.slice.call(nodeList);
	}

	helloWorld(){
		console.log("BoxGame.helloWorld" );
		super.helloWorld();
	}

	testA(){
		console.log("BoxGame.Test" );
	}

	//Create insertion points which can be addressed with DOM class "insrtPt"
	createGrid(){
		console.log("BoxGrid.createGrid()  TOP ");

		let buf = "<table border='5' background'#CCFFFF' >";   //width="100%"//console.log("  = " +  );
		let n = 0;
		for (let i = 0;i<this.rows;i++){
			buf+="<tr >";
			for (let j = 0;j<this.cols;j++){
				const rc =  i + ":" + j;//This is the insrtPt ID row:col example-  0:0 , 4:4 
				buf+=`<td  ><div style='background-color:aquamarine'  style='text-align:center'         class='gridInsrtPt' id='${this.insrtId[n++]}'>`;	
				buf+= "</div><center>----------------------------</center></td>";
			}
		}
		buf+="</tr>";
		buf+="</table>";
		const el = document.getElementById("gamePlayArea");//From page layout
		el.innerHTML = el.innerHTML + buf;
		
		
		console.log("BoxGrid.createGrid()  BOTTOM ");
	}


	removeGridItems(){
		console.log("BoxGame.GridItems TOP " + this.nbrOfInsrtPts.length);
		const nodeList = document.getElementsByClassName('gridInsrtPt');//console.log(" = " + );
		this.insrtPtArray = Array.prototype.slice.call(nodeList);
		for (let i = 0;i<thisnbrOfInsrtPts;i++){
			this.insrtPtArray[i].innerHTML = "";
		}
	}

	//Gather up the button that have not been eliminated
	getUnHitButtons(){
        console.log("BoxGame.getUnHitButtons TOP "  );
		//const nodeList = document.getElementsByClassName('but');//                      console.log(" = " + );
		//const butArray = Array.prototype.slice.call(nodeList);
		const newList = [];
		for (let i = 0;i<this.butArray.length;i++){
			if(this.butArray[i].hidden='true'){//These are the one's left standing'
				const name = this.butArray[i].name;
                console.log("name = " + name);
				newList.push(name);
			}
		}
        console.log("newList = " + newList);
		console.log("BoxGame.getUnHitButtons BOTTOM "  );
	}
	
	
	//Put the data from gameData into the boxes [buttons] and insert them into the insrtPts
	//createAndInsertButtonsIntoInsrtPts
	loadButtonsIntoGrid(gameType){//BoxGane
		console.log("BoxGame.loadButtonsIntoGrid TOP this.nbrOfButs= " + this.nbrOfButs  + " this.gameType " + this.gameType);
	

		for (let i = 0;i<this.nbrOfButs;i++){//Place the button with the same id as the insrtPt
			const id = this.insrtId[i];
			const inputStr = `<input type='button' id='but${id}' class='but' name='Xname' value='Xvalue' style='background-color:aquamarine;' >`;

			this.insrtPtArray[i].innerHTML = inputStr;//            This is where we create the button

			const el = document.getElementById('but'+ id);
			this.butArray.push(el);//                               This is where create butArray
			

		}
		console.log("BoxGame.loadButtonsIntoGrid  bottom butArray.length =" +  this.butArray.length + " this.butArray[0].value= "   +   this.butArray[0].value);//         console.log("   " +  );
	}

	

	fillButtons(list){//List is an Array
		console.log("BoxGame.replaceButtonText TOP "  );

		const nodeList = document.getElementsByClassName('but');//     console.log(" = " + );
		const buttonArray = Array.prototype.slice.call(nodeList);
		//const nbrOfButs = buttonArray.length;
		console.log("buttonArray = " + buttonArray);
		const nbrOfItemsInList = list.length;
		console.log("nbrOfItemsInList = " + nbrOfItemsInList);
		let n = nbrOfItemsInList;
		if(nbrOfItemsInList > this.nbrOfButs){n = this.nbrOfButs;}
		for (let i = 0;i<n;i++){
			buttonArray[i].value=`<center>'${list[i]}</center>`;
		}
        console.log("BoxGame.replaceButtonText BOTTOM "  );
	}

	hideShowBlankAllButtons(hideShowBlank){//
        console.log("BoxGame.hideAllButtons TOP " + hideShowBlank );
	    const nodeList = document.getElementsByClassName('but');//              console.log(" = " + );
		this.buttonArray = Array.prototype.slice.call(nodeList);
		for (let i = 0;i<this.buttonArray.length;i++){
			if(hideShowBlank === 'hide'){
				this.buttonArray[i].hidden=true;
			}else if(hideShowBlank === 'show'){
				this.buttonArray[i].hidden=false;
			}else if(hideShowBlank === 'blank'){
				this.buttonArray[i].value='';
			}
		}
        console.log("BoxGame.hideAllButtons BOTTOM "  );
	}

	



}//Bottom of BoxGame



class GameM extends BoxGame{//console.log(" =" + );
	constructor (round,cp,utl){
		console.log("GameM.constructor TOP"  );
		super (round,cp,utl);
		this.utl = utl;
		this.inputArray;
		this.ptInc = 0;
		this.firstHit=true
		this.gameInPlay = "gameM";
		this.gameType = 'M';
		this.arrayOfRemainingButs = [];
		this.dataPointMarker = 0;//Seta a marker in input data for each slice
		console.log("GameM.constructor BOTTOM"  );
	}
	init(){
		console.log("GameM.init TOP"  );
		super.init();

		//this.createGrid();
		//this.loadButtonsIntoGrid();
		this.loadButtonValues();
		console.log("GameM.init BOTTOM "  +  this.gameInPlay);//        console.log("GameM. "  + )
	}

	helloWorld(){
	console.log("GameM.helloWorld" );
		super.helloWorld();
	}

	resetButs(){
       console.log("GameM.resetButs Top " );


       console.log("GameM.resetButs Bottom"  );
	}

	getUnHiddenButs(){//After the play, this retrieves the buttons that have not been played so that they can be played again
       console.log("GameM.getUnHiddenButs Top "  + this.arrayOfRemainingButs);
		this.arrayOfRemainingButs.length = 0;
		for (let i = 0;i<this.nbrOfInsrtPts;i++){
			const id = this.insrtIdArray[i];
			const el = document.getElementById('but' + id);
			if(el.value != '||'){//they havn't been played'
				this.arrayOfRemainingButs.push(el.value + ',' + el.name);
			}
		}
		return this.arrayOfRemainingButs;	
	}

	endPlay(){
		console.log("GameM.endPlay() Top"   )
		//super endPlay();
		this.arrayOfRemainingButs = this.getUnHiddenButs();
		this.loadButtonValues();
      console.log("GameM.endPlay() Bottom"   )
	}

	butHit(butID){
		console.log("GameM.butHit  TOP " + butID   );
		const butThatWasHit = document.getElementById(butID);
		if(butThatWasHit.value == '||') return;
		const value = butThatWasHit.value;//main
		const butName = butThatWasHit.name;//main;Maine
        console.log("GameM.butHit  TOP  butID=  " + butID + " value= " + value + " name= " + butName);
		switch (this.gameType) {
			case 'M':
				if(this.firstHit == true){//firstHit
					this.firstButID = butID;
					setButtonAsSelected(butID);
					this.hitTarget = value;
					this.firstHit = false;
				}else{//firstHit is false
					this.firstHit = true;//reset it
					const pairArray = butName.split(';');
					if(this.hitTarget == pairArray[0] || this.hitTarget == pairArray[1]){
						//console.log("success ");
						this.ptInc+=2;
						this.awdPoints(this.ptInc)
						document.getElementById(this.firstButID).value='||';
						document.getElementById(this.firstButID).style='background-color:aquamarine';
						document.getElementById(butID).value='||';
					}else{
						//console.log("failure ");
						this.firstHit = true;
						this.endPlay();
						showButton(this.firstButID);
					}							
				}
				console.log("bottom of switch ");
				break;
				default:
				console.log("GameType " + gameType + " not yet implemented.");//console.log(" =" + );
		} 
		console.log("GameM.butHit  Bottom "   );
	} 
//                                                   console.log("GameM. TOP "  );
	
	loadButtonValues(){//GameM
		console.log("GameM.loadButtonValues TOP this.nbrOfButs=  " +  this.nbrOfButs );
		//const rows = this.rows;
		//console.log("rows = " + this.rows)

		const nbrOfButsToFill = this.nbrOfButs;
		//If we have items left over from the last play, they are in this.arrayOfRemainingButs
		//But remember,each data item fill two buttons example 12 - 4 = 8 buttons, but only 4 data item

		let nbrOfDataItemsToGet  = this.nbrOfButsToFill/2;
	   
		if(this.arrayOfRemainingButs != null){
			nbrOfDataItemsToGet = (nbrOfButsToFill - this.arrayOfRemainingButs.length)/2
		}
		

		const gridLocs = [];//Make this a one only calc
		for (let i = 0;i<this.rows;i++){
			for (let j = 0;j<this.cols;j++){
				gridLocs.push(i+':'+j);//we end up wiht 0:0,0:1,0:2...
			}
		}

		console.log("nbrOfDataItemsToGet = " + nbrOfDataItemsToGet);
		const inputDataArray = this.gameData.slice(this.dataPointMarker,(this.dataPointMarker + nbrOfDataItemsToGet));//Each data item will have two buttons auricle;oracle,colonel;kernel,sleight;slight
		this.dataPointMarker +=nbrOfDataItemsToGet;
		const arrayOfNamesAndValues = this.arrayOfRemainingButs;//These lool like auricle,auricle;oracle, colonel,colonel;kernel... from getUnHiddenButs()


		//Where as i = 1/2 the item from the Game input. the output is twice that amount
		//because each item create two buttons to be paired
		
		for (let i = 0;i<nbrOfDataItemsToGet;i++){ 
			const arrayOfParts = inputDataArray[i].split(';');//auricle;oracle
			//The arangement is to have the value the same as the first part of the name. This helps in gathering the non played items   
			arrayOfNamesAndValues.push(arrayOfParts[0] + ',' + arrayOfParts[0] + ';' + arrayOfParts[1]);//auricl,auricle;oracle 
			arrayOfNamesAndValues.push(arrayOfParts[1] + ',' + arrayOfParts[1] + ';' + arrayOfParts[0]);//oracle,oracle;auricle;
		}
		console.log("AAarrayOfNamesAndValues = " + arrayOfNamesAndValues)

		const mixedArray = this.utl.mixUpArray(arrayOfNamesAndValues);

		console.log("BBarrayOfNamesAndValues = " + arrayOfNamesAndValues)

		//const butArray = document.getElementsByClassName("but");//Get the buttons to fill

		console.log("nbrOfButsToFill =" +  nbrOfButsToFill);


		for (let i = 0;i<nbrOfButsToFill;i++){
			const inputItem = this.arrayOfRemainingButs.pop();//Takes "oracle,oracle;auricle"
			const newArray = inputItem.split(',');			
			const aBut = this.butArray[i]; 
			aBut.name = newArray[1]; //auricle;oracle
			aBut.value = newArray[0];//auricle
			aBut.addEventListener("click", function(){
						gameM.butHit('but' + id); 
					});
			//At this point all the buttons are loades with different values and the pairs are either part1 or part2
		}
		console.log("GameM.loadButtonValues BOTTOM "  );
		
	}	
}


class GameP extends BoxGame{//console.log(" =" + );
	constructor (round,cp,utl){
		console.log("GameP.constructor TOP"  );
		super (round,cp,utl);
		this.utl = utl;
		this.inputArray;
		this.ptInc = 0;
		this.gameInPlay = "gameP";
		this.gameType = 'P';
		this.targRight = 0;
		this.correctHitCount = 0;
		this.hitArray =[];
		console.log("GameM.constructor BOTTOM"  );
	}
	init(){
		console.log("GameP.init TOP"  );
		super.init();
		this.loadButtonValues();
		//document.getElementById('ptAwd').value = this.ptAwd;
		console.log("GameP.init BOTTOM "  +  this.gameInPlay);//        console.log("GameM. "  + )
	}

	start(){		

	}

	gameOver(){
		console.log("GameP.gameOver Top" );

	}
	changePlayers(){
		console.log("GameP.changePlayers Top" );
	}

	testA(){
		console.log("GameP.Test" );
	}

	playOver(success){
		console.log("GameP playOver() Top this.trysLeft= "  +  this.trysLeft  + " success= " + success);
		if(success){
			this.gameOver();
			return;
		}
		if(!this.singlePlayerl){
			this.changePlayers();
		}else{
			this.trysLeft--;
			console.log("GameP.playOver this.trysLeft" + this.trysLeft);S
			if(this.trysLeft == 0){
				this.roundOver();
				this.showAnswers();
			}else{
				let pts = document.getElementById('ptAwd').value;
				console.log("AApts =" + pts);
				document.getElementById('trys').value = this.trysLeft;
				pts = Math.trunc(pts/2);//We half each time
				console.log("BBpts =" + pts);
				document.getElementById('ptAwd').value = pts;
			}
		}
		console.log("GameP playOver() Bottom this.trysLeft= "  +  this.trysLeft );

	}

	showAnswers(){
		console.log("GameP showAnswers()) Top"     );
		for (let i = 0;i<this.hitArray.length;i++){
			showButton(this.hitArray[i])
		}
	}	

	resetButs(){
		console.log("GameP resetButs top "     );
		this.trysLeft = this.trysPerPlayer;
		this.correctHitCount = 0;
		for (let i = 0;i<this.hitArray.length;i++){
			const el =	document.getElementById(this.hitArray[i]);
			el.value= el.name.slice(2);
			setButtonAsNotSelected(this.hitArray[i]);
		}
		this.hitArray = [];
		console.log("GameP resetButs Bottom "     )
	}
	
	//           console.log(" ");


	butHit(butID){
        console.log("GameP.butHit  TOP " + butID  );
		const butThatWasHit = document.getElementById(butID);
        console.log("GameP.butHit  TOP " + butThatWasHit + "   " + butThatWasHit.name);
        
		//if(butThatWasHit.value == '||') return;
		this.hitArray.push(butID);
		const butName = butThatWasHit.name;//R or W

		if(butName.charAt(0) === 'W'){
			console.log("GameP Got it wrong "     );
			this.resetButs();
			this.playOver(false);
			return;
		}else{
			this.correctHitCount++;
			setButtonAsSelected(butID);
		}

		if(this.correctHitCount == this.targRight){
			console.log("GameP success ");
			this.playOver(true);	
		}
	
		console.log("GameP.butHit  Bottom correctHitCount= "  +  this.correctHitCount);
	} 



	loadButtonValues(){//GameP
		console.log("GameP.loadButtonValues TOP this.nbrOfButs=  " +  this.nbrOfButs);
		const mixedArray = this.utl.mixUpArray(this.gameData);

		for (let i = 0;i<this.nbrOfButs;i++){ 
			const RW = this.gameData[i].charAt(0);//R-Saturn,R-Earth,W-Despina,W-Titania,
			if(RW === 'R'){this.targRight++};
			this.butArray[i].name = this.gameData[i];
			this.butArray[i].value = this.gameData[i].slice(2);
			this.butArray[i].addEventListener("click", function(){
						gameP.butHit('but' + id); 
					});
		}		
		console.log("GameP.loadButtonValues BOTTOM targRight= "  + this.targRight);
		
	}

	helloWorld(){
	console.log("GameP.helloWorld" );
		super.helloWorld();
	}
}

//xxx
//xyz


//ABCDE



class GameE extends BoxGame{//console.log(" =" + );
	constructor (round,cp,utl){
		console.log("GameE.constructor TOP"  );
		super (round,cp,utl);
		this.utl = utl;
		this.inputArray;
		this.ptInc = 0;
		//this.firstHit=true
		this.gameInPlay = "gameE";
		this.gameType = 'E';
		this.targRight = 0;
		this.correctHitCount = 0;
		this.hitArray =[];
		console.log("GameE.constructor BOTTOM"  );
	}
	init(){
		console.log("GameE.init TOP"  );
		super.init();
		this.loadButtonValues();
		//document.getElementById('ptAwd').value = this.ptAwd;
		console.log("GameE.init BOTTOM "  +  this.gameInPlay);//        console.log("GameE. "  + )
	}

	//const el = document.getElementById('ptAwd').value = this.ptAwd;
	
	loadButtonValues(){//GameE
		console.log("GameE.loadButtonValues TOP this.nbrOfButs=  " +  this.nbrOfButs);
		const mixedArray = this.utl.mixUpArray(this.gameData);


		for (let i = 0;i<this.rows;i++){ //For GameE, the exception is always the first item.
			console.log("$$$$$$$$$$$ this.butArray[i]= " + this.butArray[i].value + "   " + this.gameData[i]);
			const theLine = this.gameData[i].split(';');
			//console.log("GameE. "  + theLine);
			const newArray = [];
			newArray.push('R-'+theLine[0]);
			for (let j = 1;j<this.cols;j++){
				newArray.push('W-'+theLine[j]);
			}
			//console.log("GameE.newArray "  + newArray);
			const mixedArray =	this.utl.mixUpArray(newArray);
			//console.log("GameE.mixedArray "  + mixedArray);

			for (let j = 0;j<this.cols;j++){
				const butID = 'but'+i+':'+j;
				console.log("GameE.butID "  + butID);
				const el = document.getElementById(butID);

				el.name = mixedArray[j];
				el.value = mixedArray[j].slice(2);
				el.addEventListener("click", function(){
						gameE.butHit(butID); 
					});

			}
;
         console.log("BBthis.this.butArray[i].value = " + this.butArray[i].value)
		}		
		console.log("GameE.loadButtonValues BOTTOM targRight= "  + this.targRight);		
	}

	butHit(butID){
		console.log("GameE.butHit  TOP " + butID   );
		const butThatWasHit = document.getElementById(butID);//but0:0
		const value = butThatWasHit.value;                        console.log("GameE.value "  + value);
		if(value == '||') return;
		const idPart = butID.charAt(3);                                  console.log("GameE.idPart "  + idPart);
		const idArray = idPart.split(':');                        console.log("GameE.idArray "  + idArray);
		const theRow = idArray[0];                                console.log("GameE.theRow "  + theRow);
		const butName = butThatWasHit.name;                       console.log("GameE.butName "  + butName)
		if(butName.charAt(0) === 'R'){                                                    
			console.log("Sucess" );
		    for (let j = 0;j<this.cols;j++){ 
				const butID = 'but' + theRow + ':' + j;
																console.log("GameE.butID "  + butID)
				const aBut = document.getElementById(butID);//but0:0
				aBut.value = '||';
			}

		}else{
		                                                          console.log("Failure" )
		}
		
        console.log("GameE.butHit  TOP  butID=  " + butID + " value= " + value + " name= " + butName);
	
	}
}

class GameU extends BoxGame{//console.log(" =" + );
	constructor (round,cp,utl){
		console.log("GameU.constructor TOP"  );
		super (round,cp,utl);
		this.utl = utl;
		this.inputArray;
		this.ptInc = 0;
		//this.firstHit=true
		this.gameInPlay = "gameU";
		this.gameType = 'U';
		this.colToBeHit = 0;
		this.correctHitCount = 0;
		this.butHitArray =[];
		this.hitArray = [];
		console.log("GameU.constructor BOTTOM"  );
	}
	init(){
		console.log("GameU.init TOP"  );
		super.init();
		this.loadButtonValues();
		//document.getElementById('ptAwd').value = this.ptAwd;
		console.log("GameU.init BOTTOM "  +  this.gameInPlay);//        console.log("GameU. "  + )
	}

	//const el = document.getElementById('ptAwd').value = this.ptAwd;
	
	loadButtonValues(){//GameU
		console.log("GameU.loadButtonValues TOP this.nbrOfButs=  " +  this.nbrOfButs);
		const mixedArray = this.utl.mixUpArray(this.gameData);
		const dataForThisGame = mixedArray.slice(0,this.rows);               console.log("GameU.dataForThisGame "  + dataForThisGame);
		const bigRowArray = [];
		const bigColArray = [];
		for (let i = 0;i<this.cols;i++){
			const aCol = [];
			bigColArray.push(aCol);
		}
		for (let i = 0;i<this.rows;i++){
			const rowArray = mixedArray[i].split(';');
			for (let j = 0;j<this.cols;j++){
				const str = i + "-" + rowArray[j];               console.log("GameU.str "  + str);
				bigColArray[j].push(str);
			}
		}
		const mixedColArray = [];
		for (let i = 0;i<this.cols;i++){
            console.log("AAGameU.bigColArray[i] "  + bigColArray[i]);
			mixedColArray[i] = this.utl.mixUpArray(bigColArray[i]);
            console.log("BBGameU.bigColArray[i] "  + bigColArray[i]);
		}
		
		
		// 0-The meek,0-Many are called,0-The wolf,0-It is better 4 rows the first col in each


		//Now put them in the buttons by col
		for (let i = 0;i<this.cols;i++){

			const datCol = mixedColArray[i];//console.log("GameU.datCol "  + datCol);//0-Render therefore,0-Man,0-The last,0-Get thee
			for (let j = 0;j<this.rows;j++){//but0:0 =
				const butID = 'but'+j+':'+ i;
				const el =	document.getElementById(butID);
				//el.value = datCol[j].slice(2);
				el.value = datCol[j];
				el.name = datCol[j];;
				el.addEventListener("click", function(){
						gameU.butHit(butID); 
				});
			}

		}
		
         //console.log("BBthis.this.butArray[i].value = " + this.butArray[i].value)
				
		console.log("GameU.loadButtonValues BOTTOM targRight= "  + this.targRight);		
	}




	butHit(butID){
		console.log("GameU.butHit  TOP " + butID   );//but0:0 
		const butThatWasHit = document.getElementById(butID);//but0:0
		if(butThatWasHit.value == '||') return;
		const name = butThatWasHit.name;                        console.log("GameU.name "  + name);
		const ii = butID.indexOf(':');                                 console.log("GameU.ii "  + ii);

		const colHit = butID.charAt(ii+1,10);                                  console.log("GameU.colHit "  + colHit);

		if(colHit != this.colToBeHit){
			alert("You need to click on the columns in order Left to Right");
			return;
		}else{
			this.hitArray.push(name.charAt(0));       console.log("GameU.this.hitArray "  + this.hitArray);//0-The meek 
			this.butHitArray.push(butID);             console.log("GameU.this.butHitArray "  + this.butHitArray);//So we can reset them
		}


		if(colHit == this.colToBeHit){
			this.colToBeHit++;
			console.log("Eval "  + this.hitArray);
			let passed = true;
			const firstCol  = this.hitArray[0];
			for (let i = 1;i<this.hitArray.length;i++){
				if(firstCol != this.hitArray[i]){
					passed = false;
				}
			}
			if(passed){
               console.log("GameU.awdPoints ");

			   for (let i = 0;i<this.cols;i++){
				    
			   }
			}

		}else{
			const rowNbr = butThatWasHit.name.charAt(0);
			this.hitArray.push(rowNbr);
		}

	
	}
}


class AlphaBar{
	constructor (){             //console.log("GameU.this.butHitArray "  + this.butHitArray);//So we can reset them
		this.ansLstIndex;
		this.ansLst;
	}

	init(alet){
		if(deBug)console.log("abp init top  " )
		this.createAlphaButtonPanel();//console.log("abp init  "  + alet);	
		this.addSelectionListener();
		this.downloadAnsLst();
		if(deBug)console.log("abp init bottom  " );
	}

	addSelectionListener(){
		if(deBug)console.log("abp addSelectionListener top  " )
		const el = document.getElementById('aBarDropDownMenu');
		el.addEventListener('onselectionchange', function() {
			const theAns = el.value;
			console.log('theAns = ' + theAns);
		});


		
	}

	clearTheAnsLst(el){//		if(deBug)console.log("abp loadDropDownMenu top  " );
		const nbrOfItems = el.options.length - 1;
		for(let i = nbrOfItems; i >= 0; i--) {
			el.remove(i);
		}
	}

	loadLstIntoDropDown(ltr){//The index looks like this:",A 2 13,B 15 11,C 26 15," Ltr Start position Nbr of items
		const el = document.getElementById('aBarDropDownMenu');
		this.clearTheAnsLst(el);
		const indexNbrs = ltr.charCodeAt(0) -65;
		const xx = this.ansLstIndex[indexNbrs];
		const thePointer = xx.split(' ');
		const startPnt = Number(thePointer[1]-2);
		const numberOfItems = Number(thePointer[2]);
		if(deBug)console.log("abp numberOfItems=  " + numberOfItems);
		const alphaAnsLst = [];
		if(numberOfItems > 0){
			const endPoint = (startPnt + numberOfItems);
			
			for (let i = startPnt;i<endPoint;i++){	
				alphaAnsLst.push(this.ansLst[i]);
			}
		}else{
			alphaAnsLst.push("No answer for letter " + ltr);
		}
		
		console.log("abp  alphaAnsLst "  + alphaAnsLst);

		const nbrOfItems = el.length;
		console.log("abp  AAnbrOfItems " + nbrOfItems);

		for (var i = 0; i<alphaAnsLst.length; i++){
			var opt = document.createElement('option');
			opt.value = alphaAnsLst[i];
			opt.innerHTML = alphaAnsLst[i];
			el.appendChild(opt);
		console.log("abp BB nbrOfItems " + nbrOfItems);		}

	}

	getTextFromServer(filePath){
		let data = '';
		fetch('http://localhost/' + filePath)//		console.log("abp   " + );
	  .then(response => response.text())
	  .then((data) => {
		console.log(data)
	  })
	  return data;
	}

	
	//This gets the whole set of answers and devides the text file into  this.ansLstIndex and this.ansLst
	//For the time being, using sampleAnsLst
	downloadAnsLst(){
		//console.log("abp loadDropDownMenu top  " );
		const data = sampleAnsLst;
		const twoParts = data.split('|');//Note this need to be changed
		const header = twoParts[0].split(',');
		this.ansLstIndex = header.slice(5);
		this.ansLst = twoParts[1].split(',');
		//console.log("abp  this.ansLst "  +this.ansLst );
	}

	checkAnswer(selAns){
	 if(deBug)console.log("abp checkAnswer top  " + selAns);



	}


	createButtonEventListeners(){
		if(deBug)console.log("abp loadDropDownMenu top  " );
		for (let i = 0;i<26;i++){
			const aLtr = String.fromCharCode(65 + i);
			const butLtr = 'but' + aLtr;
			const el = document.getElementById(butLtr);//style="background-color:LightCoral"
			el.addEventListener('click', function() {
				console.log('Button clicked!');
				abp.loadLstIntoDropDown(aLtr);
			});

		}
		const butABPsub = document.getElementById('butABPSubmit');
			butABPsub.addEventListener('click', function() {
				const selection = document.getElementById('aBarDropDownMenu').value;
				console.log('Button butABPSubmit clicked!' + selection);
				abp.checkAnswer(selection);
			});

		if(deBug)console.log("abp loadDropDownMenu bottom  " );
	}


	createAlphaButtonPanel(){//el.innerHTML = el.innerHTML + buf;
		const insrtPt = document.getElementById('alphaBarInsrtPt');//el.innerHTML = el.innerHTML + buf;
		let buf = "<input type='button' id='butABPSubmit' name='butSubmit' value='Submit Answer>>'>";
		buf+= "<select name='aBarDropDown' id='aBarDropDownMenu' value='Select Answer'>";
		insrtPt.innerHTML = insrtPt.innerHTML + buf;
		for (let i = 0;i<26;i++){
			const aLtr = String.fromCharCode(65 + i);
			const butLtr = 'but' + aLtr;
			const str  = `<input type='button' id='${butLtr}' class='alphaBut' name='' value='${aLtr}' style='background-color:aquamarine;' >`;	
			//console.log("abp str  "  + str);
			insrtPt.innerHTML = insrtPt.innerHTML + str;
		}
		this.createButtonEventListeners();//This does not work if inside the for loop
	}

	//				 

}




//*********************************************************************************************************

//GameM BOTTOM

//NOTE:  Put the data in the div name forget about box CSV style

//On pairs, put the paired word in the button name

//use pop and push etc to get rounds and parts of data 

	           

let gameM = null;//	           console.log("  "  );
let gameP =null;
let gameE = null;//	           console.log("  "  );
let gameU =null;

function alphaButHit(butLtr){
	   console.log(" alphaButHit "   + butLtr);
	

}

//	   console.log("  "  );

document.getElementById('butStart').addEventListener("click", function(){ 
	console.log(" XXX "  );
	startGame(); 

});


let abp = null;
let deBug = true;


function test(){
    console.log("test TOP"  );//http://edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Cu/US/Co/Qu/St/NH/NH.EE.jpg
	//const aa = gameM.getMixArrayOfNumbers(12);
	abp = new AlphaBar();
	abp.init();
	const testABut = document.getElementById('testA');
	testABut.addEventListener('click', function() {
		console.log('Button clicked!');
		testA("this is test");
	});

	const testBBut = document.getElementById('testA');
	testBBut.addEventListener('click', function() {
		console.log('Button clicked!');
		testB("this is test");
	});
}

function testB(str){	
	console.log("testB  "  + str);


}

function testA(str){	
	console.log("testA  "  + str);
	const el = document.getElementById('aBarDropDownMenu');
	console.log(document.getElementById('aBarDropDownMenu').value);
	console.log("aa" + el.value);
/*
	el.addEventListener("selectionchange", () => {
	  console.log('testAselectionchange' + el.value);
	});
*/
	
	el.addEventListener("selectionchange", function(){
		const theSelection = el.value;
		console.log("theSelection===  " +  theSelection );
	}) 
	
}

function startGame(){//AA.Men00021
	console.log("function startGame() TOP"  );
	//const testArray = ['one','two','three','four'];
	//console.log(" testArray = " + testArray);
	const utl = new Utl();
	utl.init();

	const cp = new ControlPanel(utl);
	cp.init();
	const plu = new PlayerLineUp(cp,utl);
	plu.init();
	const p0 = new Player("Pete,16,94066");
	cp.regPlayer(p0);
	plu.addPlayer(p0);
	const p1 = new Player("Joe,12,91234");
	cp.regPlayer(p1);
	plu.addPlayer(p1);
	cp.startGame(sampleRound);
	console.log("function startGame() BOTTOM"  );
	plu.addToPlayerScore(0,27);
	const ss = plu.getPlayerScore(0);
	console.log(" plu.getPlayerScore() " + ss);
}

function disableButton(butID){
	const but = document.getElementById(butID);
	but.disabled = true;
}
function enbleButton(butID){
	const but = document.getElementById(butID);
	but.disabled = false;
}


function setButtonAsSelected(butID){
	const but = document.getElementById(butID);//"background-color:aquamarine;";
	but.style="background-color:LightCoral";
	but.disabled = true;
}

function setButtonAsNotSelected(butID){
	const but = document.getElementById(butID);
	but.disabled = false;
	but.style="background-color:aquamarine";

}




function hideButton(butID){
	const but = document.getElementById(butID);
	but.hidden=true;
}

function showButton(butID){
	const but = document.getElementById(butID);
	but.style="background-color:aquamarine;";
	but.hidden=false;
}









//3456789012345678901234567890123456789012345678901234567890








	
	