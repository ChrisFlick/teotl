var peer = new Peer({key: 'lwjd5qra8257b9'});
console.log(peer);

peer.on('open', function(id) {
    console.log('Initializing PeerJS: ' + id);
    localStorage.setItem("teotlPlayerID", id);
  });

  setTimeout(function(){ window.location = "menu.html"; }, 1000)