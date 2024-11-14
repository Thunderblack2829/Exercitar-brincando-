document.getElementById('form-agendamento').addEventListener('submit', function (e) {
    e.preventDefault();

    const dataInicio = new Date(document.getElementById('data-inicio').value);
    const dataFim = new Date(document.getElementById('data-fim').value);
    const resultadoDiv = document.getElementById('resultado');
    
    // Verifica se as datas são válidas
    if (dataInicio >= dataFim) {
        resultadoDiv.innerHTML = '<p style="color: red;">Data de término deve ser posterior à data de início.</p>';
        return;
    }

    // Calcula a diferença de horas
    const diferencaHoras = Math.abs((dataFim - dataInicio) / 36e5);
    const custo = diferencaHoras * 25; // R$25 por hora

    // Exibe o custo total
    resultadoDiv.innerHTML = `
        <p><strong>Duração:</strong> ${diferencaHoras.toFixed(2)} horas</p>
        <p><strong>Custo Total:</strong> R$${custo.toFixed(2)}</p>
    `;
});
