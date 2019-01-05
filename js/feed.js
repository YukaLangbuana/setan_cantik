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

      const json = {
          content
      };

      fetch("https://kuntilanak.herokuapp.com/api/v1/setan/", {
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

$("a[href='#top']").click(function() {
  var element = document.getElementsByClassName("head")
  $(element).removeClass("sticky");
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

function upLike(clicked_id)
{
  var like = parseInt(document.getElementById(clicked_id).innerHTML)+1;
  var url_address = 'https://kuntilanak.herokuapp.com/api/v1/setan/'+clicked_id+"/";
  var json = {
      like
  }
  console.log(JSON.stringify(json));
  var settings = {
      url: url_address,
      method: 'PATCH',
      data: json,
  }
  $.ajax(settings).done(function (response) {
      setTimeout(fetchdata,1);
  });
}

function fetchdata(){
  $.ajax({
      url: 'https://kuntilanak.herokuapp.com/api/v1/setan/?page=last',
      type: 'GET',
      success: function(data){
          // Perform operation on return value
          var content = data.results
          
          var toShow = "";
          for (i = 0; i < content.length-1; i++) {
              var html = `
              <div class="body">
                <div class="row">
                  <div class="col-sm-2">
                    <div class="likes">
                      <button type="button" class="btn btn-light"><span id="${content[i].id}" class="number" onClick="upLike(this.id)">${content[i].like}</span><br><div class="glyphicon glyphicon-heart"></div></button>
                    </div>
                  </div>
                  <a href="thread.html?id=${content[i].id}" style="color:black">
                    <div class="col-sm-10">
                      <p class="content">${content[i].content}</p>
                      <div class="col-sm-5 nopadding"><div class="name"><p>${content[i].name}, ${timeSince(new Date(content[i].time))} ago</p></div></div>
                      <div class="col-sm-6"><div class="name"><div class="reply glyphicon glyphicon-share-alt"></div><p>${(content[i].comments).length}</p></div></div>
                    </div>
                  </a>
                </div>
              </div>
              `;
              var html2= `
              <div class="body">
                <div class="row">
                  <div class="col-sm-2">
                    <div class="likes">
                      <button type="button" class="btn btn-light"><span id="${content[i].id}" class="number" onClick="upLike(this.id)">${content[i].like}</span><br><div class="glyphicon glyphicon-heart"></div></button>
                    </div>
                  </div>
                  <a href="thread.html?id=${content[i].id}" style="color:black">
                    <div class="col-sm-10" id="content-wrapper">
                      <p class="content">${content[i].content}</p>
                      <div class="name"><p>${content[i].name}, ${timeSince(new Date(content[i].time))} ago</p></div>
                    </div>
                  </a>
                </div>
              </div>
              `;
              if((content[i].comments).length > 0) {
                  toShow += html;
              } else {
                  toShow += html2;
              }
          }
          document.getElementById("feeds").innerHTML = toShow
      },
      complete:function(data){
          setTimeout(fetchdata,5000);
      }
  });
}

$(document).ready(function(){
  setTimeout(fetchdata,1);
});
