document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cadastro'); // Obtém o formulário pelo id

    form.addEventListener('submit', function (event) { // Adiciona evento de submit ao formulário
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário

        const imagemInput = form.querySelector('.img-input').files[0]; // Obtém o arquivo de imagem
        const modelo = form.querySelector('input[placeholder="Modelo da Bicicleta"]').value; // Obtém o modelo da bicicleta
        const tipo = form.querySelector('#tipo').value; // Obtém o tipo selecionado no dropdown
        const descricao = form.querySelector('input[placeholder="Descrição"]').value; // Obtém a descrição da bicicleta

        if (imagemInput && modelo && tipo && descricao) { // Verifica se todos os campos estão preenchidos
            const reader = new FileReader(); // Cria um objeto FileReader para ler a imagem

            reader.onload = function (event) { // Quando a leitura da imagem for concluída
                const imagemURL = event.target.result; // Obtém o URL da imagem

                const novaBicicleta = { // Cria um objeto com os dados da bicicleta
                    imagem: imagemURL,
                    modelo,
                    tipo,
                    descricao
                };

                // Armazena a nova bicicleta no Local Storage
                const bicicletas = JSON.parse(localStorage.getItem('bicicletas')) || []; // Obtém as bicicletas existentes ou cria um array vazio
                bicicletas.push(novaBicicleta); // Adiciona a nova bicicleta ao array
                localStorage.setItem('bicicletas', JSON.stringify(bicicletas)); // Salva o array no Local Storage

                form.reset(); // Limpa o formulário após o envio

                alert("Bicicleta cadastrada com sucesso!"); // Exibe uma mensagem de sucesso
            };

            reader.readAsDataURL(imagemInput); // Lê a imagem como um URL
        } else {
            alert("Por favor, preencha todos os campos e adicione uma imagem."); // Se algum campo estiver vazio, exibe uma mensagem de erro
        }
    });
});
