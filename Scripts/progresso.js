function concluirAssunto(assuntoId, redirecionarPara) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario || !usuario.id) {
    alert("Usuário não encontrado.");
    return;
  }

  fetch("http://127.0.0.1:5000/progresso", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario_id: usuario.id,
      assunto: assuntoId
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Progresso salvo:", data);

    // 👉 Salva no localStorage também
    localStorage.setItem(assuntoId, "desbloqueado");

    // 👉 Redireciona de volta para a página de assuntos
    window.location.href = redirecionarPara;
  })
  .catch(err => {
    console.error("Erro ao salvar progresso:", err);
    alert("Erro ao salvar o progresso.");
  });
}