document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.getElementById('clienteDropdown');
    const formNovoCliente = document.getElementById('form-novo-cliente');
    const formUsuarioExistente = document.getElementById('form-usuario-existente');
    const dependentesInfo = document.getElementById('dependentes-info');
    const radiosDependentes = document.getElementsByName('dependentes');

    // Função para validar CPF
    function isValidCPF(cpf) {
        cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false; // CPF inválido se não tiver 11 dígitos ou todos forem iguais
        }

        let soma = 0;
        let resto;

        // Verifica o primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf[i - 1]) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[9])) return false;

        soma = 0;

        // Verifica o segundo dígito verificador
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf[i - 1]) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[10])) return false;

        return true;
    }

    // Salvar dados do novo cliente no localStorage
    formNovoCliente.addEventListener('submit', function (event) {
        event.preventDefault();
        const nome = formNovoCliente.querySelector('input[placeholder="Nome Completo"]').value;
        const cpf = formNovoCliente.querySelector('input[placeholder="CPF"]').value;

        if (!isValidCPF(cpf)) {
            alert('CPF inválido. Por favor, insira um CPF válido.');
            return;
        }

        if (nome && cpf) {
            localStorage.setItem(cpf, JSON.stringify({ nome }));
            alert('Cadastro realizado com sucesso!');
            formNovoCliente.reset();
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });

    // Verificar dados de login do usuário existente
    formUsuarioExistente.addEventListener('submit', function (event) {
        event.preventDefault();
        const nome = formUsuarioExistente.querySelector('input[placeholder="Nome Completo"]').value;
        const cpf = formUsuarioExistente.querySelector('input[placeholder="CPF"]').value;

        if (!isValidCPF(cpf)) {
            alert('CPF inválido. Por favor, insira um CPF válido.');
            return;
        }

        const cliente = JSON.parse(localStorage.getItem(cpf));

        if (cliente && cliente.nome === nome) {
            alert(`Bem-vindo, ${cliente.nome}!`);
            window.location.href = "/Html/telainicial.html";
        } else {
            alert('Nome ou CPF incorretos. Por favor, tente novamente.');
        }
    });

    // Configurações iniciais ao carregar a página
    dropdown.addEventListener('change', toggleForms);
    radiosDependentes.forEach(radio => {
        radio.addEventListener('change', toggleDependentes);
    });

    toggleForms();
    toggleDependentes();

    // Outras funções existentes
    function toggleForms() {
        if (dropdown.value === 'novo-cliente') {
            formNovoCliente.style.display = 'block';
            formUsuarioExistente.style.display = 'none';
        } else {
            formNovoCliente.style.display = 'none';
            formUsuarioExistente.style.display = 'block';
        }
    }

    function toggleDependentes() {
        dependentesInfo.style.display = radiosDependentes[0].checked ? 'block' : 'none';
    }
});
