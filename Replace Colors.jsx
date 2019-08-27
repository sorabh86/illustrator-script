#target Illustrator
/**
 * Author : Sorabh <ssorabh.ssharma@hotmail.com>
 * Description : This script convert illustrator RGB Document to CMYK, then change specific RGB color to Specific CMYK colors
 * URI : https://sorabh86.github.io/ 
 */

 /*//@include "json2.js";*/

if(documents.length < 1) {
	alert("No Document is Opened or selected");
} else {
	// var s = confirm("It will replace all colors, Are you sure?");
	// if(s) {
		convertColors();
	// 	alert("Your colors have been replaced");
	// }
}


function traceOriginalColor() {

	var myDoc = app.activeDocument;
	var temColors = {};

	with(myDoc) {
		if(documentColorSpace != DocumentColorSpace.RGB) return;

		temColors.path = [];
		// Iterate through path items
		for(var i = 0; i < pathItems.length; i++) {
			with(pathItems[i]) {
				if(filled == true && fillColor instanceof RGBColor) {
					temColors.path[i] = {};
					temColors.path[i].old = {
						R:Math.round(fillColor.red),
						G:Math.round(fillColor.green),
						B:Math.round(fillColor.blue)
					};
				}
			}
		}

		temColors.text = [];
		// Iterate through text items
		for (var j = 0; j < stories.length; j++) {
			temColors.text[j] = [];
			with (stories[j]) {
				for (var k = 0; k < characters.length; k++) {
					temColors.text[j][k] = {};
					with (characters[k].characterAttributes) {
						if(fillColor instanceof RGBColor) {
							temColors.text[j][k].old = {
								R:Math.round(fillColor.red),
								G:Math.round(fillColor.green),
								B:Math.round(fillColor.blue)
							};
						}
					}
				}
			}
		}
	}
	// saveTxt(JSON.stringify({path:temPath, text:temText}));
	// return;
	return temColors;
}

function convertColors() {
	var myDoc = app.activeDocument;
	var text = "";

	with(myDoc) {
		var tempColors = traceOriginalColor();

		// change document type rgb to cmyk
		if(documentColorSpace == DocumentColorSpace.RGB) {
			app.executeMenuCommand('doc-color-cmyk');
		}

		// Iterate through all path Items
		for(var i = 0; i < pathItems.length; i++) {
			var filled = pathItems[i].filled;
			var fillColor = pathItems[i].fillColor;
			// with(pathItems[i]) {
				
				if(filled == true && fillColor instanceof CMYKColor) {
					var C = Math.round(fillColor.cyan);
					var M = Math.round(fillColor.magenta);
					var Y = Math.round(fillColor.yellow);
					var K = Math.round(fillColor.black);

					var rgb = tempColors.path[i].old;
					
					var rgb2 = convertColor([C,M,Y,K]);
					var R = Math.round(rgb2[0]);
					var G = Math.round(rgb2[1]);
					var B = Math.round(rgb2[2]);

					// tempColors.path[i].new = {R:R ,G:G, B:B};

					text += "OLD-RGB("+rgb.R+","+rgb.G+","+rgb.B+
							") \t NEW-RGB("+Math.round(rgb2[0])+","+Math.round(rgb2[1])+","+Math.round(rgb2[2])+
							")\n";

					// Convert rgb(0,0,0) to cmyk(0,0,0,100)
					if(R == 0 && G == 0 && B == 0) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 0;
						fillColor.black = 100;
					}
					// Convert rgb(255,255,0) to cmyk(0,0,100,0)
					if(R == 247 && G == 236 && B == 15) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert rgb(255,242,0) to cmyk(0,0,100,0)
					if(R == 251 && G == 238 && B == 35) {
						fillColor.cyan = 0;
						fillColor.magenta = 0;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert rgb(255,0,0) to cmyk(0,100,100,0)
					if(R == 237 && G == 33 && B == 36) {
						fillColor.cyan = 0;
						fillColor.magenta = 100;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
					// Convert rgb(255,67,0) to cmyk(0,80,100,0)
					if(R == 240 && G == 73 && B == 35) {
						fillColor.cyan = 0;
						fillColor.magenta = 80;
						fillColor.yellow = 100;
						fillColor.black = 0;
					}
				}
			// }
		}

		// Iterate through text items
		for (var j = 0; j < stories.length; j++) {
			with (stories[j]) {
				for (var k = 0; k < characters.length; k++) {
					with (characters[k].characterAttributes) {
						if(fillColor instanceof CMYKColor) {
							var C = Math.round(fillColor.cyan);
							var M = Math.round(fillColor.magenta);
							var Y = Math.round(fillColor.yellow);
							var K = Math.round(fillColor.black);

							var rgb = tempColors.text[j][k].old;
							
							var rgb2 = convertColor([C,M,Y,K]);
							var R = Math.round(rgb2[0]);
							var G = Math.round(rgb2[1]);
							var B = Math.round(rgb2[2]);
		
							text += "OLD-RGB"+rgb.R+","+rgb.G+","+rgb.B+
									") \t NEW-RGB("+Math.round(rgb2[0])+","+Math.round(rgb2[1])+","+Math.round(rgb2[2])+
									")\n";
		
							// Convert rgb(0,0,0) to cmyk(0,0,0,100)
							if(R == 0 && G == 0 && B == 0) {
								fillColor.cyan = 0;
								fillColor.magenta = 0;
								fillColor.yellow = 0;
								fillColor.black = 100;
							}
							// Convert rgb(255,255,0) to cmyk(0,0,100,0)
							if(R == 247 && G == 236 && B == 15) {
								fillColor.cyan = 0;
								fillColor.magenta = 0;
								fillColor.yellow = 100;
								fillColor.black = 0;
							}
							// Convert rgb(255,242,0) to cmyk(0,0,100,0)
							if(R == 251 && G == 238 && B == 35) {
								fillColor.cyan = 0;
								fillColor.magenta = 0;
								fillColor.yellow = 100;
								fillColor.black = 0;
							}
							// Convert rgb(255,0,0) to cmyk(0,100,100,0)
							if(R == 237 && G == 33 && B == 36) {
								fillColor.cyan = 0;
								fillColor.magenta = 100;
								fillColor.yellow = 100;
								fillColor.black = 0;
							}
							// Convert rgb(255,67,0) to cmyk(0,80,100,0)
							if(R == 240 && G == 73 && B == 35) {
								fillColor.cyan = 0;
								fillColor.magenta = 80;
								fillColor.yellow = 100;
								fillColor.black = 0;
							}
						}
					}
				}
			}
		}

		// saveTxt(JSON.stringify(tempColors));
	}
	/* This line will print-out old and new color value in same-name.txt file.
	 * Uncomment only if you want to know what values of RGB will going to converted into */
	saveTxt(text);
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