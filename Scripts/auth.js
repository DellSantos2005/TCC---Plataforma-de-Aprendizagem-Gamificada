document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuarioLogado();
  if (!usuario) {
    alert("Você precisa estar logado.");
    window.location.href = "../Login/login.html";
  }
});