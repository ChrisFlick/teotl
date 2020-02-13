$(document).ready(() => {
    searchLobbies()

    $("#refresh").on("click", function() {
        searchLobbies();
    })
})

function searchLobbies() {
    $("#lobbies").html("");
    $.ajax({
        method: "GET",
        url: "/api/lobbies"
    }).then(function (res) {
        console.log(res)

        for (let i = 0; i < res.length; i++) {
            let lobby = $("<div>")
            let button = $("<button>")

            lobby.html("<b> " + res[i].lobby_name + "</b>&nbsp; &nbsp; &nbsp;")
            button.text('Join')

            button.attr("class", 'game button is-link')
            lobby.attr("class", "has-text-centered card")
            button.attr("name", res[i].lobby_name)
            button.attr("userID", res[i].id)


            lobby.append(button)
            $("#lobbies").append(lobby)
        }

        $(".game").on("click", function() {
            localStorage.setItem("teotlEnemyID", $(this).attr("userID"))
            localStorage.setItem("rm_name", $(this).attr("name"))
            document.location.href = "/b"
        })
    })

}