// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;
/*
const dropboxV2Api = require('dropbox-v2-api');
const dropbox = dropboxV2Api.authenticate({
    token: '5YL9E1Q3xRcAAAAAAAAAlNx76-C6rKBejpxV4z1AqOxoPIeMdCBADx3aR09exTKO'
});
*/
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
// foto_enviar = document.querySelector("#file");

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
    cameraOutput.src = cameraSensor.toDataURL("image/");
    /* dropbox({
         resource: 'Aplicaciones/camera-app-esis',
         parameters: {
             path: cameraOutput.src
         },
         readStream: fs.createReadStream('path/to/file.js')
     }, (err, result, response) => {
         //upload completed
     });*/
    //foto_enviar.src = cameraSensor.toDataURL("image/");
    cameraOutput.classList.add("taken");

    // track.stop();
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);


//////////////////




///////////////////////////

var doUpload = function (event) {

    var input = event.target;
    var reader = new FileReader();
    var YourToken = '5YL9E1Q3xRcAAAAAAAAAlNx76-C6rKBejpxV4z1AqOxoPIeMdCBADx3aR09exTKO';

    reader.onload = function () {
        var arrayBuffer = reader.result;
        var arrayBufferView = new Uint8Array(arrayBuffer);
        var blob = new Blob([arrayBufferView], { type: input.files[0].type });
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);

        $.ajax({
            url: "https://api-content.dropbox.com/1/files_put/auto/Aplicaciones/camera-app-esis/" + input.files[0].name,
            headers: {
                'Authorization': 'Bearer ' + YourToken,
                'Content-Length': input.files[0].size
            },
            crossDomain: true,
            crossOrigin: true,
            type: 'PUT',
            contentType: input.files[0].type,
            data: arrayBuffer,
            dataType: 'json',
            processData: false,
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                //Upload progress, litsens to the upload progress 
                //and get the upload status
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = parseInt(parseFloat(evt.loaded / evt.total) * 100);
                        //Do something with upload progress
                        $('#uploadProgress').html(percentComplete);
                        $('#uploadProgressBar').css('width', percentComplete + '%');
                    }
                }, false);
            },
            beforeSend: function () {
                // Things you do before sending the file 
                // like showing the loader GIF
            },
            success: function (result) {
                // Display the results from dropbox after upload 
                // Other stuff on complete
            },

        });
    }
    reader.readAsArrayBuffer(input.files[0]);
}