var urlMain = "https://pokeapi.co/api/v2/pokemon/"
var query = "?offset=500&limit=500"
let cons = ""

var number = 20;


const lectorCantidad = (value)=>{
    let cant = `?offset=0&limit=${value}`
    return urlMain+cant;
}

document.addEventListener("DOMContentLoaded", () => {
    const pokemonContainer = document.getElementById("pokemon-container");

    async function fetchPokemonData(pokemonName) {
        try {
            if(pokemonName === undefined){
                return {}
            }else{
                const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
                console.log(apiUrl);
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
        <p><label>HP:</label></p>
        <p><progress class="hp-progress" max="50" value="${(data.stats[0].base_stat / 255) * 100}"></progress></p>
        <p><label>Attack:</label></p>
        <p><progress class="attack-progress" max="50" value="${(data.stats[1].base_stat / 255) * 100}"></progress></p>
        <p><label>Defense:</label></p>
        <p><progress class="defense-progress" max="50" value="${(data.stats[2].base_stat / 255) * 100}"></progress></p>
        <p><label>Special Attack:</label></p>
        <p><progress class="special-attack-progress" max="50" value="${(data.stats[3].base_stat / 255) * 100}"></progress></p>
        <p><label>Special Defense:</label></p>
        <p><progress class="special-defense-progress" max="50" value="${(data.stats[4].base_stat / 255) * 100}"></progress></p>
        <p><label>Speed:</label></p>
        <p><progress class="speed-progress" max="50" value="${(data.stats[5].base_stat / 255) * 100}"></progress></p>
        <p><button class="save-btn">Save</button></p>
    `;

    const saveBtn = card.querySelector(".save-btn");

    saveBtn.addEventListener("click", () => {
    });

    return card;
}

    const pokemones_arra =async () =>{
        let res = await (await fetch(lectorCantidad(100))).json();
        console.log(res)
        let arrPokemones = res.results.map( ele =>{
            return {
                name: ele.name,
                url: ele.url
            }
        });
        console.log(arrPokemones)
        return arrPokemones;
    }

    (async()=>{
        let arr = await pokemones_arra();
        arr.forEach(async (ele) =>{
            let dataPoke = await fetchPokemonData(ele.name);

            const card = createPokemonCard(ele.name, dataPoke);

            pokemonContainer.insertAdjacentElement("beforeend",card)
    
            const data = await fetchPokemonData();
            console.log(data);
            
        })
    })()
});

