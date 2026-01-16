// ========================================
// auth.js - Login no ROOT (index.html)
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  // Se já estiver logado, vai direto pro Home
  const sessao = obterSessao();
  if (sessao) {
    navegarPara("/pages/Principal/Home.html");
    return;
  }

  const form = document.getElementById("login-form");
  const inputUsuario = document.getElementById("usuario");
  const inputSenha = document.getElementById("senha");

  if (!form || !inputUsuario || !inputSenha) {
    console.error("❌ Elementos do login não encontrados (form/usuario/senha).");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = inputUsuario.value.trim();
    const senha = inputSenha.value.trim();

    if (!usuario || !senha) {
      alert("⚠️ Preencha usuário e senha.");
      return;
    }

    const dados = buscarUsuario(usuario);
    if (!dados || dados.senha !== senha) {
      alert("❌ Usuário ou senha inválidos.");
      return;
    }

    salvarSessao(usuario);

    try {
      atualizarDiasSeguidos();
    } catch (_) {}

    navegarPara("/pages/Principal/Home.html");
  });
});

// Logout (se você usar em algum botão)
window.realizarLogout = () => {
  limparSessao();
  navegarPara("/index.html");
};
