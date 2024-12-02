document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cadastro');

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
                    descricao,
                };

                const bicicletas = JSON.parse(localStorage.getItem('bicicletas')) || [];
                bicicletas.push(novaBicicleta);
                localStorage.setItem('bicicletas', JSON.stringify(bicicletas));

                form.reset();
                alert("Bicicleta cadastrada com sucesso!");
            };

            reader.readAsDataURL(imagemInput);
        } else {
            alert("Por favor, preencha todos os campos e adicione uma imagem da bicicleta.");
        }
    });
});
