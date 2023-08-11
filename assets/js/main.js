const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMore_Button");
const maxRecords = 151;
const limit = 9;
let offset = 0;

/*
tirei a função porque não vi sentido sendo que poderia ser feito
tudo ali dentro mesmo, só peguei ela e passei pra baixo

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}*/

function loadPokemonItens(offset, limit) { 
    //essa função aqui tinha uma chamada que tava impedindo a api de fazer a requisição
    
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `<li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
            `).join("");
    pokemonList.innerHTML += newHtml;
});
}

/*
loadPokemonItens(offset, limit)
tirei ela e aparentemente funcionou, n sei pq tava dando conflito
e não estava achando a pokeApi
*/

loadMoreButton.addEventListener('click', () => {
  offset += limit;

  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
