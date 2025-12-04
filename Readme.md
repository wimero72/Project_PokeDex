# ⚡ Pokedex Interactiva

# ⚡ Project_PokeDex: Pokedex Interactiva

Una aplicación web de Pokedex simple y rápida construida con **Vanilla JavaScript, HTML y CSS** que permite a los usuarios buscar Pokémon de la Generación 1 y participar en un simulacro de batalla interactiva.

## 🌟 Características Principales

[cite_start]La aplicación obtiene dinámicamente datos de la **PokeAPI** [cite: 2] y se divide en dos páginas principales.

### 1. Página de Inicio (`index.html`)

Esta página sirve como el listado principal de Pokémon:

* [cite_start]**Pokémon Aleatorios:** Obtiene y muestra 10 Pokémon aleatorios de la Generación 1 al cargar[cite: 9, 15].
* [cite_start]**Diseño de Tarjeta:** Las tarjetas presentan un estilo moderno **Glassmorphism** y un diseño de cuadrícula responsivo[cite: 4, 17, 27].
* [cite_start]**Filtro de Búsqueda:** Filtra la lista de Pokémon por nombre en tiempo real[cite: 10, 16].
* [cite_start]**Vista Detallada:** Al hacer clic en un Pokémon, la URL se actualiza (`?pokeID=X`) y se muestra una vista dedicada (la Vista Detallada)[cite: 11, 16].

### 2. Página de Combate (`combat.html`)

Esta página simula una batalla interactiva basada en estadísticas:

* [cite_start]**Cartas Misteriosas:** Carga 10 cartas boca abajo para la selección[cite: 12, 18].
* [cite_start]**Batalla Interactiva:** Los usuarios seleccionan dos cartas: la primera es el **Atacante** y la segunda es el **Defensor**[cite: 19].
* [cite_start]**Lógica de Combate:** El ganador se decide comparando la estadística de **Ataque del Atacante** contra la **Defensa del Defensor**[cite: 20].
* [cite_start]**Reiniciar:** El botón "Reset Battle" comienza una nueva batalla con 10 nuevos Pokémon[cite: 21].

---

## 🛠️ Estructura del Proyecto y Tecnologías

### Stack Tecnológico
* **HTML:** Estructura semántica (Vanilla HTML).
* [cite_start]**CSS:** Estilos globales, variables CSS, Flexbox/Grid y animación de volteo 3D (Vanilla CSS)[cite: 5, 27].
* [cite_start]**JavaScript:** Lógica de la aplicación y manipulación del DOM (Vanilla JS).
* [cite_start]**API:** [PokeAPI](https://pokeapi.co/)[cite: 2].

### Estructura de Archivos
```
Project_PokeDex/ 
├── index.html # Vista de Listado / Vista Detallada 
├── combat.html # Vista de Combate 
├── css/ 
│ └── style.css # Estilos (Glassmorphism, Responsivo, Volteo)  
└── js/ 
    ├── api.js # Funciones fetchPokemon(id), fetchRandomPokemons(count) 
    ├── main.js # Lógica para index.html (Filtro, Renderizado, Detalle) 
    └── combat.js # Lógica para combat.html (Selección, Lógica de Combate)
```

### 👤 Autor y Contacto

**Wilmer Isaac Mendoza Rodriguez**
* **Email:** wmendozar.uoc.fwd@gmail.com
* **GitHub del Proyecto:** [https://github.com/wimero72/Project_PokeDex.git](https://github.com/wimero72/Project_PokeDex.git)
* **Formación:** Estudiante Front End WEB Developer - UOC
