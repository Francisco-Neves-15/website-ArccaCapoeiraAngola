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

// Carregar os elementos ao carregar a página
document.addEventListener("DOMContentLoaded", async () => {
    // Espera o Carregamento dos Elementos
    await load_element("header");
    await load_element("footer");

    // Agora o elemento existe no DOM e podemos adicionar o evento
    const btn_navbar_menu = document.getElementById("navbar-menu");
    if (btn_navbar_menu) {
        btn_navbar_menu.addEventListener("click", () => toggle_navbarMenu("normal"));
    } else {
        console.error("Erro: O elemento 'navbar-menu' não foi encontrado.");
    }

    // Adiciona o evento de scroll chamando a função
    window.addEventListener("scroll", handleHeaderOnScroll);
    
});