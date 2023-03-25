var settings = {};

function loadSettings() {
	console.log("settings loaded");
	chrome.storage.sync.get(
		{
			enabled: true,
			delay: 1000,
			debug: false,
		},
		function (items) {
			settings = items;
		}
	);
}

function boldWord(_word) {
	const length = _word?.length;
	const middle = Math.ceil(length / 2);
	var s1 = _word?.slice(0, middle);
	var s2 = _word?.slice(middle);
	if (s1 != "" && s1 != " " && s2 != " ") return `<strong>${s1}</strong>${s2}`;
	return _word;
}

function boldText(_text) {
	const words = _text.split(/ /);
	var result = [];
	words.forEach((word) => {
		result.push(boldWord(word));
	});
	return result.join(" ");
}

function BoldElement(element) {
	if (element.getAttribute("bolded") == "true") return;
	const content = element.innerHTML;
	const text = element.innerText;

	const boldedText = boldText(text);

	const result = content.replace(text, boldedText);

	if (element.innerHTML != result) {
		element.innerHTML = result;
		element.setAttribute("bolded", "true");
	}
}

// async function getCurrentTab() {
// 	let queryOptions = { active: true, currentWindow: true };
// 	let [tab] = await chrome.tabs.query(queryOptions);
// 	return tab;
// }

async function letsBold() {
	setTimeout(async () => {
		if (settings.enabled) {
			// let worker = new Worker(chrome.runtime.getURL("bolding.js"));
			// worker.postMessage("bold");

			if (settings.debug) console.time("bolderizing");
			var elements = [];

			//const currentTab = await getCurrentTab();

			// if (currentTab.url.startsWith("https://discord.com"))
			// 	elements = document.querySelectorAll(
			// 		"div[id^='message-content-], a, p"
			// 	);
			// else elements = document.querySelectorAll("div, a, p, li");

			elements = document.querySelectorAll("div, a, p, li");

			elements.forEach((text) => BoldElement(text));
			if (settings.debug) console.timeEnd("bolderizing");
		}

		letsBold();
	}, settings.delay);
}

function Start() {
	loadSettings();

	chrome.storage.onChanged.addListener(() => loadSettings());

	letsBold();
}

Start();
