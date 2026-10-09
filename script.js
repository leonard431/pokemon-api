const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const pokemonInfo = document.getElementById("pokemonInfo");

async function searchPokemon() {

    const pokemonName = searchInput.value;

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    const response = await fetch(url);

    const body = await response.json();
    
    console.log(body);
    
}

searchButton.addEventListener("click", searchPokemon);