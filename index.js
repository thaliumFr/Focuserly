var settings = {};

function loadSettings() {
	console.log("settings loaded");
	chrome.storage.sync.get(
		{
			enabled: true,
			delay: 500,
		},
		function (items) {
			settings = items;
		}
	);
}

function boldWord(_word) {
	if (_word.startsWith("<") || _word.endsWith(">")) {
		return _word;
	}
	const length = _word?.length;
	const middle = Math.ceil(length / 2);
	var s1 = _word?.slice(0, middle);
	var s2 = _word?.slice(middle);
	return "<strong>" + s1 + "</strong>" + s2;
}

function boldText(_text) {
	if (_text.startsWith("<")) return _text;
	const words = _text.split(" ");
	var result = "";
	words.forEach((word) => {
		result += boldWord(word) + " ";
	});
	return result;
}

function BoldAllText(_text) {
	console.log(_text.lenght);
	for (let i = 0; i < _text.length; i++) {
		const element = _text[i];
		console.log(element.innerHTML);
		element.innerHTML = boldText(element.innerHTML);
	}
}

async function letsBold() {
	setTimeout(async () => {
		if (settings.enabled) {
			console.log("bolderizing...");
			const text = document.querySelectorAll("[id^='message-content']");
			BoldAllText(text);
		} else {
			console.log("nah");
		}
		letsBold();
	}, settings.delay);
}

function Start() {
	loadSettings();

	chrome.storage.onChanged.addListener(() => loadSettings());

	letsBold();
}


Start()