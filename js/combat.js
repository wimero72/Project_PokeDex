document.addEventListener('DOMContentLoaded', () => {
    const combatGrid = document.getElementById('combat-grid');
    const combatResult = document.getElementById('combat-result');
    const resetBtn = document.getElementById('reset-btn');

    let combatPokemons = [];
    let selectedCards = []; // Almacena { elemento, datosPokemon }

    init();

    function init() {
        startNewBattle();
    }

    async function startNewBattle() {
        // Reiniciar estado
        combatGrid.innerHTML = '<p>Loading combatants...</p>';
        combatResult.classList.add('hidden');
        resetBtn.classList.add('hidden');
        selectedCards = [];

        // Obtener
        combatPokemons = await fetchRandomPokemons(10);
        renderCombatCards(combatPokemons);
    }

    function renderCombatCards(pokemons) {
        combatGrid.innerHTML = '';
        pokemons.forEach((poke, index) => {
            // Crear escena para efecto de volteo
            const scene = document.createElement('div');
            scene.className = 'scene';
            scene.dataset.index = index;

            scene.innerHTML = `
                <div class="card-inner">
                    <div class="card-face card-front">
                        ?
                    </div>
                    <div class="card-face card-back">
                        <div class="pokemon-card">
                            <img src="${poke.image}" alt="${poke.name}">
                            <h3>${poke.name}</h3>
                            <div class="stats">
                                <div class="stat-item">
                                    <span>${poke.attack}</span> Attack
                                </div>
                                <div class="stat-item">
                                    <span>${poke.defense}</span> Defense
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            scene.addEventListener('click', () => handleCardClick(scene, poke));
            combatGrid.appendChild(scene);
        });
    }

    function handleCardClick(sceneElement, pokemon) {
        // Ignorar si ya está volteada o si ya hay 2 cartas seleccionadas
        if (sceneElement.classList.contains('is-flipped') || selectedCards.length >= 2) {
            return;
        }

        // Voltear la carta
        sceneElement.classList.add('is-flipped');

        // Añadir a la selección
        selectedCards.push({
            element: sceneElement,
            data: pokemon
        });

        // Comprobar si tenemos 2 cartas
        if (selectedCards.length === 2) {
            setTimeout(resolveCombat, 1000); // Pequeño retraso para suspense
        }
    }

    function resolveCombat() {
        const attacker = selectedCards[0].data;
        const defender = selectedCards[1].data;

        let message = '';

        // Lógica: Atacante.ataque vs Defensor.defensa
        if (attacker.attack > defender.defense) {
            message = `${attacker.name} ataca i guanya a ${defender.name}`;
        } else {
            message = `${attacker.name} ataca i perd contra ${defender.name}`;
        }

        // Mostrar resultado
        combatResult.textContent = message;
        combatResult.classList.remove('hidden');
        resetBtn.classList.remove('hidden');
    }

    resetBtn.addEventListener('click', () => {
        startNewBattle();
    });
});
