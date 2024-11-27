const userInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const spriteContainer = document.getElementById("sprite-container");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const getSearch = async () => {
    try {
        const pokemonNameOrId = userInput.value.trim().toLowerCase();

        const response = await fetch(
            `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
        );
        console.log(response);

        if (!response.ok) {
            throw new Error('No responde');
        }

        const data = await response.json();
        console.log(data);

        // Pokemon Info
        pokeName.textContent = `${data.name.toUpperCase()}`;
        pokeId.textContent = `#${data.id}`;
        weight.textContent = `Weight: ${data.weight}`;
        height.textContent = `Height: ${data.height}`;
        types.innerHTML = data.types
            .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
            .join('');
        spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} image">`;

        // Pokemon stats
        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        specialAttack.textContent = data.stats[3].base_stat;
        specialDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;

    } catch (err) {
        resetDisplay();
        alert('Pokemon not found');
    }
};

const resetDisplay = () => {
    const sprite = document.getElementById("sprite");
    if (sprite) sprite.remove();

    pokeName.textContent = '';
    pokeId.textContent = '';
    weight.textContent = '';
    height.textContent = '';
    types.textContent = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    specialAttack.textContent = '';
    specialDefense.textContent = '';
    speed.textContent = '';
};

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    getSearch();
});
