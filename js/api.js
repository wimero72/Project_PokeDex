// js/api.js

const POKE_API_BASE = "https://pokeapi.co/api/v2/pokemon/";

/**
 * Genera una lista de IDs de Pokémon aleatorios para el listado inicial.
 * @param {number} count Número de IDs a generar (ej: 10)
 * @param {number} maxId Límite superior de IDs para asegurar Pokemons conocidos.
 * @returns {number[]} Array de IDs aleatorios.
 */
export function getRandomPokemonIds(count, maxId = 500) {
    const ids = new Set();
    while (ids.size < count) {
        const randomId = Math.floor(Math.random() * maxId) + 1;
        ids.add(randomId);
    }
    return Array.from(ids);
}

/**
 * Consulta la PokeAPI para obtener los datos clave de un Pokémon.
 * @param {number} id ID del Pokémon.
 * @returns {Promise<object>} Objeto con nombre, imagen, ataque y defensa.
 */
export async function fetchPokemonData(id) {
    try {
        const response = await fetch(`${POKE_API_BASE}${id}/`);
        if (!response.ok) {
            throw new Error(`Error al obtener datos del Pokémon ${id}: ${response.statusText}`);
        }
        const data = await response.json();

        // El enunciado indica las rutas específicas:
        [cite_start]// Nom = Objecte.name [cite: 88]
        [cite_start]// Imatge = Objecte.sprites.front_default [cite: 89]
        [cite_start]// Atac = Objecte.stats[1].base_stat [cite: 90]
        [cite_start]// Defensa = Objecte.stats[2].base_stat [cite: 90]

        // En la API moderna, es mejor buscar por nombre del stat:
        const attackStat = data.stats.find(stat => stat.stat.name === 'attack');
        const defenseStat = data.stats.find(stat => stat.stat.name === 'defense');

        return {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            attack: attackStat ? attackStat.base_stat : data.stats[1]?.base_stat || 0, // Fallback por índice
            defense: defenseStat ? defenseStat.base_stat : data.stats[2]?.base_stat || 0, // Fallback por índice
        };
    } catch (error) {
        console.error("Error en fetchPokemonData:", error);
        return null;
    }
}