/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
let listenForClicks = () => {
  document.getElementById("enableCheck").addEventListener("click", async (e) => {
    // Unhide the right bar
    let activeTab = await browser.tabs.query({active: true, currentWindow: true})
    let activeTabId = activeTab[0].id
    browser.tabs.sendMessage(activeTabId, {
      message: "swap"
    })
  });
}

// Put in an event listener for the button on the plugin page.
// the content script is loaded automatically under the right url
document.getElementById("enableCheck").checked = true;
listenForClicks()