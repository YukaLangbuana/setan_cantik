const form = document.querySelector('form')
const API_URL = "http://kuntilanak.herokuapp.com/api/v1/setan/"
const postElement = document.querySelector('.feeds')

getAllContent()

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const content = formData.get("content");

  const json = {
    content
  };

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(json),
    headers: {
      'content-type': 'application/json'
    }
  });
  setTimeout(function(){
  }, 2000);
  location.reload();
});

function getAllContent() {
  postElement.innerHTML = '';
  fetch(API_URL)
    .then(response => response.json())
    .then(posts => {
      posts.reverse();
      posts.forEach(post => {

        console.log(post.name);
      })
    })
  console.log(postElement.innerHTML);
}