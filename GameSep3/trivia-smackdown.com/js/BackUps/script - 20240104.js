'use strict';

// JavaScript source code
console.log('This is the Top');

//const theButton = document.getElementById("butTest");

//console.log('This is the Button' + theButton);

//theButton.addEventListener("click", console.log('buttonClicked'));  AA.Uen00027  AA.Qen00003
//http://edugames.com/cgi-bin/GetRounds.pl?AA.Qen00009
//http://edugames.com/cgi-bin/GetRounds.pl?AA.Uen00027
//http://edugames.com/DataBase/A65AA65A/ResLibry/Pi/Th/Cu/US/Co/Qu/St/NH/NH.EE.jpg

//<img src="../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/Pi/Pe/Le/Po/US/Pr/20PopPres/20PopPresRP.jpg" width="576" height="512" alt="" title="" />
const fileBase = "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry";
//lPRA1 5,6/8/99,2:45 PM,Copyright 1999 by Peter Antoniak, 196,A 2 13,B 15 11,C 26 15,D 41 9,E 50 3,F 53 3,G 56 2,H 58 10,I 68 6,J 74 4,K 78 6,L 84 12,M 96 21,N 117 13,O 130 10,P 140 12,Q 152 0,R 152 5,S 157 20,T 177 10,U 187 1,V 188 2,W 190 6,X 196 0,Y 196 0,Z 196 0, Akron Alabama Alaska Albany Anaheim Annapolis Ardmore Arizona Arkansas Atlanta Atlantic City Augusta Austin Baltimore Baton Rouge Benton Harbor Bethlehem Birhamington Bismark Boise Boston Boynton Beach Buffalo Burlingame California Carmel Carson City Charleston Cheyenne Chicago Cincinnati Clementon Cleveland Colma Colorado Columbia Columbus Concord Connecticut Daily City Dallas Delaware Denver Des Moines Detroit District of Columbia Dover Dublin East Rutherford Edmond Englewood Florida Fort Worth Frankfort Georgia Green Bay Harrisburg Hartford Hawaii Helena Highland Park Hilton Head Island Honolulu Hot Springs Houston Hutchinson Idaho Illinois Indiana Indianapolis Iowa Iwo Jima-Memorial Jackson Jefferson City Juneau Jupiter Kansas Kansas Kansas City Kentucky Kiamesha Lake Knasas City Lancaster Lansing Las Vegas Lemont Ligonier Lincoln Lincoln-Memorial Little Rock Long Island Los Altos Los Angeles Louisiana Madison Madison Mahan Hall at US Naval Academy Maine Mamaroneck Maryland Massachusetts Memphis Miami Miami Beach Michigan Milwaukee Minneapolis Minnesota Mississippi Missouri Montana Montgomery Montpelier Morgan Hills Mt View Nashville Nebraska Nevada New Hampshire New Jersey New Mexico New Orleans New York City New York State Newark North Carolina North Dakota North Palm Beach Oak Brook Oakland Oakmont Ohio Oklahoma City Oklahoma State Olympia Orange County Oregon Orlando Pacific Palasades Palm Springs Palo Alto Pebble Beach Pennsylvania Philadelphia Phoenix Pierre Pinehurst Pittsburgh Portland Providence Raleigh Rhode Island Richmond Rochester Rushmore-Mt. Sacramento Saint Louis Saint Paul Salem Salt Lake City San Antonio San Bruno San Diego San Francisco San Jose San Mateo San%20Bruno Sante Fe Scarsdale Seattle Shoal Creek South Carolina South Dakota Southampton Springfield Tacoma Tallahassee Tampa Tecumseh-Statue at US Naval Academy Tennessee Texas Toledo Topeka Trenton Tulsa Utah Vermont Virginia Washington Washington-DC West Virginia Wichita Wisconsin Wyoming

function getFile(fileData){
	console.log("getFile" + fileData);//}P.AA.Pi.Ge.No.No.Ma.General-1.QJ.gif
	const temp = fileData.slice(6,fileData.length);
	console.log("temp" + temp);
	const str = "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/" + temp;
	return str;
}

const sampleRound = ",AA.Qen00009,EdUGames tm,20030110,10,EvWa LoPoCo,Hi,,HiMaBa,battles,,aPRA1_190 zPRA1_15,,,,,Wars/Battles,Answer these questions about Battles.,^AA.DCL.E,Rows=6 Cols=1 FntSize=9 FntColor=black BkGndColor=white LnCnt=4 SingleScreen=No Sort=Yes ,AnswerType=RowsOfButtons AnsRows=5 AnsCols=2 AnsLnCnt=1 AnsFntSize=18 AnsFntColor=blue AnsBkGndColor=white Answers=Bull Run;Chancellorsville;Concord;Lexington;lwo Jima;Manila Bay;New Orleans;Saratoga;Trafalgar;Yorktown;Bull Run;Chancellorsville;Concord;Lexington;lwo Jima;Manila Bay;New Orleans;Saratoga;Trafalgar;Yorktown,What was the last battle of the War of 1812?What was the last battle of the War of 1812?What was the last battle of the War of 1812?What was the last battle of the War of 1812?;^AA.DCL.A.255113;New Orleans,What famous American Battle took place two weeks after the signing of the peace treaty that ended the war?;^AA.DCL.A.255113;New Orleans,The famous Life Magazine photo of Marines raising the Flag in the middle combat was from what battle?;^AA.DCL.A.269023;lwo Jima,What was the first battle in the Civil War?;^AA.DCL.A.239013;Bull Run,Paul Revere's famous ride proceeded what two famous battles?;^AA.DCL.A.247023;Lexington,The quote You may fire when ready Gridley came from what battle?;^AA.DCL.A.281093;Manila Bay,What famous battle did Benedict Arnold win?;^AA.DCL.A.252042;Saratoga,The Battle of Concord happened in conjunction what other famous battle?;^AA.DCL.A.247023;Lexington,Stonewall Jackson was killed just after what famous battle?;^AA.DCL.A.239072;Chancellorsville,General Burgoyne lost what famous battle to Benedict Arnold?;^AA.DCL.A.252042;Saratoga,Ralph Waldo Emerson's rude bridge that arched the flood was about what famous battle?;^AA.DCL.A.247023;Concord,In what battle did General Cornwallis surrender to General Washington?;^AA.DCL.A.257083;Yorktown,What was the last battle of the American Revolution?;^AA.DCL.A.257083;Yorktown,What battle in the American Revolution is considered to be the turning point of the war?;^AA.DCL.A.252042;Saratoga,Admiral Horatio Nelson died in what famous battle?;^AA.DCL.A.227073;Trafalgar,The Battle of Lexington happened in conjunction what other famous battle?;^AA.DCL.A.247023;Concord,,";

//const sampleAnsDisplay =  "AnswerType=TransparentButtons Image=}P.AA.Pi.Ge.As.Ne.HolyLandBNTCities.IL.jpg Answers={H-1black 003322052019 Gaza;{H-1black 185249031123 Dead Sea;{H-1black 118293068019 Dead Sea;{H-1black 199232055014 Jericho;{H-1black 085255071017 Bethlehem;{H-1black 070237087017 Jerusalem;{H-1black 109223061013 Bethany;{H-1black 083202050022 Bethel;{H-1black 107165053019 Sychar;{H-1black 206075010157 Jordan River;{H-1black 216133045029 Jordan River;{H-1black 092124060020 Antipatris;{H-1black 093109060014 Caesarea;{H-1black 096089051019 Emmaus;{H-1black 172076034017 Nain;{H-1black 099062060022 Nazareth;{H-1black 160059052018 Magdala;{H-1black 240083044027 Sea of Galilee;{H-1black 208043017032 Sea of Galilee;{H-1black 226049059022 Geraseme;{H-1black 117044039015 Cana;{H-1black 141032064013 Capernaum;{H-1black 161022057010 Chorazin;{H-1black 205028015011 Chorazin;{H-1black 225026059019 Bethsaida;{H-1black 116013046018 Tyre;{H-1black 123001051015 Sidon;{H-1black 191002090024 Caesarea Philippi;{H-1black 003151073077 Mediterranean Sea;{H-1black 003004092153 Mediterranean Sea;{H-1black 002225050092 Mediterranean Sea";
//const sampleRound =",AA.Qen00027,Ed-U-Games tm,20061016,10,ThWrReBiOT,ReBiOT, AsWeIL,ReBiOT,bible;old testament;cities,}B.AA.Bu.Lo.Po.Ci.HolyLandCitiesAndWaters.BL.csv,aPRA1_155 lPRA1_15 dPRA1_30 zPRA1_30,,,,,Bible/OT/Places,Answer the Questions about places in the Bible.,,Rows=6 Cols=1 FntSize=12 FntColor=black BkGndColor=white LnCnt=5 SingleScreen=No Sort=No ,}B.AA.Bu.Lo.Po.Ci.HolyLandCitiesAndWaters.BL.csv,Nathanael: a disciple of Jesus: was from what city?;John 21:2;Cana,The 'City Of David' is also known by what name?;Luke 2:4;Bethlehem,Where was Jesus when he turned water into wine?;John 2:1-11;Cana,Where was Simon the leper`s house located?;Matthew 26:6;Bethany,Jesus walked on what body of water?;Matthew 14:22-34;Sea of Galilee,Where was Jesus when he performed his first miracle?;John 2:1-11;Cana,Peter: Andrew: and Philip were all from the same city. What city was this?;John 1:44;Bethsaida,Where was Peter and Andrew's fishing business centered?;Mark 1:21-29;Capernaum,Where did the casting out of demons in Mark 1:23-27 happen?;Mark 1:23-27;Capernaum,Where dis Jesus proclaim: 'Repent: for the Kingdom of heaven is at hand.'?;Matthew 4:12-18:He had left Nazareth and went to Capernaum where he started his Ministry.;Capernaum,Near what city was Jesus when Zacchaeus climbed a tree?;Luke 19:1-4;Jericho,In Mark 1:21: Jesus sometimes taught at the Synagogue in what city?;Mark 1:21;Capernaum,,,,,,,";

//const sampleRound =",AA.Qen00021,Ed-U-Games tm,20060630,9,ThWrReBi,ReBi,,ReBi,,}B.AA.Bu.Pe.Re.Bi.PeopleOfBible36A.BL.csv,aPRA1_310 lPRA1_15 zPRA1_30,,,,,Religion/Bible,Answer the questions about bible Characters.,The Bible,Rows=6 Cols=1 FntSize=12 FntColor=black BkGndColor=white LnCnt=5 SingleScreen=No Sort=Yes ,}B.AA.Bu.Pe.Re.Bi.PeopleOfBible36A.BL.csv,Which prophet served during the reigns of - Uzziah: Jotham: Ahaz and Hezekiah?;Hosea 1:1;Hosea,Who asked Jesus: 'how oft shall my brother sin against me: and I forgive him?';Matthew 18:21;Peter,Who was the man who built a city and named it after the name of his son: Enoch?;Genesis 4:17;Cain,Who sent poisonous snakes among the Israelites when they complained about food?;Numbers 21:5-9;God,Which profit did God tell marry an adulteress in order to emphasize his prophecy?;Hosea 1:2;Hosea,Who asked of Jesus 'Hearest thou not how many things they witness against thee?';Matthew 27:13.14;Pilate,Who: as she prayed in the temple for a son:was thought to be drunk by the priest?;1 Samuel 1:13.14;Hannah,Which prophet prophesied that Jesus would be betrayed for thirty pieces of silver?;Zechariah 11:12.13;Zechariah,Who surprised a Pharisee when he ate dinner at his house and did not wash his hands?;Luke 11:37.38;Jesus,What prophet executed the prophets of Baal after God consumed his offering with fire?;1 Kings 18:40;Elijah,What prophet executed the prophets of Baal after God consumed his offering with fire?;1 Kings 18:40;Elijah,Which of the prophets sent his servant seven times to look for the clouds in the sky?;1 Kings 18:42-44;Elijah,What King sent for Sarah to take her as his wife: believing she was Abraham's sister?;Genesis 20:1-3;Abimelech,The third time the risen Jesus appeared to his disciples: who first recognized Jesus?;John 21:7;John,Who was heavy hearted and displeased because Naboth refused to sell him his vineyard?;1 Kings 21:2-4;Ahab,Who asked God not to destroy Sodom and Gomorrah if righteous men could be found there?;Genesis 18:20-24;Abraham,Who said 'My house is the house of prayer': but you have made it...' a den of thieves?;Luke 19:46;Jesus,In 2 Kings 9:33: who was thrown out of a palace window and trampled to death by horses?;2 Kings 9:33;Jezebel,God remembered Rachel: and opened her womb. What did she call the baby when he was born?;Genesis 30:22-24;Joseph,In 1 Samuel 2:27-34: a prophet told who that both of his sons would die on the same day?;1 Samuel 2:27-34;Eli,Who cut into pieces the vessels of gold which Solomon had made in the temple of the Lord?;2 Kings 24:13;Nebuchadnezzar,Spies sent into Jericho by Joshua were discovered: but escaped when they were hidden by...;Joshua 2:1-7;Rahab,Laban had two daughters: the name of the elder was Leah: and the name of the younger was...;Genesis 29:16;Rachel,In 1 Samuel 31:8-10: who did the Philistines fastened to a wall after they found him dead.;1 Samuel 31:8-10;Saul,Who said 'This is now bone of my bones: and flesh of my flesh: she shall be called Woman'?.;Genesis 2:23;Adam,In Joshua 2:1: who hid the two spies that went to spy out the land and the city of Jericho?;Joshua 2:1;Rahab,Who was the woman that led the women of Israel out in a dance when they crossed the Red Sea?;Exodus 15:20;Miriam,Who prophesied of Jesus' crucifixion that: 'they shall look upon me whom they have pierced?';Zechariah 12:10;Zechariah,Michal: Saul's daughter: loved a man to whom her sister Merab was promised. Who was that man?;1 Samuel 18:20;David,,,,,,,,,,,,,,,";


