var allSongs = [];
var playCount=0;
var tmp = [];
var playing = false;
var Player;
var original = [];
var Genres = ["Rap", "HipHop", "Electronic"];
var Artists = ["Above and Beyond", "Dash Berlin", "Third Eye Blind"];
var Moods = ["Angry", "Calming", "Energetic"];
var Decades = ["2010's"];
//DECLARING NEW SONG
function newSong(name, artist, decade, mood, genre)
{
  //DECLARATIONS
    var song = {};
    var check = false;
    var genreScores = {};
    var artistScores = {};
    var decadeScores = {};
    var moodScores = {};
    var songScore = 0;
    song.name = name;
    //ARTIST
    song.artist = artist;
    for (var x = 0; x < Artists.length; x++){
      if (song.artist == Artists[x]){
        check = true;
      }
    }
    if (check == false){
      Artists.push(song.artist);
    }
    check = false;
    //DECADE
    song.decade = decade;
    for (var x = 0; x < Decades.length; x++){
      if (song.decade == Decades[x]){
        check = true;
      }
    }
    if (check == false){
      Decades.push(song.decade);
    }
    //MOOD
    song.mood = mood;
    for (var x = 0; x < Moods.length; x++){
      if (song.mood == Moods[x]){
        check = true;
      }
    }
    if (check == false){
      Moods.push(song.mood);
    }
    //GENRE
    for (var x = 0; x < Genres.length; x++){
      if (song.genre == Genres[x]){
        check = true;
      }
    }
    if (check == false){
      Genres.push(song.genre);
    }
    //SCORESTUFF
    
    //ENDSTUFF
    allSongs.push(song);
}
//JSON CONVERSION
$.get("https://pureaudio-superninjacodemonkey.c9users.io/api.php", function(data) {
  var json = JSON.parse(data);
  for (var i in json) {
    if (json[i] !== '.' && json[i] !== '..') {
      tmp = json[i].substring(0, json[i].length - 4).split("-");
      newSong(tmp[0], tmp[1], tmp[4], tmp[3], tmp[2]);
    }
    original[i] = "Music/"+tmp[0]+"-"+tmp[1]+"-"+tmp[2]+"-"+tmp[3]+"-"+tmp[4]+".mp3";
  }
});
//BUTTON CHANGING
var x = 0;
$( ".play-button" ).click(function() {
  if (playCount == 0){
    playCount++;
    playSong(allSongs[x], x);
    playing = true;
  }
  if (!playing){
    Player.play();
    playing = true;
  }
  else if (playing){
    Player.pause();
    playing = false;
  }
  $(".play-button").toggleClass("glyphicon-pause");
  $(".play-button").toggleClass("glyphicon-play");
});
//PLAYING MUSIC
function playSong(song, num){
  $("#songTitle" ).text(song.name);
  $("#songArtist").text(song.artist);
  Player = new Audio();
  Player.src = original[num];
  if (Player.ended || ){
    x++;
  }
}