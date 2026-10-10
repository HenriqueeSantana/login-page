// ===== ETAPA 1: pegar os elementos do HTML =====
// getElementById busca o elemento pelo id que você escreveu no HTML.
// Guardamos em variáveis para usar depois.
const form = document.getElementById("form-login");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const erroEmail = document.getElementById("erro-email");
const erroSenha = document.getElementById("erro-senha");
const mensagem = document.getElementById("mensagem");
const btnMostrar = document.getElementById("btn-mostrar");


// ===== ETAPA 2: mostrar / esconder a senha =====
// addEventListener fica "escutando" um evento. Aqui, o clique no botão.
btnMostrar.addEventListener("click", function () {
  // true se o campo está como password (senha escondida)
  const escondida = inputSenha.type === "password";

  // Troca o tipo do input: password mostra bolinhas, text mostra a senha
  inputSenha.type = escondida ? "text" : "password";

  // Troca o texto do botão
  btnMostrar.textContent = escondida ? "Esconder" : "Mostrar";
});


// ===== ETAPA 3: funções de apoio =====

// Confere se o e-mail tem o formato texto@texto.texto
function emailValido(valor) {
  const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return padrao.test(valor); // true ou false
}

// Mostra ou limpa a mensagem de erro de um campo
function mostrarErro(input, elementoErro, texto) {
  elementoErro.textContent = texto;

  // Se tem texto, pinta a borda de vermelho (classe "invalido" do CSS).
  // Se não tem, tira a classe.
  if (texto) {
    input.classList.add("invalido");
  } else {
    input.classList.remove("invalido");
  }
}


// ===== ETAPA 4: envio do formulário =====
form.addEventListener("submit", function (evento) {
  // Impede o navegador de recarregar a página ao enviar
  evento.preventDefault();

  // trim() remove espaços do começo e do fim
  const email = inputEmail.value.trim();
  const senha = inputSenha.value;

  // Começa assumindo que está tudo certo; qualquer erro muda para false
  let tudoCerto = true;
  mensagem.textContent = "";

  // Valida o e-mail
  if (email === "") {
    mostrarErro(inputEmail, erroEmail, "Digite seu e-mail.");
    tudoCerto = false;
  } else if (!emailValido(email)) {
    mostrarErro(inputEmail, erroEmail, "E-mail inválido.");
    tudoCerto = false;
  } else {
    mostrarErro(inputEmail, erroEmail, ""); // sem erro: limpa
  }

  // Valida a senha
  if (senha === "") {
    mostrarErro(inputSenha, erroSenha, "Digite sua senha.");
    tudoCerto = false;
  } else if (senha.length < 6) {
    mostrarErro(inputSenha, erroSenha, "A senha precisa ter pelo menos 6 caracteres.");
    tudoCerto = false;
  } else {
    mostrarErro(inputSenha, erroSenha, "");
  }

  // Se passou em tudo
  if (tudoCerto) {
    // Em um sistema real, os dados iriam para um servidor (backend).
    // Como é um estudo, só mostramos uma mensagem.
    mensagem.textContent = "Login enviado com sucesso (simulação).";
  }
});