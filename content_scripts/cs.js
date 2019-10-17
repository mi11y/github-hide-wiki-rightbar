(function() {
	/**
	* Check and set a global guard variable.
	* If this content script is injected into the same page again,
	* it will do nothing next time.
	*/
	if (window.hasRun) {
		return;
	}

	const hideUnhideRightBar = () => {
		// When notified, change the style to display block
		let currentStyle = document.getElementById("wiki-rightbar").style
		if(currentStyle.display === "block") {
			document.getElementById("wiki-rightbar").style.display = "none"
		} else {
			document.getElementById("wiki-rightbar").style.display = "block"
		}
	}
	const manuallySetWidth = message => {
		if ('width' in message) {
			document.getElementsByClassName("markdown-body")[0].style.paddingLeft = message.width + "px"
			document.getElementsByClassName("markdown-body")[0].style.paddingRight = message.width + "px"
		}
	}

	window.hasRun = true;

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

	browser.runtime.sendMessage({
		command: "contentScriptLoaded"
	})
})();