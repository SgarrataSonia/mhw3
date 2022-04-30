function onResponse(response) {
    return response.json();
}

function onJsonBeer(json) {
    
    const divBeer = document.querySelector("#visualizza_birra");
    divBeer.innerHTML = '';

    const birra = json[0];
    
    const img = birra.image_url;
    const name = birra.name;
    const text = birra.description;
    const abv = birra.abv;

    divBeer.classList.remove("nascosto");
    
    const image = document.createElement('img');
    image.src = img;
    const description = document.createElement('span');
    description.textContent = name + ": " + text + " (alcohol level: " + abv + ")";

    image.classList.add("adatta");
    divBeer.appendChild(image);
    divBeer.appendChild(description);
}

function randomBeer(event) {

    event.preventDefault();

    console.log("Eseguo ricerca randomica...");

    fetch('https://api.punkapi.com/v2/beers/random').then(onResponse).then(onJsonBeer);
}

function onJsonRecipe(json) {

    const divVideo = document.querySelector("#visualizza_ricette");
    divVideo.innerHTML = '';
  
    const div = document.createElement('div');
  
    const length = json.pageInfo.resultsPerPage;
  
    divVideo.classList.remove('nascosto');

    for(let i=0; i<length ;i++) {
        const a = document.createElement('a');
        const br = document.createElement('br');
        let url = "https://www.youtube.com/watch?v=" + json.items[i].id.videoId;
        a.href = url;
        a.textContent = json.items[i].snippet.title;
        div.appendChild(a);
        div.appendChild(br);
    }
  
    divVideo.appendChild(div);
}

function searchRecipe(event) {
    event.preventDefault();
  
    const ricetta = document.querySelector("#ricetta");
    const ricerca = encodeURIComponent(ricetta.value);
  
    rest_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDUDM84fkPrbKFVNqojejCCxtF3XjZNFvU&type=video&q=' + ricerca;

    console.log("Cerco la ricetta...");
  
    fetch(rest_url).then(onResponse).then(onJsonRecipe);
}

function initClient() {

    gapi.client.init({
        'apiKey': 'AIzaSyDUDM84fkPrbKFVNqojejCCxtF3XjZNFvU',
        'clientId': '677783894063-qgfq2j5vvh72m8cqhvaqrrbvlkdotjcu.apps.googleusercontent.com',
  
        'scope': 'https://www.googleapis.com/auth/youtube.force-ssl',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    }).then(function () {
        const GoogleAuth = gapi.auth2.getAuthInstance();
        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);
    });
}

const form1 = document.querySelector('#beers');
form1.addEventListener('submit', randomBeer);

const form2 = document.querySelector('#ricette');
form2.addEventListener('submit', searchRecipe);