//const sampleAnsDisplay  = "AnswerType=RowsOfButtons AnsRows=12 AnsCols=3 AnsLnCnt=1 AnsFntSize=14 AnsFntColor=blue AnsBkGndColor=yellow Answers=Aaron;Isaac;Miriam;Abimelech;Isaiah;Moses;Abraham;Jacob;Nebuchadnezzar;Adam;James;Nehemiah;Ahab;Jesus;Paul;Cain;Jezebel;Peter;David;John;Pilate;Eli;John The Baptist;Rachel;Elijah;Joseph;Rahab;God;Joshua;Saul;Hannah;Mary Magdalene;Solomon;Hosea;Michal;Zechariah;";
//AA.Qen00015 PeopleOfBible36A

//const BillOfRights = "AnswerType=RowsOfButtons AnsRows=5 AnsCols=2 AnsLnCnt=1 AnsFntSize=18 AnsFntColor=blue AnsBkGndColor=yellow Answers=Amendment I;Amendment VI;Amendment II;Amendment VII;Amendment III;Amendment VIII;Amendment IV;Amendment IX;Amendment V;Amendment X;";
//AA.Qen00034

//const ComposerTypeNbrMovementWork_E.BL.csv = "AnswerType=ScrollBoxes ScrollListFontSize=12.21.40.63.15 Answers=Composer:Beethoven:Gottschalk:Gounod:Grainger:Grieg:Haydn:Holst:Humperdinck:Mendelssohn:Mozart:Meyerbeer:Offenbach:Pachelbel:Puccini:Rachmaninoff:Ravel:Respighi:Rossini:Saint Saens:Schubert:Schumann:Sibelius:Sousa:Strauss-Richard:Sullivan:Suppe:Tchaikovsky:Verdi:Wagner:Weber:;What is the Type of Work?:Bagatelle:Ballet:Canon:Dance:Impromptu:Incidental Music:March:Opera:Overture:Piano Concerto:Rondo:Serenade:Suite:Symphony:Tarantella:Tone Poem:Violin Concerto:;What is the Number of this work?:1:2:3:4:5:6:7:8:9,39,40,41,94,96,100,101,Unfinished:;What is the Movement of this work?:1:2:3:4:5:;Name:1812:A Midsummer Nights Dream:Aida:Also Sprach Zarathustra:Ancient Airs And Dances:Ave Maria:Bamboula:Barber Of Seville:Bolero:Canon In D:Country Gardens:Das Rheingold:Der Freisch:Die Meistersinger:Eine Kleine Nachtmusik:Faust:Finlandia:Flying Dutchman:Four Impromptus Opus 90:Four Impromptus Opus 91:Four Impromptus Opus 92:Four Impromptus Opus 93:Four Impromptus Opus 94:Funeral March Of Marionette:Fur Elise:Grand Tarantelle:Hands Across The Sea:Hansel And Gretel:Havanaise:HMS Pinafore:Holberg Suite:Il Trovatore:Il Turco In Italia:Introduction And Rondo Capriccioso:Invitation To The Dance:Io lanthe:Karelia Suite:King Cotton:La belle Helene:La Boheme:La Donna EMobile:La Forza Del Destino:La Traviata:Le prophete:Liberty Bell March:Light Cavalry:Lohengrin:Madama Butterfly:Marche Slave:Nabucco:Nutcracker:Oberon:Orpheus In The Underworld:Peer Gynt:Pirates Of Penzance:Poet And Peasant:Prometh:Ride Of The Valkyries:Rienzi:Romeo And Juliet:Rondo In A:Rosamunde:Ruy Blas:Samson and Dalila:Semiramide:Semper Fidelis:Siegfried Idyll:Swan Lake:Tannhouser:The Banjo:The Barber of Seville:The Carnival of the Animals:The Hebrides:The Mikado:The Nutcracker:The Pirates Of Penzance:The Planets:The Sleeping Beauty:The Stars And Stripes Forever:The Tales of Hoffmann:The Thunderer:The Washington Post:Thieving Magpies:Wellingtons Victory:William Tell;";
//AA.Qen00146

//const USBlockStatesWWashington-DC = "AnswerType=TransparentButtons Image=}P.AA.Pi.Ge.No.No.US.QM.USABlockWithNames.ZN-b.jpg Answers={H-1black 012279092099 Alaska;{H-1black 524241043056 Alabama;{H-1black 433219053051 Arkansas;{H-1black 154210070079 Arizona;{H-1black 012130060063 California;{H-1black 042192056043 California;{H-1black 059222091051 California;{H-1black 230148099062 Colorado;{H-1black 741158086019 Connecticut;{H-1black 733127027015 Connecticut;{H-1black 731202067017 Delaware;{H-1black 701170019022 Delaware;{H-1black 536300087023 Florida;{H-1black 598320048061 Florida;{H-1black 570240031061 Georgia;{H-1black 600272025029 Georgia;{H-1black 171305097062 Hawaii;{H-1black 409104077047 Iowa;{H-1black 116083082046 Idaho;{H-1black 115007036077 Idaho;{H-1black 491124042076 Illinois;{H-1black 534134039057 Indiana;{H-1black 330162095044 Kansas;{H-1black 508190097026 Kentucky;{H-1black 442269035051 Louisiana;{H-1black 476299032026 Louisiana;{H-1black 778104054031 Massachusetts;{H-1black 735118043012 Massachusetts;{H-1black 720222091020 Maryland;{H-1black 770031060073 Maine;{H-1black 555065050067 Michigan;{H-1black 506036062028 Michigan;{H-1black 404007060097 Minnesota;{H-1black 425151070067 Missouri;{H-1black 480240045060 Mississippi;{H-1black 152007146071 Montana;{H-1black 599215099024 North Carolina;{H-1black 300005101056 North Dakota;{H-1black 300113109032 Nebraska;{H-1black 330143084017 Nebraska;{H-1black 704032069028 New Hampshire;{H-1black 749071024046 New Hampshire;{H-1black 741178067022 New Jersey;{H-1black 711138018034 New Jersey;{H-1black 228210086077 New Mexico;{H-1black 074130083062 Nevada;{H-1black 102188054034 Nevada;{H-1black 658077072053 New York;{H-1black 575131057045 Ohio;{H-1black 361210070043 Oklahoma;{H-1black 008064108066 Oregon;{H-1black 632129078042 Pennsylvania;{H-1black 767135064023 Rhode Island;{H-1black 602238074037 South Carolina;{H-1black 300063103050 South Dakota;{H-1black 492216106024 Tennessee;{H-1black 316253119122 Texas;{H-1black 315219049034 Texas;{H-1black 267286048041 Texas;{H-1black 157147070061 Utah;{H-1black 158130045017 Utah;{H-1black 606197084017 Virginia;{H-1black 655175034025 Virginia;{H-1black 730078018041 Vermont;{H-1black 006005106060 Washington;{H-1black 465064065047 Wisconsin;{H-1black 467043043024 Wisconsin;{H-1black 605176062022 West Virginia;{H-1black 199078099070 Wyoming;{H-1black 715243100020 Washington DC";
//AA.Qen00457

//const Cities = "AnswerType=TransparentButtons Image=}P.AA.Pi.Ge.No.No.US.Ma.CityButtonList.NK.gif Answers=H-1Black 053020047009 Spokane;H-1Black 023027031008 Seattle;H-1Black 113046028008 Butte;H-1Black 023058050008 Portland;H-1Black 024170052007 San Jose;H-1Black 024076043009 Eugene;H-1Black 096079021007 Boise;H-1Black 206031037007 Bismarck;H-1Black 235051044009 Minneapolis;H-1Black 172068025009 Pierre;H-1Black 221077043007 Sioux Falls;H-1Black 270086045007 Milwaukee;H-1Black 245092035007 Madison;H-1Black 274100037008 Chicago;H-1Black 100126065008 Salt Lake City;H-1Black 058136025008 Reno;H-1Black 038147059008 Sacramento;H-1Black 019155072008 San Francisco;H-1Black 081180050008 Las Vegas;H-1Black 048195054008 Bakersfield;H-1Black 121192040010 Flagstaff;H-1Black 055216061008 Los Angeles;H-1Black 123217055009 Albuquerque;H-1Black 062227051010 San Diego;H-1Black 097240042009 Phoenix;H-1Black 097252036010 Tucson;H-1Black 143247036008 El Paso;H-1Black 155144036011 Denver;H-1Black 139157071010 Colorado Springs;H-1Black 230115048009 Des Moines;H-1Black 293075061009 Grand Rapids;H-1Black 365072049010 Syracuse;H-1Black 398079047010 Portland;H-1Black 341085037008 Buffalo;H-1Black 321088027009 Detroit;H-1Black 332110050011 Pittsburgh;H-1Black 366095042010 Albany;H-1Black 396103041009 Boston;H-1Black 381112045009 Hartford;H-1Black 370122047008 New York;H-1Black 304137047007 Columbus;H-1Black 227136031009 Omaha;H-1Black 224153049011 Kansas City;H-1Black 285147035011 Dayton;H-1Black 219166031010 Topeka;H-1Black 210182028008 Wichita;H-1Black 262195042008 Nashville;H-1Black 283207042009 Knoxville;H-1Black 370132044008 Newark;H-1Black 362143061008 Philadelphia;H-1Black 349153047008 Baltimore;H-1Black 355162051008 Annapolis;H-1Black 342169056009 Washington;H-1Black 332181049010 Richmond;H-1Black 327201047012 Charlotte;H-1Black 268228033012 Atlanta;H-1Black 337235053009 Charleston;H-1Black 326251049011 Savannah;H-1Black 188232058012 Oklahoma City;H-1Black 211244043008 Little Rock;H-1Black 227256034008 Jackson;H-1Black 264257054011 Montgomery;H-1Black 319272058012 Jacksonville;H-1Black 325304041008 Orlando;H-1Black 254283056011 New Orleans;H-1Black 215267024008 Dallas;H-1Black 190278025009 Austin;H-1Black 218289033009 Houston;H-1Black 193301051009 San Antonio;H-1Black 267316064010 St. Petersburg;H-1Black 326331034009 Miami";
//AA.Qen00005

//const States = "AnswerType=TransparentButtons Image=}P.AA.Pi.Ge.No.No.US.MA.General-2.JF.gif Answers=H-1Black 199118022031 Alabama;H-1Black 050154022022 Alaska;H-1Black 042105039047 Arizona;H-1Black 158109024028 Arkansas;H-1Black 000056043081 California:The Golden State;H-1Black 084075035033 Colorado;H-1Black 275045012012 Connecticut;H-1Black 279069012014 Delaware;H-1Black 223149043041 Florida;H-1Black 218116030033 Georgia;H-1Black 008137028025 Hawaii;H-1Black 036029034037 Idaho;H-1Black 175063021038 Illinois;H-1Black 197065016031 Indiana;H-1Black 148056027024 Iowa;H-1Black 118085041024 Kansas;H-1Black 193089038015 Kentucky;H-1Black 162138021027 Louisiana;H-1Black 280004019030 Maine;H-1Black 247068022012 Maryland;H-1Black 274033019012 Massachusetts;H-1Black 197034025031 Michigan;H-1Black 145013021043 Minnesota;H-1Black 182119017042 Mississippi;H-1Black 155081025030 Missouri;H-1Black 056012053031 Montana;H-1Black 099061048024 Nebraska;H-1Black 023059028045 Nevada;H-1Black 277022012018 New Hampshire;H-1Black 266056012012 New Jersey;H-1Black 079108033040 New Mexico;H-1Black 240034034020 New York;H-1Black 231095045016 North Carolina;H-1Black 108014037024 North Dakota;H-1Black 212064022022 Ohio;H-1Black 124109038022 Oklahoma;H-1Black 001027041030 Oregon;H-1Black 236055029015 Pennsylvania;H-1Black 284050012012 Rhode Island;H-1Black 232112027016 South Carolina;H-1Black 107039040022 South Dakota;H-1Black 182104048014 Tennessee;H-1Black 101131059063 Texas;H-1Black 052066032041 Utah;H-1Black 266023012017 Vermont;H-1Black 242080027015 Virginia;H-1Black 006001041027 Washington;H-1Black 231073013021 West Virginia;H-1Black 166029026033 Wisconsin;H-1Black 073044035031 Wyoming;H-1Black 275110037020 Washington-DC";
//AA.Qen00004

//const PresidentsAsOf2020onA6X8MatrixWithNames = "AnswerType=GridOnImage Image=}P.AA.Pi.Pe.Le.Po.US.Pr.Presidents6X8WithNames.ZT.jpg AnsRows=6 AnsCols=8 Answers=-;-;-;-;Trump;Obama;Bush W;Clinton;Bush G;Reagan;Carter;Ford;Nixon;Johnson L;Kennedy;Eisenhower;Truman;Roosevelt F;Hoover;Coolidge;Harding;Wilson;Taft;Roosevelt T;McKinley;Harrison B;Cleveland;Arthur;Garfield;Hayes;Grant;Johnson A;Lincoln;Buchanan;Pierce;Fillmore;Taylor;Polk;Tyler;Harrison W;Van Buren;Jackson;Adams J Q;Monroe;Madison;Jefferson;Adams J;Washington;";
//AA.Qen00008

