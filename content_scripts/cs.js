(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  console.log("Content script ran")

  // Hide the right bar
  document.getElementById("wiki-rightbar").style.display = "none"

  // LIsten for a message from plugin js and hide / unhide the right bar
  browser.runtime.onMessage.addListener((message) => {
    // When notified, change the style to display block
    let currentStyle = document.getElementById("wiki-rightbar").style
    if(currentStyle.display === "block") {
      document.getElementById("wiki-rightbar").style.display = "none"
    } else {
      document.getElementById("wiki-rightbar").style.display = "block"
    }

  });

})();