/**
 * Show the browser info in the UI.
 */
function showBrowserInfo() {
  let userAgent = navigator.userAgent;
  document.getElementById("userAgent").innerHTML = userAgent;
}

showBrowserInfo();
