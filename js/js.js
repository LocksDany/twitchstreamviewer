var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "faker", "ESL_LOL", "TSM_Dyrus", "SidecarAngel", "UnicornDev", "MushIsGosu", "tvBREKAN", "idolmariya", "comster404", "brunofin"];
var html = '';
var ready = 0;
var readyChannel = 0;
var Channel = [];    
var Streams = [];
var clicked = false;

$(document).ready(function(){

//Get Channel Info
function getChannel(channel){
    $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + channel, function(c){
    Channel.push(c);
    readyChannel++;
        
        if(c.status == 404){
            
            $('#' + channel + 'Status').html('<h4 style="color:Red">' + c.message + '</h4>');
            console.log('found ' + channel);
            
        }

});
}

    //Get Streaming Info
function getStream(channel){
    
    
$.ajax({
    
    url: "http://wind-bow.gomix.me/twitch-api/streams/" + channel,      
    type: "GET",
    dataType: "jsonp",
    success: function(json){
    
    Streams.push(json);
    
    //Set HTML If it's Streaming
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
    
    //Set Html if it's not Streaming
    function setHtmlFail() {
        
        html += '<div class="col-md-4 twitch-stream offline" id="' + channel + '"'; 
        
        html += ' style="background-image:url(\'https://www.overclock3d.net/gfx/articles/2015/07/01065404146l.jpg\')">';
        
        html += '<div class="content row"><p class="col-md-12" id="'+ channel +'Status">'+ channel +' is currently offline</p>';
        
        html += '<br><br><br><br><br><br><br><br><br><br><br><br><br>';
        
        html +='<p class="col status"><span class="status pull-right" style="background-color:red">Offline</span></p>';
        
        html += '</div></div>'
        
    }
    
    //If it's Streaming
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
        
        //Set Game Name if it is short enough
        setHtmlSuccess(json.stream.game);
        
        // If it's not Streaming
        } else {

            setHtmlFail();
            
        }
    
    //Add 1 count to ready var
    ready += 1;
    
    //When the count reaches the end
    if(ready == users.length){
        
        $('#streams').html(html);
        
        getAllStreams(getChannel);
        
    }
    },
    
    xhrFields: {
        withCredentials:false
    }
    
});}

//Repeat function for all Channels
function getAllStreams(funct){
    for(var i = 0; i < users.length; i++){
        funct(users[i]);
}
}
    
$('#displayOffline').on('click', function(){
    
   if(clicked == false){
       $('.offline').addClass('displayNone')
       $('#displayOffline').html('Enable Offline');
       $('#displayOffline').css('color', '#F7F7F7');
       $('#displayOffline').css('background-color', '#6341A5');
       clicked = true;
   } else {
       $('.offline').removeClass('displayNone');
       $('#displayOffline').html('Disable Offline');
       $('#displayOffline').css('color', '#6341A5');
       $('#displayOffline').css('background-color', '#F7F7F7');
       clicked = false;
   }
    
});

getAllStreams(getStream);
    
console.log(Channel);
console.log(Streams);
});

