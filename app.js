// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function (error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function () {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");

    $.ajax({
        url: 'https://content.dropboxapi.com/2/files/upload',
        type: 'post',
        data: getBase64Image(cameraOutput.src),
        processData: false,
        contentType: 'application/octet-stream',
        headers: {
            "Authorization": "Bearer 5YL9E1Q3xRcAAAAAAAAAlsL7b6H2rlipm01jZltBl5Bb_WdVhrVeO05YF1xVkdeg",
            "Dropbox-API-Arg": '{"path": "/' + (Date.now()) + Math.floor(Math.random() * 1000) + '.jpg","mode": "add","autorename": true,"mute": false}'
        },
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.error(data);
        }
    })
    cameraOutput.classList.add("taken");
    // track.stop();
};

/*$('#camera--output').load(function () {
    var imageObj = $(this);
    if (!(imageObj.width() == 1 && imageObj.height() == 1)) {
        file = imageObj;
        
    }
});*/

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

/*
file = event.target.files[0];
$.ajax({
    url: 'https://content.dropboxapi.com/2/files/upload',
    type: 'post',
    data: file,
    processData: false,
    contentType: 'application/octet-stream',
    headers: {
        "Authorization": "Bearer <ACCESS_TOKEN>",
        "Dropbox-API-Arg": '{"path": "/test_upload.txt","mode": "add","autorename": true,"mute": false}'
    },
    success: function (data) {
        console.log(data);
    },
    error: function (data) {
        console.error(data);
    }
})*/
