document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cadastro');
    const sugestoesContainer = document.getElementById('sugestoes-container');
    const nenhumaSugestaoMsg = document.getElementById('nenhuma-sugestao');

    // Adiciona evento de submit ao formulário
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const imagemInput = form.querySelector('.img-input').files[0];
        const modelo = form.querySelector('input[placeholder="Modelo da Bicicleta"]').value.trim();
        const tipo = form.querySelector('#tipo').value.trim();
        const descricao = form.querySelector('input[placeholder="Descrição"]').value.trim();

        if (imagemInput && modelo && tipo && descricao) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const imagemURL = event.target.result;

                const novaBicicleta = { imagem: imagemURL, modelo, tipo, descricao };
                const bicicletas = JSON.parse(localStorage.getItem('bicicletas')) || [];
                bicicletas.push(novaBicicleta);
                localStorage.setItem('bicicletas', JSON.stringify(bicicletas));

                form.reset();
                alert('Bicicleta cadastrada com sucesso!');
                carregarSugestoes(); // Atualiza as sugestões na tela
            };
            reader.readAsDataURL(imagemInput);
        } else {
            alert('Por favor, preencha todos os campos e adicione uma imagem.');
        }
    });

    // Função para carregar as sugestões
    function carregarSugestoes() {
        const sugestoes = JSON.parse(localStorage.getItem('sugestoes')) || [];
        sugestoesContainer.innerHTML = '<h2>Sugestões:</h2>'; // Reseta o container
        nenhumaSugestaoMsg.style.display = sugestoes.length ? 'none' : 'block';

        sugestoes.forEach((sugestao, index) => {
            const divSugestao = document.createElement('div');
            divSugestao.classList.add('sugestao-item');
            divSugestao.innerHTML = `
                <h3>Modelo: ${sugestao.modelo}</h3>
                <p>Tipo: ${sugestao.tipo}</p>
                <p>Descrição: ${sugestao.descricao}</p>
                <button class="excluir-btn" data-index="${index}">Excluir</button>
                <hr>
            `;
            sugestoesContainer.appendChild(divSugestao);
        });

        // Adiciona funcionalidade de excluir
        document.querySelectorAll('.excluir-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                sugestoes.splice(index, 1);
                localStorage.setItem('sugestoes', JSON.stringify(sugestoes));
                carregarSugestoes(); // Recarrega as sugestões após excluir
            });
        });
    }

    // Carrega as sugestões ao iniciar
    carregarSugestoes();
});
