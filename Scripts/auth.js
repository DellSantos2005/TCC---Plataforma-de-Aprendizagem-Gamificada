// ========================================
// auth.js - VERSAO AJUSTADA PARA GITHUB PAGES
// ========================================

const autenticarUsuario = (usuario, senha) => {
  const dados = buscarUsuario(usuario);
  if (!dados) return null;
  if (dados.senha !== senha) return null;
  return dados;
};

const realizarLogout = () => {
  limparSessao();
  navegarPara("/pages/Login/index.html");
};

// Exportar logout (se voce usa em onclick)
window.realizarLogout = realizarLogout;

document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname;

  const estaNaPaginaLogin =
    /\/pages\/Login\/index\.html$/i.test(path) ||
    /\/Login\/index\.html$/i.test(path);

  // Se esta no login e ja tem sessao -> manda pro Home
  if (estaNaPaginaLogin) {
    const sessao = obterSessao();
    if (sessao) {
      navegarPara("/pages/Principal/Home.html");
      return;
    }

    // ----- CONFIGURAR FORM DE LOGIN -----
    // Ajuste os seletores conforme o seu HTML do Login
    const form =
      document.querySelector("form") ||
      document.getElementById("loginForm") ||
      document.querySelector(".login-form");

    const inputUsuario =
      document.querySelector('input[name="usuario"]') ||
      document.getElementById("usuario") ||
      document.querySelector('input[type="text"]');

    const inputSenha =
      document.querySelector('input[name="senha"]') ||
      document.getElementById("senha") ||
      document.querySelector('input[type="password"]');

    if (!form) {
      console.warn("⚠️ Form de login nao encontrado. Verifique o HTML do Login.");
      return;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const usuario = (inputUsuario?.value || "").trim();
      const senha = (inputSenha?.value || "").trim();

      if (!usuario || !senha) {
        alert("⚠️ Preencha usuario e senha.");
        return;
      }

      const dados = autenticarUsuario(usuario, senha);
      if (!dados) {
        alert("❌ Usuario ou senha invalidos.");
        return;
      }

      salvarSessao(usuario);
      try {
        atualizarDiasSeguidos();
      } catch (_) {}

      navegarPara("/pages/Principal/Home.html");
    });

    return;
  }

  // ----- FORA DO LOGIN: nao faz nada automatico aqui -----
  // (Se quiser, voce pode colocar guard aqui depois.)
});