//const sampleAnsDisplay ="AnswerType=TransparentButtons Image=}P.AA.Pi.Th.Sy.Ta.PeriodicTblofElements.MH.gif Answers=H-1Black 011028022021 Hydrogen (H);H-1Black 385027022019 Helium (He);H-1Black 012050022021 Lithium (Li);H-1Black 033049022021 Beryllium (Be);H-1Black 275050022021 Boron (B);H-1Black 297050022021 Carbon (C);H-1Black 319050022021 Nitrogen (N);H-1Black 341050022021 Oxygen (O);H-1Black 363050022021 Fluorine (F);H-1Black 384050022021 Neon (Ne);H-1Black 012072022020 Sodium (Na);H-1Black 033072022021 Magnesium (Mg);H-1Black 275073022021 Aluminum (Al);H-1Black 298072022021 Silicon (Si);H-1Black 319072022021 Phosphorus (P);H-1Black 341072022021 Sulphur (S);H-1Black 363071022021 Chlorine (Cl);H-1Black 385071022021 Argon (Ar);H-1Black 012094022021 Potassium (K);H-1Black 033094022021 Calcium (Ca);H-1Black 055094022021 Scandium (Sc);H-1Black 077094022021 Titanium (Ti);H-1Black 099094022021 Vanadium (V);H-1Black 121094022021 Chromium (Cr);H-1Black 143094022021 Manganese (Mn);H-1Black 165094022021 Iron (Fe);H-1Black 187093022021 Cobalt (Co);H-1Black 208094022022 Nickel (Ni);H-1Black 231094022021 Copper (Cu);H-1Black 253094022021 Zinc (Zn);H-1Black 275095022021 Gallium (Ga);H-1Black 297095022021 Germanium (Ge);H-1Black 320094022021 Arsenic (As);H-1Black 341093022021 Selenium (Se);H-1Black 363094022021 Bromine (Br);H-1Black 385094022021 Krypton (Kr);H-1Black 012115022021 Rubidium (Rb);H-1Black 033116022021 Strontium (Sr);H-1Black 055115022021 Yttrium (Y);H-1Black 077116022021 Zirconium (Zr);H-1Black 099116022021 Niobium (Nb);H-1Black 121116022021 Molybdenum (Mo);H-1Black 143116022021 Technetium (Tc);H-1Black 165116022021 Ruthenium (Ru);H-1Black 187116022021 Rhodium (Rh);H-1Black 209116022021 Palladium (Pd);H-1Black 231116022021 Silver (Ag);H-1Black 253116022021 Cadmium (Cd);H-1Black 275117020021 Indium (In);H-1Black 297117021022 Tin (Sn);H-1Black 319117022021 Antimony (Sb);H-1Black 342116022021 Tellurium (Te);H-1Black 363116022021 Iodine (I);H-1Black 384116022021 Xenon (Xe);H-1Black 011137022021 Cesium (Cs);H-1Black 033138022021 Barium (Ba);H-1Black 055138022021 Lanthanum (La);H-1Black 099197021021 Cerium (Ce);H-1Black 121197022022 Praseodymium (Pr);H-1Black 143196022021 Neodymium (Nd);H-1Black 165197022021 Promethium (Pm);H-1Black 187196022021 Samarium (Sm);H-1Black 209197022022 Europium (Eu);H-1Black 232197022021 Gadolinium (Gd);H-1Black 254197022021 Terbium (Tb);H-1Black 276196022023 Dysprosium (Dy);H-1Black 299197022021 Holmium (Ho);H-1Black 319197022021 Erbium (Er);H-1Black 341197022021 Thulium (Tm);H-1Black 363197022021 Ytterbium (Yb);H-1Black 384197022018 Lutetium (Lu);H-1Black 077138022021 Hafnium (Hf);H-1Black 099138022021 Tantalum (Ta);H-1Black 121138022021 Tungsten (W);H-1Black 143138022021 Rhenium (Re);H-1Black 165138022021 Osmium (Os);H-1Black 187138022021 Iridium (Ir);H-1Black 209138022021 Platinum (Pt);H-1Black 231137022021 Gold (Au);H-1Black 253137022021 Mercury (Hg);H-1Black 275138022021 Thallium (Ti);H-1Black 297138022021 Lead (Pb);H-1Black 319139020021 Bismuth (Bi);H-1Black 341139020022 Polonium (Po);H-1Black 364138022021 Astatine (At);H-1Black 385138022021 Radon (Rn);H-1Black 011160022021 Francium (Fr);H-1Black 033160022021 Radium (Ra);H-1Black 055159022021 Actinium (Ac);H-1Black 099223020021 Thorium (Th);H-1Black 121222022021 Protactinium (Pa);H-1Black 143223021021 Uranium (U);H-1Black 165222022021 Neptunium (Np);H-1Black 187222022021 Plutonium (Pu);H-1Black 208222022023 Americium (Am);H-1Black 233222022021 Curium (Cm);H-1Black 254222022021 Berkelium (Bk);H-1Black 276223021023 Californium (Cf);H-1Black 300223020021 Einsteinium (Es);H-1Black 321222022021 Fermium (Fm);H-1Black 342222022021 Mendelevium (Md);H-1Black 363222022021 Nobelium (No);H-1Black 385223020016 Lawrencium (LR)";
//PeriodicTblOfElements
//const sampleRound = ",AA.Qen00003,EdUGames tm,20020807,11,ThMi,ScCh,,SiFa,science;elements,}B.AA.Bu.Th.Ba.El.PeriodicTblOfElements.BL.csv,aPRA1_130 lPRA1_5 zPRA1_15,,,,,Science/Chemistry,Answer these questions about the Elements.(Image Grid),,Rows=6 Cols=1 FntSize=9 FntColor=black BkGndColor=white LnCnt=4 SingleScreen=No Sort=Yes ,}B.AA.Bu.Th.Ba.El.PeriodicTblOfElements.BL.csv,What are the two elements in table salt?;^AA.DCL.A.46306;Sodium (Na);Chlorine (Cl),What is the major gas in air?;;Nitrogen (N),An isotope of this element is often used to date dead things:;;Carbon (C),A Single molecule of this element and oxygen forms a colorless-odorless gas that is often fatal to humans:;;Carbon (C),What element did Marie Curie discover?;;Radium (Ra),What is named after the person who developed the General Theories of Relativity?;;Einsteinium (Es),Water is composed of what two elements?;;Hydrogen (H);Oxygen (O),What element combines to form Helium in a fusion reaction?;;Hydrogen (H),What element doomed the Hindenburg?;;Hydrogen (H),What is the most abundant element in the Universe?;;Hydrogen (H),What element shares a name with the closest planet to the sun?;;Mercury (Hg),The Ozone Layer is composed of what element?;;Oxygen (O),The 235 isotope of this element is used in making energy:;;Uranium (U),,,,";

//const sampleAnsLst = "lPRA1 5,6/8/99,2:45 PM,Copyright 1999 by Peter Antoniak, 196,A 2 13,B 15 11,C 26 15,D 41 9,E 50 3,F 53 3,G 56 2,H 58 10,I 68 6,J 74 4,K 78 6,L 84 12,M 96 21,N 117 13,O 130 10,P 140 12,Q 152 0,R 152 5,S 157 20,T 177 10,U 187 1,V 188 2,W 190 6,X 196 0,Y 196 0,Z 196 0,| Akron,Alabama,Alaska,Albany,Anaheim,Annapolis,Ardmore,Arizona,Arkansas,Atlanta,Atlantic City,Augusta,Austin,Baltimore,Baton Rouge,Benton Harbor,Bethlehem,Birhamington,Bismark,Boise,Boston,Boynton Beach,Buffalo,Burlingame,California,Carmel,Carson City,Charleston,Cheyenne,Chicago,Cincinnati,Clementon,Cleveland,Colma,Colorado,Columbia,Columbus,Concord,Connecticut,Daily City,Dallas,Delaware,Denver,Des Moines,Detroit,District of Columbia,Dover,Dublin,East Rutherford,Edmond,Englewood,Florida,Fort Worth,Frankfort,Georgia,Green Bay,Harrisburg,Hartford,Hawaii,Helena,Highland Park,Hilton Head Island,Honolulu,Hot Springs,Houston,Hutchinson,Idaho,Illinois,Indiana,Indianapolis,Iowa,Iwo Jima-Memorial,Jackson,Jefferson City,Juneau,Jupiter,Kansas,Kansas,Kansas City,Kentucky,Kiamesha Lake,Knasas City,Lancaster,Lansing,Las Vegas,Lemont,Ligonier,Lincoln,Lincoln-Memorial,Little Rock,Long Island,Los Altos,Los Angeles,Louisiana,Madison,Madison,Mahan Hall at US Naval Academy,Maine,Mamaroneck,Maryland,Massachusetts,Memphis,Miami,Miami Beach,Michigan,Milwaukee,Minneapolis,Minnesota,Mississippi,Missouri,Montana,Montgomery,Montpelier,Morgan Hills,Mt View,Nashville,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New Orleans,New York City,New York State,Newark,North Carolina,North Dakota,North Palm Beach,Oak Brook,Oakland,Oakmont,Ohio,Oklahoma City,Oklahoma State,Olympia,Orange County,Oregon,Orlando,Pacific Palasades,Palm Springs,Palo Alto,Pebble Beach,Pennsylvania,Philadelphia,Phoenix,Pierre,Pinehurst,Pittsburgh,Portland,Providence,Raleigh,Rhode Island,Richmond,Rochester,Rushmore-Mt.,Sacramento,Saint Louis,Saint Paul,Salem,Salt Lake City,San Antonio,San Bruno,San Diego,San Francisco,San Jose,San Mateo,San%20Bruno,Sante Fe,Scarsdale,Seattle,Shoal Creek,South Carolina,South Dakota,Southampton,Springfield,Tacoma,Tallahassee,Tampa,Tecumseh-Statue at US Naval Academy,Tennessee,Texas,Toledo,Topeka,Trenton,Tulsa,Utah,Vermont,Virginia,Washington-DC,West Virginia,Wichita,Wisconsin,Wyoming";

//AA.Uen01219 Pair the name with what the person is know for.,SuperQuiz,Rows=8 Cols=2 FntSize=18 FntColor=black BkGndColor=white LnCnt=1 FlushNbr=1 SingleScreen=No Sort=Yes,Jean Paul Getty;Oil tycoon;,Rudolf Nureyev;Ballet dancer;,Kareem Abdul Jabbar;Basketball player;,Mike Bossy;Hockey player;,Al Pacino;Actor;,Lesley Gore;Singer;,Harriet Tubman ;US abolitionist;,Emmett Kelly;Clown;,Julia Child;Chef;,John Paul Jone;Naval hero;,Mel Allen ;Sportscaster;,Martina Navratilova ;Tennis player;,Mort Sahl;Comedian;,Michel Legrand ;Composer;,James Joycs;Author;,Art Buchwald ;Journalist;,Thomas Hobbes ;Philosopher;,Margaret Mead ;Anthropologist;,Etienne Brule ;Explorer;,Alvin York ;Soldier;,Niccolo Machiavelli ;Statesman;,Pancho Villa ;Mexican revolutionary;,Roger Vadi;Movie director;,Clarence Darrow ;Lawyer;,Carl Sandburg ;Poet;,Lauren Hutton ;Model;,Louis Leakey ;Archaeologist;,Arnold Toynbee
//const sampleRound = ",AA.Len00002,EdUGames tm,20020426,9,,,,Te,,}P.AA.Pi.Ge.No.No.Ma.General-1.QJ.gif }P.AA.Pi.Pe.Le.Mi.Ar.Custer-George.ED.gif,aPRA1_60 dPRA1_30 iPRA1_20 oPDF1_5 zPRA1_15,,,,,Army Leaders,Where did this man 'Make the biggest mistake of his life'?,The man is Col. Custer and the biggest mistake of his life was the Battle of Little Bighorn where he and his entire unit was wiped out by Native Americans.,Map=}P.AA.Pi.Ge.No.No.Ma.General-1.QJ.gif Scale=8 Units=Miles Loc=164051,}P.AA.Pi.Pe.Le.Mi.Ar.Custer-George.ED.gif,one,two,three";
//const bxInput ="auricle;oracle,colonel;kernel,sleight;slight,main;Maine,taught;taut,dear;deer,gnu;knew,genes;jeans,right;rite,might;mite,grease;Greece,throes;throws,bell;belle,scene;seen,pail;pale,raise;raze,choral;coral,fisher;fissure,dense;dents,boar;bore,palate;palette,toe;tow,laps;lapse,knows;noes,chews;choose,cense;cents,ware;wear,karat;caret,ewe;yew,for;fore,grate;great,load;lode,adds;ads,step;steppe,stake;steak,wade;weighed,knight;night,frees;freeze,desert;dessert,bloc;block,frays;phrase,road;rode,suite;sweet,rain;reign,capital;capitol,core;corps,coarse;course,bail;bale,fair;fare,tracked;tract,cue;queue,soar;sore,cedar;ceder,beer;bier,ring;wring,one;won,peer;pier,gamble;gambol,loan;lone,serf;surf,made;maid,marshall;martial,better;bettor,sundae;Sunday,tic;tick";
//const bxParm = "Rows=3 Cols=3 FntSize=16 FntColor=blue BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes";

