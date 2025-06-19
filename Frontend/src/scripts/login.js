const forms = document.getElementById('login-caixa')
const mensagem = document.getElementById('mensagem')

forms.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const resposta = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, senha })
    });

    let dados = {};

    try {
        const texto = await resposta.text();
        dados = texto ? JSON.parse(texto) : {};
    } catch (erro) {
        console.error('Erro ao tentar ler JSON:', erro);
    }

    if(dados.sucesso) {
        window.location.href = '/'
    } else {
        mensagem.textContent = dados.mensagem
        mensagem.style.color = '#ff3337'
    }
})