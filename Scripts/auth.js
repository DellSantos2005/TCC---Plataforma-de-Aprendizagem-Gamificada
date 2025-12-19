// auth.js
document.addEventListener("DOMContentLoaded", () => {
  const usuarioSalvo = localStorage.getItem("usuario");

  if (!usuarioSalvo) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "/index.html"; // ajuste se necessário
    return;
  }

  try {
    JSON.parse(usuarioSalvo);
  } catch (e) {
    localStorage.removeItem("usuario");
    window.location.href = "/index.html";
  }
});
