// Variáveis dos botões da página principal
const botaoMenu = document.getElementById("acessoNav");
const corpo = document.body;
const botoesNav = document.querySelectorAll(".navLink");
const sessoes = document.querySelectorAll("main section");
const chaveEstado = "abaAtiva";

// Variáveis para abrir e fechar modal
const modalCadastro = document.getElementById("modalCadastroProduto");
const botaoAbrirModal = document.getElementById("botaoAbrirModal");
const botaoFecharModal = document.getElementById("botaoFecharModal");
const botaoCancelarModal = document.getElementById("botaoFecharModal");

// Variáveis de alteração do conteúdo do formulário
const tipoProduto = document.getElementById("tipoProduto");
const formLinha = document.getElementById("formLinha");
const formTecido = document.getElementById("formTecido");
const formAdicional = document.getElementById("formAdicional");

// Botões para a navegação das abas principais
botaoMenu.addEventListener("click", () => {
  corpo.classList.toggle("navFechada");
});

function marcarBotaoAtivo(destino) {
  botoesNav.forEach((link) => {
    const ativo = link.dataset.destino === destino;
    link.classList.toggle("ativo", ativo);
  });
}

function mostrarSessaoAtiva(destino) {
  sessoes.forEach((sessao) => {
    sessao.style.display = sessao.id === destino ? "block" : "none";
  });
}

function salvarEstado(destino) {
  localStorage.setItem(chaveEstado, destino);
}

function ativarPagina(destino) {
  marcarBotaoAtivo(destino);
  mostrarSessaoAtiva(destino);
  salvarEstado(destino);
}

botoesNav.forEach((link) => {
  link.addEventListener("click", (evento) => {
    evento.preventDefault();
    const destino = link.dataset.destino;
    ativarPagina(destino);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const destinoSalvo = localStorage.getItem(chaveEstado) || "dashboard";
  ativarPagina(destinoSalvo);
});

// Ações que ocorre dentro do modal de cadastro de produtos
botaoAbrirModal.addEventListener("click", () => modalCadastro.showModal());

botaoFecharModal.addEventListener("click", () => modalCadastro.close());

botaoCancelarModal.addEventListener("click", () => modalCadastro.close());

modalCadastro.addEventListener("click", (evento) => {
  const reacao = modalCadastro.getBoundingClientRect();
  if (
    evento.clientX < reacao.left ||
    evento.clientX > reacao.right ||
    evento.clientY < reacao.top ||
    evento.clientY > reacao.bottom
  ) {
    modalCadastro.close();
  }
});

// Contúdos do formulário do cadastro de produtos
tipoProduto.addEventListener("change", () => {
  formLinha.hidden = true;
  formTecido.hidden = true;
  formAdicional.hidden = true;

  switch (tipoProduto.value) {
    case "linha":
      formLinha.hidden = false;
      break;
    case "tecido":
      formTecido.hidden = false;
      break;
    case "adicional":
      formAdicional.hidden = false;
      break;
  }
});
