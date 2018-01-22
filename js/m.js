//GUARDA SERIE, DOWNLOAD MP3, BAIDU (T), METEO (T)

var langCookie = new Array();
var langTutorial = new Array();
var latitude, longitude;
var secretKey = 'CTRL';
if (localStorage.getItem('LANGUAGE')) {
 userLang = localStorage.getItem('LANGUAGE');
} else {
 var userLang = (navigator.language || navigator.userLanguage).toUpperCase();
}
var countHistory = 0;
var searchEngineCode = new Array(
 '.aa amazon.it/s?field-keywords= Amazon',
 '.yy youtube.com/results?search_query= YouTube',
 '.mm google.it/maps/search/ Google_Maps',
 '.ww it.wikipedia.org/w/index.php?search= Wikipedia',
 '.ii google.it/search?site=imghp&tbm=isch&q= Google_Immagini',
 '.ff cb01.eu/cerca/?q= CineBlog01',
 '.f1 facebook.com/search/top/?q= Facebook',
 '.33 youtubeinmp3.com/it/download/?video= YouTubeInMP3',
 '.ic iconfinder.com/search/?q= Iconfinder',
 'it-en translate.google.com/#it/en/ IT->EN',
 'en-it translate.google.com/#en/it/ EN->IT',
 'it-fr translate.google.com/#it/fr/ IT->FR',
 'fr-it translate.google.com/#fr/it/ FR->IT',
 'it-es translate.google.com/#it/es IT->ES',
 'es-it translate.google.com/#es/it ES->IT',
 '.un unsplash.com/search?keyword= Unsplash',
 '.pi pinterest.com/search/pins/?q= Pinterest',
 '.si sinonimi-contrari.it/ Sinonimi',
 '.ss guardaserie.online/?s= Guardaserie',
 '.st stackoverflow.com/search?q= StackOverflow'
);
var shortcutCode = new Array(
 'F facebook.com Facebook',
 'Y youtube.com Youtube',
 'M play.google.com/music/listen Google_Play_Music',
 'N instagram.com Instagram',
 'W web.whatsapp.com WhatsApp_Web',
 'G gmail.com Gmail',
 'D drive.google.com Google_Drive',
 'B pushbullet.com PushBullet',
 '3 freedsound.com FreedSound',
 'K keep.google.com Google_Keep',
 'T twitter.com Twitter',
 'P paypal.com Paypal',
 'L dribbble.com Dribbble',
 'U tumblr.com Tumblr',
 '2 pinterest.com Pinterest'
);

langCookie['IT'] =
 "Tinooo utilizza i cookie per migliorare e velocizzare l'esperienza utente. Utilizzando questo servizio ne consenti l'utilizzo. Per rimuovere questo messaggio premere il tasto ALT o HELP.";
langCookie['EN'] =
 'Tinooo uses cookies to improve and speed up the user experience. Using this service will allow the use. This message will disappear at the first use.';
langTutorial['IT'] = new Array(
 'Codici per la ricerca',
 "Per cercare è necessario inserire la frase di ricerca  seguita da uno spazio e uno dei seguenti codici.<br>Esempio: <strong>'Eminem .yy'</strong>",
 'Scorciatoie',
 'Utilizzando una delle seguenti combinazioni di tasti si viene indirizzati direttamente al sito web indicato.',
 'Navigare nella cronologia',
 "Utilizzando le freccie '<strong>&#9650;</strong>' e '<strong>&#9660;</strong>' è possibile visualizzare le ultime ricerche effettuate e cercarle nuovamente.",
 'Omnibox',
 "E' possibile inserire Tinooo tra le ricerche nella barra degli indirizzi del browser, inserendo il seguente URL.<br><strong>[http://tinooo.com?q=%s]</strong>",
 'Imposta uno sfondo al tuo Tinooo.',
 'Scrivici',
 'Per qualunque suggerimento, feedback, critica o altro potete contattarci attraverso questo indirizzo.<br><strong>me@merliandrea.com</strong>',
 'Sfondo',
 'Pulire Tinooo',
 "Digitando '<strong>reset tinooo</strong>' all'interno della barra di ricerca è possibile cancellare tutte le impostazioni.",
 'Impostazioni di Tinooo',
 "Tinooo è un motore di ricerca veloce, innovativo ed Italiano. Sfruttando i più grandi motori di ricerca ne semplifica l'utilizzo. Non esistono bottoni o pulsanti, non servono; Tinooo utilizza solo la tastiera. Attraverso gli 'shortcut' è possibile visitare immediatamente la pagina desiderata, invece utilizzando i 'codici di ricerca' si può ricercare la frase digitata all'interno dei motori.",
 'Lingua'
);
langTutorial['EN'] = new Array(
 'Codes for the search',
 "For search you need to enter the search phrase followed by a space and one of the following codes.<br>Example: <strong>'Eminem .yy'</strong>",
 'Shortcuts',
 'Using one of the following key combinations you are directed directly to the website indicated.',
 'Navigate your History',
 "Using the arrows '<strong>&#9650;</strong>' and '<strong>&#9660;</strong>', you can view the latest research carried out and search for them again.",
 'Omnibox',
 'You can enter Tinooo between searches in the address bar of the browser, enter the following URL.<br><strong>[http://tinooo.com?q=%s]</strong>',
 'Sets the background to your Tinooo.',
 'Write us',
 'For any suggestions, feedback, criticism or else you can contact us via this e-mail.<br><strong>me@merliandrea.com</strong>',
 'Background',
 'Reset Tinooo',
 "Typing '<strong>reset tinooo</strong>' within the search bar you can erase all settings.",
 'Settings of Tinooo',
 "Tinooo is a multiple search engine developped for a smarter and faster research with shortcut and filtration. There are no buttons on the screen because you don't need them. A wonderful and smart project made for developers.",
 'Language'
);

