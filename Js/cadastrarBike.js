document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastro');
    const formCadastro = document.getElementById('formCadastro');
    const bicicletasDisponiveis = document.getElementById('bicicletasDisponiveis');
    const listaBicicletas = document.getElementById('listaBicicletas');
    const sugestoesContainer = document.getElementById('sugestoes'); // Container para sugestões

    // Função para mostrar a seção de cadastro
    window.mostrarCadastro = function() {
        formCadastro.style.display = 'block'; // Exibe o formulário de cadastro
        bicicletasDisponiveis.style.display = 'none'; // Oculta a lista de bicicletas
    };

    // Função para mostrar a seção de bicicletas cadastradas
    window.mostrarBicicletas = function() {
        formCadastro.style.display = 'none'; // Oculta o formulário de cadastro
        bicicletasDisponiveis.style.display = 'block'; // Exibe a lista de bicicletas
        mostrarBicicletasCadastradas(); // Carrega as bicicletas cadastradas
    };

    // Função para mostrar bicicletas cadastradas
    function mostrarBicicletasCadastradas() {
        listaBicicletas.innerHTML = ''; // Limpa a lista existente
        const bicicletas = JSON.parse(localStorage.getItem('bicicletas')) || [];

        bicicletas.forEach(bicicleta => {
            const bikeElement = document.createElement('div');
            bikeElement.classList.add('bicicleta');

            bikeElement.innerHTML = `
                <img src="${bicicleta.imagem}" alt="Imagem da bicicleta" class="bike-img">
                <p><strong>Modelo:</strong> ${bicicleta.modelo}</p>
                <p><strong>Tipo:</strong> ${bicicleta.tipo}</p>
                <p><strong>Descrição:</strong> ${bicicleta.descricao}</p>
            `;
            listaBicicletas.appendChild(bikeElement);
        });
    }

    // Função para salvar dados da nova bicicleta
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const imagemInput = form.querySelector('.img-input').files[0];
        const modelo = form.querySelector('input[placeholder="Modelo da Bicicleta"]').value;
        const tipo = form.querySelector('input[placeholder="Tipo"]').value;
        const descricao = form.querySelector('input[placeholder="Descrição"]').value;

        if (imagemInput && modelo && tipo && descricao) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const imagemURL = event.target.result;

                const novaBicicleta = {
                    imagem: imagemURL,
                    modelo,
                    tipo,
                    descricao
                };

                // Armazena a nova bicicleta no localStorage
                const bicicletas = JSON.parse(localStorage.getItem('bicicletas')) || [];
                bicicletas.push(novaBicicleta);
                localStorage.setItem('bicicletas', JSON.stringify(bicicletas));

                // Limpa o formulário
                form.reset();

                // Exibe uma mensagem de sucesso
                alert("Bicicleta cadastrada com sucesso!");
            };

            reader.readAsDataURL(imagemInput);
        } else {
            alert("Por favor, preencha todos os campos e adicione uma imagem da bicicleta.");
        }
    });

    // Função para renderizar as sugestões
    function mostrarSugestoes() {
        sugestoesContainer.innerHTML = ''; // Limpa o container
        const sugestoes = JSON.parse(localStorage.getItem('sugestoes')) || [];

        sugestoes.forEach((sugestao, index) => {
            const sugestaoElement = document.createElement('div');
            sugestaoElement.classList.add('sugestao-item');

            sugestaoElement.innerHTML = `
                <p><strong>Modelo:</strong> ${sugestao.modelo}</p>
                <p><strong>Tipo:</strong> ${sugestao.tipo}</p>
                <p><strong>Descrição:</strong> ${sugestao.descricao}</p>
                <button class="excluir-sugestao" data-index="${index}">Excluir</button>
            `;

            sugestoesContainer.appendChild(sugestaoElement);
        });

        // Adiciona evento de exclusão para cada botão
        const botoesExcluir = document.querySelectorAll('.excluir-sugestao');
        botoesExcluir.forEach(botao => {
            botao.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                excluirSugestao(index);
            });
        });
    }

    // Função para excluir uma sugestão
    function excluirSugestao(index) {
        const sugestoes = JSON.parse(localStorage.getItem('sugestoes')) || [];
        sugestoes.splice(index, 1); // Remove a sugestão pelo índice
        localStorage.setItem('sugestoes', JSON.stringify(sugestoes));
        mostrarSugestoes(); // Atualiza a lista
    }

    // Renderiza as sugestões na inicialização
    mostrarSugestoes();
});
