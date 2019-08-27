#target Illustrator
/**
 * Author : Sorabh <ssorabh.ssharma@hotmail.com>
 * Description : This script convert illustrator RGB Document to CMYK, then change specific RGB color to Specific CMYK colors
 * URI : https://sorabh86.github.io/ 
 */

/**
 * This array is used for adding spot colors to swatches
 */
var arrayOfSpotColor = [
	// HOT GREEN 26 = CMYK(54,0,100,0)
	{name:"HOT GREEN 26", cmyk:[54,0,100,0]},
	// Acerbis Teal to cmyk(59,0,44,0)
	{name:"Acerbis Teal", cmyk:[59,0,44,0]},
	// You can add more spot color below by uncommenting
	// {name:"HOT GREEN 26", cmyk:[54,0,100,0]},
];
// Iterate on spotcolor and add them to swatches.
for(var i=0; i<arrayOfSpotColor.length; i++) {
	var spot = arrayOfSpotColor[i];
	addSpotByCMYK(spot.name, spot.cmyk[0], spot.cmyk[1], spot.cmyk[2], spot.cmyk[3]);
}

if(documents.length < 1) {
	alert("No Document is Opened or selected");
} else {
	// var s = confirm("It will replace all colors, Are you sure?");
	// if(s) {
		convertColors();
	// 	alert("Your colors have been replaced");
	// }
}