if (localStorage.getItem('W')) {
 countHistory = JSON.parse(localStorage.getItem('W')).length;
}

function listSearchEngine() {
 return searchEngineCode;
}

function listShortcut() {
 return shortcutCode;
}

function saveHistorySearch(textToSaveInHistory) {
 var historySearch = new Array();
 if (localStorage.getItem('W')) {
  historySearch = JSON.parse(localStorage.getItem('W'));
  countHistory = historySearch.length + 1;
 }
 historySearch = historySearch.concat(textToSaveInHistory.trim() + ' ');
 localStorage.setItem('W', JSON.stringify(historySearch));
}

function searchWithBrain(x) {
 // TODO: implement search function
 if (
  $('input')
   .val()
   .trim() &&
  $('input')
   .val()
   .trim() != ''
 ) {
  var i = 0;
  var t = $('input').val();

  if (t == 'reset tinooo') {
   localStorage.clear();
   $('input').val('');
   location.reload();
  }

  motore = t.trim().slice(t.trim().length - 4, t.trim().length);
  //checking last 4 letters

  motoreTranslate = t.trim().slice(t.trim().length - 6, t.trim().length);
  // checking last 6 letters

  for (var o = 0; o < lSearchEngine.length; o++) {
   var e = lSearchEngine[o].split(' ');

   if (motoreTranslate == ' ' + e[0]) {
    t = t.slice(0, t.trim().length - 6);
    actionSearch(t, e[1], e[2]);
   }

   if (motore == ' ' + e[0]) {
    t = t.slice(0, t.trim().length - 4);
    actionSearch(t, e[1], e[2]);
   } else i += 1;
  }

  if (i == lSearchEngine.length && !x) {
   actionSearch(t, 'google.it/?gws_rd=ssl#q=', 'Google');
  }
 }
}

function actionSearch(text, link, name) {
 // TODO: implement join http link
 var textSearch = text
  .split('&')
  .join('%26')
  .split(' ')
  .join('+');
 window.open('http://' + link + textSearch, '');
 // saveSearchDB(name, text);
 // saveHistorySearch(text);
 $('input').val('');
}

function addShortcut(a, b) {
 shortcut.add(secretKey + '+' + a, function() {
  window.open('http://' + b, '');
  saveSearchDB('Shortcut', b);
 });
}

function socialBtn() {
 for (var i = 0; i < lShortcut.length; i++) {
  addShortcut(lShortcut[i].split(' ')[0], lShortcut[i].split(' ')[1]);
 }
 shortcut.add(secretKey + '+1', function() {
  var t =
   $('input')
    .val()
    .toLowerCase() + '&btnI';
  actionSearch('', 'google.com/search?q=' + t, 'Google Lucky');
 });
}

function textSearch(x) {
 if (localStorage.getItem('W')) {
  historySearch = JSON.parse(localStorage.getItem('W'));
  if (
   (countHistory < historySearch.length && countHistory > 0) ||
   (countHistory == 0 && x == 0) ||
   (countHistory == historySearch.length && x == 1)
  ) {
   if (x) {
    countHistory--;
    $('input').val(historySearch[countHistory]);
   } else {
    countHistory++;
    $('input').val(historySearch[countHistory]);
   }
  }
 }
}

function getNightTime() {
 var hour = new Date().getHours();
 if (hour < 7 || hour > 17) {
  return true;
 } else {
  return false;
 }
}

