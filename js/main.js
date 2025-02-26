// Função para carregar um elemento na página com base em um Template
async function load_element(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Elemento com ID "${elementId}" não encontrado.`);
    }

    const filePath = `./templates/${elementId}.html`;

    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Erro ao carregar ${filePath}: ${response.statusText}`);
        }

        const content = await response.text();
        element.innerHTML = content;
    } catch (error) {
        console.error(error);
    }
}

async function detec_lang() {
    
}

async function detec_lang() {
    
}

async function detec_device() {
    let htmlTag = document.documentElement;
    // Verifica se a largura da tela é 500px ou menor
    if (window.innerWidth <= 500) {
        console.log("Tela de Mobile")
        htmlTag.setAttribute("device", "mobile");
    } else if (window.innerWidth >= 501) {
        console.log("Tela de Desktop")
        htmlTag.setAttribute("device", "desktop");
    }
    open_galeriaVerMais("default")
}

//
let global_status_btn = false
// Função que altenar ao clicar no Menu para Mobile
function toggle_navbarMenu(type) {
    // Nome das Classes
    let class_listMenuActive = "list_menu_activated";
    let class_navlistActive = "navlist_activated";
    // Elementos
    let btn_navbar_menu = document.getElementById("navbar-menu");
    let navlist = document.getElementById("navlist");
    // Status do Botão
    let status_btn = btn_navbar_menu.getAttribute("aria-status");

    console.warn("Status atual:", status_btn);

    if (type === "normal") {
        // if: Ação para Ativar
        // else if: Ação para Desativar
        if (status_btn === "deactivated") {
            // Altera o Icone do Menu
            btn_navbar_menu.classList.add(class_listMenuActive);
            // Altera o Status
            btn_navbar_menu.setAttribute("aria-status", "activated");
            // Coloca a Classe para o Menu aparecer
            navlist.classList.add(class_navlistActive)
            // Altera a variavel global
            global_status_btn = true
        } else if (status_btn === "activated") {
            // Altera o Icone do Menu
            btn_navbar_menu.classList.remove(class_listMenuActive);
            // Altera o Status
            btn_navbar_menu.setAttribute("aria-status", "deactivated");
            // Retira a Classe para o Menu aparecer
            navlist.classList.remove(class_navlistActive)        
            // Altera a variavel global
            global_status_btn = false
        }
    } else if (type === "justClose") {
        // Altera o Icone do Menu
        btn_navbar_menu.classList.remove(class_listMenuActive);
        // Altera o Status
        btn_navbar_menu.setAttribute("aria-status", "deactivated");
        // Retira a Classe para o Menu aparecer
        navlist.classList.remove(class_navlistActive)    
        // Altera a variavel global
        global_status_btn = false
    }
}

// Função de um Smart Header. Ele responde ao scroll do usuario, 
// : se o usuario rolar para baixo, o header sobe junto, 
// : mas uma leve rolada para cima ela reapareçe

let lastScrollTop = 0;
const header = document.getElementById("header");

function handleHeaderOnScroll() {
    let class_headerNonTop = "header_nonTop";
    let class_hideHeader = "hide_header";

    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let headerHeight = header.offsetHeight; // Obtém a altura dinâmica da header

    
    if (scrollTop === 0) {
        header.classList.remove(class_headerNonTop);
        header.classList.remove(class_hideHeader);
    } else {
        if (scrollTop > headerHeight) {
            header.classList.add(class_headerNonTop);
        }
        
        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            // Só esconde se o scroll for maior que a altura da header
            header.classList.add(class_hideHeader);
            if (global_status_btn === true) {
                toggle_navbarMenu("justClose")
            }
        } else if (scrollTop < lastScrollTop) {
            // Rolando para cima, mostrar header
            header.classList.remove(class_hideHeader);
        }
    }

    lastScrollTop = scrollTop;
}

// Função que rola para um local específico com base em um elemento ou identificador de texto
function scrollTo_customLocal(elementOrText) {
    let local, type;
    
    // Se o parâmetro for uma string, buscar o elemento com aria-scrollTarget correspondente
    if (typeof elementOrText === "string") {
        let targetElement = document.querySelector(`[aria-scrollTarget="${elementOrText}"]`);
        
        if (!targetElement) {
            console.warn(`Elemento com aria-scrollTarget="${elementOrText}" não encontrado.`);
            return;
        }

        // Define local e tipo para rolagem
        local = elementOrText; 
        type = "smooth"; // Define um comportamento padrão
    } 
    // Se for um elemento, pegar as configurações do atributo aria
    else if (elementOrText instanceof HTMLElement) {
        let scrollTo_settings = elementOrText.getAttribute("aria-scrollTo-settings");

        if (!scrollTo_settings) {
            console.warn("Elemento não possui o atributo 'aria-scrollTo-settings'.");
            return;
        }

        [local, type] = scrollTo_settings.split("-");
    } else {
        console.warn("Parâmetro inválido. Deve ser um elemento HTML ou um identificador de texto.");
        return;
    }

    console.warn(local, type);

    if (local === "top") {
        // Se o local for 'top', rola até o topo da página
        window.scrollTo({ top: 0, behavior: type });
    } else {
        // Buscar o elemento de destino
        let targetElement = document.querySelector(`[aria-scrollTarget="${local}"]`);

        if (targetElement) {
            // Obter a posição do elemento na página
            let elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;

            // Adicionar um deslocamento de -100px (Para cima = "-" | Para baixo = "+")
            let offset = -100;
            let scrollPosition = elementPosition + offset;

            // Rola suavemente até a posição calculada
            window.scrollTo({ top: scrollPosition, behavior: type });
        } else {
            console.warn(`Elemento com aria-scrollTarget="${local}" não encontrado.`);
        }
    }
}


// Função que copia o texto
function act_copiarTexto(event) {
    // Procura o elemento clicado mais próximo da classe
    let clickableElement = event.target.closest('.click_copiar')
    // Pega o elemento que possui o texto a ser copiado com a classe
    let textElement = clickableElement.querySelector('.has_copiedText')

    // Se o elemento existir
    if (textElement) {
        let text = textElement.textContent || textElement.innerText;

        // Usa a API para copiar o texto
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log("Texto copiado:", text)
            })
            .catch(err => {
                console.error("Falha ao Copiar o Texto")
            })
    }
}

// Carregar os elementos ao carregar a página
document.addEventListener("DOMContentLoaded", async () => {
    // Espera o Carregamento dos Elementos
    await load_element("header");
    await load_element("footer");

    // Ativa as funções para Detectar informações
    detec_device()

    // Evento para ativar o Menu no Mobile
    const btn_navbar_menu = document.getElementById("navbar-menu");
    if (btn_navbar_menu) {
        btn_navbar_menu.addEventListener("click", () => toggle_navbarMenu("normal"));
    } else {
        console.error("Erro: O elemento 'navbar-menu' não foi encontrado.");
    }

    // Adiciona o evento de scroll chamando a função
    window.addEventListener("scroll", handleHeaderOnScroll);
    
    // Adiciona o evento de Rolar a pagina para o Topo
    document.querySelectorAll(".btn_goToCustomLocal").forEach(button => {
        button.addEventListener("click", () => scrollTo_customLocal(button));
    });

    // Evento para copiar o texto
    let btns_copiarTexto = document.querySelectorAll(".click_copiar")
    btns_copiarTexto.forEach(btn => {
        btn.addEventListener("click", (event) => act_copiarTexto(event));
    });
    
    // Escutador para detectar mudanças na largura da tela
    window.addEventListener('resize', () => {
        detec_device()
    });

});