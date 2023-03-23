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

function verifyWord(_word) {
	const startsWith = [
		"<",
		"class=",
		"id=",
		"datetime=",
		"aria-label=",
		"aria-expanded=",
		"role=",
		"tabindex=",
		"src=",
		"alt=",
		"draggable=",
		"data-type=",
		"data-id=",
		"data-name=",
		"href=",
		"rel=",
		"boopener=",
		"target=",
		"title=",
		"wrapper-",
	];
	const endsWith = [">", 'interactive"', 'jumboable"'];
	var result = true;
	startsWith.forEach((element) => {
		if (_word.startsWith(element)) {
			result = false;
		}
	});
	endsWith.forEach((element) => {
		if (_word.endsWith(element)) {
			result = false;
		}
	});
	return result;
}

function boldWord(_word) {
	if (!verifyWord(_word)) {
		return _word;
	}
	const length = _word?.length;
	const middle = Math.ceil(length / 2);
	var s1 = _word?.slice(0, middle);
	var s2 = _word?.slice(middle);
	if (s1 != "") return "<strong>" + s1 + "</strong>" + s2;
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

function BoldAllText(_text) {
	for (let i = 0; i < _text.length; i++) {
		const element = _text[i];
		const boldedText = boldText(element.innerHTML);
		if (element.innerHTML != boldedText) {
			element.innerHTML = boldedText;
		}
	}
}

function letsBold() {
	setTimeout(() => {
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

Start();
