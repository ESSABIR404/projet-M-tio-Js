let cityBackgrounds = {
    'casablanca': 'url("imageVille/casablanca.jpg")',
    'dakhla': 'url("imageVille/dakhla.jpg")',
    'roma': 'url("imageVille/roma.jpg")',
    'paris': 'url("imageVille/paris.jpg")', 
    'rabat': 'url("imageVille/rabat.jpg")', 

};

let defaultBackground = 'url("imageVille/default.jpg")'; // Provide a default background

let ville = 'casablanca';
recevoirTemperature(ville);

function recevoirTemperature(ville) {
    let api_key = 'e1c5353e96406e9f10feb5e3f9a4d9a7'; 
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=' + api_key + '&lang=fr&units=metric';
    let requete = new XMLHttpRequest();

    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function () {
        if (requete.readyState == XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let temp = requete.response.main.temp;
                let cityName = requete.response.name;
                let icon = requete.response.weather[0].icon;
                let min = requete.response.main.temp_min;
                let max = requete.response.main.temp_max;

                let newDiv = document.createElement('div');
                newDiv.innerHTML = '<p>Min : <span class="text-primary font-weight-bold">' + min + '°C</span> Max : <span class="text-primary font-weight-bold">' + max + '°C</span></p>';

                let img = document.createElement('img');
                img.src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';

                let selectVille = document.querySelector('#ville');
                selectVille.innerHTML = '<h2>' + cityName + '</h2>';

                selectVille.appendChild(img);
                selectVille.appendChild(newDiv);

                let selectTemp = document.querySelector('#temperature_label');
                selectTemp.textContent = temp;

                // Change background image based on the selected city or use default
                document.querySelector('.container').style.backgroundImage = cityBackgrounds[ville] || defaultBackground;
            } else {
                alert('Un problème est intervenu, merci de ressaisir une nouvelle ville ou revenir plus tard.');
            }
        }
    }
}

let nouvelleVilleInput = document.getElementById('nouvelleVille');
let bouton = document.querySelector('#changer');
bouton.addEventListener('click', () => {
    let villeChoisie = nouvelleVilleInput.value;
    if (villeChoisie) {
        recevoirTemperature(villeChoisie);
    }
});
