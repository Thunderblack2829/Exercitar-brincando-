document.addEventListener('DOMContentLoaded', function () {
    const bikesList = document.getElementById('bikes-list');
    const resultsCount = document.getElementById('results-count');

    function carregarBicicletas() {
        const bicicletas = JSON.parse(localStorage.getItem('bicicletas')) || [];
        bikesList.innerHTML = ''; // Limpa a lista de bicicletas
        resultsCount.textContent = `${bicicletas.length} Resultados`;

        bicicletas.forEach((bicicleta, index) => {
            const bikeCard = document.createElement('div');
            bikeCard.classList.add('bike-card');

            bikeCard.innerHTML = `
                <img src="${bicicleta.imagem}" alt="${bicicleta.modelo}" class="bike-img">
                <h3>${bicicleta.modelo}</h3>
                <p><strong>Tipo:</strong> ${bicicleta.tipo}</p>
                <p>${bicicleta.descricao}</p>
                <button class="rent-button" data-index="${index}">Alugue Já</button>
            `;
            bikesList.appendChild(bikeCard);
        });

        // Adiciona evento de clique para os botões "Alugue Já"
        document.querySelectorAll('.rent-button').forEach((button) => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                const bicicletas = JSON.parse(localStorage.getItem('bicicletas')) || [];
                const bicicletaEscolhida = bicicletas[index];

                // Salva a bicicleta escolhida no Local Storage
                localStorage.setItem('bicicletaEscolhida', JSON.stringify(bicicletaEscolhida));

                // Redireciona para a tela de agendamento
                window.location.href = "/Html/agendamento.html";
            });
        });
    }

    carregarBicicletas();
});
