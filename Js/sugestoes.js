document.addEventListener('DOMContentLoaded', function () {
    const sugestoesForm = document.getElementById('sugestao-form');
    const sugestoesUl = document.getElementById('sugestoes-ul');
    const cadastrarBtn = document.getElementById('cadastrar-btn');

    // Carrega sugestões existentes do localStorage
    function carregarSugestoes() {
        const sugestoes = JSON.parse(localStorage.getItem('sugestoes')) || [];
        sugestoesUl.innerHTML = '';

        sugestoes.forEach((sugestao, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Modelo:</strong> ${sugestao.modelo} <br>
                <strong>Tipo:</strong> ${sugestao.tipo} <br>
                <strong>Descrição:</strong> ${sugestao.descricao}
            `;
            sugestoesUl.appendChild(li);
        });
    }

    // Adiciona uma nova sugestão ao localStorage
    sugestoesForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const modelo = document.getElementById('modelo').value.trim();
        const tipo = document.getElementById('tipo').value.trim();
        const descricao = document.getElementById('descricao').value.trim();

        if (!modelo || !tipo || !descricao) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const sugestoes = JSON.parse(localStorage.getItem('sugestoes')) || [];
        sugestoes.push({ modelo, tipo, descricao });
        localStorage.setItem('sugestoes', JSON.stringify(sugestoes));

        // Limpa o formulário e recarrega a lista
        sugestoesForm.reset();
        carregarSugestoes();
    });

    // Botão Cadastrar redireciona para cadastrarBike.html
    cadastrarBtn.addEventListener('click', function () {
        window.location.href = '/Html/cadastrarBike.html';
    });

    // Inicializa a lista de sugestões
    carregarSugestoes();
});
