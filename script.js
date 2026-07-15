// ========================================================
// DATA OFICIAL AJUSTADA: 09/06/2026 às 19:30
// ========================================================
const dataInicioConversa = new Date(2026, 5, 9, 19, 30, 0); 

function atualizarContador() {
    const agora = new Date();
    const diferenca = agora - dataInicioConversa;

    const calcDias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const calcHoras = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const calcMinutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const calcSegundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    const exibDias = calcDias < 0 ? 0 : calcDias;
    const exibHoras = calcHoras < 0 ? 0 : calcHoras;
    const exibMinutos = calcMinutos < 0 ? 0 : calcMinutos;
    const exibSegundos = calcSegundos < 0 ? 0 : calcSegundos;

    document.getElementById('days').innerText = exibDias < 10 ? '0' + exibDias : exibDias;
    document.getElementById('hours').innerText = exibHoras < 10 ? '0' + exibHoras : exibHoras;
    document.getElementById('minutes').innerText = exibMinutos < 10 ? '0' + exibMinutos : exibMinutos;
    document.getElementById('seconds').innerText = exibSegundos < 10 ? '0' + exibSegundos : exibSegundos;
}

// Atualização de 1 em 1 segundo
setInterval(atualizarContador, 1000);
atualizarContador();

// Lógica do Carrossel de Frases (Muda a cada 5 segundos)
const frases = document.querySelectorAll('.phrase');
let indiceAtual = 0;

function mudarFrase() {
    frases[indiceAtual].classList.remove('active');
    indiceAtual = (indiceAtual + 1) % frases.length;
    frases[indiceAtual].classList.add('active');
}
setInterval(mudarFrase, 5000);

// ========================================================
// DADOS DOS MARCOS DA LINHA DO TEMPO
// Substitua os links do "img" pelas fotos reais de vocês!
// ========================================================
const dadosLinhaDoTempo = [
    {
        title: "O Começo de Tudo",
        text: "No dia 09 de Junho de 2026 às 19:30, nós enviamos nossa primeira mensagem. Quem diria que aquele início de conversa se transformaria na nossa história favorita?",
        img: "" // Ex: "fotos/primeira_conversa.jpg" ou um link da web
    },
    {
        title: "Nosso Primeiro Encontro",
        text: "O momento em que finalmente nos vimos cara a cara. O nervosismo bobo misturado com a certeza de que estávamos no lugar certo, com a pessoa certa.",
        img: "" 
    },
    {
        title: "Cumplicidade & Desafios",
        text: "Não existem barreiras que a gente não consiga ultrapassar quando estamos lado a lado. Cada obstáculo superado só provou o quão forte é o que sentimos.",
        img: "" 
    },
    {
        title: "O Que Ainda Vamos Viver",
        text: "Este é só o começo. Nossa trajetória é um livro aberto onde cada dia ao seu lado é uma nova página cheia de planos e sonhos para realizar.",
        img: "" 
    },
    {
        title: "1",
        text: "Este é só o começo. Nossa trajetória é um livro aberto onde cada dia ao seu lado é uma nova página cheia de planos e sonhos para realizar.",
        img: "" 
    },
    {
        title: "2",
        text: "Este é só o começo. Nossa trajetória é um livro aberto onde cada dia ao seu lado é uma nova página cheia de planos e sonhos para realizar.",
        img: "" 
    }
];

const nodes = document.querySelectorAll('.timeline-node');
const scrollContainer = document.getElementById('timelineScroll');
const panel = document.getElementById('timelinePanel');
let nodeAtivo = -1;

function selecionarNode(index) {
    if (nodeAtivo === index) return; 

    // Atualiza classes ativas
    nodes.forEach(node => node.classList.remove('active'));
    nodes[index].classList.add('active');
    nodeAtivo = index;

    // Centraliza o ponto horizontalmente na tela
    const nodeElement = nodes[index];
    const scrollLeft = nodeElement.offsetLeft - (scrollContainer.clientWidth / 2) + (nodeElement.clientWidth / 2);
    scrollContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });

    // Atualiza e exibe o painel de texto/fotos com transição suave
    panel.classList.remove('show');
    setTimeout(() => {
        document.getElementById('panelTitle').innerText = dadosLinhaDoTempo[index].title;
        document.getElementById('panelText').innerText = dadosLinhaDoTempo[index].text;
        
        const imgElement = document.getElementById('panelImg');
        if (dadosLinhaDoTempo[index].img && dadosLinhaDoTempo[index].img !== "") {
            imgElement.src = dadosLinhaDoTempo[index].img;
            imgElement.style.display = 'block';
        } else {
            imgElement.style.display = 'none';
        }
        
        panel.style.display = 'block';
        setTimeout(() => panel.classList.add('show'), 50);
    }, 200);
}

// Navegação das Setas
document.getElementById('prevBtn').addEventListener('click', () => {
    let proximoIndex = nodeAtivo - 1;
    if (proximoIndex < 0) proximoIndex = nodes.length - 1; 
    selecionarNode(proximoIndex);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    let proximoIndex = (nodeAtivo + 1) % nodes.length; 
    selecionarNode(proximoIndex);
});

// Abre o primeiro item ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => selecionarNode(0), 500);
});