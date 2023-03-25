const delaySlider = document.getElementById("delay");

// Saves options to chrome.storage
function save_options() {
	var enabled = document.getElementById("enabled").checked;
	var delay = document.getElementById("delay").value;
	var debug = document.getElementById("debug").checked;
	chrome.storage.sync.set(
		{
			enabled: enabled,
			delay: delay,
			debug: debug,
		},
		() => {
			// Update status to let user know options were saved.
			var status = document.getElementById("status");
			status.textContent = "Options saved.";
			setTimeout(() => {
				status.textContent = "";
			}, 1000);
		}
	);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	// Use default value color = 'red' and likesColor = true.
	chrome.storage.sync.get(
		{
			enabled: true,
			delay: 500,
			debug: false,
		},
		(items) => {
			document.getElementById("enabled").checked = items.enabled;
			document.getElementById("delay").value = items.delay;
			document.getElementById("debug").checked = items.debug;
		}
	);
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
