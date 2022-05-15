/* unten links ausschaltbare anzeige
von Punkten der jeweligen Spieler spaeter Teams
mit gesondereten Abschinnten jeweils ueber 30 und ueber 60 und schwarz


end of game section, alle Punkte / Spieler werden angezeigt //3d tabellen wie in github??? wie geht das

Englisch - Deutsch Button


shortcuts

fold all fn shift 3 & 4
fold     fn shitf 1 & 2

move selected left right ctrl [
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 416;
canvas.height = 416;

var deck = new DECK();

var spieler = [];
var KIpos;



