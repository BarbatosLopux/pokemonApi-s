
let myPikachu = document.querySelector("#myPikachu");

myPikachu.addEventListener("click", async () => {
    let res = await (await fetch("https://pokeapi.co/api/v2/pokemon/mewtwo")).json();
    let img = res.sprites.front_default;
    // let defaultImg = colocar imagen por defecto


    Swal.fire({
        title: `${res.name}`,
        text: 'Modal with a custom image.',
        // imageUrl: `${res.sprites.front_default}`,
        imageUrl: `${(img) ? img : defaultImg}`,
        html: `
            ${res.stats.map(data => `
                <input 
                    type="range" 
                    id="uno" 
                    value="${data.base_stat}">
                <label for="uno"> 
                    ${data.base_stat} 
                    ${data.stat.name}</label><br>
                    `).join("")}   
        `,
        imageWidth: "80%",
        imageHeight: "80%",
    });
});