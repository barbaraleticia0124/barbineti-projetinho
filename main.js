
/* Catálogo local: a aplicação funciona mesmo sem API externa ou imagens. */
const producoes = [
    { titulo: 'Mad Max: Estrada da Fúria', tipo: 'filme', genero: 'ação', nota: '8.1', ano: '2015', cor: 'action', descricao: 'Em um deserto dominado pela tirania, uma fuga impossível se transforma em uma perseguição eletrizante.', motivo: 'Para quando você quer ritmo, adrenalina e uma experiência visual que não deixa a energia cair.' },
    { titulo: 'Palm Springs', tipo: 'filme', genero: 'comédia', nota: '7.4', ano: '2020', cor: 'comedy', descricao: 'Duas pessoas presas no mesmo dia descobrem que o inesperado pode ser uma nova chance.', motivo: 'Leve, inteligente e divertido — perfeito para desligar a cabeça e sorrir um pouco.' },
    { titulo: 'Antes do Amanhecer', tipo: 'filme', genero: 'romance', nota: '8.1', ano: '1995', cor: 'romance', descricao: 'Um encontro casual em uma viagem de trem dá origem a uma noite de conversas e descobertas.', motivo: 'Uma escolha delicada para quem quer diálogos honestos, conexão e uma história que fica na memória.' },
    { titulo: 'Um Lugar Silencioso', tipo: 'filme', genero: 'terror', nota: '7.5', ano: '2018', cor: 'horror', descricao: 'Uma família precisa sobreviver em um mundo onde qualquer som pode atrair uma ameaça mortal.', motivo: 'A tensão está em cada detalhe — ideal para uma sessão intensa e cheia de suspense.' },
    { titulo: 'A Viagem de Chihiro', tipo: 'filme', genero: 'aventura', nota: '8.6', ano: '2001', cor: 'adventure', descricao: 'Uma garota entra em um mundo mágico e precisa encontrar coragem para salvar a própria família.', motivo: 'Uma aventura imaginativa, emocionante e visualmente inesquecível para qualquer idade.' },
    { titulo: 'Interestelar', tipo: 'filme', genero: 'ficção científica', nota: '8.7', ano: '2014', cor: 'scifi', descricao: 'Uma equipe atravessa o espaço em busca de um novo lar para a humanidade.', motivo: 'Para quem quer uma história grandiosa, emocionante e cheia de perguntas sobre tempo e futuro.' },
    { titulo: 'The Bear', tipo: 'serie', genero: 'drama', nota: '8.5', ano: '2022', cor: 'drama', descricao: 'Um jovem chef retorna para cuidar do restaurante da família e encontra caos, luto e possibilidades.', motivo: 'Humana, intensa e muito bem escrita — uma série que transforma pressão em emoção.' },
    { titulo: 'Only Murders in the Building', tipo: 'serie', genero: 'mistério', nota: '8.1', ano: '2021', cor: 'mystery', descricao: 'Três vizinhos obcecados por crimes reais começam a investigar um assassinato no próprio prédio.', motivo: 'Mistério aconchegante, humor afiado e pistas suficientes para você criar suas próprias teorias.' },
    { titulo: 'The Witcher', tipo: 'serie', genero: 'fantasia', nota: '8.0', ano: '2019', cor: 'fantasy', descricao: 'Um caçador de monstros percorre um mundo perigoso onde destino e escolhas se cruzam.', motivo: 'Uma boa pedida para mergulhar em batalhas, criaturas e um universo fantástico.' },
    { titulo: 'Chef\'s Table', tipo: 'programa', genero: 'documentário', nota: '8.5', ano: '2015', cor: 'documentary', descricao: 'Chefs de diferentes partes do mundo contam suas histórias por meio de pratos extraordinários.', motivo: 'Inspirador e visualmente bonito para quem gosta de comida, criatividade e histórias reais.' }
];

