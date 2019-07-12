var peer = new Peer({key: 'lwjd5qra8257b9'});

peer.on('open', function(id) {
    console.log('Initializing PeerJS: ' + id);
    localStorage.setItem("teotlPlayerID", id);
  });

  setTimeout(function(){ window.location = "menu.html"; }, 2000)