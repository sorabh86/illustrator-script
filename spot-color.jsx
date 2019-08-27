#target Illustrator

var arrayOfSpotColor = [
	// HOT GREEN 26 = CMYK(54,0,100,0)
	{name:"HOT GREEN 26", cmyk:[54,0,100,0]},
	// Acerbis Teal to cmyk(59,0,44,0)
	{name:"Acerbis Teal", cmyk:[59,0,44,0]},
	// you can add more spot color below
];

var doc = app.activeDocument;

for(var i=0; i<arrayOfSpotColor.length; i++) {
	var spot = arrayOfSpotColor[i];

	addSpot (spot.name, spot.cmyk[0], spot.cmyk[1], spot.cmyk[2], spot.cmyk[3]); 
	// addSpot ('FOIL', 10, 0, 100, 0); 

}

for(var i = 0; i<doc.pathItems.length; i++) {
	var item = doc.pathItems[i];
	// item.filled = true;  
	// item.stroked = false;  
	// item.strokeWidth = 2;  
	// item.strokeOverprint = true;  
	// item.strokeColor = doc.swatches.getByName("FOIL").color;  
	item.fillColor = doc.swatches.getByName(arrayOfSpotColor[0].name).color;  
	// item.fillColor.tint = 50;
}
  
  
function addSpot(name, c, m, y, k) {  
    try {  
		// alert('swatch'+swatch);
        var swatch = doc.swatches[name]; // if swatch exists....  
		// addSpot (name+='1', c, m, y, k); // ...add 1 to swatch name  
    }  
    catch (e) {  
		// alert('swatch'+e);  
        var newSpot = doc.spots.add();  
        newSpot.name = name;  
         
        var newColor = new CMYKColor();  
        newColor.cyan = c;  
        newColor.magenta = m;  
        newColor.yellow = y;  
        newColor.black = k;  
  
        newSpot.colorType = ColorModel.SPOT;  
        newSpot.color = newColor;  
        var newSpotColor = new SpotColor();  
		newSpotColor.spot = newSpot;
    }  
}  