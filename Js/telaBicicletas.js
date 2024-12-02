document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cadastro');
    const listaBicicletas = document.getElementById('listaBicicletas');

    // Função para exibir bicicletas cadastradas
    function mostrarBicicletasCadastradas() {
        listaBicicletas.innerHTML = ''; // Limpa a lista existente
        const bicicletas = JSON.parse(localStorage.getItem('bicicletas')) || [];

        bicicletas.forEach((bicicleta) => {
            const bikeElement = document.createElement('div');
            bikeElement.classList.add('bike-card');
            bikeElement.innerHTML = `
                <img src="${bicicleta.imagem}" alt="Imagem da bicicleta" class="bike-img">
                <h3>${bicicleta.modelo}</h3>
                <p><strong>Tipo:</strong> ${bicicleta.tipo}</p>
                <p><strong>Descrição:</strong> ${bicicleta.descricao}</p>
                <p>Taxa de aluguel: 25$/h</p>
                <a href="/Html/agendamento.html">
                    <button class="rent-button">Alugue Já</button>
                </a>
            `;
            listaBicicletas.appendChild(bikeElement);
        });
    }

    // Evento para salvar bicicleta no localStorage
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const imagemInput = form.querySelector('.img-input').files[0];
        const modelo = form.querySelector('input[placeholder="Modelo da Bicicleta"]').value;
        const tipo = form.querySelector('input[placeholder="Tipo"]').value;
        const descricao = form.querySelector('input[placeholder="Descrição"]').value;

        if (imagemInput && modelo && tipo && descricao) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const imagemURL = event.target.result;

                const novaBicicleta = {
                    imagem: imagemURL,
                    modelo,
                    tipo,
                    descricao
                };

                const bicicletas = JSON.parse(localStorage.getItem('bicicletas')) || [];
                bicicletas.push(novaBicicleta);
                localStorage.setItem('bicicletas', JSON.stringify(bicicletas));

                form.reset(); // Limpa o formulário
                alert("Bicicleta cadastrada com sucesso!");

                // Atualiza a exibição das bicicletas
                mostrarBicicletasCadastradas();
            };

            reader.readAsDataURL(imagemInput);
        } else {
            alert("Por favor, preencha todos os campos e adicione uma imagem da bicicleta.");
        }
    });

    // Inicializa a exibição de bicicletas cadastradas
    mostrarBicicletasCadastradas();
});
