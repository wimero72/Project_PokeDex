// Constantes
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const POKEMON_LIST_CONTAINER = document.getElementById('pokemon-list');
const NUMBER_OF_POKEMON = 10;

/**
 * Función para generar un ID de Pokémon aleatorio entre 1 y 898 (Generación 8)
 * Nota: El rango máximo puede variar dependiendo de la API. Usaremos 898 como un buen estándar.
 */
function getRandomPokemonId() {
    // Math.random() * (max - min) + min
    return Math.floor(Math.random() * 898) + 1;
}

/**
 * Función para obtener los datos detallados de un Pokémon por su ID.
 * @param {number} id - ID del Pokémon a consultar.
 * @returns {Promise<object>} Los datos JSON del Pokémon.
 */
async function fetchPokemonData(id) {
    try {
        const response = await fetch(`${POKEAPI_BASE_URL}${id}/`);
        if (!response.ok) {
            throw new Error(`Error al obtener Pokémon con ID ${id}: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Fallo en fetchPokemonData:", error);
        return null;
    }
}

/**
 * Función para crear y devolver el elemento HTML de la tarjeta de Pokémon.
 * @param {object} pokemon - Objeto de datos del Pokémon.
 * @returns {HTMLElement} La tarjeta del Pokémon.
 */
function createPokemonCard(pokemon) {
    // Extracción de datos según las rutas indicadas en el enunciado
    const name = pokemon.name; // Objecte.name 
    const image = pokemon.sprites.front_default; // Objecte.sprites.front_default [cite: 89]

    // Las estadísticas están en un array. Buscamos 'attack' (índice 1) y 'defense' (índice 2)
    // Usamos .find para mayor robustez, aunque el enunciado usa índices fijos.
    // stats[1] es 'attack' en el ejemplo [cite: 60, 61, 77]
    const attackStat = pokemon.stats.find(stat => stat.stat.name === 'attack');
    // stats[2] es 'defense' en el ejemplo [cite: 73, 79, 80]
    const defenseStat = pokemon.stats.find(stat => stat.stat.name === 'defense');
    
    // Obtenemos los valores base, siguiendo las rutas del enunciado:
    const attack = attackStat ? attackStat.base_stat : 'N/A'; // Objecte.stats[1].base_stat 
    const defense = defenseStat ? defenseStat.base_stat : 'N/A'; // Objecte.stats[2].base_stat 
    
    // Crear el elemento de la tarjeta
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.setAttribute('data-id', pokemon.id); // Guardar el ID para el detalle/filtro

    card.innerHTML = `
        <img src="${image}" alt="${name}">
        <h3>${name}</h3>
        <div class="stats">
            <p><strong>Ataque:</strong> ${attack}</p>
            <p><strong>Defensa:</strong> ${defense}</p>
        </div>
        <button onclick="window.location.href='index.html?pokeID=${pokemon.id}'">
            Ver Detalle
        </button>
    `;

    return card;
}

/**
 * Función principal para cargar y renderizar los 10 Pokémon iniciales.
 */
async function loadInitialPokemon() {
    // 1. Limpiar el contenedor y mostrar mensaje de carga
    POKEMON_LIST_CONTAINER.innerHTML = '<h2>Cargando 10 Pokémon aleatorios...</h2>';
    
    const pokemonPromises = [];
    const usedIds = new Set(); // Para asegurar IDs únicos

    // 2. Obtener 10 IDs aleatorios únicos
    while (pokemonPromises.length < NUMBER_OF_POKEMON) {
        let randomId = getRandomPokemonId();
        if (!usedIds.has(randomId)) {
            usedIds.add(randomId);
            // Almacenar la promesa de la llamada a la API
            pokemonPromises.push(fetchPokemonData(randomId));
        }
    }

    // 3. Esperar a que se completen todas las llamadas a la API
    const pokemons = await Promise.all(pokemonPromises);
    
    // 4. Limpiar el contenedor una vez que tenemos los datos
    POKEMON_LIST_CONTAINER.innerHTML = '';
    
    // 5. Crear y añadir las tarjetas al DOM
    pokemons.forEach(pokemon => {
        // Solo renderizar si la llamada a la API fue exitosa
        if (pokemon) { 
            const card = createPokemonCard(pokemon);
            POKEMON_LIST_CONTAINER.appendChild(card);
        }
    });

    if (POKEMON_LIST_CONTAINER.children.length === 0) {
         POKEMON_LIST_CONTAINER.innerHTML = '<h2>No se pudo cargar ningún Pokémon. Inténtalo de nuevo.</h2>';
    }
}

// Iniciar la carga al cargar la página
window.onload = loadInitialPokemon;