//,AA.Men00021,EdUGames tm,20020802,7,ThLaWoHo ,LaVo,ThWrWo,,words;homonyms;esl,,aPRA1_0 zPRA1_15,,,,,Words/Compound,Pair the Homonyms,,Rows=5 Cols=4 FntSize=16 FntColor=blue BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes ,auricle;oracle,colonel;kernel,sleight;slight,main;Maine,taught;taut,dear;deer,gnu;knew,genes;jeans,right;rite,might;mite,grease;Greece,throes;throws,bell;belle,scene;seen,pail;pale,raise;raze,choral;coral,fisher;fissure,dense;dents,boar;bore,palate;palette,toe;tow,laps;lapse,knows;noes,chews;choose,cense;cents,ware;wear,karat;caret,ewe;yew,for;fore,grate;great,load;lode,adds;ads,step;steppe,stake;steak,wade;weighed,knight;night,frees;freeze,desert;dessert,bloc;block,frays;phrase,road;rode,suite;sweet,rain;reign,capital;capitol,core;corps,coarse;course,bail;bale,fair;fare,tracked;tract,cue;queue,soar;sore,cedar;ceder,beer;bier,ring;wring,one;won,peer;pier,gamble;gambol,loan;lone,serf;surf,made;maid,marshall;martial,better;bettor,sundae;Sunday,tic;tick 
//,AA.Pen00006,EdUGames tm,20020426,9,,,,Te,,,aPRA1_32 zPRA1_15,,,,,[12 Boxes]Numbers,Select the even numbers. Watch how the score increases. Try to Make a mistake or two and press the Check button to see what happens.,,Rows=4 Cols=3 FntSize=36 FntColor=blue BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes ,R-Two,R-Four,W-One,W-Three,W-Five,R-Six,W-Seven,R-Eight,W-Nine,R-Ten,W-Eleven,R-Twelve,,,,,,,,, |
//const sampleRound = ",AA.Oen00001,EdUGames tm,,2,,,,Te,,,aPRA1_0 zPRA1_15 ,,,,,Test/Order,Place the numbers on the LEFT in order on the RIGHT with the largest number on the bottom Make a mistake or two and press the CHECK button to see what happens.,,Rows=8 Cols=1 FntSize=18 FntColor=magenta BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes,One,Two,Three,Four,Five,Six,Seven,Eight,,,,,,,,,,,";
//const sampleRound = ",AA.Men00021,EdUGames tm,20020802,7,ThLaWoHo ,LaVo,ThWrWo,,words;homonyms;esl,,aPRA1_0 zPRA1_15,,,,,Words/Compound,Pair the Homonyms,,Rows=3 Cols=4 FntSize=16 FntColor=blue BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes ,auricle;oracle,colonel;kernel,sleight;slight,main;Maine,taught;taut,dear;deer,gnu;knew,genes;jeans,right;rite,might;mite,grease;Greece,throes;throws,bell;belle,scene;seen,pail;pale,raise;raze,choral;coral,fisher;fissure,dense;dents,boar;bore,palate;palette,toe;tow,laps;lapse,knows;noes,chews;choose,cense;cents,ware;wear,karat;caret,ewe;yew,for;fore,grate;great,load;lode,adds;ads,step;steppe,stake;steak,wade;weighed,knight;night,frees;freeze,desert;dessert,bloc;block,frays;phrase,road;rode,suite;sweet,rain;reign,capital;capitol,core;corps,coarse;course,bail;bale,fair;fare,tracked;tract,cue;queue,soar;sore,cedar;ceder,beer;bier,ring;wring,one;won,peer;pier,gamble;gambol,loan;lone,serf;surf,made;maid,marshall;martial,better;bettor,sundae;Sunday,tic;tick,,,,,,,,,,,,,,,";
//const sampleRound = ",AA.Pen00016,Ed-U-Games tm,20060707,10,ThUn,ScAs,,ScFa,planet;sun;mercury;venus;earth;mars;jupiter;saturn;uranus;neptune;pluto,,aPRA1_70 zPRA1_30,,,,,Science/Astronomy/Solar System,Which are the three inner planets?,,Rows=5 Cols=4 FntSize=20 FntColor=magenta BkGndColor=yellow LnCnt=1 SingleScreen=No Sort=Yes ,W-Mars,W-Sun,R-Mercury,W-Moon,W-Jupiter,R-Venus,W-Saturn,R-Earth,W-Despina,W-Titania,W-Caliban,W-Larissa,W-Stephano,W-Cordelia,W-Sycorax,W-Ganymede,W-Bianca,W-Umbriel,W-Desdemona,W-Ophelia,,,,,";
//const sampleRound = ",AA.Een00002,EdUGames tm,20020501,9.00,,,,Te,,,aPRA1_40 zPRA1_15,,,,,Test/GameE,Select the single letter [No Sort] Multi-Screen No Zones,,Rows=3 Cols=3 FntSize=35 FntColor=blue BkGndColor=yellow LnCnt=1 SingleScreen=No Sort=No ,A;AA;AAA;,B;BB;BBB;,C;CC;CCC;,D;DD;DDD;,E;EE;EEE;,F;FF;FFF;,G;GG;GGG;,H;HH;HHH;,I;II;III;,J;JJ;JJJ;,K;KK;KKK;,L;LL;LLL;,M;MM;MMM;,N;NN;NNN;,O;OO;OOO;,P;PP;PPP;,Q;QQ;QQQ;,R;RR;RRR;,S;SS;SSS;,T;TT;TTT;,U;UU;UUU;,V;VV;VVV;,W;WW;WWW;,X;XX;XXX;,Y;YY;YYY;,Z;ZZ;ZZZ;";
//planet;sun;mercury;venus;earth;mars;jupiter;saturn;uranus;neptune;pluto
//const sampleRound = ",AA.Een00010,EdUGames tm,20021015,10,ThStHi LoPoCo,HiWo GeWo,,,country;historic items,,aPRA1_50 zPRA1_15,,,,,Countries/Historic Things,Pick the one item in each row that is not in the same Country as the others in the row,^AA.DCL.C.332374,Rows=4 Cols=3 FntSize=16 FntColor=blue BkGndColor=yellow LnCnt=1 SingleScreen=No Sort=No ,Taj Mahal:^AA.DCL.A.185153;The Globe Theater:^AA.DCL.A.120022;Saint Paul's Cathedral:^AA.DCL.A.182063;Big Ben:^AA.DCL.A.160023,The Acropolis:^AA.DCL.A.156043;The Holy See:^AA.DCL.A.092133;The Colosseum:^AA.DCL.A.163153;Sistine Chapel:^AA.DCL.A.183023,Great Wall of China:^AA.DCL.A.168103;Maginot Line:^AA.DCL.A.218013;Eiffel Tower:^AA.DCL.A.166013;Cathedral of Chartres:^AA.DCL.A.163043,Sphinx:^AA.DCL.A.183112;The Pentagon:^AA.DCL.A.323052;The Watergate:^AA.DCL.A.284093;Transcontinental Railroad:^AA.DCL.A.283012";
//const sampleRound = ",AA.Uen00045,EdUGames tm,20030103,9,ThWrReBi,Re,,ReBi,bible sayings,,aPRA1_58 zPRA1_15,,,,,Bible/Sayings,Complete the Bible sayings.,^AA.DCL.E,Rows=4 Cols=3 FntSize=14 FntColor=blue BkGndColor=lightGray LnCnt=1 SingleScreen=No Sort=Yes ,I am;the voice of one;crying in the wilderness;^AA.DCL.A.026032,Wither;thou goest;I will go;^AA.DCL.A.026052,It is better;to give;than to receive.;^AA.DCL.A.009063,Get thee;behind me;Satan.;^AA.DCL.A.009053,Read;the handwriting;on the wall ;^AA.DCL.A.010033,You are;the salt;of the earth;^AA.DCL.A.023073,Physician;heal;thyself.;^AA.DCL.A.021043,By their fruits;ye shall;know them;^AA.DCL.A.009022,Let there;be;light.;^AA.DCL.A.016013,Man;does not live;by bread alone.;^AA.DCL.A.052103,Dust thou art;and unto dust;shalt thou return.;^AA.DCL.A.007063,Cast not;ye pearls;before swine;^AA.DCL.A.020073,Render therefore;unto Caesar the things;which are Caesar's.;^AA.DCL.A.023013,My God;My God why;hast thou forsaken me?;^AA.DCL.A.018033,Many are called;but few;are chosen.;^AA.DCL.A.017023,The wolf;shall also dwell;with the lamb;^AA.DCL.A.026072,The meek;shall inherit;the earth.;^AA.DCL.A.017073,There is nothing;new;under the sun.;^AA.DCL.A.019043,The last;shall be first;and the first shall be last;^AA.DCL.A.015033,Vanity;of vanities;all is vanity;^AA.DCL.A.026022,,,,,,,";
//,AA.Oen00005,EdUGames tm,20020919,9,ThTrNa,PhSaTe,,SpSa,masts;sailing ship,,aPRA1_0 zPRA1_15,,,,,Boats/Sailboats/Terms,Put the masts of a seven masted sailing ship in order.,,Rows=7 Cols=1 FntSize=36 FntColor=blue BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes ,Fore,Main,Mizzen,Jigger,Kicker,Spanker,Pusher,,,,,,,,,,,, |
//,AA.Ben00001,EdUGames tm,20020605,9,,,,Te,,}P.AA.Pi.Pe.Le.Po.US.Pr.16PopPres.NK.gif,aPRA1_50 iPRA1_45 oPDF1_20 zPRA1_15,,,,,US Presidents,Which seven presidents are Democrats?,,Type=Grid Rows=4 Cols=4,}P.AA.Pi.Pe.Le.Po.US.Pr.16PopPres.NK.gif,R1C1;R1C4;R2C3;R2C4;R3C2;R3C3;R3C4,,,,,,,,,,
//,AA.Ben00478,Ed-U-Games tm,20210410,9,LoStQu ,GeNoNoUSKS GeNoNoUSKY GeNoNoUSLA ,NoNoUSKS NoNoUSKY NoNoUSLA ,GeStKS GeStKY GeStLA,quarters;kansas;kentucky;louisiana,}P.AA.Pi.Th.Cu.US.Co.Qu.St.NM.EE.jpg;}P.AA.Pi.Th.Cu.US.Co.Qu.St.LA.EE.jpg;}P.AA.Pi.Th.Cu.US.Co.Qu.St.WY.EE.jpg;}P.AA.Pi.Th.Cu.US.Co.Qu.St.KY.EE.jpg;}P.AA.Pi.Th.Cu.US.Co.Qu.St.IL.EE.jpg;}P.AA.Pi.Th.Cu.US.Co.Qu.St.KS.EE.jpg,aPRA1_125 zPRA1_30,,,,Pick out 3 of 6 quarters for Kansas` Kentucky and Louisiana,US/States/Quarters,Check the quarter from the state of Kansas` Kentucky and Louisiana.,,Type=MultipleResourcess,}P.AA.Pi.Th.Cu.US.Co.Qu.St.NM.EE.jpg selected=No,}P.AA.Pi.Th.Cu.US.Co.Qu.St.LA.EE.jpg selected=Yes,}P.AA.Pi.Th.Cu.US.Co.Qu.St.WY.EE.jpg selected=No,}P.AA.Pi.Th.Cu.US.Co.Qu.St.KY.EE.jpg selected=Yes,}P.AA.Pi.Th.Cu.US.Co.Qu.St.IL.EE.jpg selected=No,}P.AA.Pi.Th.Cu.US.Co.Qu.St.KS.EE.jpg selected=Yes,,,,
//,AA.Aen00003,EdUGames tm,20021014,4,,,,,boats;sailboats;bow,}P.AA.Pi.Th.Tr.Na.SailBoat.KG.gif,aPRA1_80 dPRA1_15 zPRA1_15,,,PRA1;Boats/Sailboats/sailboat_terms.html,,Boats/Sailboats,Which is the Bow?,,Sort=Yes ,}P.AA.Pi.Th.Tr.Na.SailBoat.KGDB.gif,{A-4red 009118038066 180,{A-4red 373118038066 180,{R-4red 004054057057,{W-4red 361055057057,,,,,,,, |
//,AA.Cen00004,EdUGames tm,20030213,9,LoMoPa LoPoSt,GeNoNoUS,NoNoUS,GePa,national park,,aPRA1_140 zPRA1_15,,,,,Geography/US/National Parks,Place the National Parks by State.,,Rows=16 Cols=1 FntSize=12 FntColor=black BkGndColor=white BoxWidth=131 BoxHeight=23 BoxWidth=131 BoxHeight=23 CatRows=3 CatCols=2 CatFntSize=24 CatFntColor=magenta CatLabOpaque=No PanelBkGndColor=white Sort=Yes ,Washington;Mount Ranier;North Cascades;Olympic;,Arizona;Grand Canyon;Petrified Forest;,Wyoming;Yellowstone;Grand Teton;,Utah;Arches;Bryce Canyon;Canyonlands;Capitol Reef;Zion;,California;Channel Islands;Kings Canyon;Lassen Volcanic;Redwood;Sequoia;Yosemite;,,, 
//,AA.Den00002,EdUGames tm,20020822,9,EvScDi,ScEaAs,,ScFa CuAc,moon landing,}P.AA.Pi.Ev.Ex.19690716-MoonLanding.GF.gif,aPRA1_40 dPRA1_30 zPRA1_15,,,,,Science/Astronomy,When was the first moon landing?,,Answer=19690720,}P.AA.Pi.Th.Sy.Ta.DateLine-1.PD.gif,}P.AA.Pi.Ev.Ex.19690716-MoonLanding.GF.gif |

