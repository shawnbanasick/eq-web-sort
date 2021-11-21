/**
 * detect IEEdge
 * returns version of IE/Edge or false, if browser is not a Microsoft browser
 * stackoverflow
 * https://stackoverflow.com/questions/19999388/check-if-user-is-using-ie
 */
function detectIEEdge() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    // IE 10 or older => return version number
    // return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    return true;
  }

  var trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    // var rv = ua.indexOf("rv:");
    // return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
    return true;
  }

  // other browser
  return false;
}

const checkForIeBrowser = () => {
  const isIE = detectIEEdge();
  return isIE;
};

export default checkForIeBrowser;
