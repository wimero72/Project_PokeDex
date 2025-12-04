const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

/**
 * Genera un número entero aleatorio entre min y max (inclusive).
 * Usando 1-151 para Pokémon de la primera generación para asegurar buena calidad de datos.
 */
function getRandomId(min = 1, max = 151) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Obtiene datos de un solo Pokémon por ID.
 * @param {number} id 
 * @returns {Promise<Object>} Datos del Pokemon
 */
async function fetchPokemon(id) {
    try {
        const response = await fetch(`${API_URL}${id}`);
        if (!response.ok) {
            throw new Error(`Pokemon not found: ${id}`);
        }
        const data = await response.json();
        return {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            types: data.types.map(t => t.type.name) // Extra info just in case
        };
    } catch (error) {
        console.error('Error fetching pokemon:', error);
        return null;
    }
}

/**
 * Obtiene N Pokémon únicos aleatorios.
 * @param {number} count 
 * @returns {Promise<Array>} Array de objetos Pokemon
 */
async function fetchRandomPokemons(count = 10) {
    const promises = [];
    const usedIds = new Set();

    while (promises.length < count) {
        const id = getRandomId();
        if (!usedIds.has(id)) {
            usedIds.add(id);
            promises.push(fetchPokemon(id));
        }
    }

    const results = await Promise.all(promises);
    return results.filter(p => p !== null);
}
