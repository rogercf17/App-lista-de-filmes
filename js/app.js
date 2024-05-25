var filmes = [{nome: '', dataLancamento: '', diretor: ''}];
const btnCriar = document.querySelector('#btnCriar');
btnCriar.addEventListener('click', infosDoEvento => {
    infosDoEvento.preventDefault();
    criarFilme();
});
function criarFilme(){
   if (localStorage.meuArr){             
      filmes = JSON.parse(localStorage.getItem('meuArr')); 
   }
   let novoItem = {
        nome: document.getElementById("filme").value,
        dataLancamento: document.getElementById("data").value,
        diretor: document.getElementById("diretor").value
   };
   filmes.unshift(novoItem);
   document.getElementById("filme").value = "";
   document.getElementById("data").value = "";
   document.getElementById("diretor").value = "";
   localStorage.meuArr = JSON.stringify(filmes);
   renderizarNaTela();
}
window.onload= renderizarNaTela();
function renderizarNaTela(){
   let listaFilmes = document.getElementById('listaFilmes');
   listaFilmes.innerHTML = "";
   if (localStorage.meuArr){             
      filmes = JSON.parse(localStorage.getItem('meuArr')); 
   }
   filmes.forEach(
        filme => {
            let novoFilme = document.createElement('li');
            novoFilme.innerHTML = `
                <h2>${filme.nome}</h2>
                <p>${filme.dataLancamento}</p>
                <p>${filme.diretor}</p>
                <br>
                <button id="criar" onclick="editarFilme(${filmes.indexOf(filme)})"> Editar </button>
                <button id="apagar" onclick="apagarFilme(${filmes.indexOf(filme)})"> Apagar </button>
            `;
            listaFilmes.append(novoFilme);
        }
    );
}
function apagarFilme(id){
    filmes.splice(id, 1);
    localStorage.meuArr = JSON.stringify(filmes);  
    renderizarNaTela();
}
function editarFilme(id) {
    let tituloModificado = prompt("Digite o novo nome do filme",filmes[id].nome);
    let diretorModificado = prompt("Digite o nome novo do diretor",filmes[id].diretor);
    filmes[id].nome = tituloModificado;
    filmes[id].diretor = diretorModificado;
    localStorage.meuArr = JSON.stringify(filmes); 
    renderizarNaTela();
}