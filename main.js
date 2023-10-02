
let urlMain = "https://pokeapi.co/api/v2/pokemon/";

const lectorCantidad = (value) => {
    let cant = `?offset=0&limit=${value}`;
    return urlMain + cant;
}

document.addEventListener("DOMContentLoaded", () => {
    const pokemonContainer = document.getElementById("pokemon-container");
    const pokemonCountInput = document.getElementById("pokemon-count-input");

    async function fetchPokemonData(pokemonName) {
        try {
            if (pokemonName === undefined) {
                return {}
            } else {
                const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
                
                const res = await fetch(apiUrl);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await res.json();
                return data;
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    }

    function createPokemonCard(pokemonName, data) {
        const card = document.createElement("div");
        card.classList.add("pokemon");
        card.innerHTML = `
            <h3>${pokemonName}</h3>
            <img src="${data.sprites.front_default}" alt="${pokemonName}">
            <form>
                <label>HP:</label> ${data.stats[0].base_stat}
                <input type="range" class="hp-progress" max="255" name="hp" value="${data.stats[0].base_stat}">
                <label>Attack:</label> ${data.stats[1].base_stat}
                <input type="range" class="attack-progress" max="255" name="Attack" value="${data.stats[1].base_stat}">
                <label>Defense:</label> ${data.stats[2].base_stat}
                <input type="range" class="defense-progress" max="255" name="Defense" value="${data.stats[2].base_stat}">
                <label>Special Attack:</label> ${data.stats[3].base_stat}
                <input type="range" class="special-attack-progress" max="255"  name="Special Attack" value="${data.stats[3].base_stat}">
                <label>Special Defense:</label> ${data.stats[4].base_stat}
                <input type="range" class="special-defense-progress" max="255" name="Special Defense" value="${data.stats[4].base_stat}">
                <label>Speed:</label> ${data.stats[5].base_stat}
                <input type="range" class="speed-progress" max="255" name="Speed" value="${data.stats[5].base_stat}">
            </form>
            <button class="save-btn">Save</button>
        `;

    
        card.querySelector(".save-btn").addEventListener("click", async () => {
            try {
                const name = pokemonName;
                const stats = data.stats.map(stat => ({
                    name: stat.stat.name,
                    base_stat: stat.base_stat
                }));

                const response = await fetch(" http://127.0.0.2:5010/pokemon", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: name,
                        estadisticas: stats
                    })
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

              
                updatePokemonCards();
            } catch (error) {
                console.error(error);
                Swal.fire({
                    text: 'datos subidos correctamente',
                });
            }
        });

        return card;
    }
    
    const pokemones_arra = async (count) => {
        let res = await (await fetch(lectorCantidad(count))).json();
        
        let arrPokemones = res.results.map((ele) => {
            return {
                name: ele.name,
                url: ele.url,
            };
        });
        
        return arrPokemones;
    }

    pokemonCountInput.addEventListener("input", async () => {
        const pokemonCount = pokemonCountInput.value;
        pokemonContainer.innerHTML = "";
        let arr = await pokemones_arra(pokemonCount);
        arr.forEach(async (ele) => {
            let dataPoke = await fetchPokemonData(ele.name);
            const card = createPokemonCard(ele.name, dataPoke);
            pokemonContainer.insertAdjacentElement("beforeend", card);
        });

        const request =await (await fetch(arr[0].url)).json();
        let mapa = request.stats.map(element =>{
            return [element.stat.name,element.base_stat]
        }) 

       
        async function updatePokemonCards() {
            const response = await fetch(" http://127.0.0.2:5010/pokemon");
            if (response.ok) {
                const data = await response.json();

               
                const cards = document.querySelectorAll(".pokemon");
                cards.forEach(card => {
                    const name = card.querySelector("h3").textContent;
                    const newData = data.find(item => item.name === name);

                    if (newData) {
                       
                        const form = card.querySelector("form");
                        newData.estadisticas.forEach(stat => {
                            const input = form.querySelector(`[name="${stat.name}"]`);
                            if (input) {
                                input.value = stat.base_stat;
                            }
                        });
                    }
                });
            }
        }

        updatePokemonCards();
    });
});
