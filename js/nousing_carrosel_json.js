document.addEventListener("DOMContentLoaded", () => {
    const carroselList = document.querySelector(".carrosel_listImg");
    const carroselBalls = document.querySelector(".carrosel_balls");
    const prevBtn = document.getElementById("carrosel_prev");
    const nextBtn = document.getElementById("carrosel_next");
    let currentIndex = 0;

    const maxImages = 5; // Defina o número máximo de imagens no carrossel

    // Função para preencher o carrossel com imagens
    function populateCarrosel(imagens) {
        carroselList.innerHTML = '';
        carroselBalls.innerHTML = '';

        let priorityCount = 0;
        let randomImages = [];

        imagens.forEach(img => {
            if (img.prioridade === 'preferencia' && priorityCount < maxImages) {
                const listItem = document.createElement("li");
                listItem.classList.add("carrosel_listImg_i");
                const image = document.createElement("img");
                image.classList.add("carrosel_imgs");
                image.src = img.link;
                listItem.appendChild(image);
                carroselList.appendChild(listItem);
                priorityCount++;
            } else if (img.prioridade === 'aleatoria' && randomImages.length < maxImages - priorityCount) {
                randomImages.push(img);
            }
        });

        randomImages.forEach(img => {
            const listItem = document.createElement("li");
            listItem.classList.add("carrosel_listImg_i");
            const image = document.createElement("img");
            image.classList.add("carrosel_imgs");
            image.src = img.link;
            listItem.appendChild(image);
            carroselList.appendChild(listItem);
        });

        for (let i = 0; i < carroselList.children.length; i++) {
            const ball = document.createElement("div");
            ball.classList.add("carrosel_ball");
            carroselBalls.appendChild(ball);

            ball.addEventListener("click", () => {
                goToImage(i);
            });
        }

        updateActiveBall();
    }

    function goToImage(index) {
        currentIndex = index;
        const offset = -currentIndex * 100;
        carroselList.style.transform = `translateX(${offset}%)`;
        updateActiveBall();
    }

    function updateActiveBall() {
        const balls = document.querySelectorAll(".carrosel_ball");
        balls.forEach((ball, index) => {
            ball.classList.remove("active");
            if (index === currentIndex) {
                ball.classList.add("active");
            }
        });
    }

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = carroselList.children.length - 1;
        }
        goToImage(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < carroselList.children.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        goToImage(currentIndex);
    });

    // Obter imagens do arquivo JSON
    fetch('imagens.json')
        .then(response => response.json())
        .then(imagens => {
            populateCarrosel(imagens);
        })
        .catch(err => console.error('Erro ao carregar imagens:', err));
});