//const sampleRound = ",AA.Ien00005,EdUGames tm,,9,,,,Te,,}P.AA.Pi.Ge.No.No.US.SD.Mo.MtRushmore-1.PI.gif,aPRA1_70 iPRA1_15 oPDF1_5 zPRA1_15,,,,,US/Monuments,What is this American Monument?,,DisplayType=Grid TypeSelection=Player Rows=6 Cols=8,}L.AA.An.Ge.No.No.US.CiStMo.AL.csv Rushmore-Mt.,}P.AA.Pi.Ge.No.No.US.SD.Mo.MtRushmore-1.PI.gif,{H-Northern State;-;4 Presidents;In Stone,,,,,,,";
//,AA.Nen00001,EdUGames tm,,9,,,,,,,aPRA1_0 zPRA1_15 ,,,,,Races/Automobile,How many miles in the Memorial Day weekend race at Indianapolis?,,Answer=500 Type=Integer LowBracket=200 HiBracket=1200,}P.AA.Pi.Th.Sy.Ta.NbrLine1KWidth-1.fD.jpg,,,,,, |
//",AA.Qen00002,EdUGames tm,20020802,10,PeLePoUSPr,HiNoNoUS,NoNoUS,PoAm,us presidents,,aPRA1_370 zPRA1_15,,,,,Leaders/US Presidents,Answer these questions about these well know US Presidents.,Various books on Presidents.,Rows=6 Cols=1 FntSize=12 FntColor=black BkGndColor=white LnCnt=2 SingleScreen=No Sort=Yes,AnswerType=GridOnImage AnsRows=4 AnsCols=4 Image=}P.AA.Pi.Pe.Le.Po.US.Pr.16PopPres.JJ.gif Answers=Clinton;Bush;Reagan;Carter;Ford;Nixon;Johnson-L;Kennedy;Eisenhower;Truman;Roosevelt-F;Wilson;Roosevelt-T;Lincoln;Jefferson;Washington,Who was President when Congress defeated a request for military aid to the contras?;;Reagan,What Twentieth Century President attained the rank of general?;;Eisenhower,What Twentieth Century President did not attend college?;;Truman,What two presidents saw military action in WWI?;;Truman;Eisenhower,What President started the Civilian Conservation Corps?;;Roosevelt-F,What President is on a 500 dollar US Savings Bond?;;Wilson,What President resigned from office?;;Nixon,What President is on a million dollar Treasury Bond?;;Roosevelt-T,What president has a first name of Thomas?;;Jefferson,The U-2 incident wrecked what Presidents summit conference?;;Eisenhower,What President ordered the Atom bomb dropped on Hiroshima?;;Truman,What president has a first name of Richard.?;;Nixon,What president is on a $1.00 coin?;;Eisenhower,What two presidents carried the most states ever in an election?;;Nixon;Reagan,What Presidents is on a thousand dollar Treasury Note?;;Lincoln,What six Presidents served as governor?;;Reagan;Carter;Clinton;Wilson;Roosevelt-T;Roosevelt-F,What six Presidents were elected/reelected in war time?;;Lincoln;Wilson;Roosevelt-F;Nixon;Eisenhower;Johnson-L,Who became President in 1861?;;Lincoln,Who was President when World War I started?;;Wilson,What president is on a 50 cent coin?;;Kennedy,What president is on a $5.00 bill?;;Lincoln,What president has a first name of Jimmy?;;Carter,What five presidents played football for their college teams?;;Eisenhower;Nixon;Ford;Reagan;Bush,What three presidential incumbents were defeated for reelection?;;Ford;Carter;Bush,What three Twentieth Century Presidents were elected in war time?;;Wilson;Roosevelt-F;Nixon,What President signed the Social Security Act?;;Roosevelt-F,What President started the Works Progress Administration?;;Roosevelt-F,What 4 presidents have memorials in Washington DC?;Roosevelt Island is the hard one.;Washington;Lincoln;Jefferson;Roosevelt-T,Who was president during the Civil War?;;Lincoln,Who was President when MacArthur was driven from Corregidor?;;Roosevelt-F,What President is on a 75 dollar US Savings Bond?;;Truman,What President signed the Taft-Hartley Act?;;Truman,,";
//const sampleRound = ",AA.Qen00004,EdUGames tm,20020808,11,LoPoCo,GeNoUS,NoNoUS,GeAm,us;state,}B.AA.Bu.Ge.No.No.US.States.BL.csv,aPRA1_190 lPRA1_5 zPRA1_15,,,,,US/States,Answer these questions about the United States,Various Books on the subject.,Rows=6 Cols=1 FntSize=12 FntColor=black BkGndColor=white LnCnt=3 SingleScreen=No Sort=Yes,}B.AA.Bu.Ge.No.No.US.States.BL.csv,Topeka is a major urban areas in what state?;;Kansas,What state's highest point is Mt. McKinley at 20320 feet?;;Alaska,What state name is a Spanish name of an imaginary island?;;California,Moscow USA is in what state?;;Idaho,The Columbia is the border between what two states?;;Washington;Oregon,What state has the longest coastline?;;Alaska,What 4 states are named after kings?;;Georgia;Louisiana;North Carolina;South Carolina,What is the Golden State?;;California,What was the 48th state to join the Union?;;Arizona,The Yucca is the state flower and the Land of Enchantment is the nick name of what state?;;New Mexico,Haleakala National park is located in what state?;;Hawaii,The Badger State is the nick name of what state?;;Wisconsin,What state means -mountain region- in Latin?;;Montana,What state name is derived from the name of a president?;;Washington,Ft. Wayne is a major urban areas in what state?;;Indiana,Des Moines and Davenport are major urban areas in what state?;1;Iowa,The Baseball Hall of Fame is located in what state?;;New York,The Bluebonnet is the state flower of what state that starts with the letter T?;;Texas,What state name comes from French Royalty?;;Louisiana,,,,,,";
//const sampleRound = ",AA.Qen00003,EdUGames tm,20020807,11,ThMi,ScCh,,SiFa,science;elements,}B.AA.Bu.Th.Ba.El.PeriodicTblOfElements.BL.csv,aPRA1_130 lPRA1_5 zPRA1_15,,,,,Science/Chemistry,Answer these questions about the Elements.(Image Grid),,Rows=6 Cols=1 FntSize=9 FntColor=black BkGndColor=white LnCnt=4 SingleScreen=No Sort=Yes ,}B.AA.Bu.Th.Ba.El.PeriodicTblOfElements.BL.csv,What are the two elements in table salt?;^AA.DCL.A.46306;Sodium (Na);Chlorine (Cl),What is the major gas in air?;;Nitrogen (N),An isotope of this element is often used to date dead things:;;Carbon (C),A Single molecule of this element and oxygen forms a colorless-odorless gas that is often fatal to humans:;;Carbon (C),What element did Marie Curie discover?;;Radium (Ra),What is named after the person who developed the General Theories of Relativity?;;Einsteinium (Es),Water is composed of what two elements?;;Hydrogen (H);Oxygen (O),What element combines to form Helium in a fusion reaction?;;Hydrogen (H),What element doomed the Hindenburg?;;Hydrogen (H),What is the most abundant element in the Universe?;;Hydrogen (H),What element shares a name with the closest planet to the sun?;;Mercury (Hg),The Ozone Layer is composed of what element?;;Oxygen (O),The 235 isotope of this element is used in making energy:;;Uranium (U),,,,";

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


//document.getElementById('butStartGame').addEventListener("click", function(){ startGame(); });//console.log(" =" + );


//console.log("XXX =" + document.getElementById("butA").name );//      console.log(" =" + );

document.getElementById("test").addEventListener("click", function(){ test(); });

class MovableButton{
	constructor (text,rank,id,game){
		this.id = id
		this.text = text;
		this.rank = rank;
		this.cantMoveBack = false;           //          console.log(" = " + );
		this.width = 300;
		this.height = 40;
		this.game = game;
	}
	 setHeight(height){
		this.height =height;
	 }

	setWidth(width){	 
		this.width = width;
	}

	setCantMoveBack(){
		this.cantMoveBack = true;
	}

	getDomInsrtText(){
		let buf = "";
		buf+= `<input type="button" id="${this.id}" style="width:${this.width}px;height:${this.height}px" value="${this.text}" >`
		return buf;
	}


	addButListeners(gameName){
		this.game.helloWorld();
        console.log("mb.addListener " +   " this.id= " + this.id + " game= " + this.game.toString());
		let el = document.getElementById(this.id);
		if(el != null){
			el.addEventListener("mousedown", function(){
				console.log("mousedown" + this.id);
				gameName.butHit("mousedown",this.id);
			})
			el.addEventListener("mouseup", function(){
				console.log("mouseup" + this.id);
				gameName.butHit("mouseup",this.id);
			});
			//el.addEventListener("mousemove", function(){
				//console.log("mousemove" + this.id);
				//this.game.butHit("mousemove",this.id);
			//});
		}

	}

	getRank(){
		return this.rank;	
	}

	getText(){
		return this.text;
	}




}

