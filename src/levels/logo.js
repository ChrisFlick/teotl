var peer = new Peer();

peer.on('open', function(id) {
    console.log('Initializing PeerJS: ' + id);
    localStorage.setItem("teotlPlayerID", id);
  });

  setTimeout(function(){ window.location = "menu.html"; }, 1000)