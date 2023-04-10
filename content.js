document.addEventListener("mousemove", function(event) {
    chrome.runtime.sendMessage({
        type: "mousemove",
        x: event.clientX,
        y: event.clientY
    });
});