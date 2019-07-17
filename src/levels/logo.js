var peer = new Peer(
  'a',
  {
    host: '74.207.252.238', 
    port: 9000, 
    debug: 3,
  }
); 

peer.on('open', function(id) {
    console.log('Initializing PeerJS: ' + id);
    localStorage.setItem("teotlPlayerID", id);
  });

  setTimeout(function(){ window.location = "menu.html"; }, 1000)