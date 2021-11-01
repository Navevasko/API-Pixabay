"use strict"

const imagens = [
    "https://noticias.maisesports.com.br/wp-content/uploads/2021/10/LoL-Blitzcrank-Vitorioso-scaled.jpg",
    "../galeria/img/Paisagem1.jpg",
    "../galeria/img/Paisagem2.jpg",
    "../galeria/img/Paisagem3.jpg",
    "../galeria/img/Paisagem4.jpg",
    "../galeria/img/Paisagem5.jpg",
    "../galeria/img/Paisagem6.jpg",
    "../galeria/img/Paisagem7.jpg",
    "../galeria/img/Paisagem8.jpg"
]

const pesquisarImagens = async(evento) => {

    if(evento.key === "Enter") {
        const imagem = evento.target.value
        const url = `https://pixabay.com/api/${imagem}`
        const imagensResponse = await fetch(url)

        if(imagensResponse.ok) {
            const imagens = await imagensResponse.json()

            carregarGaleria(imagens.hit)
        }
        else {
            alert('Erro')
        }
    }
}

const filtrarId = (urlImagem) => {
    const ultimaBarra = urlImagem.lastIndexOf("/") + 1
    const ultimoPonto = urlImagem.lastIndexOf(".")
    const url = urlImagem.substring(ultimaBarra, ultimoPonto)
    return url
}

const criarItem = (urlImagem) => {
    const container = document.querySelector(".galeria-container")
    const novaImagem = document.createElement("div")
    novaImagem.innerHTML = `<img class="img-item" src="${urlImagem.webformatURL}" alt="">`
    container.append(novaImagem)
}

const carregarGaleria = (imgs) => imgs.forEach(criarItem)

document.querySelector('#pesquisar').addEventListener('keypress', pesquisarImagens)


