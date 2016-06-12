/*jslint browser: true, nomen: true, plusplus: true, vars: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
    'use strict';
    
    var channels = ["ESL_SC2", "OgamingSC2", "firstchannel", "cretetion", "freecodecamp", "unknown", "storbeck", "habathcx", "RobotCaleb", "somechannel", "noobs2ninjas"];
    var url = "https://api.twitch.tv/kraken/streams/";
    var callback = "?callback=?";
    var i = 0;
    
    function getTwitchInfo(index) {
        
        $.getJSON(url + channels[index] + callback, function(data) {
            
            // if channel does not exist
            if (data.error) {
                $(".channel-list").append("<div class='channel-item channel-item-unavailable'><img class='channel-logo' src='images/not-exist.png'/><span class='channel-name channel-name-unavailable'>" + channels[index] + "</span><span class='channel-game'>" + data.message + "</span></div>");
            }
            
            // if channel not streaming
            else if (!data.stream) {
                var channelName = data._links.self.split('/').pop();
                $(".channel-list").append("<div class='channel-item channel-item-offline'><img class='channel-logo' src='images/no_logo.png'/><span class='channel-name channel-name-offline'>" + channelName + "</span><span class='channel-game'>Not streaming.</span></div>");
            }
            
            // if channel streaming now
            else if (data.stream) {
                $(".channel-list").append("<div class='channel-item channel-item-online'><img class='channel-logo' src='" + data.stream.channel.logo + "'/><a href='" + data.stream.channel.url + "' class='channel-name channel-name-online' target='_blank'>" + data.stream.channel.display_name + "</a><span class='channel-game'>" + data.stream.channel.status + "</span></div>");
            }
        });
        
    }
    
    for (i = 0; i < channels.length; i++) { getTwitchInfo(i); }
    
    
    $(".btn").click(function(){
        
        if ($(".btn-all").prop("checked")) {
            $(".channel-item-offline").show();
            $(".channel-item-online").show();
        }
        else if ($(".btn-online").prop("checked")) {
            $(".channel-item-offline").hide();
            $(".channel-item-online").show();
        }
         else if ($(".btn-offline").prop("checked")) {
            $(".channel-item-offline").show();
            $(".channel-item-online").hide();
        }
        
        if ($(".btn-unavailable").prop("checked")) { $(".channel-item-unavailable").show(); }
        else { $(".channel-item-unavailable").hide(); }
    });
    
});