"use strict";
const limparElemento = elemento =>{
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild);
    }
}

const carregarStatus = (nImagens,pesquisa) =>{
    const container = document.querySelector(".status");
    const newStatus = document.createElement("p");
    newStatus.classList = ".nFotos";
    newStatus.innerHTML = `${nImagens.totalHits} fotos de ${pesquisa} encontradas`;
    container.appendChild(newStatus);
}

const pesquisarImagens = async(event) =>{

    if(event.target.value == "") {
        event.target.placeholder = "Digite algo"
        limparElemento(document.querySelector("#container-galeria"));
        limparElemento(document.querySelector(".status"));
    }
    else {
        if(event.key == "Enter"){
            const tipoImagem = document.querySelector("#categorias").value;
            const imagem = event.target.value;
            const url = `https://pixabay.com/api/?key=24046844-849812f8b5ea3813c855149ee&q=${imagem}&image_type=${tipoImagem}`;
            const response = await fetch(url);

            const imagens = await response.json();

            limparElemento(document.querySelector("#container-galeria"));
            limparElemento(document.querySelector(".status"));

            carregarGaleria(imagens.hits);
            carregarStatus(imagens,imagem);
        }
    }
}
const criarItem = item =>{

    if(item.userImageURL == "") {
        item.userImageURL = "img/user.png"
    }

    const container = document.querySelector("#container-galeria");
    const card =document.createElement("div");
    card.innerHTML = `
                <a class="img-perfil" href="https://pixabay.com/users/${item.user}-${item.user_id}/">
                    <img class="img-perfil" src="${item.userImageURL}">
                </a>
                <div class="options">
                    <div class="info">${item.tags}</div>
                    <div class="container-info">
                        <div class="info"><img src="img/heart.png">${item.likes}</div>
                        <div class="info"><img src="img/comment.png">${item.comments}</div>
                        <div class="info"><img src="img/bookmark.png"></div>
                    </div>
                </div>
                <a class="card-image"href="${item.pageURL}">
                <img class="card-image" src="${item.webformatURL}">
                </a>
            
            `;
    container.appendChild(card);
}


const carregarGaleria = imagens => imagens.forEach(criarItem);

document.querySelector("#pesquisa").addEventListener("keypress", pesquisarImagens);
document.querySelector("#categorias").addEventListener("slected", pesquisarImagens);