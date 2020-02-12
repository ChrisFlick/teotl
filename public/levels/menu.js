// let playerID = localStorage.getItem("teotlPlayerID");
// var peer = new Peer(
//     playerID,
//     {
//         // host: '74.207.252.238', 
//         // port: 9000, 
//         debug: 3,
//       }
// );

// peer.on('connection', function(conn) { // Listen for opponents Elemental Picks
//   conn.on('data', function(data){
//     console.log(`Recieved Enemy Elementals:`);
//     console.log(data);
//     localStorage.setItem('enemyPick', JSON.stringify(data));
//   });
// });


$(document).ready(() => {
  $('#create').on('click', function () {
    console.log($('#name').val())
    localStorage.setItem('rm_name', $('#name').val())

    document.location.href = "/host"
  })
})

// Internal fuinctions

function connect() {
    let enemyID = document.getElementById('enemyID').value;

    console.log(`Storing enemyID ${enemyID}`);
    localStorage.setItem("teotlEnemyID", enemyID);

    window.location = "character_select";
}