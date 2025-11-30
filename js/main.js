// js/main.js
import { getRandomPokemonIds, fetchPokemonData } from 'js/api.js';
import { createPokemonCard, displayDetailView, showCombatResult, clearCombatUI } from 'js/ui.js';

const POKEMON_COUNT = 10;
let allPokemonData = []; // Datos completos para filtrado en index.html
let selectedCards = [];  // Almacena datos de las cartas seleccionadas para el combate

// ===============================================
// Lógica de Carga y Flujo
// ===============================================

/**
 * Carga el listado de Pokémon y lo renderiza en el contenedor.
 * @param {string} containerId ID del contenedor HTML.
 * @param {boolean} isCombat Indica si estamos en la página de combate.
 */
async function loadPokemonList(containerId, isCombat = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = '<p>Cargando Pokémon...</p>';
    
    try {
        const ids = getRandomPokemonIds(POKEMON_COUNT);
        const fetches = ids.map(id => fetchPokemonData(id));
        const results = await Promise.all(fetches);
        
        allPokemonData = results.filter(p => p !== null); 
        container.innerHTML = ''; 
        
        allPokemonData.forEach(pokemon => {
            // Pasamos el handler de click solo si estamos en combate
            const card = createPokemonCard(pokemon, isCombat, isCombat ? handleCombatClick : null);
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = '<p>Error al cargar los Pokémon. Inténtalo de nuevo.</p>';
        console.error("Error al cargar listado: ", error);
    }
}

// ===============================================
// Lógica de Index (Filtro)
// ===============================================

function configureFilter() {
    const filterInput = document.getElementById('pokemon-filter');
    [cite_start]// Escucha el evento 'input' para comprobar por cada letra [cite: 101]
    filterInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const container = document.getElementById('pokemon-container');
        
        // Filtrar tarjetas
        container.querySelectorAll('.pokemon-card').forEach(cardElement => {
            const pokemonName = cardElement.dataset.name;
            
            [cite_start]// Si el nombre contiene el término de búsqueda, mostrar [cite: 100]
            if (pokemonName && pokemonName.includes(searchTerm)) {
                cardElement.classList.remove('hidden');
            } else {
                cardElement.classList.add('hidden');
            }
        });
    });
}


// ===============================================
// Lógica de Combat (Interacción y Batalla)
// ===============================================

function handleCombatClick(event) {
    const cardElement = event.currentTarget; // El elemento .pokemon-card
    const inner = cardElement.querySelector('.card-inner');
    
    // Si ya hay 2 seleccionadas o la carta ya está volteada, ignorar click
    if (selectedCards.length === 2 || inner.classList.contains('flipped')) {
        return;
    }

    [cite_start]// 1. Voltear la carta [cite: 107]
    inner.classList.add('flipped');
    
    // 2. Almacenar datos (usando data-attributes para simplificar el estado)
    selectedCards.push({
        name: cardElement.dataset.name,
        attack: parseInt(cardElement.dataset.attack),
        defense: parseInt(cardElement.dataset.defense),
    });

    if (selectedCards.length === 2) {
        // 3. Desactivar clicks
        document.querySelectorAll('.pokemon-card').forEach(c => c.style.pointerEvents = 'none');
        
        // 4. Iniciar combate tras un breve retraso
        setTimeout(simulateCombat, 1500); 
    }
}

function simulateCombat() {
    const [atacante, defensor] = selectedCards;
    let message = "";
    let isWinner = false;
    
    // Lógica del combate:
    // Si el ataque del primero > defensa del segundo, Gana el atacante [cite: 111]
    if (atacante.attack > defensor.defense) {
        message = `${atacante.name} ataca y gana a ${defensor.name}`;
        isWinner = true;
    } 
    else {
        // Si el ataque <= defensa, Gana el defensor [cite: 113]
        message = `${atacante.name} ataca y pierde contra ${defensor.name}`;
        isWinner = false;
    }

    showCombatResult(message, isWinner);
}

function resetCombat() {
    clearCombatUI();
    selectedCards = [];
    [cite_start]// Volver al estado inicial [cite: 115]
    loadPokemonList('combat-container', true); 
    document.querySelectorAll('.pokemon-card').forEach(c => c.style.pointerEvents = 'auto');
}


// ===============================================
// INICIALIZACIÓN (Función principal)
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    if (path.includes('combat.html')) {
        // --- Lógica de Combate ---
        loadPokemonList('combat-container', true);
        document.getElementById('reset-button').addEventListener('click', resetCombat);
        
    } else {
        // --- Lógica de Index (Listado/Detalle) ---
        const urlParams = new URLSearchParams(window.location.search);
        const pokeID = urlParams.get('pokeID');

        [cite_start]// Comprueba si la URL contiene el parámetro pokeID [cite: 94]
        if (pokeID) {
            [cite_start]// MODO DETALLE: index.html?pokeID=5 [cite: 94]
            fetchPokemonData(pokeID).then(pokemon => {
                if (pokemon) {
                    displayDetailView(pokemon);
                }
            });
        } else {
            [cite_start]// MODO LISTADO (por defecto) [cite: 96]
            loadPokemonList('pokemon-container');
            configureFilter();
        }
    }
});