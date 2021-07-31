const peer = new Peer(
  "" +
    Math.floor(Math.random() * 2 ** 18)
      .toString(36)
      .padStart(4, 0),
  {
    host: location.hostname,
    debug: 1,
    path: "/myapp",
  }
);

window.peer = peer;

function getLocalStream() {
  navigator.mediaDevices
    .getUserMedia({ video: false, audio: true })
    .then((stream) => {
      window.localStream = stream;
      window.localAudio.srcObject = stream;
      window.localAudio.autoplay = true;
    })
    .catch((err) => console.error(err));
}

getLocalStream();

peer.on("open", () => {
  window.caststatus.textContent = `Your device ID is ${peer.id}`;
});
