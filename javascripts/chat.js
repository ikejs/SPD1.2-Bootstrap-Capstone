$(function() {
    const users = [];

    function randomMessage() {
        var ipsumArray = [
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'Lorem Ipsum has been',
            'Where does it come from?',
            'Why do we use it?',
            'Contrary to popular belief, Lorem Ipsum is not simply random text.',
            'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
            'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.',
            'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.',
            'The generated Lorem Ipsum is therefore always free from repetition.'
        ];
        let randomNumber = Math.floor(Math.random()*ipsumArray.length);
        return ipsumArray[randomNumber]
    }

    function newUser(specifiedUser, active, status, timeAgo) {
        if(active) {
            var activeClass="active"
        }
        if(status=='online') {
            var statusClass="online"
        }
        if(status=='away') {
            var statusClass="away"
        }
        if(status=='offline') {
            var statusClass="offline"
        }
        if(status=='dnd') {
            var statusClass="dnd"
        }
        if(specifiedUser) {
            $(`
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start ${active}">
                    <div class="d-flex" style="float:right;">
                        <small>${timeAgo}</small>
                    </div>
                    <div class="profile-image ${statusClass} float-left mr-2" style="background-image: url(${specifiedUser.img})"></div>
                    <p class="list-group-item-contact-details">
                        ${specifiedUser.name.first} ${specifiedUser.name.last}<br>
                        <small class="pt-1">${specifiedUser.message}</small>
                    </p>
                </a>
                `).hide().appendTo("#users").fadeIn(500);
        } else {
            $.ajax({
              url: 'https://randomuser.me/api/',
              dataType: 'json',
              success: function(data) {
                  $(`
                      <a href="#" class="list-group-item list-group-item-action flex-column align-items-start ${activeClass}">
                          <div class="d-flex" style="float:right;">
                              <small>${timeAgo}</small>
                          </div>
                          <div class="profile-image ${statusClass} float-left mr-2" style="background-image: url(${data.results[0].picture.medium})"></div>
                          <p class="list-group-item-contact-details">
                              ${data.results[0].name.first} ${data.results[0].name.last}<br>
                              <small class="pt-1">${randomMessage()}</small>
                          </p>
                      </a>
                      `).hide().appendTo("#users").fadeIn(500);
              }
            });
        }
    }




    function loadUsers() {
            newUser({ name: { first: "Gonzo", last: "Birrueta" }, img: "https://avatars1.githubusercontent.com/u/24580848?s=460&v=4", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." }, 'active', 'online', 'just now'); // specified user (false for random user), "active" class, "online|away|offline|dnd" status, time ago
            setTimeout(function () { newUser(false, false, 'online', '2 minutes ago'); }, 200);
            setTimeout(function () { newUser(false, false, 'online', '1 hour ago'); }, 200);
            setTimeout(function () { newUser(false, false, 'online', '1 hour ago'); }, 200);
            setTimeout(function () { newUser(false, false, 'away', '3 hours ago'); }, 200);
            setTimeout(function () { newUser(false, false, 'away', 'yesterday'); }, 200);
            setTimeout(function () { newUser(false, false, 'offline', 'yesterday'); }, 200);
            setTimeout(function () { newUser(false, false, 'offline', 'last month'); }, 200);
            setTimeout(function () { newUser(false, false, 'offline', 'last month'); }, 200);
            setTimeout(function () { newUser(false, false, 'offline', 'last month'); }, 200);
            setTimeout(function () { newUser(false, false, 'offline', 'last month'); }, 200);
            setTimeout(function () { newUser(false, false, 'dnd', 'last year'); }, 200);
    }

    loadUsers();
    $("#messages").animate({ scrollTop: $('#messages').prop("scrollHeight")}, 1000);
});
