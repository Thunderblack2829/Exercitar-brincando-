document.querySelectorAll('.rent-button').forEach(button => {
        button.addEventListener('click', function () {
            const bikeNome = this.getAttribute('data-nome');
            const bikeImg = this.getAttribute('data-img');
    
            // Salva a bicicleta escolhida no Local Storage
            localStorage.setItem('bicicletaEscolhida', JSON.stringify({ nome: bikeNome, img: bikeImg }));
        });
    });
