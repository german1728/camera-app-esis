// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
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
    var imageSringData = cameraSensor.toDataURL("image/png");
    cameraOutput.src = imageSringData;

    //Convert it to an arraybuffer
    var imageData = _base64ToArrayBuffer(imageSringData);

    var image = new Image();
    image.src = cameraOutput.src;
    $.ajax({
        url: 'https://content.dropboxapi.com/2/files/upload',
        type: 'post',
        data: imageData,
        processData: false,
        contentType: 'application/octet-stream',
        headers: {
            "Authorization": "Bearer 5YL9E1Q3xRcAAAAAAAAAlsL7b6H2rlipm01jZltBl5Bb_WdVhrVeO05YF1xVkdeg",
            "Dropbox-API-Arg": '{"path": "/' + (Date.now()) + Math.floor(Math.random() * 1000) + '.png","mode": "add","autorename": true,"mute": false}'
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

function _base64ToArrayBuffer(base64) {
    base64 = base64.split('data:image/png;base64,').join('');
    var binary_string = window.atob(base64),
        len = binary_string.length,
        bytes = new Uint8Array(len),
        i;

    for (i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
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
