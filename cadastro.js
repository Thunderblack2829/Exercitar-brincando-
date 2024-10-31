// Função para verificar CPF
function verificarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
}

// Função para cadastrar novo usuário com validações de CPF e confirmação de senha
function cadastrar() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirma-senha').value;

    if (!nome || !cpf || !senha || !confirmaSenha) {
        alert('Preencha todos os campos.');
        return;
    }

    if (!verificarCPF(cpf)) {
        alert('CPF inválido.');
        return;
    }

    if (senha !== confirmaSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    // Armazena nome e senha no LocalStorage
    localStorage.setItem(cpf, JSON.stringify({ nome, senha }));
    alert('Cadastro realizado com sucesso!');
    document.getElementById('cadastro-form').reset();
}

// Função para realizar login
function logar() {
    const nome = document.getElementById('login-nome').value;
    const senha = document.getElementById('login-senha').value;

    const dados = JSON.parse(localStorage.getItem(cpf));
    if (dados && dados.nome === nome && dados.senha === senha) {
        alert(`Bem-vindo(a), ${nome}!`);
        document.getElementById('login-form').reset();
    } else {
        alert('Nome ou senha incorretos.');
    }
}
