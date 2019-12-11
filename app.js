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
    cameraOutput.classList.add("taken");
    // track.stop();
};

var doUpload = function (event) {

    var input = event.target;
    var reader = new FileReader();


    reader.onload = function () {
        var arrayBuffer = reader.result;
        var arrayBufferView = new Uint8Array(arrayBuffer);
        var blob = new Blob([arrayBufferView], { type: input.files[0].type });
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);
        $.ajax({
            url: 'https://content.dropboxapi.com/2/files/upload',
            type: 'post',
            data: file,
            processData: false,
            contentType: 'application/octet-stream',
            headers: {
                "Authorization": "Bearer 5YL9E1Q3xRcAAAAAAAAAlNx76-C6rKBejpxV4z1AqOxoPIeMdCBADx3aR09exTKO",
                "Dropbox-API-Arg": '{"path": "' + "index.html" + ',"mode": "add","autorename": true,"mute": false}'
            },
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.error(data);
            }
        })

    }
    reader.readAsArrayBuffer(input.files[0]);
}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
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
