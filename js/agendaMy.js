// Lista temporaria, será um JSON
// Status: Pode ser "on", "off" ou "will"

// Variável global para armazenar os eventos carregados
let eventos = {};

// Função de carregamento dos eventos (assíncrona)
async function carregarEventos() {
    try {
        const response = await fetch("../data/eventos.json");
        eventos = await response.json(); // Armazena os eventos globalmente
        console.log("📅 Eventos carregados:", eventos);
    } catch (error) {
        console.error("❌ Erro ao carregar eventos:", error);
    }
}

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

async function gerarCalendario(mes, ano) {
    const calendarioDias = document.getElementById("calendarioDias");
    calendarioDias.innerHTML = "";

    mesSelecionado.textContent = meses[mes];
    anoSelecionado.textContent = ano;

    let hoje = new Date();
    let diaAtual = hoje.getDate();
    let mesAtual = hoje.getMonth() + 1;
    let anoAtual = hoje.getFullYear();

    let primeiroDia = new Date(ano, mes, 1).getDay();
    let totalDias = new Date(ano, mes + 1, 0).getDate();

    // Preenche os dias vazios antes do 1º dia
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
        li.classList.add("i_day")
        li.id = `iDay-${dia}-${mes+1}-${ano}`
        // Adiciona o listener de click
        li.addEventListener("click", function(event) {
            selectEvent_calendario(event, li);  // Passa o evento e o elemento 'li' para a função
        });
        
        // Formata a data para buscar no JSON
        let dataKey = `${dia.toString().padStart(2, "0")}-${(mes + 1).toString().padStart(2, "0")}-${ano}`;
        let evento = eventos[dataKey];

        // Se for o dia atual
        let ehHoje = dia === diaAtual && (mes + 1) === mesAtual && ano === anoAtual;

        // Aplica a classe com base no status do evento
        // Se não for um evento e for o dia atual, apenas destaca o dia de hoje
        if (evento) {
            if (evento.status === "on") {
                li.classList.add(ehHoje ? "eventDiaHoje" : "eventOn");
            } else if (evento.status === "will") {
                li.classList.add(ehHoje ? "eventDiaHoje" : "eventWill");
            } else if (evento.status === "off") {
                li.classList.add(ehHoje ? "eventDiaHoje" : "eventOff");
            }
        } else {
            if (ehHoje) {
                li.classList.add("diaHoje");
            }
        }

        calendarioDias.appendChild(li);
    }
}

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


function autofill_eventoSelecionado(type, evento, mesFormat, newDia, newMes, newAno) {
    // Variáveis para mostrar os dados do evento
    let dataParcial_dia = document.getElementById("eventSelec-dataParcial-dia");
    let dataParcial_mes = document.getElementById("eventSelec-dataParcial-mes");
    let dataParcial_ano = document.getElementById("eventSelec-dataParcial-ano");
    let eventSelec_eventTitle = document.getElementById("eventSelec-eventTitle");
    let eventSelec_eventDesc = document.getElementById("eventSelec-eventDesc");
    let eventSelec_eventLink = document.getElementById("eventSelec-eventLink");
    
    // Alterações gerais
    dataParcial_dia.textContent = newDia;
    dataParcial_mes.textContent = mesFormat;
    dataParcial_ano.textContent = newAno;

    // Se achar: Atualiza: Mostra o Relevante
    // Senão achar: Atualiza: Esconde 
    if (type === "true") {
        console.log(`✅📅 Evento encontrado! ${newDia}/${newMes}/${newAno}`);
        console.log(`✅📅 Infos do Evento! Status: ${evento.status}, Título: ${evento.titulo}, Descrição: ${evento.descricao}, Link: ${evento.link}`);
        console.log(`🔹 Status: ${evento.status}`);

        eventSelec_eventTitle.textContent = evento.titulo;
        eventSelec_eventDesc.textContent = evento.descricao;
        eventSelec_eventLink.setAttribute("href", evento.link);
        eventSelec_eventLink.textContent = "Clique aqui para ir ao SYMPLA";
    } else if (type === "false") {
        // Se não houver evento, exibe mensagem
        console.log(`❌📅 Nenhum evento encontrado para ${newDia}/${newMes}/${newAno}`);
        
        eventSelec_eventTitle.textContent = "Nenhum evento selecionado";
        eventSelec_eventDesc.textContent = "Nenhuma descrição.";
        eventSelec_eventLink.setAttribute("href", "#");
        eventSelec_eventLink.textContent = "Nenhum link";
    }

}


function selectEvent_calendario(event) {
    // Obtendo o elemento clicado
    let liElement = event.currentTarget;

    // Pegando os atributos aria
    let dia = liElement.getAttribute("aria-dia");
    let mes = liElement.getAttribute("aria-mes");
    let ano = liElement.getAttribute("aria-ano");

    // Criação da chave para buscar o evento
    let dataKey = `${dia.toString().padStart(2, "0")}-${(mes).toString().padStart(2, "0")}-${ano}`;
    let evento = eventos[dataKey];

    // Array com os nomes dos meses
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    let mesFormat = meses[mes-1]

    let newDia = dia
    let newMes = mes
    let newAno = ano

    if (evento) {
        let newTitle = evento.titulo
        let newDesc = evento.descricao
        let newLink = evento.link
    }

    if (evento) {
        autofill_eventoSelecionado("true", evento, mesFormat, newDia, newMes, newAno);
    } else {
        autofill_eventoSelecionado("false", evento, mesFormat, newDia, newMes, newAno);
    }

    // Adiciona a classe de seleção no dia
    let all_iDay = document.querySelectorAll(".i_day");
    let class_iDay_select = "i_day_select";

    all_iDay.forEach(i => {
        i.classList.remove(class_iDay_select);
    });

    let especif_iDay = document.getElementById(`iDay-${dia}-${mes}-${ano}`);
    especif_iDay.classList.add(class_iDay_select);
}

async function iniciarCalendario() {
    await carregarEventos();
    let dataAtual = new Date();
    gerarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
}

// Função para verificar evento do dia atual ao carregar
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

document.addEventListener("DOMContentLoaded", () => {
    iniciarCalendario();
    // Escutadores
    btnPrev.addEventListener("click", () => mudarMes(-1));
    btnNext.addEventListener("click", () => mudarMes(1));
    // Iniciando para configurar
    verificarEventoAtual()
});