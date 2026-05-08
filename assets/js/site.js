if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function startAtTop() {
  if (location.hash) {
    history.replaceState(null, "", location.pathname + location.search);
  }

  window.scrollTo(0, 0);
}

startAtTop();
window.addEventListener("DOMContentLoaded", startAtTop);
window.addEventListener("load", startAtTop);
window.addEventListener("pageshow", startAtTop);
setTimeout(startAtTop, 100);
setTimeout(startAtTop, 500);
