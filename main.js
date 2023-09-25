document.addEventListener("DOMContentLoaded", () => {
    const pokemonButtons = document.querySelectorAll(".pokemon-btn");

    pokemonButtons.forEach((button) => {
        button.addEventListener("click", async () => {
            const pokemonName = button.getAttribute("data-pokemon");
            const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
            
            try {
                const res = await fetch(apiUrl);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                const img = data.sprites.front_default;

                Swal.fire({
                    title: `${data.name}`,
                    text: 'Modal with custom image and stats',
                    imageUrl: img,
                    html: `
                        ${data.stats.map((stat) => `
                            <div class="stat">
                                <label>${stat.stat.name}:</label>
                                <progress max="100" value="${stat.base_stat}">${stat.base_stat}</progress>
                            </div>
                        `).join("")}
                    `,
                    imageWidth: "80%",
                    imageHeight: "auto",
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        });
    });
});
