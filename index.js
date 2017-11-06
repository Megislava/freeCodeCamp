var channels = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];

channels.forEach(function(channel) {
  function makeURL(type, name) {
    return (
      "https://wind-bow.gomix.me/twitch-api/" +
      type +
      "/" +
      name +
      "?callback=?"
    );
  }
  $.getJSON(makeURL("streams", channel), function(data) {
    var game, status;
    if (data.stream === null) {
      game = "Offline";
      status = "offline";
    } else if (data.stream === undefined) {
      game = "Account closed";
      status = "offline";
    } else {
      game = data.stream.game;
      status = "online";
    };
    $.getJSON(makeURL("channels", channel), function(data) {
      var logo = data.logo != null ? data.logo : "images/twitch-favicon.png",
        name = data.display_name != null ? data.display_name : channel,
        description = status === "online" ? ": " + data.status : "";
      var html =
        '<div class="row channel ' +
        status +
        '"><div class="col-xs-2 col-sm-3" id="icon"><img src="' +
        logo +
        '" class="logo"></div><div class="col-xs-10 col-sm-8 name" id="name"><a href="' +
        data.url +
        '" target="_blank">' +
        name +
        '</a></div><div class="col-xs-10 col-sm-8 game" id="streaming">' +
        game +
        '<span class="hidden-xs">' +
        description +
        "</span></div></div>";
      status === "online"
        ? $("#streamer").prepend(html)
        : $("#streamer").append(html);
    });
  });
});

$(document).ready(function() {
  $(".selector").click(function() {
    var choice = $(".selector");
    var cat = $(this).attr("id");

    if (cat === "all") {
      choice.removeClass("active");
      $("#all").addClass("active");
      $("#online, #offline").removeClass("hidden");
    } else if (cat = "online") {
      choice.removeClass("active");
      $("#online").addClass("active");
      $("#online").removeClass("hidden");
      $("#offline").addClass("hidden");
    } else if (cat === "offline") {
      choice.removeClass("active");
      $("#offline").addClass("active");
      $("#offline").removeClass("hidden");
      $("#online").addClass("hidden");
    }
  });
});