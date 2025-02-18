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

function toggle_navbarMenu() {
    // Nome das Classes
    let class_listMenuActive = "list_menu_activated";
    let class_navlistActive = "navlist_activated";
    // Elementos
    let btn_navbar_menu = document.getElementById("navbar-menu");
    let navlist = document.getElementById("navlist");
    // Status do Botão
    let status_btn = btn_navbar_menu.getAttribute("aria-status");

    console.warn("Status atual:", status_btn);

    // if: Ação para Ativar
    // else if: Ação para Desativar
    if (status_btn === "deactivated") {
        // Altera o Icone do Menu
        btn_navbar_menu.classList.add(class_listMenuActive);
        // Altera o Status
        btn_navbar_menu.setAttribute("aria-status", "activated");
        // Coloca a Classe para o Menu aparecer
        navlist.classList.add(class_navlistActive)
    } else if (status_btn === "activated") {
        // Altera o Icone do Menu
        btn_navbar_menu.classList.remove(class_listMenuActive);
        // Altera o Status
        btn_navbar_menu.setAttribute("aria-status", "deactivated");
        // Retira a Classe para o Menu aparecer
        navlist.classList.remove(class_navlistActive)        
    }
}

// Carregar os elementos ao carregar a página
document.addEventListener("DOMContentLoaded", async () => {
    await load_element("header");
    await load_element("footer");

    // Agora o elemento existe no DOM e podemos adicionar o evento
    const btn_navbar_menu = document.getElementById("navbar-menu");
    if (btn_navbar_menu) {
        btn_navbar_menu.addEventListener("click", toggle_navbarMenu);
    } else {
        console.error("Erro: O elemento 'navbar-menu' não foi encontrado.");
    }
});
