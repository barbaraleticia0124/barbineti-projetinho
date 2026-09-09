function recomendar() {

    if (!generoSelecionado) {
        alert("Escolha um gênero primeiro 🎬");
        return;
    }

    let resultados = producoes.filter(item => {
        return item.tipo === tipoSelecionado &&
               item.genero === generoSelecionado;
    });

    if (resultados.length === 0) {
        resultados = producoes.filter(item =>
            item.tipo === tipoSelecionado
        );
    }

    const escolhido =
        resultados[Math.floor(Math.random() * resultados.length)];

    document.getElementById("resultTitle").textContent =
        escolhido.titulo;

    document.getElementById("resultType").textContent =
        escolhido.tipo.toUpperCase();

    document.getElementById("resultRating").textContent =
        escolhido.nota;

    document.getElementById("resultGenre").textContent =
        escolhido.genero;

    document.getElementById("resultYear").textContent =
        escolhido.ano;

    document.getElementById("resultDescription").textContent =
        escolhido.descricao;

    document.getElementById("resultWhy").textContent =
        escolhido.motivo;


    /* IMAGEM DA RECOMENDAÇÃO */

    const poster = document.getElementById("resultPoster");

    poster.textContent = "";

    poster.style.backgroundImage =
        `linear-gradient(to top, rgba(0,0,0,.35), transparent), url('${escolhido.imagem}')`;

    poster.style.backgroundSize = "cover";
    poster.style.backgroundPosition = "center";


    /* VAI AUTOMATICAMENTE ATÉ A RECOMENDAÇÃO */

    setTimeout(() => {

        document.getElementById("resultado")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }, 200);

}