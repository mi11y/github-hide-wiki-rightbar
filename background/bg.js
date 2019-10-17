const getWidthFromStorage = async () => {
	const storage = await browser.storage.local.get('width')
	let width = 100
	if('width' in storage) {
		width = storage.width
	}
	return width
}
let notifyContentScript = async (msg) => {
	let activeTab = await browser.tabs.query({active: true, currentWindow: true})
	let activeTabId = activeTab[0].id
	browser.tabs.sendMessage(activeTabId, msg)
}
const onMessage = async (message) => {
	switch(message.command) {
		case "contentScriptLoaded":
			let currentWidth = await getWidthFromStorage()
			await notifyContentScript({sentBy: "setWidth", width: currentWidth})
			break;
		default:
			console.log("Do nothing")
	}
}
browser.runtime.onMessage.addListener(onMessage)
