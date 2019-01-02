const form = document.querySelector('form')
const API_URL = "https://kuntilanak.herokuapp.com/api/v1/setan/"
const postElement = document.querySelector('.feeds')


function getJSON(url) {
  var resp ;
  var xmlHttp ;

  resp  = '' ;
  xmlHttp = new XMLHttpRequest();

  if(xmlHttp != null)
  {
      xmlHttp.open( "GET", url, false );
      xmlHttp.send( null );
      resp = xmlHttp.responseText;
  }

  return resp ;
}

var gjson = JSON.parse(getJSON(API_URL));
var content =gjson.results

for (i = content.length-1; i > 0; i--) { 
  var html = `
  <div class="body">
        <div class="row">
            <div class="col-sm-2"><button type="submit" class="box-btn"><span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span></button></div>
            <div class="col-sm-10">
                <p>${content[i].content}</p>
                <div class="name"><p>${content[i].name}</p></div>
            </div>
        </div>
    </div>
`;
  document.getElementById("feeds").innerHTML += html
  console.log(content[i].content)
}