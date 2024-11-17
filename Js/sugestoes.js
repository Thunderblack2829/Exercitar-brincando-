document.addEventListener('DOMContentLoaded', function () {
    const sugestoesForm = document.getElementById('sugestao-form');
    const cadastrarBtn = document.getElementById('cadastrar-btn');

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

        // Limpa o formulário
        sugestoesForm.reset();
    });

    // Botão Cadastrar redireciona para cadastrarBike.html
    cadastrarBtn.addEventListener('click', function () {
        window.location.href = '/Html/cadastrarBike.html';
    });
});
