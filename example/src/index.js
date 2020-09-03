import ShakenQRReader from "shaken-qr-reader";

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".video");
  const canvas = document.querySelector(".canvas");
  const context = canvas.getContext("2d");
  const reader = new ShakenQRReader();

  const constraints = {
    audio: false,
    video: {
      width: canvas.width,
      height: canvas.height,
      facingMode: "environment"
    }
  };

  const updateCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  }

  const checkQRCode = () => {
    if(reader.isCompleted) {
      return;
    } else {
      console.log(reader.missingIndex);
    }

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    try {
      reader.push(imageData);
    } catch (e) {
      console.log(e);
    }
  }

  navigator.mediaDevices.getUserMedia(constraints)
    .then( (stream) => {
      video.srcObject = stream;
      video.onloadedmetadata = (e) => {
        video.play();
      };
    })
    .catch( (err) => {
      console.log(err.name + ": " + err.message);
    });

  setInterval(updateCanvas, 100);
  setInterval(checkQRCode, 300);
});