function addSpotByCMYK(name, c, m, y, k) { 
	var doc = app.activeDocument;

    try {  
        swatch = doc.swatches[name]; // if swatch exists....  
        // addSpot (name+='1', c, m, y, k); // ...add 1 to swatch name  
    }  
    catch (e) {  
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

function convertColors() {
	var myDoc = app.activeDocument;
	var text = "";

	with(myDoc) {
		// change document type rgb to cmyk
		if(documentColorSpace == DocumentColorSpace.RGB) {
			app.executeMenuCommand('doc-color-cmyk');
		}
		
		// Iterate through all path Items
		for(var i = 0; i < pathItems.length; i++) {
			with(pathItems[i]) {
				
				if(filled == true && fillColor instanceof CMYKColor) {
					var C = Math.round(fillColor.cyan);
					var M = Math.round(fillColor.magenta);
					var Y = Math.round(fillColor.yellow);
					var K = Math.round(fillColor.black);
					
					var rgb2 = convertColor([C,M,Y,K]);
					var R = Math.round(rgb2[0]);
					var G = Math.round(rgb2[1]);
					var B = Math.round(rgb2[2]);

					text += "R:"+Math.round(rgb2[0])+" G:"+Math.round(rgb2[1])+" B:"+Math.round(rgb2[2])+
							", C:"+Math.round(C)+" M:"+Math.round(M)+" Y:"+Math.round(Y)+" K:"+Math.round(K)+
							"\n";

					//////////////////////////////////////////////////////////////////////////////////////
                                      // BLACKS & GRAYS //
				//////////////////////////////////////////////////////////////////////////////////////
					// Convert BLACK rgb(0,0,0) to cmyk(0,0,0,100)
					if(R == 0 && G == 0 && B == 0) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 0;
						fillColor.black = 100;
					}
					// Convert OLD-RGB(119,119,119) 	 NEW-RGB(119,120,120) Dark Gray to cmyk(0,0,0,70)
					if(R == 119 && G == 120 && B == 120) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 0;
						fillColor.black = 70;
					}
					// Convert OLD-RGB(187,187,187) 	 NEW-RGB(187,188,187) Light Gray to cmyk(0,0,0,30)
					if(R == 187 && G == 188 && B == 187) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 0;
						fillColor.black = 30;
					}
					// Convert OLD-RGB(247,244,243) 	 NEW-RGB(247,245,245) Fake White to cmyk(0,0,0,0)
					if(R == 187 && G == 188 && B == 187) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					
					//////////////////////////////////////////////////////////////////////////////////////
                                      // Reds //
				//////////////////////////////////////////////////////////////////////////////////////
				// Convert OLD-RGB(80,0,0) 	 NEW-RGB(75,18,17) Dark Red to cmyk(0,100,100,70)
					if(R == 75 && G == 18 && B == 17) {
						fillColor.cyan = 0;
						fillColor.magenta = 100;
						fillColor.yellow = 100;
						fillColor.black = 70;
					}
					// Convert OLD-RGB(160,0,0) 	 NEW-RGB(158,28,32) Medium-Dark Red to cmyk(0,100,100,40)
					if(R == 158 && G == 28 && B == 32) {
						fillColor.cyan = 0;
						fillColor.magenta = 100;
						fillColor.yellow = 100;
						fillColor.black = 40;
					}
					// Convert OLD-RGB(215,26,30) 	 NEW-RGB(214,31,38) Honda Red to cmyk(0,100,100,0)
					if(R == 214 && G == 31 && B == 38) {
						fillColor.cyan = 0;
						fillColor.magenta = 100;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(255,83,83) 	 NEW-RGB(240,86,86) Medium Light Red to cmyk(0,82,63,0)
					if(R == 240 && G == 86 && B == 86) {
						fillColor.cyan = 0;
						fillColor.magenta = 82;
						fillColor.yellow = 63;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(255,181,181) 	 NEW-RGB(248,179,180) Light Red to cmyk(0,36,18,0)
					if(R == 248 && G == 179 && B == 180) {
						fillColor.cyan = 0;
						fillColor.magenta = 36;
						fillColor.yellow = 18;
						fillColor.black = 0;
					}
					
										//////////////////////////////////////////////////////////////////////////////////////
                                      // Purples & Pinks //
				//////////////////////////////////////////////////////////////////////////////////////
				// Convert OLD-RGB(57,35,214) 	 NEW-RGB(71,76,160) Purple to cmyk(85,81,0,0)
					if(R == 71 && G == 76 && B == 160) {
						fillColor.cyan = 85;
						fillColor.magenta = 81;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(154,3,254) 	 NEW-RGB(122,81,161) Purple Pink to cmyk(61,81,0,0)
					if(R == 122 && G == 81 && B == 161) {
						fillColor.cyan = 61;
						fillColor.magenta = 81;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(255,0,128) 	 NEW-RGB(237,30,127) Magenta to cmyk(0,100,0,0)
					if(R == 237 && G == 30 && B == 127) {
						fillColor.cyan = 0;
						fillColor.magenta = 100;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(255,104,221) 	 NEW-RGB(216,116,174) Medium Light Pink to cmyk(0,70,0,0)
					if(R == 216 && G == 116 && B == 174) {
						fillColor.cyan = 0;
						fillColor.magenta = 70;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					// OLD-RGB(255,172,236) 	 NEW-RGB(235,174,207) Light Pink to cmyk(0,38,0,0)
					if(R == 235 && G == 174 && B == 207) {
						fillColor.cyan = 0;
						fillColor.magenta = 38;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					//////////////////////////////////////////////////////////////////////////////////////
                                      // Oranges & Browns //
				//////////////////////////////////////////////////////////////////////////////////////
				// Convert OLD-RGB(168,99,0) 	 NEW-RGB(167,101,39) Dark Orange to cmyk(27,63,100,15)
					if(R == 167 && G == 101 && B == 39) {
						fillColor.cyan = 27;
						fillColor.magenta = 63;
						fillColor.yellow = 100;
						fillColor.black = 15;
					}
					// Convert OLD-RGB(119,62,0) 	 NEW-RGB(119,65,27) Brown to cmyk(35,73,100,39)
					if(R == 119 && G == 65 && B == 27) {
						fillColor.cyan = 35;
						fillColor.magenta = 73;
						fillColor.yellow = 100;
						fillColor.black = 39;
					}
					// Convert OLD-RGB(236,96,0) 	 NEW-RGB(234,98,36) KTM Orange to cmyk(0,70,100,0)
					if(R == 234 && G == 98 && B == 36) {
						fillColor.cyan = 0;
						fillColor.magenta = 70;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(247,155,0) 	 NEW-RGB(245,156,30) Sun Orange to cmyk(0,40,100,0)
					if(R == 245 && G == 156 && B == 30) {
						fillColor.cyan = 0;
						fillColor.magenta = 40;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(255,222,162) 	 NEW-RGB(255,221,162) Light Orange to cmyk(0,13,41,0)
					if(R == 255 && G == 221 && B == 162) {
						fillColor.cyan = 0;
						fillColor.magenta = 13;
						fillColor.yellow = 41;
						fillColor.black = 0;
					}
					
					//////////////////////////////////////////////////////////////////////////////////////
                                      // Yellows //
				//////////////////////////////////////////////////////////////////////////////////////
				
				// Convert OLD-RGB(97,102,0) 	 NEW-RGB(98,104,45) Dark Yellow to cmyk(0,0,100,65)
					if(R == 98 && G == 104 && B == 45) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 100;
						fillColor.black = 65;
					}
					// Convert OLD-RGB(255,206,0) 	 NEW-RGB(253,206,7) Golden Yellow to cmyk(0,18,100,0)
					if(R == 253 && G == 206 && B == 7) {
						fillColor.cyan = 0;
						fillColor.magenta = 18;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(255,255,0) 	 NEW-RGB(247,236,15) Yellow to cmyk(0,0,100,0)
					if(R == 247 && G == 236 && B == 15) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(252,252,134) 	 NEW-RGB(249,241,138) Medium-Light Yellow to cmyk(0,0,58,0)
					if(R == 249 && G == 241 && B == 138) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 58;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(255,253,187) 	 NEW-RGB(251,247,190) Light Yellow to cmyk(0,0,32,0)
					if(R == 251 && G == 247 && B == 190) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 32;
						fillColor.black = 0;
					}
					
					//////////////////////////////////////////////////////////////////////////////////////
                                      // Greens //
				//////////////////////////////////////////////////////////////////////////////////////
				
				// Convert OLD-RGB(0,85,0) 	 NEW-RGB(30,85,42) Dark Green to cmyk(100,0,100,57)
					if(R == 30 && G == 85 && B == 42) {
						fillColor.cyan = 100;
						fillColor.magenta = 0;
						fillColor.yellow = 100;
						fillColor.black = 57;
					}
					// Convert OLD-RGB(132,196,0) 	 NEW-RGB(130,195,65) Hot Green to cmyk(54,0,100,0)
					if(R == 130 && G == 195 && B == 65) {
						fillColor.cyan = 54;
						fillColor.magenta = 0;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(81,169,11) 	 NEW-RGB(83,169,70) Kawasaki Green to cmyk(72,9,100,0)
					if(R == 83 && G == 169 && B == 70) {
						fillColor.cyan = 72;
						fillColor.magenta = 9;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(100,216,105) 	 NEW-RGB(115,193,103) Apple Green to cmyk(58,0,80,0)
					if(R == 115 && G == 193 && B == 103) {
						fillColor.cyan = 58;
						fillColor.magenta = 0;
						fillColor.yellow = 80;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(210,255,196) 	 NEW-RGB(213,233,191) Light Green to cmyk(30,0,30,0)
					if(R == 213 && G == 233 && B == 191) {
						fillColor.cyan = 30;
						fillColor.magenta = 0;
						fillColor.yellow = 30;
						fillColor.black = 0;
					}
					
					//////////////////////////////////////////////////////////////////////////////////////
                                      // Blues //
				//////////////////////////////////////////////////////////////////////////////////////
				
					// Convert OLD-RGB(0,0,68) 	 NEW-RGB(14,17,65) Navy Blue to cmyk(100,100,0,75)
					if(R == 14 && G == 17 && B == 65) {
						fillColor.cyan = 100;
						fillColor.magenta = 100;
						fillColor.yellow = 0;
						fillColor.black = 75;
					}
					// Convert OLD-RGB(0,73,166) 	 NEW-RGB(20,75,160) Royal Blue to cmyk(100,75,0,0)
					if(R == 20 && G == 75 && B == 160) {
						fillColor.cyan = 100;
						fillColor.magenta = 75;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(38,39,116) 	 NEW-RGB(45,45,114) Yamaha Blue to cmyk(100,100,23,10)
					if(R == 45 && G == 45 && B == 114) {
						fillColor.cyan = 100;
						fillColor.magenta = 100;
						fillColor.yellow = 23;
						fillColor.black = 10;
					}
					// Convert OLD-RGB(0,173,239) 	 NEW-RGB(47,171,225) Cyan to cmyk(100,0,0,0)
					if(R == 47 && G == 171 && B == 225) {
						fillColor.cyan = 100;
						fillColor.magenta = 0;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(0,255,255) 	 NEW-RGB(111,204,220) Light Blue to cmyk(60,0,0,0)
					if(R == 111 && G == 204 && B == 220) {
						fillColor.cyan = 60;
						fillColor.magenta = 0;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					
					
					//////////////////////////////////////////////////////////////////////////////////////
                                      // Premium Colors //
				//////////////////////////////////////////////////////////////////////////////////////
				
					// Convert OLD-RGB(0,255,153) 	 NEW-RGB(111,194,132) Acerbis Teal to cmyk(59,0,44,0)
					if(R == 111 && G == 194 && B == 132) {
						fillColor = swatches.getByName('Acerbis Teal').color;
						fillColor.tint = 100;
					}
					
					// Convert OLD-RGB(132,196,0)                  NEW-RGB(130,195,65) Hot Green to cmyk(54,0,100,0)
					if(R == 130 && G == 195 && B == 65) {
						fillColor = swatches.getByName('Hot Green 26').color;
						fillColor.tint = 100;
					}
	
				}
			}
		}

		// Iterate through text items
		for (var j = 0; j < stories.length; j++) {
			with (stories[j]) {
				for (var k = 0; k < characters.length; k++) {
					with (characters[k].characterAttributes) {
						if(filled == true && fillColor instanceof CMYKColor) {
							var C = Math.round(fillColor.cyan);
							var M = Math.round(fillColor.magenta);
							var Y = Math.round(fillColor.yellow);
							var K = Math.round(fillColor.black);
							
							var rgb2 = convertColor([C,M,Y,K]);
							var R = Math.round(rgb2[0]);
							var G = Math.round(rgb2[1]);
							var B = Math.round(rgb2[2]);
		
							text += "R:"+Math.round(rgb2[0])+" G:"+Math.round(rgb2[1])+" B:"+Math.round(rgb2[2])+
									", C:"+Math.round(C)+" M:"+Math.round(M)+" Y:"+Math.round(Y)+" K:"+Math.round(K)+
									"\n";
		
							//////////////////////////////////////////////////////////////////////////////////////
                                      // BLACKS & GRAYS //
				//////////////////////////////////////////////////////////////////////////////////////
					// Convert BLACK rgb(0,0,0) to cmyk(0,0,0,100)
					if(R == 0 && G == 0 && B == 0) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 0;
						fillColor.black = 100;
					}
					// Convert OLD-RGB(119,119,119) 	 NEW-RGB(119,120,120) Dark Gray to cmyk(0,0,0,70)
					if(R == 119 && G == 120 && B == 120) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 0;
						fillColor.black = 70;
					}
					// Convert OLD-RGB(187,187,187) 	 NEW-RGB(187,188,187) Light Gray to cmyk(0,0,0,30)
					if(R == 187 && G == 188 && B == 187) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 0;
						fillColor.black = 30;
					}
					// Convert OLD-RGB(247,244,243) 	 NEW-RGB(247,245,245) Fake White to cmyk(0,0,0,0)
					if(R == 187 && G == 188 && B == 187) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					
					//////////////////////////////////////////////////////////////////////////////////////
                                      // Reds //
				//////////////////////////////////////////////////////////////////////////////////////
				// Convert OLD-RGB(80,0,0) 	 NEW-RGB(75,18,17) Dark Red to cmyk(0,100,100,70)
					if(R == 75 && G == 18 && B == 17) {
						fillColor.cyan = 0;
						fillColor.magenta = 100;
						fillColor.yellow = 100;
						fillColor.black = 70;
					}
					// Convert OLD-RGB(160,0,0) 	 NEW-RGB(158,28,32) Medium-Dark Red to cmyk(0,100,100,40)
					if(R == 158 && G == 28 && B == 32) {
						fillColor.cyan = 0;
						fillColor.magenta = 100;
						fillColor.yellow = 100;
						fillColor.black = 40;
					}
					// Convert OLD-RGB(215,26,30) 	 NEW-RGB(214,31,38) Honda Red to cmyk(0,100,100,0)
					if(R == 214 && G == 31 && B == 38) {
						fillColor.cyan = 0;
						fillColor.magenta = 100;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(255,83,83) 	 NEW-RGB(240,86,86) Medium Light Red to cmyk(0,82,63,0)
					if(R == 240 && G == 86 && B == 86) {
						fillColor.cyan = 0;
						fillColor.magenta = 82;
						fillColor.yellow = 63;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(255,181,181) 	 NEW-RGB(248,179,180) Light Red to cmyk(0,36,18,0)
					if(R == 248 && G == 179 && B == 180) {
						fillColor.cyan = 0;
						fillColor.magenta = 36;
						fillColor.yellow = 18;
						fillColor.black = 0;
					}
					
										//////////////////////////////////////////////////////////////////////////////////////
                                      // Purples & Pinks //
				//////////////////////////////////////////////////////////////////////////////////////
				// Convert OLD-RGB(57,35,214) 	 NEW-RGB(71,76,160) Purple to cmyk(85,81,0,0)
					if(R == 71 && G == 76 && B == 160) {
						fillColor.cyan = 85;
						fillColor.magenta = 81;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(154,3,254) 	 NEW-RGB(122,81,161) Purple Pink to cmyk(61,81,0,0)
					if(R == 122 && G == 81 && B == 161) {
						fillColor.cyan = 61;
						fillColor.magenta = 81;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(255,0,128) 	 NEW-RGB(237,30,127) Magenta to cmyk(0,100,0,0)
					if(R == 237 && G == 30 && B == 127) {
						fillColor.cyan = 0;
						fillColor.magenta = 100;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(255,104,221) 	 NEW-RGB(216,116,174) Medium Light Pink to cmyk(0,70,0,0)
					if(R == 216 && G == 116 && B == 174) {
						fillColor.cyan = 0;
						fillColor.magenta = 70;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					// OLD-RGB(255,172,236) 	 NEW-RGB(235,174,207) Light Pink to cmyk(0,38,0,0)
					if(R == 235 && G == 174 && B == 207) {
						fillColor.cyan = 0;
						fillColor.magenta = 38;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					//////////////////////////////////////////////////////////////////////////////////////
                                      // Oranges & Browns //
				//////////////////////////////////////////////////////////////////////////////////////
				// Convert OLD-RGB(168,99,0) 	 NEW-RGB(167,101,39) Dark Orange to cmyk(27,63,100,15)
					if(R == 167 && G == 101 && B == 39) {
						fillColor.cyan = 27;
						fillColor.magenta = 63;
						fillColor.yellow = 100;
						fillColor.black = 15;
					}
					// Convert OLD-RGB(119,62,0) 	 NEW-RGB(119,65,27) Brown to cmyk(35,73,100,39)
					if(R == 119 && G == 65 && B == 27) {
						fillColor.cyan = 35;
						fillColor.magenta = 73;
						fillColor.yellow = 100;
						fillColor.black = 39;
					}
					// Convert OLD-RGB(236,96,0) 	 NEW-RGB(234,98,36) KTM Orange to cmyk(0,70,100,0)
					if(R == 234 && G == 98 && B == 36) {
						fillColor.cyan = 0;
						fillColor.magenta = 70;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(247,155,0) 	 NEW-RGB(245,156,30) Sun Orange to cmyk(0,40,100,0)
					if(R == 245 && G == 156 && B == 30) {
						fillColor.cyan = 0;
						fillColor.magenta = 40;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(255,222,162) 	 NEW-RGB(255,221,162) Light Orange to cmyk(0,13,41,0)
					if(R == 255 && G == 221 && B == 162) {
						fillColor.cyan = 0;
						fillColor.magenta = 13;
						fillColor.yellow = 41;
						fillColor.black = 0;
					}
					
					//////////////////////////////////////////////////////////////////////////////////////
                                      // Yellows //
				//////////////////////////////////////////////////////////////////////////////////////
				
				// Convert OLD-RGB(97,102,0) 	 NEW-RGB(98,104,45) Dark Yellow to cmyk(0,0,100,65)
					if(R == 98 && G == 104 && B == 45) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 100;
						fillColor.black = 65;
					}
					// Convert OLD-RGB(255,206,0) 	 NEW-RGB(253,206,7) Golden Yellow to cmyk(0,18,100,0)
					if(R == 253 && G == 206 && B == 7) {
						fillColor.cyan = 0;
						fillColor.magenta = 18;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(255,255,0) 	 NEW-RGB(247,236,15) Yellow to cmyk(0,0,100,0)
					if(R == 247 && G == 236 && B == 15) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(252,252,134) 	 NEW-RGB(249,241,138) Medium-Light Yellow to cmyk(0,0,58,0)
					if(R == 249 && G == 241 && B == 138) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 58;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(255,253,187) 	 NEW-RGB(251,247,190) Light Yellow to cmyk(0,0,32,0)
					if(R == 251 && G == 247 && B == 190) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 32;
						fillColor.black = 0;
					}
					
					//////////////////////////////////////////////////////////////////////////////////////
                                      // Greens //
				//////////////////////////////////////////////////////////////////////////////////////
				
				// Convert OLD-RGB(0,85,0) 	 NEW-RGB(30,85,42) Dark Green to cmyk(100,0,100,57)
					if(R == 30 && G == 85 && B == 42) {
						fillColor.cyan = 100;
						fillColor.magenta = 0;
						fillColor.yellow = 100;
						fillColor.black = 57;
					}
					// Convert OLD-RGB(132,196,0) 	 NEW-RGB(130,195,65) Hot Green to cmyk(54,0,100,0)
					if(R == 130 && G == 195 && B == 65) {
						fillColor.cyan = 54;
						fillColor.magenta = 0;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(81,169,11) 	 NEW-RGB(83,169,70) Kawasaki Green to cmyk(72,9,100,0)
					if(R == 83 && G == 169 && B == 70) {
						fillColor.cyan = 72;
						fillColor.magenta = 9;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(100,216,105) 	 NEW-RGB(115,193,103) Apple Green to cmyk(58,0,80,0)
					if(R == 115 && G == 193 && B == 103) {
						fillColor.cyan = 58;
						fillColor.magenta = 0;
						fillColor.yellow = 80;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(210,255,196) 	 NEW-RGB(213,233,191) Light Green to cmyk(30,0,30,0)
					if(R == 213 && G == 233 && B == 191) {
						fillColor.cyan = 30;
						fillColor.magenta = 0;
						fillColor.yellow = 30;
						fillColor.black = 0;
					}
					
					//////////////////////////////////////////////////////////////////////////////////////
                                      // Blues //
				//////////////////////////////////////////////////////////////////////////////////////
				
					// Convert OLD-RGB(0,0,68) 	 NEW-RGB(14,17,65) Navy Blue to cmyk(100,100,0,75)
					if(R == 14 && G == 17 && B == 65) {
						fillColor.cyan = 100;
						fillColor.magenta = 100;
						fillColor.yellow = 0;
						fillColor.black = 75;
					}
					// Convert OLD-RGB(0,73,166) 	 NEW-RGB(20,75,160) Royal Blue to cmyk(100,75,0,0)
					if(R == 20 && G == 75 && B == 160) {
						fillColor.cyan = 100;
						fillColor.magenta = 75;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(38,39,116) 	 NEW-RGB(45,45,114) Yamaha Blue to cmyk(100,100,23,10)
					if(R == 45 && G == 45 && B == 114) {
						fillColor.cyan = 100;
						fillColor.magenta = 100;
						fillColor.yellow = 23;
						fillColor.black = 10;
					}
					// Convert OLD-RGB(0,173,239) 	 NEW-RGB(47,171,225) Cyan to cmyk(100,0,0,0)
					if(R == 47 && G == 171 && B == 225) {
						fillColor.cyan = 100;
						fillColor.magenta = 0;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					// Convert OLD-RGB(0,255,255) 	 NEW-RGB(111,204,220) Light Blue to cmyk(60,0,0,0)
					if(R == 111 && G == 204 && B == 220) {
						fillColor.cyan = 60;
						fillColor.magenta = 0;
						fillColor.yellow = 0;
						fillColor.black = 0;
					}
					
					
					//////////////////////////////////////////////////////////////////////////////////////
                                      // Premium Colors //
				//////////////////////////////////////////////////////////////////////////////////////
				
					// Convert OLD-RGB(0,255,153) 	 NEW-RGB(111,194,132) Acerbis Teal to cmyk(59,0,44,0)
					if(R == 111 && G == 194 && B == 132) {
						fillColor = swatches.getByName('Acerbis Teal').color;
						fillColor.tint = 100;
					}
					
					// Convert OLD-RGB(132,196,0)                  NEW-RGB(130,195,65) Hot Green to cmyk(54,0,100,0)
					if(R == 130 && G == 195 && B == 65) {
						fillColor = swatches.getByName('Hot Green 26').color;
						fillColor.tint = 100;
					}


						}
					}
				}
			}
		}
	}
	// debugging purpuses
	// saveTxt(text);
}

function convertColor(clrArr)  
{  
	return app.convertSampleColor(  
		ImageColorSpace.CMYK,  
		clrArr,  
		ImageColorSpace.RGB,  
		ColorConvertPurpose.defaultpurpose);
} 

function cmyk2rgb(clr)  
{
	var R = 255 * (1-clr.C) * (1-clr.K);
	var G = 255 * (1-clr.M) * (1-clr.K);
	var B = 255 * (1-clr.Y) * (1-clr.K)
    return {R:R,G:G,B:B};
}  

function saveTxt(txt)  
{  
    var name = app.activeDocument.name.replace(/\.[^\.]+$/, '');  
    var path = (app.activeDocument.path != "") ? app.activeDocument.path : "~";  
  
  
    var saveFile = new File(path + "/" + name + ".txt");  
  
  
    if(saveFile.exists)  
        saveFile.remove();  
  
  
    saveFile.encoding = "UTF8";  
    saveFile.open("e", "TEXT");  
    saveFile.writeln(txt);  
    saveFile.close();  
  
  
    alert("Saved to File:\n" + saveFile.fullName)  
}  