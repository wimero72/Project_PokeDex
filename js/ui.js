// js/ui.js

/**
 * Crea la estructura HTML para una tarjeta de Pokémon.
 * @param {object} pokemonData Datos del Pokémon.
 * @param {boolean} isCombat Si es para la página de combate (oculta)
 * @param {function} clickHandler Función de callback para el evento click en combate.
 * @returns {HTMLElement} El elemento DIV de la tarjeta.
 */
export function createPokemonCard(pokemonData, isCombat = false, clickHandler = null) {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    card.dataset.id = pokemonData.id;
    card.dataset.name = pokemonData.name; // Usar data-attributes para el filtro y el combate
    
    // Almacenar datos para el combate (data-attributes)
    if (isCombat) {
        card.dataset.attack = pokemonData.attack;
        card.dataset.defense = pokemonData.defense;
    }

    const innerHTML = `
        <div class="card-inner ${isCombat ? '' : 'flipped'}">
            <div class="card-back">?</div>
            <div class="card-front">
                <span class="name">${pokemonData.name}</span>
                <img src="${pokemonData.image}" alt="${pokemonData.name}">
                <div class="card-stats">
                    <span>Ataque: <strong>${pokemonData.attack}</strong></span>
                    <span>Defensa: <strong>${pokemonData.defense}</strong></span>
                </div>
                ${!isCombat ? `<a href="index.html?pokeID=${pokemonData.id}" class="btn btn-detail">Ver Detalle</a>` : ''}
            </div>
        </div>
    `;
    card.innerHTML = innerHTML;
    
    // Adjuntar el clickHandler SOLO si estamos en la página de combate
    if (isCombat && clickHandler) {
        card.addEventListener('click', clickHandler);
    }

    return card;
}

/**
 * Muestra el Pokémon seleccionado en la vista de detalle.
 * @param {object} pokemonData Datos del Pokémon.
 */
export function displayDetailView(pokemonData) {
    const container = document.getElementById('pokemon-container');
    container.innerHTML = `
        <div class="detail-view">
            <h2>${pokemonData.name}</h2>
            <img src="${pokemonData.image}" alt="${pokemonData.name}" style="width: 150px; height: 150px; margin: 10px;">
            <p>ID: ${pokemonData.id}</p>
            <p>Nivel de Ataque: <strong>${pokemonData.attack}</strong></p>
            <p>Nivel de Defensa: <strong>${pokemonData.defense}</strong></p>
            <button onclick="window.location.href='index.html'" class="btn btn-detail">Volver al Listado</button>
        </div>
    `;
    document.getElementById('filter-container').classList.add('hidden');
}

/**
 * Muestra el resultado del combate y activa el botón de reinicio.
 * @param {string} message Mensaje de resultado (victoria/derrota).
 * @param {boolean} isWinner Indica si el atacante ganó para aplicar estilos.
 */
export function showCombatResult(message, isWinner) {
    const resultDiv = document.getElementById('combat-result');
    const resetButton = document.getElementById('reset-button');
    
    resultDiv.textContent = message.toUpperCase();
    resultDiv.classList.remove('win', 'lose');
    resultDiv.classList.add(isWinner ? 'win' : 'lose');
    
    resetButton.disabled = false;
}

/**
 * Limpia la interfaz de combate para un nuevo encuentro.
 */
export function clearCombatUI() {
    document.getElementById('combat-result').textContent = '';
    document.getElementById('combat-result').classList.remove('win', 'lose');
    document.getElementById('reset-button').disabled = true;
    document.getElementById('combat-container').innerHTML = '';
}