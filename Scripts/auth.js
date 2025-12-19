unction getUsuarioLogado() {
  const usuario = localStorage.getItem("usuario");
  return usuario ? JSON.parse(usuario) : null;
}

document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuarioLogado();

  if (!usuario) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "/index.html";
  }
});
