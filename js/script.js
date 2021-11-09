"use strict";
const limparElemento = elemento =>{
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild);
    }
}

const carregarStatus = (nImagens,pesquisa, tipoItem) =>{
    const container = document.querySelector(".status");
    const newStatus = document.createElement("p");
    newStatus.classList = ".nFotos";
    newStatus.innerHTML = `${nImagens.totalHits} ${tipoItem} de ${pesquisa} encontradas`;
    container.appendChild(newStatus);
}

const tipoPesquisa = () => {
    const tipoPesquisa = document.querySelector('#categorias').value

    if(tipoPesquisa == "all" || tipoPesquisa == "photo" || tipoPesquisa == "illustration" || tipoPesquisa == "vector") {
        var url = `image_type=${tipoPesquisa}`
        var video = ""
        var type = "imagens"
    }
    else {
        var url = `video_type=${tipoPesquisa}&per_page=9`
        var video = "videos/"
        var type = "videos"
    }

    const search  = [tipoPesquisa, url, video, type]

    return search
}

const pesquisarImagens = async(event) =>{

    if(event.target.value == "") {
        event.target.placeholder = "Digite algo"
        limparElemento(document.querySelector("#container-galeria"));
        limparElemento(document.querySelector(".status"));
    }
    else {
        if(event.key == "Enter"){
            const tipoImagem = tipoPesquisa()
            const imagem = event.target.value;
            const url = `https://pixabay.com/api/${tipoImagem[2]}?key=24046844-849812f8b5ea3813c855149ee&q=${imagem}&${tipoImagem[1]}`;
            const response = await fetch(url);

            const imagens = await response.json();

            limparElemento(document.querySelector("#container-galeria"));
            limparElemento(document.querySelector(".status"));

            carregarGaleria(imagens.hits);
            carregarStatus(imagens,imagem,tipoImagem[3]);
        }
    }
}
const criarImagem = imagem =>{

    if(imagem.userImageURL == "") {
        imagem.userImageURL = "img/user.png"
    }

    const tipoPesquisa = document.querySelector('#categorias').value
    const container = document.querySelector("#container-galeria");
    const card =document.createElement("div");

    if(tipoPesquisa == "videos") {
        var tipoItem = `
                <a class="card-image" href="${imagem.pageURL}">
                    <video class="video" autoplay loop mute>
                        <source class="video" src="${imagem.videos.small.url}">
                    </video>
                </a>
            `
        }
        else {
    
            var tipoItem = `
            <a class="card-image" href="${imagem.pageURL}">
                <img class="card-image" src="${imagem.webformatURL}">
            </a>
        `
        }

    card.innerHTML = `
                <a class="img-perfil" href="https://pixabay.com/users/${imagem.user}-${imagem.user_id}/">
                    <img class="img-perfil" src="${imagem.userImageURL}">
                </a>
                <div class="options">
                    <div class="info">${imagem.tags}</div>
                    <div class="container-info">
                        <div class="info"><img src="img/heart.png">${imagem.likes}</div>
                        <div class="info"><img src="img/comment.png">${imagem.comments}</div>
                        <div class="info"><img src="img/bookmark.png"></div>
                    </div>
                </div>
                ${tipoItem}
            
            `
    container.appendChild(card);
}


const carregarGaleria = imagens => imagens.forEach(criarImagem);

document.querySelector("#pesquisa").addEventListener("keypress", pesquisarImagens);
document.querySelector("#categorias").addEventListener("slected", pesquisarImagens);