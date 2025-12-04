document.addEventListener('DOMContentLoaded', () => {
    const pokemonListEl = document.getElementById('pokemon-list');
    const searchInput = document.getElementById('pokemon-search');
    const detailSection = document.getElementById('pokemon-detail');
    const detailContent = document.getElementById('detail-content');
    const backBtn = document.getElementById('back-btn');
    const searchSection = document.getElementById('search-section');

    let allPokemons = [];

    // Inicializar
    init();

    async function init() {
        // Comprobar parámetro URL
        const urlParams = new URLSearchParams(window.location.search);
        const pokeID = urlParams.get('pokeID');

        if (pokeID) {
            showDetailView(pokeID);
        } else {
            loadMainList();
        }
    }

    async function loadMainList() {
        // Mostrar lista, ocultar detalle
        pokemonListEl.classList.remove('hidden');
        searchSection.classList.remove('hidden');
        detailSection.classList.add('hidden');

        // Obtener si está vacío
        if (allPokemons.length === 0) {
            allPokemons = await fetchRandomPokemons(10);
        }
        renderCards(allPokemons);
    }

    function renderCards(pokemons) {
        pokemonListEl.innerHTML = '';
        pokemons.forEach(poke => {
            const card = document.createElement('div');
            card.className = 'pokemon-card';
            card.innerHTML = `
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
                <a href="?pokeID=${poke.id}" class="btn" style="display: inline-block; margin-top: 1rem; text-decoration: none; font-size: 0.8rem;">View Details</a>
            `;

            // Añadir evento click para sensación SPA (opcional, pero el requisito dice "indicar en parámetro url")
            // Podemos dejar que el enlace lo maneje, pero para evitar recarga completa podríamos usar pushState.
            // Requisito: "Al cargar la página se debe consultar si la url contiene el parámetro pokeID"
            // Esto implica una recarga o al menos manejar el estado.
            // Vamos a mantener la navegación por enlaces simple ya que es robusta y cumple perfectamente el requisito.

            pokemonListEl.appendChild(card);
        });
    }

    // Filtro de búsqueda
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allPokemons.filter(poke => poke.name.toLowerCase().includes(query));
        renderCards(filtered);
    });

    // Lógica de Vista Detallada
    async function showDetailView(id) {
        pokemonListEl.classList.add('hidden');
        searchSection.classList.add('hidden');
        detailSection.classList.remove('hidden');

        // Podríamos necesitar obtener este pokemon específico si no está en nuestra lista
        // (ej. el usuario vino de un enlace directo)
        let pokemon = allPokemons.find(p => p.id == id);
        if (!pokemon) {
            detailContent.innerHTML = '<p>Loading...</p>';
            pokemon = await fetchPokemon(id);
        }

        if (pokemon) {
            renderDetail(pokemon);
        } else {
            detailContent.innerHTML = '<p>Pokemon not found.</p>';
        }
    }

    function renderDetail(poke) {
        detailContent.innerHTML = `
            <img src="${poke.image}" alt="${poke.name}" style="width: 200px; height: 200px;">
            <h2 style="text-transform: capitalize; font-size: 2rem; margin: 1rem 0;">${poke.name}</h2>
            <div class="stats" style="font-size: 1.2rem; margin-bottom: 2rem;">
                <div class="stat-item">
                    <span>${poke.attack}</span> Attack
                </div>
                <div class="stat-item">
                    <span>${poke.defense}</span> Defense
                </div>
            </div>
            <!-- Podríamos añadir más información aquí si la API lo proporcionara fácilmente, pero los requisitos dicen "misma info + filtro" (espera, el filtro es para la lista) -->
            <!-- "La información de esta página debe ser la misma que ya tenemos en la tarjeta" -->
        `;
    }

    // Botón Atrás
    backBtn.addEventListener('click', () => {
        // Eliminar parámetro de la URL sin recargar
        const newUrl = window.location.pathname;
        window.history.pushState({}, '', newUrl);

        // Restaurar vista
        loadMainList();
    });
});
