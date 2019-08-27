#target Illustrator

//  Check if no window is open
(function init() {
  if(documents.length < 1) { 
    return; 
  } else {
    unlockDelete ();
    removeSwatches ();
    convertBlacks();
  }
})();

// Unloack All Layers and Delete Hidden Layers
function unlockDelete () {
var myDoc=app.activeDocument;
var layerCount=myDoc.layers.length;

for (var ii = layerCount - 1; ii >= 0; ii--) {
    var currentLayer = myDoc.layers[ii];
    currentLayer.locked = false;
    if (currentLayer.visible == false){
        currentLayer.visible = true;
        currentLayer.remove();
        }
    }
}

// Remove All Swatches except for Pantone 485C and 185C
function removeSwatches () {
var myDoc=app.activeDocument;
var sw = myDoc.swatches;
var slen = sw.length;

for (var ii = slen - 1; ii >= 0; ii--) {
    var currentSw = sw[ii];
    if (currentSw.name == "PANTONE 185 C" || currentSw.name == "PANTONE 485 C"){
        } else {
            currentSw.remove();
        }
    }
    }

// Convert CMYK Blacks to just K Blacks
function convertBlacks() {
  //  Set Limits
  var minBlack = 70;
  var minCoverage = 200;
  var maxSaturation = 20;  
  
  var myDoc = app.activeDocument;

  with (myDoc) {

    // Convert if document isn't CMYK
    if(documentColorSpace !== DocumentColorSpace.CMYK) {
      app.executeMenuCommand('doc-color-cmyk');
    }

    // Extend CMYKColor object with coverage calculation method
    CMYKColor.getCoverage = function(color) {
      return color.black + color.cyan + color.magenta + color.yellow;
    };

    // Extend CMYKColor object with saturation calculation method
    CMYKColor.getSaturation = function(color) {
      return Math.max(color.cyan, color.magenta, color.yellow) - Math.min(color.cyan, color.magenta, color.yellow);
    };

    // Create flat black Color
    flatBlack = new CMYKColor();
    flatBlack.black = 100;

    // Iterate through all path items
    for (var i = 0; i < pathItems.length; i++) {
      with (pathItems[i]) {
        if (filled == true && fillColor instanceof CMYKColor) {
          // If black exceeds minBlack clip it to flat black (100%K)
          if (fillColor.black >= minBlack && CMYKColor.getSaturation(fillColor) <= maxSaturation && CMYKColor.getCoverage(fillColor) >= minCoverage) fillColor = flatBlack;
        }
        if (stroked == true && strokeColor instanceof CMYKColor) {
          if (strokeColor.black >= minBlack && CMYKColor.getSaturation(strokeColor) <= maxSaturation && CMYKColor.getCoverage(strokeColor) >= minCoverage) strokeColor = flatBlack;
        }
        if (filled == true && fillColor instanceof SpotColor) {
          if (fillColor.spot.color.black >= minBlack && CMYKColor.getSaturation(fillColor) <= maxSaturation && CMYKColor.getCoverage(fillColor) >= minCoverage) fillColor.spot.color = flatBlack;
        }
        if (stroked == true && strokeColor instanceof SpotColor) {
          if (strokeColor.spot.color.black >= minBlack && CMYKColor.getSaturation(strokeColor) <= maxSaturation && CMYKColor.getCoverage(strokeColor) >= minCoverage) strokeColor.spot.color = flatBlack;
        }
      }
    }
    
    // Iterate through text items as well
    for (var j = 0; j < stories.length; j++) {
      with (stories[j]) {
        for (var k = 0; k < characters.length; k++) {
          with (characters[k].characterAttributes) {
            if (fillColor instanceof CMYKColor) {
              if (fillColor.black >= minBlack && CMYKColor.getSaturation(fillColor) <= maxSaturation && CMYKColor.getCoverage(fillColor) >= minCoverage) fillColor = flatBlack;
            }
            if (strokeColor instanceof CMYKColor) {
              if (strokeColor.black >= minBlack && CMYKColor.getSaturation(strokeColor) <= maxSaturation && CMYKColor.getCoverage(strokeColor) >= minCoverage) strokeColor = flatBlack;
            }
            if (fillColor instanceof SpotColor) {
              if (fillColor.spot.color.black >= minBlack && CMYKColor.getSaturation(fillColor) <= maxSaturation && CMYKColor.getCoverage(fillColor) >= minCoverage) fillColor.spot.color = flatBlack;
            }
            if (strokeColor instanceof SpotColor) {
              if (strokeColor.spot.color.black >= minBlack && CMYKColor.getSaturation(strokeColor) <= maxSaturation && CMYKColor.getCoverage(strokeColor) >= minCoverage) strokeColor.spot.color = flatBlack;
            }
          }
        }
      }
    }
  }
}