class ControlPanel{            //          console.log(" = " + );
	constructor (utl){
		this.gameInPlay;
		this.gameSerNbr;
		this.gameType;
		this.playerArray = [];
		this.utl = utl;
		this.playerNbr = 0;
		this.playerLineUp;
		this.offLine = true;
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
		let el = document.getElementById("regPlayers");
         console.log("el.value = " + el.value );
          console.log("regPlayers != null = " + (el != null) );
		if(el != null)el.addEventListener("click", function(){
			regPlayers();
		});
          console.log("(butReg != null) = " + ((el != null)) )
		el = document.getElementById("butStartGame");
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
		console.log("CP.startGame gameType " + gameType);
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
			case 'I':
				gameI = new GameI(aRound,this,this.utl);
				gameI.init();
			break;
			case 'O':
				gameO = new GameO(aRound,this,this.utl);
				gameO.init();
			break;
			case 'L':
				gameL = new GameL(aRound,this,this.utl);
				gameL.init();
			break;
			case 'Q':
				gameQ = new GameQ(aRound,this,this.utl);
				gameQ.init();
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

	getData(fileName){
		const data = fileName;
		return data;
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
		this.gameInputArray =[];//The entire input string
		this.gameDataArray =[];//includes the question and ref
		this.gameSpecificDataArray =[];
		this.pictureFileArray;
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
		this.gameName = 'game';
		console.log("Game.constructor BOTTOM"  );
	}

	init(){
		console.log("Game init TOP ***************" );//    console.log(" =" + );
		//console.log("Game init TO utl  =" + this.utl.sayHellow());
		this.resetPage();
		this.breakOutRound();
		this.mapTheParms();
		this.insertTheQuestion();

		

		document.getElementById('ptAwd').value = this.ptAwd;
		//this.nbrOfButs = this.nbrOfInsrtPts;
		console.log("Game init BOTTOM  " );
	}

	breakOutRound(){
		console.log("Game.breakOutRound TOP"  );
		const gameInputArray = this.round.split(',');//console.log(" =" + );
		const roundCount = gameInputArray.length;
		//This is to remove the trailing commas
		for (let i = roundCount-1; i--; i > 20){
			if(gameInputArray[i].length == 0){
				gameInputArray.pop();
			}else{
				break;
			}
		}
		const n = gameInputArray.length;
		console.log("Game.breakOutRound gameInputArray.length= "  + n);

		this.gameDataArray = gameInputArray.slice(17,n);
		console.log("Game.gameDataArray= "  + this.gameDataArray );


		console.log("gameInput = " + gameInputArray);
		this.question  = this.gameDataArray.shift();
		console.log("this.question =" + this.question);
		this.reference = this.gameDataArray.shift();
		this.gameParm  = this.gameDataArray.shift();

		console.log("G this.gameDataArray.length=" + this.gameDataArray.length)

		console.log("G 0=" + this.gameDataArray[0])
		console.log("G 1=" + this.gameDataArray[1])
		console.log("G 2=" + this.gameDataArray[2])

		//this.gameSpecificDataArray  = gameInputArray.slice(20,gameInputArray.length);

		//console.log("Game.this.gameSpecificDataArray= " + this.gameSpecificDataArray)
	}

	mapTheParms(){
		console.log("mapTheParms() TOP this.gameParm= " + this.gameParm);
		const parms = this.gameParm.split(' ');
		this.parmMap = new Map();

		for (let i = 0;i < parms.length; i++){
			const twoParts = parms[i].split('=');
			this.parmMap.set(twoParts[0],twoParts[1]);//console.log("  = " +  );
		}
		//Break out the often used rows and cols as numbers
		this.rows = Number(this.parmMap.get('Rows'))
		this.cols = Number(this.parmMap.get('Cols'))


		console.log("mapTheParms() BOTTOM this.rows = " + this.rows + " this.cols=  " + this.cols );
	}

	getButIDArray(str,rows,cols){
		console.log("Game.createButArray rows=  " + rows + " cols=  " + cols );
		const butIDArray = [];
		for (let i = 0;i<cols;i++){
			for (let j = 0;j<rows;j++){
				butIDArray.push(str + i + 'X' + j);
			}
		}
		return butIDArray;
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

	toString(){
		return this.gameName;
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

class GameI extends Game{
	constructor (round,cp,utl){ 
		console.log("GameI.constructor TOP"  );
		super (round,cp,utl);
		this.procGameData;
		this.ans;
		this.ansLstFile
		this.hints;;
		this.abp;
		console.log("GameI.constructor Bottom"  );

	}

	helloWorld(){
		console.log("GameI.helloWorld" );
		super.helloWorld()
	}

	init(){
		console.log("GameI.init TOP"  );
		super.init();
		this.procGameData();
		this.insertImage();
		//this.loadAlphaBar();
		this.addGridButton();
		this.addButListeners();
		console.log("GameI.init BOTTOM "  +  this.gameInPlay);//        console.log("GameI. "  + );
	}

	procGameData(){//}L.AA.An.Ge.No.No.US.CiStMo.AL.csv Rushmore-Mt.,}P.AA.Pi.Ge.No.No.US.SD.Mo.MtRushmore-1.PI.gif,{H-Northern State;-;4 Presidents;In Stone,
		console.log("GameI.procGameData TOP "  +  this.gameData);
		const displayType = this.parmMap.get('DisplayType');
        console.log("GameI.displayType "  + displayType);
		const typeSelection = this.parmMap.get('TypeSelection');
        console.log("GameI.typeSelection "  + typeSelection);

        console.log("GameI.this.gameSpecificDataArray= "  + this.gameSpecificDataArray);
		//const someData = //"}L.AA.An.Ge.No.No.US.CiStMo.AL.csv Rushmore-Mt.,}P.AA.Pi.Ge.No.No.US.SD.Mo.MtRushmore-1.PI.gif,{H-Northern State;-;4 Presidents;In Stone,";
		//const someData = this.gameData + " ";
		//const gameDataArray = someData.split(",");
        //console.log("GameI.gameDataArray "  + this.gameDataArray);

		const ansLstAndAnswer = this.gameSpecificDataArray[0];

        console.log("GameI.ansLstAndAnswer "  + ansLstAndAnswer);
		const tmp = ansLstAndAnswer.split(' ');
		this.ansLstFile = tmp[0];
		this.ans = tmp[1];
		this.imageFile = this.gameSpecificDataArray[1];
        console.log("GameI.imageFile= "  + this.imageFile);
		this.hints =this.gameSpecificDataArray[2];
        console.log("GameI.hintse= "  + this.hints);

        console.log("GameI.procGameData this.ansLstFile "  + this.ansLstFile + " this.ans " + this.ans);
	}

	loadAlphaBar(){
        console.log("GameI. loadAlphaBar top" + this.ansLstFile );
		const ansListPath=getFile(this.ansLstFile);
        console.log("GameI.ansListPath" + ansListPath );
		const reader = new FileReader();
		//const result = reader.readAsText(ansListPath);
		const result = reader.readAsText("/TextFile/AnsLstA.txt")

		console.log(result);
		this.abp =	new AlphaBar(result,this.ans,this);
		this.abp.init();
        console.log("GameI. loadAlphaBar bottom"   );
	}

	butHit(butID){
		console.log("gameI butHit() " + butID);

	}

	addButListeners(){
		for(let i = 0;i< this.rows;i++){
			for(let j= 0;j< this.cols;j++){//this.rows
				const butID = 'but' + i + 'X' + j;
				const but = document.getElementById(butID);
				but.addEventListener("click", function(){
					console.log("but"  );
					but.hidden="true";
					gameI.butHit(butID);
				});

			}
		}

	}
		//const imageFile = 'images/MtRushmore-1.PI.gif';

	insertImage(){////   images/MtRushmore-1.PI.gif//this.imageFile
        console.log("GameI. insertImage "   );		
		const imageFile = getFile(this.imageFile);  //'images/General-1.QJ.gif';
        console.log("GameI.insertImage "  + imageFile);
		//Replace with a file download

		const str = `<img src="${imageFile}" id="image" width="496" height="288"  />`;
		const imageInsertPt = document.getElementById('imageInsertPt');
		imageInsertPt.innerHTML = imageInsertPt.innerHTML + str;

	}

	addGridButton(){
		const styleInsrtPt = document.getElementById('styleInsrtPt');
        console.log("GameI. addGridButton top"   );
		const imageInsertPt = document.getElementById('imageInsertPt');
		const styleInsertPt = document.getElementById('styleInsrtPt');
		const imageOverLayPt = document.getElementById('image');
		const rows = this.rows, cols=this.cols,imageWidth = 488, imageHeight = 288;
		const width             = Math.round(imageWidth/cols)+1;
		const height            = Math.round(imageHeight/rows)+1;
		const percentWidth      = 100/(cols);
		const percentHeight     = 100/(rows);
		const halfWidth        = width/2;
		const halfHeight        = height/2;
		const halfPercentWidth      = 100/(cols*2);
		const halfPercentHeight     = 100/(rows*2);

		let bufStyle = "<style>\n";
		let bufBut = "";
		let nbr = 0;
		for(let i = 0;i< rows;i++){
			for(let j= 0;j< cols;j++){//this.rows
				const thePercentHeight = Math.round(halfPercentHeight + (i* percentHeight));
				const thePercentWidth = Math.round(halfPercentWidth + (j* percentWidth));
				const butID = 'but' + i + 'X' + j;
				bufStyle+= `\n#${butID}{\n   top:${thePercentHeight}%;\n   left:${thePercentWidth}%;\nbackground-color: blue;\n}`;
				bufBut+=`<button class='butX' style="width:${width}px;height:${height}px;"    name='XXX${butID}' id='${butID}' >-||||-</button>\n`;
			}
            
		}
		bufStyle += "\n</style>";
		//console.log('test bufStyle= \n' + bufStyle);
		//console.log('\n\ntest bufBut= \n' + bufBut);
		styleInsrtPt.innerHTML = styleInsrtPt.innerHTML + bufStyle;
		imageInsertPt.innerHTML = imageInsertPt.innerHTML + bufBut;
        console.log("GameI. addGridButton bottom"   );
	}
	

}//Bottom of gameI





class AlphaBar{
	constructor (ansFile,ans,game){             //console.log("GameU.this.butHitArray "  + this.butHitArray);//So we can reset them
		this.ansFile = ansFile;
		this.ans = ans;
		this.game = game;
	}

	init(alet){
		if(deBug)console.log("abp init top  " )
		this.createAlphaButtonPanel();//console.log("abp init  "  + alet);	
		this.addSelectionListener();
		this.downloadAnsLst();
		if(deBug)console.log("abp init top  " );
		if(deBug)console.log("abp this.game  "  + this.game.helloWorld());
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
		console.log("abp checkAnswer top  " + selAns);
		if(this.ans ===selAns){
			console.log("abp checkAnswer Success  " );
		}else{
			console.log("abp checkAnswer Failure  " );
		}


	}


	createButtonEventListeners(){
		if(deBug)console.log("abp loadDropDownMenu top  " );
		for (let i = 0;i<26;i++){
			const aLtr = String.fromCharCode(65 + i);
			const butLtr = 'but' + aLtr;
			const el = document.getElementById(butLtr);//style="background-color:LightCoral"
			el.addEventListener('click', function() {
				console.log('Button clicked!');
				gameI.abp.loadLstIntoDropDown(aLtr);
			});

		}
		const butABPsub = document.getElementById('butABPSubmit');
			butABPsub.addEventListener('click', function() {
				const selection = document.getElementById('aBarDropDownMenu').value;
				console.log('Button butABPSubmit clicked!' + selection);
				///abp.checkAnswer(selection);
				gameI.abp.checkAnswer(selection);
			});

		if(deBug)console.log("abp loadDropDownMenu bottom  " );
	}


	createAlphaButtonPanel(){//el.innerHTML = el.innerHTML + buf;
		if(deBug)console.log("abp createAlphaButtonPanel() top  " );
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
		
		if(deBug)console.log("abp createAlphaButtonPanel() Bottom  " );
	}

	//				 

}

class GameL extends Game{
	constructor (round,cp,utl){ //
		console.log("GameL.constructor TOP"  );
		super(round,cp,utl);
		this.ans;
		this.imageFile;
		this.pictureFile;
		this.mapFile;
		this.scale;
		this.units;
		this.loc;
		console.log("GameL.constructor Bottom"  )

	}

	helloWorld(){
		console.log("GameL.helloWorld" );
		super.helloWorld();
	}

	init(){
		console.log("GameL.init TOP"  );
		super.init();
		this.procGameData();
		this.insertImage();
		console.log("GameL.init BOTTOM "  +  this.gameInPlay);//        console.log("GameL. "  + );
	}

	procGameData(){//}Map=}P.AA.Pi.Ge.No.No.Ma.General-1.QJ.gif Scale=8 Units=Miles Loc=164051,}P.AA.Pi.Pe.Le.Mi.Ar.Custer-George.ED.gif
		console.log("GameL.procGameData() this.gameParm= "  +  this.gameParm);
		let temp = this.gameParm.split(' ');
		const locParameters = temp[0];//
		this.mapFile = temp[0];//}Map=}P.AA.Pi.Ge.No.No.Ma.General-1.QJ.gif

		const tempA = temp[1].split('=');
		this.scale = tempA[1];

		const tempB = temp[2].split('=');//        console.log("GameL. "  + )
		this.units = tempB[1];

		const tempC = temp[3].split('=');
		this.loc = tempC[1] + "";

        console.log("GameL.this.gameSpecificDataArray "  + this.gameSpecificDataArray)

		const moreItems =this.gameSpecificDataArray.length;//Things like pictures
		if(moreItems > 0){
			this.pictureFileArray = this.gameDataArray[1,moreItems];
		}
		console.log("GameI.this.pictureFileArray= "  + this.pictureFileArray);
		
        console.log("GameL.mapFile "  + this.mapFile + " scale=" + this.scale + " units= " + this.units + " loc= " + this.loc + " mapFile= " + this.mapFile);

	}



	getClick(xLoc,yLoc){
        console.log("GameI.getClick x= "  + xLoc + " y= " + yLoc  + " this.loc= " + this.loc);
		const xAns = this.loc.slice(0,3)
		const yAns = this.loc.slice(3,6)
		const xDif  = Math.abs(xAns - xLoc);
		const yDif  = Math.abs(yAns - yLoc);
		const xy = Math.round(Math.sqrt(Math.pow(xDif,2) + Math.pow(yDif,2)));//        console.log("GameI. "  + );
        console.log("GameI.getClick xDif= "  + xDif + " yDif= " + yDif);
		return xy;

	}


	insertImage(){////   images/MtRushmore-1.PI.gif
        console.log("GameL.insertImage  mapFile= "  + this.mapFile);
		const imagePathAndFile = getFile(this.mapFile);  //'images/General-1.QJ.gif';

        console.log("GameL.insertImage imagePathAndFile= "  + imagePathAndFile);
		const str = `<img src="${imagePathAndFile}" id="image" />`;// width="496" height="288" 
		const imageInsertPt = document.getElementById('imageInsertPt');
		imageInsertPt.innerHTML = imageInsertPt.innerHTML + str;
		const theImage = document.getElementById('image');
		image.addEventListener('click', function(event) {
		  //console.log('X: ' + event.offsetX + ', Y: ' + event.offsetY);
		  gameL.getClick(event.offsetX,event.offsetY);

		});
	
	}


}


class GameO  extends Game{//const sampleRound = ",AA.Oen00001,EdUGames tm,,2,,,,Te,,,aPRA1_0 zPRA1_15 ,,,,,Test/Order,Place the numbers on the LEFT in order on the RIGHT with the largest number on the bottom Make a mistake or two and press the CHECK button to see what happens.,,Rows=8 Cols=1 FntSize=18 FntColor=magenta BkGndColor=white LnCnt=1 SingleScreen=No Sort=Yes,One,Two,Three,Four,Five,Six,Seven,Eight,,,,,,,,,,,";

	constructor (round,cp,utl){ 
		console.log("GameO.constructor TOP"  );//
		super (round,cp,utl);
		this.procGameData;
		this.butLst;
		this.ans;
		this.mbArray =[];
	}
	init(){
		console.log("GameO.init TOP"  );//		console.log("GameO.  " +  )
		super.init();
		this.gameName = 'GameO';
		this.procGameData();	
		this.addListeners();
		console.log("GameI.init BOTTOM "  +  this.gameInPlay);//        console.log("GameI. "  + );
	}


	butHit(typeHit,id){
		console.log("GameO.butHit() typeHit= "+ typeHit + " id  " + id)

	}

	helloWorld(){
		console.log("GameO.helloWorld" );
		super.helloWorld();
	}

	addListeners(){
		for(let i = 0;i< this.mbArray.length;i++){
			const id = "but" + i + "X0";
			const el = document.getElementById(id);
			if(el != null){
			el.addEventListener("mousedown", function(){
				console.log("mousedown" + id);
				gameO.butHit("mousedown",id);
			})
			el.addEventListener("mouseup", function(){
				console.log("mouseup" + id);
				gameO.butHit("mouseup",id);
			});
			//el.addEventListener("mousemove", function(){
				//console.log("mousemove" + id);
				//gameO.butHit("mousemove",id);
			//});
		}

		}
	}

	procGameData(){//id="butInsrtPt"
		console.log("GameO.procGameData()"  + this.gameData );//One,Two,Three,Four,Five,Six,Seven,Eight,
		const gameDataArray =  this.gameData.split(',');
		const nbrOfButs = gameDataArray.length;
		const el = document.getElementById("gameOInsertPt");
		console.log("GameO.gameDataArray = " + gameDataArray );

		for(let i = 0;i< nbrOfButs;i++){
			const butID = "but"+ i +"X0";
			const mb = new MovableButton(gameDataArray[i],i,butID,this);
			this.mbArray.push(mb);
		}
		this.mbArray = this.utl.mixUpArray(this.mbArray);
		for(let i = 0;i< nbrOfButs;i++){
			el.innerHTML = el.innerHTML + this.mbArray[i].getDomInsrtText();
		}
;
	}

	placeInitialButtonsXX(){
		console.log("GameO.placeInitialButtons TOP" + this.rows);
		console.log("GameO. gameData="   + this.gameData);
		let buf = "";
		for(let i = 0;i< rows;i++){
			const butID = 'but'+ i;

			bufBut+=`<button class='butX' style="width:${width}px;height:${height}px;"    name='XXX${butID}' id='${butID}' >-||||-</button>\n`;

		}
		
	}

}

class GameQ extends Game{
	constructor (round,cp,utl){ //
		console.log("GameQ.constructor TOP"  );
		super(round,cp,utl);
		this.ansRows;
		this.ansCols;
		this.image;
		this.ansMap;
		this.imageWidth;
		this.imageHeight;
		this.ansButIDArray;//we only create this once
		this.ansPending = false;
		this.rightAnsArray = [];
		this.reqNbrOfRightAns = 0;
		this.rightAnsCntSoFar;
		this.butBeingAnswered;
		this.holdOverQArray = [];
		this.ansBoxWidth;
		this.ansBHeight;
		this.displayData;
		this.ansType='G';// 'G' = Grid 'T'=TransparentButtons
		this.recArray = [];
		this.nameArray = [];
		}

	init(){
		console.log("GameQ.init TOP"  );
		super.init();
		this.mapTheParm();
		this.setUpGameSpace();
		this.addEventListnerToQButs();
		//this.addAnsImage();	
		//this.setAnswerDisplay();
		this.fillQuestionButtons();
		console.log("GameQ.init BOTTOM "  +  this.gameInPlay);
	}
	helloWorld(){
		console.log("GameQ.helloWorld" );//               console.log("GameQ "  + );
		super.helloWorld();

	}

	procAnsTypT(displayData){
		console.log("GameQ.procAnsTypT "  + this.displayData);//Image=
		let pos1 = displayData.indexOf("Image=");
		let pos2 = displayData.indexOf("Answers=");
		this.image = this.displayData.substring(pos1+6,pos2 -1 );
        console.log("GameQ.this.image= "  + this.image);
		this.answers = displayData.substring(pos2+8)
		console.log("GameQ.this.answers= "  + this.answers );
		this.addAnsImage();
		const answerArray = this.answers.split(";")

		for(let i = 0;i< answerArray.length;i++){
			const parts = answerArray[i].split(' ');//{H-1black 206075010157 Jordan River
			const part1 = parts.shift();
			const loc = parts.shift();
			const nameX = parts;//What is left.
			const name = String(nameX).replaceAll(',',' ');
			const rec = loc.slice(0,3) + ";" + loc.slice(3,6) + ";" +loc.slice(6,9) + ";" + loc.slice(9,12);
			this.recArray.push(rec);

			this.nameArray.push(name);
			console.log(name + " --- " +  rec);
		}



	}

	procAnsTypG(){//AnswerType=GridOnImage AnsRows=4 AnsCols=4 Image=}P.AA.Pi.Pe.Le.Po.US.Pr.16PopPres.JJ.gif Answers=Clinton;Bush;Reagan;
		console.log("GameQ.procAnsTypG.this.displayData= "  + this.displayData);

		const parms = this.displayData.split(" ");

		for (let i = 0;i < parms.length; i++){
            console.log("GameQ parms[i]= " +  parms[i]);
			const twoParts = parms[i].split('=');
			this.parmMap.set(twoParts[0],twoParts[1]);//           console.log("  = " +  );
		}
		this.ansRows    = this.parmMap.get("AnsRows");
		this.ansCols    = this.parmMap.get("AnsCols");
		this.image      = this.parmMap.get("Image");
		const answers    = this.parmMap.get("Answers");//Example: Answers=Clinton;Bush;Reagan;Carter;
		this.ansArray = answers.split(";")            //Example:Clinton,Bush,Reagan,Carter,

		this.ansButIDArray = this.getButIDArray("ansBut",this.ansCols,this.ansRows);//Cols first because we got from left to right

		this.ansMap = new Map();
		for (let i = 0;i < this.ansButIDArray.length; i++){//this.parmMap.set(twoParts[0],twoParts[1]);
			this.ansMap.set(this.ansButIDArray[i],this.ansArray.shift());
		}

     console.log("this.ansMap,get('ansBut0X0'  = " +  this.ansMap.get('ansBut0X0'));
		this.addAnsImage();


		const el = document.getElementById('image');
		
		this.imageWidth = el.naturalWidth;
		this.imageHeight = el.naturalHeight;

        console.log("AA this.imageWidth = " +  this.imageWidth);


		this.getImageDinensions();//For some reason we need to do this outside thes function


        console.log("BB this.imageHeight = " +  this.imageHeight)

        console.log("Q bottomsetAnswerDisplay this.ansMap.get('ansBut0X0') = " +  this.ansMap.get('ansBut0X0'));


	}

	mapParms(data,delim){console.log("GameQ.mapParms= "  + data + " delim-" + delim + "-");
		const dataArray = data.split(" ");
		const len = dataArray.length;
		const parmMap = new Map();
		for (let i = 0;i < len; i++){
			const twoParts = dataArray[i].split(delim);
			parmMap.set(twoParts[0],twoParts[1]);//             console.log("  = " +  );
		}
		return parmMap;
	}



	//AnswerType=RowsOfButtons AnsRows=5 AnsCols=2 AnsLnCnt=1 AnsFntSize=18 AnsFntColor=blue AnsBkGndColor=white 
	//Answers=Bull Run;Chancellorsville;Concord;Lexington;lwo Jima;Manila Bay;
	procAnsTypR(displayData){console.log("################GameQ.procAnsTypR.displayData= "  + displayData);
		const pos = displayData.indexOf("Answers=");
		const parameters = displayData.substring(0,pos+8);
		console.log(" parameters = " +  parameters);
		const answers = displayData.substring(pos+8 );
		console.log(" answers = " +  answers);
		const ansArray = answers.split(";");
		const aMap = this.mapParms(parameters, "=");
		const ansRows = aMap.get("AnsRows");
		const ansCols = aMap.get("AnsCols");
		console.log("&&&&&&&&&&&&&&&& ansRows = " +  ansRows + " ansCols= " + ansCols);//'gameQImageInsrtPt'
		let buf = "<table  border='5'  width='600px'>";
		for (let i = 0;i < ansRows; i++){
			buf+= "<tr>";
			for (let j = 0;j < ansCols; j++){
				const butID = 'ansBut'+ i + 'X' + j;//change to this.qbutIDArray
				console.log("GameQ.butID  = " + butID);
				buf+= `<td><input type="button" class="butAns" id="${butID}" width='100px' value="${ansArray.shift()}"></td>`;//id="gameGButInsertPt"
			}
			buf+= "</tr>\n";
		}
		console.log("buf  = " + buf );
		buf+= "</table>";
		const el = document.getElementById('gameQImageInsrtPt');//'gameQImageInsrtPt'

		el.innerHTML = el.innerHTML + buf;






	}


	mapTheParm(){//We use this.parmMap from Game
        console.log("************************GameQ.mapTheParm() "  );
		const xx = this.gameDataArray[0];
		const n = xx.indexOf(".csv");
		if(n != -1){
			this.displayData = sampleAnsDisplay;//this is a temporaty solution
		}else{
			this.displayData = xx;
		}
		this.ansType = this.displayData.charAt(11);
		console.log("GameQ.this.ansType= "  + this.ansType);
		switch (this.ansType){
		case 'G':
			this.answers = this.procAnsTypG();
			break;
		case ('T'):
			this.procAnsTypT(this.displayData);
			break;
		case ('R'):
			this.procAnsTypR(this.displayData);
			break;
		}

		
	}

//"AnswerType=TransparentButtons Image=}P.AA.Pi.Th.Sy.Ta.PeriodicTblofElements.MH.gif Answers=H-1Black 011028022021 Hydrogen (H);H-1Black 385027022019 Helium (He);H-1Black 012050022021 Lithium (Li);H-1Black 033049022021 Beryllium (Be);H-1Black 275050022021 Boron (B);H-1Black 297050022021 Carbon (C);H-1Black 319050022021 Nitrogen (N);H-1Black 341050022021 Oxygen (O);H-1Black 363050022021 Fluorine (F);H-1Black 384050022021 Neon (Ne);H-1Black 012072022020 Sodium (Na);H-1Black 033072022021 Magnesium (Mg);H-1Black 275073022021 Aluminum (Al);H-1Black 298072022021 Silicon (Si);H-1Black 319072022021 Phosphorus (P);H-1Black 341072022021 Sulphur (S);H-1Black 363071022021 Chlorine (Cl);H-1Black 385071022021 Argon (Ar);H-1Black 012094022021 Potassium (K);H-1Black 033094022021 Calcium (Ca);H-1Black 055094022021 Scandium (Sc);H-1Black 077094022021 Titanium (Ti);H-1Black 099094022021 Vanadium (V);H-1Black 121094022021 Chromium (Cr);H-1Black 143094022021 Manganese (Mn);H-1Black 165094022021 Iron (Fe);H-1Black 187093022021 Cobalt (Co);H-1Black 208094022022 Nickel (Ni);H-1Black 231094022021 Copper (Cu);H-1Black 253094022021 Zinc (Zn);H-1Black 275095022021 Gallium (Ga);H-1Black 297095022021 Germanium (Ge);H-1Black 320094022021 Arsenic (As);H-1Black 341093022021 Selenium (Se);H-1Black 363094022021 Bromine (Br);H-1Black 385094022021 Krypton (Kr);H-1Black 012115022021 Rubidium (Rb);H-1Black 033116022021 Strontium (Sr);H-1Black 055115022021 Yttrium (Y);H-1Black 077116022021 Zirconium (Zr);H-1Black 099116022021 Niobium (Nb);H-1Black 121116022021 Molybdenum (Mo);H-1Black 143116022021 Technetium (Tc);H-1Black 165116022021 Ruthenium (Ru);H-1Black 187116022021 Rhodium (Rh);H-1Black 209116022021 Palladium (Pd);H-1Black 231116022021 Silver (Ag);H-1Black 253116022021 Cadmium (Cd);H-1Black 275117020021 Indium (In);H-1Black 297117021022 Tin (Sn);H-1Black 319117022021 Antimony (Sb);H-1Black 342116022021 Tellurium (Te);H-1Black 363116022021 Iodine (I);H-1Black 384116022021 Xenon (Xe);H-1Black 011137022021 Cesium (Cs);H-1Black 033138022021 Barium (Ba);H-1Black 055138022021 Lanthanum (La);H-1Black 099197021021 Cerium (Ce);H-1Black 121197022022 Praseodymium (Pr);H-1Black 143196022021 Neodymium (Nd);H-1Black 165197022021 Promethium (Pm);H-1Black 187196022021 Samarium (Sm);H-1Black 209197022022 Europium (Eu);H-1Black 232197022021 Gadolinium (Gd);H-1Black 254197022021 Terbium (Tb);H-1Black 276196022023 Dysprosium (Dy);H-1Black 299197022021 Holmium (Ho);H-1Black 319197022021 Erbium (Er);H-1Black 341197022021 Thulium (Tm);H-1Black 363197022021 Ytterbium (Yb);H-1Black 384197022018 Lutetium (Lu);H-1Black 077138022021 Hafnium (Hf);H-1Black 099138022021 Tantalum (Ta);H-1Black 121138022021 Tungsten (W);H-1Black 143138022021 Rhenium (Re);H-1Black 165138022021 Osmium (Os);H-1Black 187138022021 Iridium (Ir);H-1Black 209138022021 Platinum (Pt);H-1Black 231137022021 Gold (Au);H-1Black 253137022021 Mercury (Hg);H-1Black 275138022021 Thallium (Ti);H-1Black 297138022021 Lead (Pb);H-1Black 319139020021 Bismuth (Bi);H-1Black 341139020022 Polonium (Po);H-1Black 364138022021 Astatine (At);H-1Black 385138022021 Radon (Rn);H-1Black 011160022021 Francium (Fr);H-1Black 033160022021 Radium (Ra);H-1Black 055159022021 Actinium (Ac);H-1Black 099223020021 Thorium (Th);H-1Black 121222022021 Protactinium (Pa);H-1Black 143223021021 Uranium (U);H-1Black 165222022021 Neptunium (Np);H-1Black 187222022021 Plutonium (Pu);H-1Black 208222022023 Americium (Am);H-1Black 233222022021 Curium (Cm);H-1Black 254222022021 Berkelium (Bk);H-1Black 276223021023 Californium (Cf);H-1Black 300223020021 Einsteinium (Es);H-1Black 321222022021 Fermium (Fm);H-1Black 342222022021 Mendelevium (Md);H-1Black 363222022021 Nobelium (No);H-1Black 385223020016 Lawrencium (LR)";

	setAnswerDisplayX(){//Answers=Clinton;Bush;Reagan;Carter;Ford;Nixon;Johnson-L;Kennedy;Eisenhower;Truman;Roosevelt-F;Wilson;Roosevelt-T;Lincoln;Jefferson;Washington
		console.log("GameQ.setAnswerDisplay this.answers= " + this.answers);
		
		//const anArray = this.answers.split(';');
		this.ansMap = new Map();
		for (let i = 0;i < this.ansButIDArray.length; i++){//this.parmMap.set(twoParts[0],twoParts[1]);
           //console.log("#######this.ansButIDArray[i] = " +  this.ansButIDArray[i] + " anArray[0]= " +anArray[0]);
			this.ansMap.set(this.ansButIDArray[i],anArray.shift());
		}
		const el = document.getElementById('image');//'gameQImageInsrtPt'
		
		this.imageWidth = el.naturalWidth;
		this.imageHeight = el.naturalHeight;

        console.log(" this.imageWidth = " +  this.imageWidth);
        console.log(" this.imageHeight = " +  this.imageHeight)

        console.log("Q bottomsetAnswerDisplay this.ansMap.get('ansBut0X0') = " +  this.ansMap.get('ansBut0X0'));
	}


	//This does not work in the fuction that inserted the image, so this is a work around
	getImageDinensions(){//
		const el = document.getElementById('image');
		this.imageWidth = el.naturalWidth;
		this.imageHeight = el.naturalHeight;
		
		this.ansBoxWidth = this.imageWidth/this.ansCols;
		this.ansBoxHeight = this.imageHeight/this.ansRows;

        console.log(" this.imageWidth = " +  this.imageWidth + ' this.ansBoxWidth ' + this.ansBoxWidth);
        console.log(" this.imageHeight = " +  this.imageHeight) + ' this.ansBoxHeigh ' + this.ansBoxHeight;

	}


	fillQuestionButtons(){//	this.qbutIDArray= this.getButIDArray(this.rows, this.cols);
		 console.log("GameQ.fillQuestionButtons.this.holdOverQArray  = " +  this.holdOverQArray );//           console.log("GameQ  = " +  );
		 const nbrOfHoldOverQs  = this.holdOverQArray.length;

		 if(this.qbutIDArray == null)this.qbutIDArray= this.getButIDArray(this.rows, this.cols);

		for (let i = 0;i < this.rows- nbrOfHoldOverQs; i++){
			this.holdOverQArray.push(this.gameDataArray.shift());
		}
		console.log("GameQthis.holdOverQArray AA = " + this.holdOverQArray );

		const newArray = this.utl.mixUpArray(this.holdOverQArray);
		console.log("GameQthis.holdOverQArray BB = " + this.holdOverQArray );

		for (let i = 0;i < this.rows; i++){
			const butID = 'qBut'+ i + 'X0';//change to this.qbutIDArray
			console.log("GameQ.butID  = " + butID);
			const el = document.getElementById(butID);
			const aQandA = this.holdOverQArray.shift();
 
			console.log("GameQ.aQandA  = "   + aQandA);//What two presidents saw military action in WWI?;;Truman;Eisenhower,
			const qArray = aQandA.split(";");
			const theQ = qArray.shift();
			const theRef = qArray.shift();
			const theAns = qArray;//What we have left is/are the answers
				
			//const str ="Who was President when Congress defeated a request for military  aid to the contras?";
	        //console.log("*************GameQ  theAns= " +  theAns);			
				
			el.value = theQ;
			el.name = theAns;
		}

	}


//AnswerType=GridOnImage AnsRows=4 AnsCols=4 Image=}P.AA.Pi.Pe.Le.Po.US.Pr.16PopPres.JJ.gif Answers=Clinton;Bush;Reagan;Carter;Ford;Nixon;Johnson-L;Kennedy;Eisenhower;Truman;Roosevelt-F;Wilson;Roosevelt-T;Lincoln;Jefferson;Washington

	addAnsImage(){
		console.log("|||GameQ.addAnsImagethis " + this.image ); //         console.log("  = " +  );
		let imagePath = "";
		if(!this.cp.offLine){
			const imageArray = this.image.split(".");
			const len = imageArray.length;
			let buf = "";
			for (let i = len-3;i < len-1; i++){
				buf+= imageArray[i]+ "."
			}
			buf+= imageArray[len-1];
			imagePath = "images/" + buf;
			console.log("********** imagePath = " + imagePath );
		}else{
			imagePath = getFile(this.image);
		}
		console.log("GameQ.imagePath= " + imagePath );

		const str = `<img src="${imagePath}" id="image" /><div>xxx</div>`;

		console.log("GameQ.str= " + str );

		const gameQImageInsrtPt= document.getElementById('gameQImageInsrtPt');
		gameQImageInsrtPt.innerHTML = gameQImageInsrtPt.innerHTM + str;

		const el = document.getElementById('image');
				
		el.addEventListener('click', function(event) {
		  //console.log('X: ' + event.offsetX + ', Y: ' + event.offsetY);
		  gameQ.getAnsHit(event.offsetX,event.offsetY);
		});
	}


	addEventListnerToQButs(){
		for(let i = 0;i< this.rows;i++){
			const butID = 'qBut' + i + 'X0';
			const el = document.getElementById(butID);
			el.addEventListener('click', function(){
				gameQ.postQuestion(this.name,this.id);
			});
		}
	}

	setUpGameSpace(){//Sets up two boxes and adds the buttons 
		console.log("GameQ.setUpGameSpace " + this.rows );
		if(this.rows == 0)this.rows = 6;
		let buf = "<table border='1'  width='100px'>";
		for(let i = 0;i< this.rows;i++){
			const butID = 'qBut' + i + 'X0';
			buf+= `<tr><td><input type="button" class="butQ" id=${butID} width='100px' value="${butID}"></td></tr>\n`;//id="gameGButInsertPt"
		}
		buf+= "</table>";
		const gameQButInsertPt = document.getElementById('gameQButInsertPt');//           console.log("  = " +  );
		gameQButInsertPt.innerHTML = gameQButInsertPt.innerHTML = buf;

	}

	enableBut(butID){
		const el = document.getElementById(butID);
		el.style="background-color: white;";
		el.disabled ="false";
	}

	disableButton(butID){
		const el = document.getElementById(butID);
		el.value="";el.style="background-color: green";el.enabled=true;
	}

	changeScore(gotItRight){          console.log(" changeScore = " +  gotItRight);
		

	}

	evalAns(ans){console.log("evalAnswer = " +  ans);
		const indx = this.rightAnsArray.indexOf(ans);//           console.log("  = " +  );
		if(indx == -1 ){
			console.log("GameQ.falure");
			this.resetQ()
		}else{
			this.rightAnsArray.splice(indx, 1);//Remove the item.
		}
		if(this.rightAnsArray.length == 0){
			console.log("GameQ.SUCCESS")
			this.ansPending = false;
			this.changeScore(true);
			const el = document.getElementById(this.butBeingAnswered);
			el.value="";el.style="background-color: green";el.enabled=true;
		}
	}


	
	postQuestion(theAns,butID){
		console.log("GameQ.qHit theAns= " + theAns  + ' butID= ' + butID);
		if(this.ansPending){
			alert("There is a Question pending. You need to answer it first.")
			return;
		}
		this.butBeingAnswered = butID;

		this.rightAnsArray = theAns.split(",");
		console.log("GameQ.qHit this.rightAnsArray= "  +  this.rightAnsArray + " butBeingAnswered= " + this.butBeingAnswered);
		const el = document.getElementById(butID);
		el.style="background-color: yellow;";
		el.disabled ="true";
		this.ansPending = true;
	}
	

	procAnsTypeG(x,y){
        console.log("gameG procAnsTypeG  x= " +  x + ' y= ' + y);
		if(this.imageWidth == 0) this.getImageDinensions();

		let ansButID = "ansBut";
		for (let i = 0;i <= this.ansCols; i++){
			const ww = i *  this.ansBoxWidth;
			if(ww  > y){
				ansButID+= ""+(i-1);
				break;
			}
		}
		ansButID+= 'X';
		for (let i = 0;i <= this.ansRows; i++){//           console.log("  = " +  );
			const ww = i *  this.ansBoxHeight;
			if(ww  > x){
				ansButID+= ""+i-1;
			break;
			}
		}//                                 //           console.log("  = " +  );

		const anAns = this.ansMap.get(ansButID);
		console.log("GameQ.getAnsHit ansButID= " + ansButID  + " anAns= " + anAns);

		const rightAnsCnt = this.rightAnsArray.length;
		const indx = this.rightAnsArray.indexOf(anAns);//           console.log("  = " +  );
		if(indx == -1 ){
			console.log("GameQ.falure");			
		}else{
			this.rightAnsArray.splice(indx, 1);
		}
		if(this.rightAnsArray.length == 0){
			console.log("GameQ.SUCCESS")
			const el = document.getElementById(this.butBeingAnswered);
			el.value="";el.style="background-color: green";el.enabled=true;
			this.ansPending = false;
		}
	}



	procAnsTypeT(x,y){//
        console.log("gameQtypeT procAnsTyprT x= " +  x + ' y= ' + y);
		for(let i = 0;i< this.recArray.length;i++){
			const rec = this.recArray[i];
			const recParts = rec.split(';');
			if((x > Number(recParts[0]) && x < (Number(recParts[0]) + Number(recParts[2]))) &&  (y > Number(recParts[1]) && y < (Number(recParts[1]) + Number(recParts[3]))))  {
				console.log(" Success = " +  this.nameArray[i]);
				this.evalAns(this.nameArray[i]);
			}
		}
	}



	getAnsHit(x,y){console.log("GameQ.getAnsHit x= " + x + " y= " + y);
		if(!this.ansPending){
			alert("Click on a Question first.");
			return;
		}


		switch (this.ansType) {
			case 'G':
				this.procAnsTypeG(x,y);
			break;
			case 'T':
				this.procAnsTypeT(x,y);
			break;
		}
		
	}

	resetQ(){
         console.log("gameQ resetQ  = " +  this.rows);
		 this.holdOverQArray = [];
		for (let i = 0;i < this.rows; i++){
			const butID = "qBut" + i + "X0";
			const el = document.getElementById(butID);
			if(el.disabled == true){
				console.log("disabled=true  = " +  butID);
				el.style="background-color: white;";
				el.disabled =false;
				el.style="background-color#e0fdff";

			}else{
				let buf = "";
				buf+= el.value + ';;';
				buf+= el.name;
				console.log("buf  = " +  buf);
				this.holdOverQArray.push(buf);
			}
		}
         console.log("resetQ  this.holdOverQArray= " +  this.holdOverQArray);
		 this.fillQuestionButtons();


	}

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
let gameI = null;
let gameL = null;
let gameO = null;
let gameQ = null;


function alphaButHit(butLtr){
	   console.log(" alphaButHit "   + butLtr);
	

}

//	   console.log("  "  );

document.getElementById('butStartGame').addEventListener("click", function(){ 
	console.log(" XXX "  );
	startGame(); 

});


let abp = null;
let deBug = true;


function getData(fileName){
	return fileName;

}


function startGame(){//AA.Men00021
	console.log("function startGame() TOP"  );
	//const testArray = ['one','two','three','four'];//	   console.log(" startGame "   + butLtr);
	//console.log(" testArray = " + testArray);
	const utl = new Utl();
	let nbr =0;
	utl.init();
	const cp = new ControlPanel(utl);
	console.log("***************** startGame "   + nbr++);
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


function test(){                              //           console.log("  = " +  );
    

}

//This only works for image files.  There seems to ba a safeguard on browsers to prevent local text file input
function getFile(fileData){
	console.log("getFile top " + fileData);//}P.AA.Pi.Ge.No.No.Ma.General-1.QJ.gif
	const tempArray =(fileData + "").split(".");
	const n = tempArray.length;
	let buf = "";
	for(let i = 2;i< n-3;i++){
		buf+= tempArray[i] + "/";
	}
    console.log("***buf = " + buf);
	buf+= tempArray[n-3] + "/";
    console.log("A buf = " +  buf);
	buf+= tempArray[n-3]  + "." ;
    console.log("B buf = " +  buf);
	buf+= tempArray[n-2] + ".";
    console.log("C buf = " +  buf);
	buf+= tempArray[n-1];
    console.log("D buf = "+ buf);

	const str = "../../HTDocs/public_html/edugames.com/DataBase/A65AA65A/ResLibry/" + buf;
	return str;

}
//Hydrogen --- 011;028;022;021  h= x= 24 y= 36 
//Lithium      012;050;022;021  (Li) x=20 y = 58

                            //                        console.log("  = " +  );
//Nitrogen --- 319;050;022;021  N =x= 327 y= 59




function testB(){//    
	console.log("testB  " );
	const input = "H-1Black 011028022021 Hydrogen (H);H-1Black 385027022019 Helium (He);H-1Black 012050022021 Lithium (Li);H-1Black 033049022021 Beryllium (Be);H-1Black 275050022021 Boron (B);H-1Black 297050022021 Carbon (C);H-1Black 319050022021 Nitrogen (N);H-1Black 341050022021 Oxygen (O)";
	const inputArray = input.split(";");
	const recArray = [];
	const nameArray = [];
	for(let i = 0;i< inputArray.length;i++){
		const parts = inputArray[i].split(' ');
		const part1 = parts[0];
		const loc = parts[1];
		const name = parts[2] + " " + parts[3] ;
		const rec = loc.slice(0,3) + ";" + loc.slice(3,6) + ";" +loc.slice(6,9) + ";" + loc.slice(9,12);
		recArray.push(rec);
		nameArray.push(name);
		//console.log(name + " --- " +  rec);
	}
	const x = 24;
	const y=  36;
	//const x = 28;
	//const y=  59;

	for(let i = 0;i< recArray.length;i++){
		const rec = recArray[i];
		const recParts = rec.split(';');
		
		if((x > Number(recParts[0]) && x < (Number(recParts[0]) + Number(recParts[2]))) &&  (y > Number(recParts[1]) && y < (Number(recParts[1]) + Number(recParts[3]))))  {
			console.log(" Success = " +  nameArray[i]);
		}

	}


}



function testA(){	
	console.log("testA Top " );
	const str = '<img src="images/MtRushmore-1.PI.gif" id="testImage">';
	console.log("testA str " + str )
	const el = document.getElementById("testInsrtPt");
	console.log("testA el " + el )

	el.innerHTML = el.innerHTML + str

	
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








	
	