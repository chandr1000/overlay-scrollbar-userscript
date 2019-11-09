// ==UserScript==
// @name         Overlay Scrollbar
// @namespace    Overlay Scrollbar
// @version      0.1
// @description  Inject Overlay Scrollbar!
// @author       Chandra Nanda
// @grant       GM.xmlHttpRequest
// @grant       GM.setClipboard
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.addStyle
// @grant       GM.getResourceText
// @grant       GM_getResourceText
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @grant       GM_setValue
// @grant       GM_getValue
// @require     https://code.jquery.com/jquery-2.2.4.min.js
// @require     https://raw.githubusercontent.com/KingSora/OverlayScrollbars/master/js/jquery.overlayScrollbars.min.js
// @resource    overlayCSS https://raw.githubusercontent.com/KingSora/OverlayScrollbars/master/css/OverlayScrollbars.min.css
// @run-at      document-end
// @include     http://*
// @include     https://*
// ==/UserScript==

(function() {
    'use strict';

    function lightOrDark(color) {

        // Variables for red, green, blue values
        var r, g, b, hsp;

        // Check the format of the color, HEX or RGB?
        if (color.match(/^rgb/)) {

            // If HEX --> store the red, green, blue values in separate variables
            color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

            r = color[1];
            g = color[2];
            b = color[3];
        }  else {

            // If RGB --> Convert it to HEX: http://gist.github.com/983661
            color = +("0x" + color.slice(1).replace(
                color.length < 5 && /./g, '$&$&'));

            r = color >> 16;
            g = color >> 8 & 255;
            b = color & 255;
        }

        // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
        hsp = Math.sqrt(
            0.299 * (r * r) +
            0.587 * (g * g) +
            0.114 * (b * b)
        );

        // Using the HSP value, determine whether the color is light or dark
        if (hsp>127.5) {

            return 'os-theme-dark';
        } else {

            return 'os-theme-light';
        }
    }

    //let para = document.querySelector('body');
    //let compStyles = window.getComputedStyle(para);
    //compStyles.getPropertyValue('background-color')

    jQuery("body").overlayScrollbars({
	//className       : "os-theme-dark",
    className       : lightOrDark(jQuery("body").css("background-color")),
	resize          : "both",
	sizeAutoCapable : true,
	paddingAbsolute : true,
	scrollbars : {
		clickScrolling : true,
		visibility       : "auto",
		autoHide         : "move",
		autoHideDelay    : 800
	}
    });

    var style = GM_getResourceText ("overlayCSS");
    GM_addStyle (style);
})();