let tipoSelecionado = 'filme';
let generoSelecionado = '';
let ultimaRecomendacao = null;

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

/* Atualiza os estados visuais e acessíveis dos botões de tipo. */
function selecionarTipo(botao) {
    tipoSelecionado = botao.dataset.type;
    $$('#typeChoices .choice-button').forEach(item => {
        const ativo = item === botao;
        item.classList.toggle('is-selected', ativo);
        item.setAttribute('aria-pressed', String(ativo));
    });
    atualizarStatus();
}

/* Atualiza os estados visuais e acessíveis dos botões de gênero. */
function selecionarGenero(botao) {
    generoSelecionado = botao.dataset.genre;
    $$('#genreChoices .genre-button').forEach(item => {
        const ativo = item === botao;
        item.classList.toggle('is-selected', ativo);
        item.setAttribute('aria-pressed', String(ativo));
    });
    atualizarStatus();
}

/* Mostra ao usuário o que falta para gerar uma indicação. */
function atualizarStatus() {
    const status = $('#selectionStatus');
    if (status) {
        status.textContent = generoSelecionado
            ? `Pronto: ${tipoSelecionado} de ${generoSelecionado}.`
            : 'Escolha um gênero para continuar.';
    }
}

/* Evita repetir a mesma produção quando houver mais de uma opção. */
function escolherAleatorio(lista) {
    if (lista.length === 1) return lista[0];
    const disponiveis = lista.filter(item => item !== ultimaRecomendacao);
    return disponiveis[Math.floor(Math.random() * disponiveis.length)];
}

/* Preenche todos os campos da área de resultado. */
function renderizarResultado(producao) {
    $('#resultType').textContent = producao.tipo.toUpperCase();
    $('#resultYear').textContent = producao.ano;
    $('#resultRating').textContent = producao.nota;
    $('#resultTitle').innerHTML = `${producao.titulo}<br><em>vale a sessão.</em>`;
    $('#resultGenre').textContent = producao.genero;
    $('#resultDescription').textContent = producao.descricao;
    $('#resultWhy').textContent = producao.motivo;

    const poster = $('#resultPoster');
    poster.className = `result-poster poster-${producao.cor}`;
    poster.innerHTML = `<div class="poster-placeholder"><span aria-hidden="true">✦</span><small>${producao.titulo.toUpperCase()}</small></div>`;
    poster.setAttribute('aria-label', `Pôster estilizado de ${producao.titulo}`);

    $('#againButton').disabled = false;
}

/* Filtra a produção e revela o resultado. */
function recomendar() {
    if (!generoSelecionado) {
        $('#selectionStatus').textContent = 'Escolha um gênero antes de continuar.';
        $('#genreChoices').animate?.([
            { transform: 'translateX(0)' }, { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' }, { transform: 'translateX(0)' }
        ], { duration: 220 });
        return;
    }

    const combinacoes = producoes.filter(item => item.tipo === tipoSelecionado && item.genero === generoSelecionado);
    const mesmoTipo = producoes.filter(item => item.tipo === tipoSelecionado);
    const resultados = combinacoes.length ? combinacoes : mesmoTipo;
    const escolhido = escolherAleatorio(resultados.length ? resultados : producoes);

    ultimaRecomendacao = escolhido;
    renderizarResultado(escolhido);
    $('#resultado').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* Registra todos os eventos quando o documento estiver pronto. */
document.addEventListener('DOMContentLoaded', () => {
    $$('#typeChoices .choice-button').forEach(botao => botao.addEventListener('click', () => selecionarTipo(botao)));
    $$('#genreChoices .genre-button').forEach(botao => botao.addEventListener('click', () => selecionarGenero(botao)));
    $('#recommendButton').addEventListener('click', recomendar);
    $('#againButton').addEventListener('click', recomendar);
    $('#startButton').addEventListener('click', () => $('#descobrir').scrollIntoView({ behavior: 'smooth' }));
    atualizarStatus();
});
