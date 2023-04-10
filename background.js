chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "mousemove") {
        chrome.tabs.captureVisibleTab(null, {format: "png"}, function(dataUrl) {
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            var img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
                var pixelData = context.getImageData(request.x, request.y, 1, 1).data;
                var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
                chrome.runtime.sendMessage({type: "color", hex: hex});
            };
            img.src = dataUrl;
        });
    }
});

function rgbToHex(r, g, b) {
    return ((r << 16) | (g << 8) | b).toString(16);
}