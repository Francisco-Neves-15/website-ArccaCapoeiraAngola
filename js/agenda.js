// 🔹 Variáveis globais
let eventos = {}; // Armazena os eventos carregados
const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let dataAtual = new Date();
let mesAtual = dataAtual.getMonth();
let anoAtual = dataAtual.getFullYear();

const calendarioDias = document.getElementById("calendarioDias");
const mesSelecionado = document.getElementById("calendario-opt-mesSelecionado");
const anoSelecionado = document.getElementById("calendario-opt-anoSelecionado");

const btnPrev = document.getElementById("calendario-opt-prevBtn");
const btnNext = document.getElementById("calendario-opt-nextBtn");

// 🔹 Carrega os eventos do JSON
async function carregarEventos() {
    try {
        const response = await fetch("../data/eventos.json");
        eventos = await response.json();
        console.log("📅 Eventos carregados:", eventos);
    } catch (error) {
        console.error("❌ Erro ao carregar eventos:", error);
    }
}

// 🔹 Gera o calendário
async function gerarCalendario(mes, ano) {
    calendarioDias.innerHTML = "";

    mesSelecionado.textContent = meses[mes];
    anoSelecionado.textContent = ano;

    let primeiroDia = new Date(ano, mes, 1).getDay();
    let totalDias = new Date(ano, mes + 1, 0).getDate();

    // Preenche espaços vazios antes do 1º dia do mês
    for (let i = 0; i < primeiroDia; i++) {
        let li = document.createElement("li");
        li.classList.add("empty");
        calendarioDias.appendChild(li);
    }

    // Preenche os dias do mês
    for (let dia = 1; dia <= totalDias; dia++) {
        let li = document.createElement("li");
        li.textContent = dia;
        li.setAttribute("aria-dia", dia);
        li.setAttribute("aria-mes", mes + 1);
        li.setAttribute("aria-ano", ano);
        li.classList.add("i_day");
        li.id = `iDay-${dia}-${mes + 1}-${ano}`;

        // Adiciona evento de clique
        li.addEventListener("click", function(event) {
            selectEvent_calendario(event);
        });

        // 🔹 Verifica se o dia tem evento
        let dataKey = `${dia.toString().padStart(2, "0")}-${(mes + 1).toString().padStart(2, "0")}-${ano}`;
        let evento = eventos[dataKey];

        // 🔹 Marca o dia de hoje
        let hoje = new Date();
        let ehHoje = dia === hoje.getDate() && (mes + 1) === (hoje.getMonth() + 1) && ano === hoje.getFullYear();

        if (evento) {
            if (evento.status === "on") {
                li.classList.add(ehHoje ? "eventDiaHoje" : "eventOn");
            } else if (evento.status === "will") {
                li.classList.add(ehHoje ? "eventDiaHoje" : "eventWill");
            } else if (evento.status === "off") {
                li.classList.add(ehHoje ? "eventDiaHoje" : "eventOff");
            }
        } else if (ehHoje) {
            li.classList.add("diaHoje");
        }

        calendarioDias.appendChild(li);
    }
}

// 🔹 Função para verificar o evento de hoje automaticamente
function verificarEventoAtual() {
    let hoje = new Date();
    let diaHoje = hoje.getDate().toString().padStart(2, "0");
    let mesHoje = (hoje.getMonth() + 1).toString().padStart(2, "0");
    let anoHoje = hoje.getFullYear();

    let dataKey = `${diaHoje}-${mesHoje}-${anoHoje}`;
    let evento = eventos[dataKey];
    let mesFormat = meses[hoje.getMonth()];

    if (evento) {
        console.log(`✅📅 Evento encontrado: ${evento.titulo}`);
        autofill_eventoSelecionado("true", evento, mesFormat, diaHoje, mesHoje, anoHoje);
    } else {
        console.log(`❌📅 Nenhum evento encontrado para ${diaHoje}/${mesHoje}/${anoHoje}`);
        autofill_eventoSelecionado("false", evento, mesFormat, diaHoje, mesHoje, anoHoje);
    }
}

// 🔹 Função para mudar o mês
function mudarMes(incremento) {
    mesAtual += incremento;
    if (mesAtual < 0) {
        mesAtual = 11;
        anoAtual--;
    } else if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual++;
    }
    gerarCalendario(mesAtual, anoAtual);
}

// 🔹 Preenche automaticamente os dados do evento
function autofill_eventoSelecionado(type, evento, mesFormat, dia, mes, ano) {
    let dataParcial_dia = document.getElementById("eventSelec-dataParcial-dia");
    let dataParcial_mes = document.getElementById("eventSelec-dataParcial-mes");
    let dataParcial_ano = document.getElementById("eventSelec-dataParcial-ano");
    let eventSelec_eventTitle = document.getElementById("eventSelec-eventTitle");
    let eventSelec_eventDesc = document.getElementById("eventSelec-eventDesc");
    let eventSelec_eventLink = document.getElementById("eventSelec-eventLink");

    dataParcial_dia.textContent = dia;
    dataParcial_mes.textContent = mesFormat;
    dataParcial_ano.textContent = ano;

    if (type === "true") {
        console.log(`✅📅 Evento encontrado para ${dia}/${mes}/${ano}`);
        eventSelec_eventTitle.textContent = evento.titulo;
        eventSelec_eventDesc.textContent = evento.descricao;
        eventSelec_eventLink.textContent = evento.link;
    } else {
        console.log(`❌📅 Nenhum evento encontrado para ${dia}/${mes}/${ano}`);
        eventSelec_eventTitle.textContent = "Nenhum evento selecionado";
        eventSelec_eventDesc.textContent = "Nenhuma descrição";
        eventSelec_eventLink.setAttribute("href", "#");
        eventSelec_eventLink.textContent = "Nenhum link";
    }
}

// 🔹 Seleciona o evento ao clicar em um dia
function selectEvent_calendario(event) {
    let liElement = event.currentTarget;
    let dia = liElement.getAttribute("aria-dia");
    let mes = liElement.getAttribute("aria-mes");
    let ano = liElement.getAttribute("aria-ano");

    let dataKey = `${dia.toString().padStart(2, "0")}-${mes.toString().padStart(2, "0")}-${ano}`;
    let evento = eventos[dataKey];
    let mesFormat = meses[mes - 1];

    if (evento) {
        autofill_eventoSelecionado("true", evento, mesFormat, dia, mes, ano);
    } else {
        autofill_eventoSelecionado("false", evento, mesFormat, dia, mes, ano);
    }

    document.querySelectorAll(".i_day").forEach(i => i.classList.remove("i_day_select"));
    liElement.classList.add("i_day_select");
}

// 🔹 Inicializa o calendário
async function iniciarCalendario() {
    await carregarEventos();
    gerarCalendario(mesAtual, anoAtual);
    verificarEventoAtual();
}

// 🔹 Evento de carregamento da página
document.addEventListener("DOMContentLoaded", () => {
    iniciarCalendario();
    btnPrev.addEventListener("click", () => mudarMes(-1));
    btnNext.addEventListener("click", () => mudarMes(1));
});