function getColorBackground() {
 if (getNightTime()) {
  $('body')
   .addClass('night')
   .removeClass('light');
 } else {
  $('body')
   .addClass('light')
   .removeClass('night');
 }
}

function saveSearchDB(searchEngine, whatSearch) {
 $.ajax({
  url: 'php/saveSearchDB.php',
  data: {
   searchEngine: searchEngine,
   query: whatSearch
  },
  error: function(data) {
   console.error('ERROR');
  }
 });
}

function deleteCookieTile() {
 $('#tile-cookie').hide();
 localStorage.setItem('COOKIE', 1);
}

function controlCookie() {
 if (!langCookie[userLang]) {
  userLang = 'EN'; //IMPOSTA LINGUA INGLESE SE NON é DISPONIBILE
 }
 var valCookie = localStorage.getItem('COOKIE');
 if (valCookie != 1) {
  $('.cookie').show();
  $('#tile-cookie').html(
   '<p><svg x="0px" y="0px" viewBox="0 0 100 125"><path d="M50.047,99.601c-27.306,0-49.521-22.212-49.521-49.521c0-18.929,11.074-36.458,28.214-44.65  c1.217-0.58,2.64-0.569,3.849,0.04c1.206,0.608,2.065,1.741,2.324,3.066c0.415,2.139,2.085,7.112,8.58,7.112  c4.537,0,6.696-2.453,7.705-4.517c0.905-1.838,2.969-2.811,4.967-2.316c1.995,0.495,3.378,2.305,3.323,4.359  c-0.085,3.344,0.842,6.343,2.483,8.033c2.176,2.23,5.94,2.379,10.952,0.581c1.832-0.66,3.88-0.023,5.016,1.559  c1.142,1.576,1.099,3.716-0.103,5.251c-1.906,2.436-2.086,6.014-0.467,9.335c1.923,3.949,5.775,6.305,10.304,6.305  c1.951,0,3.676-0.421,5.273-1.28c1.31-0.705,2.879-0.701,4.182,0.011c1.3,0.717,2.148,2.042,2.253,3.521l0.04,0.541  c0.074,1.013,0.146,2.019,0.146,3.049C99.567,77.389,77.354,99.601,50.047,99.601z M28.271,15.665  C16.59,23.079,9.266,36.118,9.266,50.08c0,22.49,18.294,40.782,40.781,40.782c21.588,0,39.313-16.864,40.697-38.108  c-1.003,0.148-2.025,0.223-3.07,0.223c-7.831,0-14.789-4.296-18.161-11.213c-1.59-3.267-2.216-6.731-1.908-10.021  c-0.248,0.006-0.491,0.012-0.734,0.012h-0.002c-4.461,0-8.316-1.542-11.154-4.449c-1.385-1.429-2.51-3.175-3.335-5.149  c-2.568,1.457-5.583,2.23-8.886,2.23C36.768,24.387,31.232,21.099,28.271,15.665z"/><path d="M95.928,10.027c0,2.014-1.632,3.641-3.643,3.641c-2.012,0-3.641-1.627-3.641-3.641  c0-2.008,1.629-3.641,3.641-3.641C94.296,6.386,95.928,8.019,95.928,10.027z"/><circle cx="28.686" cy="39.356" r="6.19"/><circle cx="33.175" cy="63.672" r="6.19"/><circle cx="55.873" cy="71.444" r="6.19"/><circle cx="53.093" cy="46.723" r="6.19"/><path d="M78.326,7.604c0,3.146-2.554,5.7-5.704,5.7c-3.148,0-5.702-2.554-5.702-5.7c0-3.152,2.554-5.707,5.702-5.707  C75.772,1.896,78.326,4.452,78.326,7.604z"/><circle cx="93.014" cy="29.325" r="4.006"/></svg>' +
    langCookie[userLang] +
    '</p>'
  );
 }
}

