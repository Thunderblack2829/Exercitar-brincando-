document.addEventListener('DOMContentLoaded', function () {
    const bikeEscolhida = JSON.parse(localStorage.getItem('bicicletaEscolhida'));

    if (!bikeEscolhida) {
        alert("Você precisa escolher uma bicicleta antes de agendar.");
        window.location.href = "/Html/telaBicicletas.html";
        return;
    }

    // Exibe a bicicleta escolhida
    document.getElementById('bike-img').src = bikeEscolhida.imagem;
    document.getElementById('bike-nome').innerHTML = `<strong>Nome:</strong> ${bikeEscolhida.modelo}`;
});

document.getElementById('form-agendamento').addEventListener('submit', function (e) {
    e.preventDefault();

    const dataInicio = new Date(document.getElementById('data-inicio').value);
    const dataFim = new Date(document.getElementById('data-fim').value);
    const resultadoDiv = document.getElementById('resultado');

    if (dataInicio >= dataFim) {
        resultadoDiv.innerHTML = '<p style="color: red;">A data de término deve ser posterior à data de início.</p>';
        return;
    }

    const diferencaHoras = Math.abs((dataFim - dataInicio) / 36e5);
    const custo = diferencaHoras * 25;

    resultadoDiv.innerHTML = `
        <p><strong>Duração:</strong> ${diferencaHoras.toFixed(2)} horas</p>
        <p><strong>Custo Total:</strong> R$${custo.toFixed(2)}</p>
    `;
});
