const delaySlider = document.getElementById("delay");

// Saves options to chrome.storage
function save_options() {
	var enabled = document.getElementById("enabled").checked;
	var delay = document.getElementById("delay").value;
	chrome.storage.sync.set(
		{
			enabled: enabled,
			delay: delay,
		},
		function () {
			// Update status to let user know options were saved.
			var status = document.getElementById("status");
			status.textContent = "Options saved.";
			setTimeout(function () {
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
		},
		function (items) {
			document.getElementById("enabled").checked = items.enabled;
			document.getElementById("delay").value = items.delay;
		}
	);
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