function popolateTutorial() {
 var shortTile = '';
 var searchTile = '';

 tableSearchSearch = listSearchEngine();
 tableSearchShortcut = listShortcut();

 for (var x = 0; x < tableSearchShortcut.length; x++) {
  var cell = tableSearchShortcut[x].split(' ');
  cell[2] = cell[2].split('_').join(' ');
  shortTile =
   shortTile +
   '<div class="tile" title="' +
   cell[1] +
   '"><div class="circle"><p>' +
   secretKey +
   '+' +
   cell[0] +
   '</p></div><p>' +
   cell[2] +
   '</p></div>';
 }

 for (var x = 0; x < tableSearchSearch.length; x++) {
  var cell = tableSearchSearch[x].split(' ');
  cell[2] = cell[2].split('_').join(' ');
  searchTile =
   searchTile +
   '<div class="tile" title="' +
   cell[1] +
   '"><div class="circle"><p>' +
   cell[0] +
   '</p></div><p>' +
   cell[2] +
   '</p></div>';
 }

 var tutorialTab =
  "<div class='card'><div class='left'>" +
  langTutorial[userLang][6] +
  "</div><div class='right'>" +
  langTutorial[userLang][7] +
  '</div></div>';

 var tutorialBackground =
  "<div id='setBackground' class='card'><div class='left'>" +
  langTutorial[userLang][11] +
  "</div><div class='right'>" +
  langTutorial[userLang][8] +
  '</div></div>';

 var tutorialMail =
  "<div id='sendMail' class='card'><div class='left'>" +
  langTutorial[userLang][9] +
  "</div><div class='right'>" +
  langTutorial[userLang][10] +
  '</div></div>';

 var tutorialReset =
  "<div id='resetTinooo' class='card'><div class='left'>" +
  langTutorial[userLang][12] +
  "</div><div class='right'>" +
  langTutorial[userLang][13] +
  '</div></div>';

 var tutorialShort =
  "<div class='card'><div class='left'>" +
  langTutorial[userLang][2] +
  "</div><div class='right'>" +
  langTutorial[userLang][3] +
  "</div><div class='list'>" +
  shortTile +
  '</div></div>';

 var tutorialSearch =
  "<div class='card'><div class='left'>" +
  langTutorial[userLang][0] +
  "</div><div class='right'>" +
  langTutorial[userLang][1] +
  "</div><div class='list'>" +
  searchTile +
  '</div></div>';

 var tutorialHistory =
  "<div class='card'><div class='left'>" +
  langTutorial[userLang][4] +
  "</div><div class='right'>" +
  langTutorial[userLang][5] +
  '</div></div>';

 var settingsTinooo =
  "<div class='card firstCard'><h3>" +
  langTutorial[userLang][14] +
  '</h3><p>' +
  langTutorial[userLang][15] +
  '</p></div>';

 //var languageTinooo = "<div class='card language'><div class='left'>"+langTutorial[userLang][16]+"</div><div class='right'><a onclick='changeLanguage(\"IT\")'>Italiano</a>, <a onclick='changeLanguage(\"EN\")'>Inglese</a></div></div>";

 contentHelp =
  settingsTinooo +
  tutorialShort +
  tutorialSearch +
  tutorialHistory +
  tutorialTab +
  tutorialBackground +
  tutorialMail +
  tutorialReset;

 return "<div class='help-content'>" + contentHelp + '</div>';
}

function changeLanguage(x) {
 localStorage.setItem('LANGUAGE', x);
 location.reload();
}

function setBackground() {
 if (localStorage.getItem('SETBACKGROUND') == 1) {
  $('html,body').addClass('backgroundImage');
 } else {
  $('html,body').removeClass('backgroundImage');
 }
}

function openHelp() {
 deleteCookieTile();
 $('.tutorial').toggle();
 $('.help').toggleClass('closeBtn');
 if ($('.btnHelp').text() == 'CLOSE') {
  $('.btnHelp').text('HELP');
 } else {
  $('.btnHelp').text('CLOSE');
 }
 $('.tutorial .text-help').html(popolateTutorial());
 $('#setBackground').on('click', function() {
  $('html,body').toggleClass('backgroundImage');
  if (localStorage.getItem('SETBACKGROUND') == 1) {
   localStorage.setItem('SETBACKGROUND', 0);
  } else {
   localStorage.setItem('SETBACKGROUND', 1);
  }
 });
 $('#sendMail').on('click', function() {
  window.open('mailto:me@merliandrea.com', '_self');
 });
 $('#resetTinooo').on('click', function() {
  localStorage.clear();
  location.reload();
 });
}

$(function() {
 getColorBackground();

 //FOCUS - TODO: done
 $('input').focus();
 $('html,body').on('click', function() {
  $('input').focus();
 });

 //COLORE SFONDO
 setInterval(function() {
  getColorBackground();
 }, 100);

 //MOTORI DI RICERCA
 lSearchEngine = listSearchEngine();
 lShortcut = listShortcut();
 socialBtn();

 //DIGITA TESTO IN INPUT - TODO:
 $(document).keyup(function(t) {
  18 == t.which && openHelp(); //alt
  13 == t.which && searchWithBrain(); //enter
  38 == t.which && textSearch(1); //up
  40 == t.which && textSearch(0); //down
 });
 $('input').keyup(function() {
  searchWithBrain(1);
 });

 //CLICK HELP
 $('.help').on('click', openHelp);

 //COOKIE, SFONDO IMMAGINE
 controlCookie();
 setBackground();
});
