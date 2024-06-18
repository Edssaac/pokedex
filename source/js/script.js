// Elementos interativos do projeto:
const pokemonImage = document.querySelector(".pokemon__image");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

// Função responsável por consumir o endpoit da PokéAPI:
const fetchPokemon = async (pokemon) => {
  pokemonNumber.innerHTML = '?';
  pokemonName.innerHTML = 'Carregando...';
  pokemon = pokemon.toString().toLowerCase();
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status !== 200) {
    return false;
  }

  const data = await APIResponse.json();

  return data;
}

// Função responsável por renderizar as informações 
// de um pokémon com base nos dados recebidos pela API:
const renderPokemon = async (pokemon) => {
  const data = await fetchPokemon(pokemon);

  if (data) {
    searchPokemon = data.id;
    pokemonNumber.innerHTML = data.id;
    pokemonName.innerHTML = data.name;
    pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
  } else {
    pokemonImage.src = 'source/images/missingno.gif';
    pokemonNumber.innerHTML = '?';
    pokemonName.innerHTML = 'Não Encontrado!';
  }

  localStorage['lastPokemon'] = searchPokemon;
}

// Evento de envio do campo de pesquisa:
form.addEventListener('submit', (e) => {
  renderPokemon(input.value);
  e.preventDefault();
  input.value = "";
});

// Evento de envio do campo de pesquisa:
buttonPrev.addEventListener('click', (e) => {
  if (searchPokemon > 1) {
    renderPokemon(--searchPokemon);
    input.value = "";
  }
});

// Evento de envio do campo de pesquisa:
buttonNext.addEventListener('click', (e) => {
  renderPokemon(++searchPokemon);
  input.value = "";
});

// Iniciando com um pokemon pré-selecionado:
onload = () => {
  if (localStorage['lastPokemon']) {
    renderPokemon(localStorage['lastPokemon']);
  } else {
    renderPokemon('1');
  }
};