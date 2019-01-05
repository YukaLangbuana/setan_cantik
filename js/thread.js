var url = window.location.href;
var setan_id = url.split("id=")[1]

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + "y";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + "m";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + "d";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + "h";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + "m";
    }
    return Math.floor(seconds) + "s";
  }

$("#textarea").keypress(function (e) {
    if(e.which == 13 && !e.shiftKey) {        
        const content = document.getElementById("textarea").value
        const setan_parent_id = setan_id
  
        const json = {
            setan_parent_id,
            content
        };
  
        fetch("https://kuntilanak.herokuapp.com/api/v1/comments/", {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
            'content-type': 'application/json'
            }
        }).then(function(response){
            if(response.ok){
                fetchdata();
            }
        })
        setTimeout(function(){
        }, 1000);
    }
});

$(window).scroll(function() {
    var element = document.getElementsByClassName("head")
    if ($(document).scrollTop() > 100){  
        $(element).addClass("sticky");
    }
    else{
        $(element).removeClass("sticky");
    }
  });

function fetchdata(){
    $.ajax({
        url: 'https://kuntilanak.herokuapp.com/api/v1/setan/'+setan_id+"/",
        type: 'GET',
        success: function(data){
            // Perform operation on return value
            var content = data
            
            var html = `
                <div class="body">
                  <div class="row">
                    <div class="col-sm-2">
                      <div class="likes">
                        <button type="button" class="btn btn-light"><span id="${content.id}" class="number" onClick="upLike(this.id)">${content.like}</span><br><div class="glyphicon glyphicon-heart"></div></button>
                      </div>
                    </div>
                    <div class="col-sm-10">
                        <p class="content">${content.content}</p>
                        <div class="col-sm-5 nopadding"><div class="name"><p>${content.name}, ${timeSince(new Date(content.time))} ago</p></div></div>
                    </div>
                  </div>
                </div>
            `;

            var toShow = "";
            for (i = 0; i < (content.comments).length; i++) {
                var html_comments = `
                    <div class="body">
                    <div class="row">
                        <div class="col-sm-2">
                        </div>
                        <div class="col-sm-10">
                            <p class="comments">${(content.comments)[i].content}</p>
                            <div class="col-sm-5 nopadding"><div class="name"><p>${timeSince(new Date((content.comments)[i].time))}</p></div></div>
                        </div>
                    </div>
                    </div>
                `;
                console.log(html_comments)
                toShow += html_comments;
                console.log(toShow)
            }
            document.getElementById("feeds").innerHTML = html;
            document.getElementById("comments").innerHTML = toShow;
        },
        complete:function(data){
            setTimeout(fetchdata,5000);
        }
    });
  }

  $(document).ready(function(){
    setTimeout(fetchdata,1);
  });
  