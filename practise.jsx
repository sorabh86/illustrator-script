#target Illustrator
/**
 * Author : Sorabh <ssorabh.ssharma@hotmail.com>
 * Description : This script convert illustrator RGB Document to CMYK, then change specific RGB color to Specific CMYK colors
 * URI : https://sorabh86.github.io/ 
 */

init();

function init() {
	var obj = getObject();
	obj.abc[0].G = 323;
	alert(obj.abc[0].R + " " + obj.abc[0].G);
}

function getObject() {
	return {abc:[{R:232}]};
}