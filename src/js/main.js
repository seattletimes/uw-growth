// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var savage = require("savage-query");

var $ = require("./lib/qsa.js");

var year = 2003;

var keyedBuildingData = {};
buildingData.forEach(function(row) {
  keyedBuildingData[row.FACILITY_CODE] = row;
})

var buildings = $("g").filter(function(b) {
  return b.getAttribute("data-name");
}).concat($("polygon").filter(function(b) {
  return b.getAttribute("data-name");
})).concat($("polyline").filter(function(b) {
  return b.getAttribute("data-name");
})).concat($("path").filter(function(b) {
  return b.getAttribute("data-name");
}));

var color = function() {
  document.querySelector(".year").innerHTML = year;
  buildings.forEach(function(b) {
    var name = b.getAttribute("data-name");
    if (!keyedBuildingData[name]) return;
    if (keyedBuildingData[name]["BUILDING AGE"] > year) {
      savage(b).addClass("hidden");
    } else if (keyedBuildingData[name]["RENOVATION AGE"] > year) {
      savage(b).removeClass("old-renovation");
    } else if (keyedBuildingData[name]["BUILDING AGE"] == year) {
      savage(b).removeClass("hidden");
      savage(b).removeClass("old");
      savage(b).addClass("new");
    } else if (keyedBuildingData[name]["RENOVATION AGE"] == year) {
      savage(b).removeClass("old-renovation");
      savage(b).addClass("new-renovation");
    } else if (keyedBuildingData[name]["BUILDING AGE"] >= 2003) {
      savage(b).removeClass("new");
      savage(b).addClass("old");
    } else if (keyedBuildingData[name]["RENOVATION AGE"] >= 2003 && keyedBuildingData[name]["RENOVATION AGE"] < year) {
      savage(b).removeClass("new-renovation");
      savage(b).addClass("old-renovation");
    }
  })

  if (year == 2016) {
    year = 2003;
    setTimeout(color, 3000);
  } else {
    year += 1;
    setTimeout(color, 1000);
  }
};

color();