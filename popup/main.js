let notifyContentScript = async (msg) => {
	let activeTab = await browser.tabs.query({active: true, currentWindow: true})
	let activeTabId = activeTab[0].id
	browser.tabs.sendMessage(activeTabId, msg)
}
const incrementWidth = (currentWidth) => {
	const newWidth = currentWidth + 100
	return newWidth
}
const decrementWidth = (currentWidth) => {
	let newWidth = currentWidth - 100
	if (newWidth < 0) { newWidth = 0 }
	return newWidth
}
const getWidthFromStorage = async () => {
	const storage = await browser.storage.local.get('width')
	let width = 100
	if('width' in storage) {
		width = storage.width
	}
	return width
}
const setWidthInStorage = async (newWidth) => {
	let storage = {
		width: newWidth
	}
	await browser.storage.local.set(storage)
}
let listenForClicks = () => {
	document.getElementById("enableCheck").addEventListener("click", async (e) => {
		// Unhide the right bar
		await notifyContentScript({sentBy: "enableButton"})
	});

	document.getElementById("narrowClick").addEventListener("click", async (e) => {
		// Make the markdown content Wider
		let currentWidth = await getWidthFromStorage()
		let newWidth = incrementWidth(currentWidth)
		notifyContentScript({sentBy: "setWidth", width: newWidth})
		await setWidthInStorage(newWidth)
	})

	document.getElementById("widenClick").addEventListener("click", async (e) => {
		// Make the markdown content Wider
		let currentWidth = await getWidthFromStorage()
		let newWidth = decrementWidth(currentWidth)
		notifyContentScript({sentBy: "setWidth", width: newWidth})
		await setWidthInStorage(newWidth)
	})
}
const main = async () => {
	// Put in an event listener for the button on the plugin page.
	// the content script is loaded automatically under the right url
	document.getElementById("enableCheck").checked = true;
	listenForClicks()
}
main()