$(document).ready(function(){

var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "faker", "ESL_LOL", "TSM_Dyrus", "SidecarAngel", "UnicornDev", "MushIsGosu", "tvBREKAN", "idolmariya", "comster404"];
var html = '';
var ready = 0;
var readyChannel = 0;
var Channel = [];    
var Streams = [];


function filter404(c){
    if(c.status == 404){
        $('#' + c.display_name).attr('disabled','disabled');
        $("#" + c.display_name + 'Status').html("Doesn't Exist");
        console.log('found');
    }
}
    
    
function getStream(channel){

$.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + channel, function(c){

    Channel.push(c);
    readyChannel++;
    
});
    
    
    
$.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + channel, function(json){
    
    Streams.push(json);
    
    function setHtmlSuccess(Game){
        
        html += '<a href="https://www.twitch.tv/' + channel + '/">';
        
        html += '<div class="col-md-4 twitch-stream" style="background-image:url(\'' + json.stream.preview.large + '\')">';
        
        html += '<div class="content row"><p class="col-md-12">' + Game + '</p>';
        
        html += '<h4 class="col-md-12">' + json.stream.channel.status + '</h4>';
        
        html += '<p class="col pull-right">' + json.stream.channel.display_name + '</p>';
        
        html += '<br><br><br><br><br><br><br><br><br><br><br><br><br>';
        
        html += '<p class="col status"><i class="glyphicon glyphicon-eye-open"></i> ' + json.stream.viewers;
        
        html +='<span class="status pull-right" style="background-color:green">Live</span></p>';
        
        html +='</div></div></a>';
        
    }
    
    function setHtmlFail() {
        
        html += '<div class="col-md-4 twitch-stream offline" id="' + channel + '"'; 
        
        html += ' style="background-image:url(\'https://www.overclock3d.net/gfx/articles/2015/07/01065404146l.jpg\')">';
        
        html += '<div class="content row"><p class="col-md-12" id="'+ channel +'Status">' + channel + ' is currently offline</p>';
        
        html += '<br><br><br><br><br><br><br><br><br><br><br><br><br>';
        
        html +='<p class="col status"><span class="status pull-right" style="background-color:red">Offline</span></p>';
        
        html += '</div></div>'
        
    }
    
    if(json.stream != null){
        
        
        //Check for Game length, if it's too logn it'll shorten it
        if(json.stream.game.length >= 40){

            var game = json.game.length.split('');
            var fGame = [];
            
            for(var i = 0; i < 38; i++){
                fGame.push(game[i]);
            }
            
            fGame.push('...');
            fGame.join('');
            
            setHtmlSuccess(fGame);
            
        }
        
        setHtmlSuccess(json.stream.game);
        
        } else {
            
            setHtmlFail();
            
        }
    ready += 1;
    if(ready == users.length){
        $('#streams').html(html);
        
        for(var i = 0; i<Channel.length;i++){
            filter404(Channel[i]);
        }
        
    }
    });}

function getAllStreams(){
    for(var i = 0; i < users.length; i++){
        getStream(users[i]);
}
}
    
getAllStreams(); 
console.log(Channel);
console.log(Streams);
});