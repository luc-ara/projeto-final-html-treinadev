let planets = document.getElementById('planets');
let planet = document.getElementById('planet');
let navigation = document.getElementById('navigation');
let residents = document.getElementById('residents');

const startPage = 'https://swapi.dev/api/planets/?format=json';

async function fetchPlanets(page) {

    planets.innerHTML = "";
    navigation.innerHTML = "";
    
    data = await fetch(page);

    let {results, next, previous} = await data.json();

    console.log(results);

    results.forEach(element => {
        let span = document.createElement('span');
        span.innerHTML = `<button onclick="fetchPlanetInfo('${element.name}')">${element.name}</button>`;
        planets.appendChild(span);
    });

    if (previous != null) {
        let previousPage = document.createElement('span');
        previousPage.innerHTML = `<button onclick="fetchPlanets('${previous}')">previous page</button>`;
        navigation.appendChild(previousPage);
    }

    if (next != null) {
        let nextPage = document.createElement('span');
        nextPage.innerHTML = `<button onclick="fetchPlanets('${next}')">next page</button>`;
        navigation.appendChild(nextPage);
    }
}

async function fetchPlanetInfo(planetName) {

    data = await fetch(`https://swapi.dev/api/planets/?search=${planetName}&format=json`);
    let {results} = await data.json();
    let result = results[0];

    let header = document.createElement('h2');
    let pName = document.createElement('p');
    let climate = document.createElement('p');
    let population = document.createElement('p');
    let terrain = document.createElement('p');

    header.innerHTML = `Planet`
    pName.innerHTML = `Nome: ${result.name}`;
    climate.innerHTML = `Clima: ${result.climate}`;
    population.innerHTML = `População: ${result.population}`;
    terrain.innerHTML = `Terreno: ${result.terrain}`;

    planet.innerHTML = "";

    planet.appendChild(header);
    planet.appendChild(pName);
    planet.appendChild(climate);
    planet.appendChild(population);
    planet.appendChild(terrain);

    residents.innerHTML = "";

    if (result.residents.length != 0) {
        let subHeader = document.createElement('h3');
        subHeader.innerHTML = 'Residents'
        residents.appendChild(subHeader);

        let table = document.createElement('table');
        table.innerHTML = '<tr><th>Name</th><th>Year of Birth</th></tr>';
        residents.appendChild(table);

        for (resident of result.residents) {
            let residentData = await fetch(resident);
            let {name, birth_year} = await residentData.json();

            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${name}</td><td>${birth_year}</td>`;
            table.appendChild(tr);
        };
    }
}

async function searchPlanet() {

    let planetName = await document.getElementById('planetName').value;
    fetchPlanetInfo(planetName);

}

