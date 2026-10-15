const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const pokemonInfo = document.getElementById("pokemonInfo");
const message = document.getElementById("message");

async function searchPokemon() {
    const pokemonName = searchInput.value.trim().toLowerCase();

    if (pokemonName === "") {
        message.textContent = "Please enter a Pokémon name or ID.";
        pokemonInfo.innerHTML = "";
        return;
    }

    message.textContent = "Searching for Pokémon...";
    pokemonInfo.innerHTML = "";

    const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokemonName)}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Pokémon not found.");
        }

        const body = await response.json();

        const card = document.createElement("article");
        card.className = "pokemon-card";

        const image = document.createElement("img");
        image.src = body.sprites.other["official-artwork"].front_default
            || body.sprites.front_default
            || "";
        image.alt = body.name;

        const name = document.createElement("h2");
        name.textContent =
            body.name.charAt(0).toUpperCase() + body.name.slice(1);

        const types = document.createElement("p");
        types.textContent = "Type: " +
            body.types.map((item) => item.type.name).join(", ");

        const height = document.createElement("p");
        height.textContent = `Height: ${body.height / 10} m`;

        const weight = document.createElement("p");
        weight.textContent = `Weight: ${body.weight / 10} kg`;

        const abilities = document.createElement("p");
        abilities.textContent = "Abilities: " +
            body.abilities
                .map((item) => item.ability.name)
                .join(", ");

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(types);
        card.appendChild(height);
        card.appendChild(weight);
        card.appendChild(abilities);

        pokemonInfo.appendChild(card);

        message.textContent = "Pokémon found!";

    } catch (error) {
        message.textContent =
            "Pokémon not found. Check the spelling and try again.";

        console.error(error);
    }
}

searchButton.addEventListener("click", searchPokemon);

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchPokemon();
    }
});