document.addEventListener("DOMContentLoaded", () => {
    const carroselList = document.getElementById("carrosel_main_listImg");
    const carroselBalls = document.querySelector(".carrosel_balls");
    const prevBtn = document.getElementById("carrosel_prev");
    const nextBtn = document.getElementById("carrosel_next");
    let currentIndex = 0;
    let autoSlideInterval;

    const maxImages = 7; // Defina o número máximo de imagens no carrossel

    // Função para extrair a prioridade do nome da imagem
    function getPriorityFromFilename(filename) {
        const parts = filename.split('-');  // Separa a string pelo hífen
        const priority = parts[1] ? parts[1].replace(/\..*$/, '') : 'aleatoria';  // Remove tudo após o primeiro ponto (extensão do arquivo)
        return priority;
    }

    // Função para preencher o carrossel com imagens
    function populateCarrosel(imagens) {
        // Limpa qualquer conteúdo anterior
        carroselList.innerHTML = '';
        carroselBalls.innerHTML = '';

        // Contador para imagens com "prioridade"
        let priorityCount = 0; 
        let randomImages = [];

        imagens.forEach(img => {
            const filename = img.link.split("\\").pop(); // Extrai o nome do arquivo (ex: imagem1-preferencia.jpg)
            const prioridade = getPriorityFromFilename(filename); // Extrai a prioridade

            // Atualiza o objeto da imagem com a prioridade extraída
            img.prioridade = prioridade;

            // Organiza as imagens conforme a prioridade e aleatória
            if (img.prioridade === 'preferencia' && priorityCount < maxImages) {
                // Adiciona imagens com prioridade primeiro
                const listItem = document.createElement("li");
                listItem.classList.add("carrosel_listImg_i");
                const image = document.createElement("img");
                image.classList.add("carrosel_imgs");
                image.src = img.link;
                listItem.appendChild(image);
                carroselList.appendChild(listItem);
                priorityCount++;
            } else if (img.prioridade === 'aleatoria' && randomImages.length < maxImages - priorityCount) {
                // Adiciona imagens aleatórias se ainda houver espaço
                randomImages.push(img);
            }
        });

        // Função para embaralhar um array (algoritmo Fisher-Yates)
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // Depois de coletar as imagens aleatórias, embaralhe
        shuffleArray(randomImages);

        // Agora, adicionamos apenas a quantidade necessária
        randomImages.slice(0, maxImages - priorityCount).forEach(img => {
            const listItem = document.createElement("li");
            listItem.classList.add("carrosel_listImg_i");
            const image = document.createElement("img");
            image.classList.add("carrosel_imgs");
            image.src = img.link;
            listItem.appendChild(image);
            carroselList.appendChild(listItem);
        });

        // Adicionar bolinhas de navegação
        for (let i = 0; i < carroselList.children.length; i++) {
            const ball = document.createElement("div");
            ball.classList.add("carrosel_ball");
            carroselBalls.appendChild(ball);

            ball.addEventListener("click", () => {
                goToImage(i);
                resetAutoSlide();  // Reinicia o slide automático ao clicar nas bolinhas
            });
        }

        // Atualiza a bolinha ativa
            updateActiveBall();
        }

    // Função para ir para uma imagem específica
    function goToImage(index) {
        currentIndex = index;
        const offset = -currentIndex * 100; // Garantindo que a transição esteja correta
        carroselList.style.transform = `translateX(${offset}%)`;
        updateActiveBall();
    }    

    // Atualiza a bolinha ativa
    function updateActiveBall() {
        const balls = document.querySelectorAll(".carrosel_ball");
        balls.forEach((ball, index) => {
            ball.classList.remove("active");
            if (index === currentIndex) {
                ball.classList.add("active");
            }
        });
    }

    // Função de navegação anterior
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = carroselList.children.length - 1;
        }
        goToImage(currentIndex);
        resetAutoSlide();  // Reinicia o slide automático ao clicar no botão anterior
    });

    // Função de navegação próxima
    nextBtn.addEventListener("click", () => {
        if (currentIndex < carroselList.children.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        goToImage(currentIndex);
        resetAutoSlide();  // Reinicia o slide automático ao clicar no botão próximo
    });

    // Exemplo de dados para as imagens (com nomes com prioridade)
    const imagens = [
        { link: "..\\midia\\images\\normals\\imagem01-preferencia.jpg" },
        { link: "..\\midia\\images\\normals\\imagem02-aleatoria.webp" },
        { link: "..\\midia\\images\\normals\\imagem03-aleatoria.webp" },
        { link: "..\\midia\\images\\normals\\imagem04-aleatoria.webp" },
        { link: "..\\midia\\images\\normals\\imagem05-aleatoria.webp" },
        { link: "..\\midia\\images\\normals\\imagem06-preferencia.webp" },
        { link: "..\\midia\\images\\normals\\imagem07-aleatoria.webp" },
        { link: "..\\midia\\images\\normals\\imagem08-preferencia.webp" },
        { link: "..\\midia\\images\\normals\\imagem09-aleatoria.webp" },
        { link: "..\\midia\\images\\normals\\imagem10-aleatoria.webp" },
    ];

    // Preencher o carrossel com as imagens
    populateCarrosel(imagens);

    // Função para iniciar o slide automático
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (currentIndex < carroselList.children.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            goToImage(currentIndex);
        }, 3000);  // Passa a imagem a cada 3 segundos
    }

    // Iniciar o slide automático
    startAutoSlide();

    // Função para parar o slide automático
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Função para reiniciar o slide automático
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
});