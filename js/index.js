function populate_galeriaCarossel(carrosseis) {
    carrosseis.forEach(({ id, imagens }) => {
        const listaImagens = document.querySelector(`#${id}_listImg`);
        const bolasContainer = document.querySelector(`.${id}_balls`);
        const prevButton = document.querySelector(`#${id}_prev`);
        const nextButton = document.querySelector(`#${id}_next`);

        // Limpa antes de preencher
        listaImagens.innerHTML = "";
        bolasContainer.innerHTML = "";

        imagens.forEach((imagem, index) => {
            // Cria o item da imagem
            const li = document.createElement("li");
            li.classList.add("gCarrosel_listImg_i", `${id}_listImg_i`);
            li.innerHTML = `<img class="gCarrosel_imgs ${id}_imgs" src="${imagem.link}" alt="">`;
            listaImagens.appendChild(li);

            // Cria a bolinha de navegação
            const ball = document.createElement("div");
            ball.classList.add("gCarrosel_ball", `${id}_ball`);
            ball.dataset.index = index;
            bolasContainer.appendChild(ball);
        });

        // Configurações iniciais
        let indexAtual = 0;
        const totalImagens = imagens.length;
        const bolas = bolasContainer.children;

        // Estiliza a lista de imagens para exibição horizontal
        listaImagens.style.display = "flex";
        listaImagens.style.width = `${totalImagens * 100}%`;
        listaImagens.style.transition = "transform 0.5s ease-in-out";

        // Cada imagem ocupa 100% da área visível do carrossel
        [...listaImagens.children].forEach((li) => {
            li.style.width = `${100 / totalImagens}%`;
            li.style.flexShrink = "0"; // Evita que os itens encolham
        });

        function atualizarCarrossel(novoIndex) {
            if (novoIndex < 0) novoIndex = totalImagens - 1;
            if (novoIndex >= totalImagens) novoIndex = 0;
            indexAtual = novoIndex;
        
            // Calcula a largura exata da `ul` e aplica a transição
            const larguraCarrossel = listaImagens.parentElement.clientWidth;
            listaImagens.style.transform = `translateX(-${indexAtual * larguraCarrossel}px)`;
        
            // Atualiza as bolinhas
            [...bolas].forEach((ball, i) => {
                ball.classList.toggle("active", i === indexAtual);
            });
        }        

        // Evento dos botões
        prevButton.addEventListener("click", () => atualizarCarrossel(indexAtual - 1));
        nextButton.addEventListener("click", () => atualizarCarrossel(indexAtual + 1));

        // Evento das bolinhas
        [...bolas].forEach((ball) => {
            ball.addEventListener("click", () => atualizarCarrossel(Number(ball.dataset.index)));
        });

        // Iniciar carrossel automático
        setInterval(() => atualizarCarrossel(indexAtual + 1), 3000);

        // Exibir a primeira imagem
        atualizarCarrossel(0);
    });
}

// Dados das imagens
const carrosseis = [
    {
        id: "gCarrosel1",
        imagens: [
            { link: "..\\midia\\images\\normals\\imagem01-preferencia.jpg" },
            { link: "..\\midia\\images\\normals\\imagem02-aleatoria.webp" },
            { link: "..\\midia\\images\\normals\\imagem03-aleatoria.webp" }
        ]
    },
    {
        id: "gCarrosel2",
        imagens: [
            { link: "..\\midia\\images\\normals\\imagem04-aleatoria.webp" },
            { link: "..\\midia\\images\\normals\\imagem05-aleatoria.webp" },
            { link: "..\\midia\\images\\normals\\imagem06-preferencia.webp" }
        ]
    }
];

function open_galeriaVerMais(tipo) {
    let class_rotateP180l = "rotateP180l"
    let class_rotateP180r = "rotateP180r"
    let icon_arrowUpL = document.getElementById("i_arrowUpL")
    let icon_arrowUpR = document.getElementById("i_arrowUpR")

    let section_galeria = document.getElementById("section-galeria")
    let config_big = "220vh"
    let config_small = "140vh"

    let config_desktop = "80vh"

    let btn_status = btn_galeria_verMais.getAttribute("aria-status")

    let galeria_areaG2_3 = document.querySelector(".galeria_areaG2_3")
    
    let text_galeriaVerMais = document.getElementById("text_galeriaVerMais") 
    let pre_text_p1 = text_galeriaVerMais.getAttribute("aria-pre-p1")
    let pre_text_p2 = text_galeriaVerMais.getAttribute("aria-pre-p2")
    
    let htmlTag = document.documentElement;
    let device = htmlTag.getAttribute("device");

    // Apenas volta para configuração padrão se encontrar
    if (tipo === "default") {
        // Arruma o Tamanho
        if (device === "desktop") {
            section_galeria.style.height = config_desktop
            section_galeria.style.maxHeight = config_desktop
        } else if (device === "mobile") {
            section_galeria.style.height = config_small
            section_galeria.style.maxHeight = config_small
        }
        // Gira os Icones
        icon_arrowUpL.classList.add(class_rotateP180l)
        icon_arrowUpR.classList.add(class_rotateP180r)
        // Altera o Status
        btn_galeria_verMais.setAttribute("aria-status", "true")
        // Mostra a Parte escondida
        galeria_areaG2_3.style.display = "flex"
        // Altera o Texto Referente
        text_galeriaVerMais.textContent = pre_text_p1
    }

    if (btn_status === "false" && device === "mobile") {
        console.log("111")
        // Aumenta o Tamanho
        section_galeria.style.height = config_big
        section_galeria.style.maxHeight = config_big
        // Gira os Icones
        icon_arrowUpL.classList.remove(class_rotateP180l)
        icon_arrowUpR.classList.remove(class_rotateP180r)
        // Altera o Status
        btn_galeria_verMais.setAttribute("aria-status", "true")
        // Mostra a Parte escondida
        galeria_areaG2_3.style.display = "flex"
        // Altera o Texto Referente
        text_galeriaVerMais.textContent = pre_text_p2
    } else if (btn_status === "true" && device === "mobile") {
        console.log("222")
        // Aumenta o Tamanho
        section_galeria.style.height = config_small
        section_galeria.style.maxHeight = config_small
        // Gira os Icones
        icon_arrowUpL.classList.add(class_rotateP180l)
        icon_arrowUpR.classList.add(class_rotateP180r)
        // Altera o Status
        btn_galeria_verMais.setAttribute("aria-status", "false")
        // Mostra a Parte escondida
        galeria_areaG2_3.style.display = "none"
        // Altera o Texto Referente
        text_galeriaVerMais.textContent = pre_text_p1
    }

    // Espera 250ms antes de rolar para o elemento
    setTimeout(() => {
        let elementPosition = btn_galeria_verMais.getBoundingClientRect().top + window.scrollY;
        elementPosition = elementPosition - 700
        if (device === "mobile") {
            window.scrollTo({ top: elementPosition, behavior: "smooth" });
        }
    }, 250);

    // Obtém a altura computada em pixels
    // let computedHeightPx = parseFloat(window.getComputedStyle(section_galeria).height);

    // Obtém a altura total da viewport
    // let viewportHeight = window.innerHeight;

    // Converte para vh
    // let computedHeightVh = (computedHeightPx / viewportHeight) * 100;
}

// Pegando o ID do botão para ver mais
const btn_galeria_verMais = document.getElementById("btn_galeria-verMais")

document.addEventListener("DOMContentLoaded", () => {
    populate_galeriaCarossel(carrosseis);

    // Escutador da função de ver mais a galeria
    btn_galeria_verMais.addEventListener('click', open_galeriaVerMais);
});