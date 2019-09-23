var peer = new Peer(makeid(10), {
  host: '74.207.252.238',
  port: 9000,
  debug: 3,
});

peer.on('open', function (id) {
  console.log('Initializing PeerJS: ' + id);

});

localStorage.setItem('enemyPick', -1);

setTimeout(function () { window.location = "menu.html"; }, 1000)

// Internal functions 

function makeid(length) { // Makes a random ID for peerJS
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  localStorage.setItem("teotlPlayerID", result);

  return result;
}