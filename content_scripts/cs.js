(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
	return;
  }

	const previousWidthKey = 'previousWidth'

  const hideUnhideRightBar = () => {
	// When notified, change the style to display block
	let currentStyle = document.getElementById("wiki-rightbar").style
	if(currentStyle.display === "block") {
	  document.getElementById("wiki-rightbar").style.display = "none"
	} else {
	  document.getElementById("wiki-rightbar").style.display = "block"
	}
  }

  const narrowMarkdown = () => {
	let newRightPadding
	let newLeftPadding

	const previousLeftPadding = parseInt(document.getElementsByClassName("markdown-body")[0].style.paddingLeft.replace('px',''))
	const previousRightPadding = parseInt(document.getElementsByClassName("markdown-body")[0].style.paddingRight.replace('px',''))

	isNaN(previousLeftPadding)  ? newLeftPadding  = 100 : newLeftPadding  = previousLeftPadding   + 100
	isNaN(previousRightPadding) ? newRightPadding = 100 : newRightPadding = previousRightPadding  + 100

	document.getElementsByClassName("markdown-body")[0].style.paddingLeft = newLeftPadding.toString() + "px"
	document.getElementsByClassName("markdown-body")[0].style.paddingRight = newRightPadding.toString() + "px"
  }

  const widenMarkdown = () => {
	let newRightPadding
	let newLeftPadding

	const previousLeftPadding = parseInt(document.getElementsByClassName("markdown-body")[0].style.paddingLeft.replace('px',''))
	const previousRightPadding = parseInt(document.getElementsByClassName("markdown-body")[0].style.paddingRight.replace('px',''))

	isNaN(previousLeftPadding)  || previousLeftPadding  === 0 ? newLeftPadding  = 0 : newLeftPadding  = previousLeftPadding   - 100
	isNaN(previousRightPadding) || previousRightPadding === 0 ? newRightPadding = 0 : newRightPadding = previousRightPadding  - 100

	document.getElementsByClassName("markdown-body")[0].style.paddingLeft = newLeftPadding.toString() + "px"
	document.getElementsByClassName("markdown-body")[0].style.paddingRight = newRightPadding.toString() + "px"
  }

  const manuallySetWidth = message => {
	if ('width' in message) {
		document.getElementsByClassName("markdown-body")[0].style.paddingLeft = message.width + "px"
		document.getElementsByClassName("markdown-body")[0].style.paddingRight = message.width + "px"
		console.log("Previous width set")
	}
  }

  window.hasRun = true;

  console.log("Content script ran")

  // Hide the right bar
  document.getElementById("wiki-rightbar").style.display = "none"

  // LIsten for a message from plugin js and hide / unhide the right bar
  browser.runtime.onMessage.addListener((message) => {
	switch(message.sentBy) {
		case "enableButton":
			hideUnhideRightBar()
			break;
		case "setWidth":
			manuallySetWidth(message)
			break;
		default:
			console.log("Do nothing")
	}
  });

})();