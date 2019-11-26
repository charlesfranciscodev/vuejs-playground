function getBrowserInfo() {
  let userAgent = navigator.userAgent;
  document.getElementById("userAgent").innerHTML = userAgent;
}

getBrowserInfo();
