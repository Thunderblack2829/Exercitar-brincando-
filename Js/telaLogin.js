document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('clienteDropdown');
    const formNovoCliente = document.getElementById('form-novo-cliente');
    const formUsuarioExistente = document.getElementById('form-usuario-existente');
    const dependentesInfo = document.getElementById('dependentes-info');
    const radiosDependentes = document.getElementsByName('dependentes');

    // Função para alternar a exibição dos formulários com base na seleção do dropdown
    function toggleForms() {
        if (dropdown.value === 'novo-cliente') {
            formNovoCliente.style.display = 'block';
            formUsuarioExistente.style.display = 'none';
        } else {
            formNovoCliente.style.display = 'none';
            formUsuarioExistente.style.display = 'block';
        }
    }

    // Função para exibir ou ocultar campos de dependentes
    function toggleDependentes() {
        dependentesInfo.style.display = radiosDependentes[0].checked ? 'block' : 'none';
    }

    // Salvar dados do novo cliente no localStorage ao enviar o formulário
    formNovoCliente.addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = formNovoCliente.querySelector('input[placeholder="Nome Completo"]').value;
        const cpf = formNovoCliente.querySelector('input[placeholder="CPF"]').value;

        if (nome && cpf) {
            localStorage.setItem(cpf, JSON.stringify({ nome }));
            alert('Cadastro realizado com sucesso!');
            formNovoCliente.reset();
            toggleDependentes();
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });

    // Verificar dados de login do usuário existente
    formUsuarioExistente.addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = formUsuarioExistente.querySelector('input[placeholder="Nome Completo"]').value;
        const cpf = formUsuarioExistente.querySelector('input[placeholder="CPF"]').value;

        const cliente = JSON.parse(localStorage.getItem(cpf));
        
        if (cliente && cliente.nome === nome) {
            alert(`Bem-vindo de volta, ${cliente.nome}!`);
            formUsuarioExistente.reset();
        } else {
            alert('Nome ou CPF incorretos. Por favor, tente novamente.');
        }
    });

    // Executa a alternância ao selecionar uma opção no dropdown
    dropdown.addEventListener('change', toggleForms);

    // Monitora os rádios de dependentes
    radiosDependentes.forEach(radio => {
        radio.addEventListener('change', toggleDependentes);
    });

    // Configurações iniciais ao carregar a página
    toggleForms();
    toggleDependentes();
});
