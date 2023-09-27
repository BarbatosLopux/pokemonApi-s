document.addEventListener("DOMContentLoaded", () => {
    const pokemonContainer = document.getElementById("pokemon-container");

    async function fetchPokemonData(pokemonName) {
        try {
            const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
            const res = await fetch(apiUrl);
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    }

    async function saveStats(pokemonName, newHP) {
        try {
            const mockApiUrl = `https://6513a6898e505cebc2ea0473.mockapi.io/:endpoint/${pokemonName}`;
            await fetch(mockApiUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ hp: newHP })
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Statistics saved successfully!',
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    }
    let numberOfPokemonToShow = 10;
    const maxPokemonCount = 400;
const allPokemonNames = [];
for (let i = 1; i <= maxPokemonCount; i++) {
    allPokemonNames.push(`pokemon/${i}`);
}
function createPokemonCard(pokemonName, data) {
    const card = document.createElement("div");
    card.classList.add("pokemon");
    card.innerHTML = `
        <h3>${pokemonName}</h3>
        <img src="${data.sprites.front_default}" alt="${pokemonName}">
        <p><label>HP:</label></p>
        <p><progress class="hp-progress" max="100" value="${(data.stats[0].base_stat / 255) * 100}"></progress></p>
        <p><label>Attack:</label></p>
        <p><progress class="attack-progress" max="100" value="${(data.stats[1].base_stat / 255) * 100}"></progress></p>
        <p><label>Defense:</label></p>
        <p><progress class="defense-progress" max="100" value="${(data.stats[2].base_stat / 255) * 100}"></progress></p>
        <p><label>Special Attack:</label></p>
        <p><progress class="special-attack-progress" max="100" value="${(data.stats[3].base_stat / 255) * 100}"></progress></p>
        <p><label>Special Defense:</label></p>
        <p><progress class="special-defense-progress" max="100" value="${(data.stats[4].base_stat / 255) * 100}"></progress></p>
        <p><label>Speed:</label></p>
        <p><progress class="speed-progress" max="100" value="${(data.stats[5].base_stat / 255) * 100}"></progress></p>
        <p><button class="save-btn">Save</button></p>
    `;

    const saveBtn = card.querySelector(".save-btn");

    saveBtn.addEventListener("click", () => {
    });

    return card;
}




    const pokemonNames = [
        "pikachu",
        "charizard",
        "charmander",
        "mewtwo",
        "ditto",
        "bulbasaur",
        "ivysaur",
        "venusaur" ,
        "mew",
        "dragonite",
        "dragonair",
        "dratini",
        "moltres",
        "zapdos",
        "articuno",
        "snorlax",
        "aerodactyl",
        "kabutops",

    ];

    pokemonNames.forEach(async (pokemonName) => {
        const data = await fetchPokemonData(pokemonName);
        const card = createPokemonCard(pokemonName, data);
        pokemonContainer.appendChild(card);
    });
});
