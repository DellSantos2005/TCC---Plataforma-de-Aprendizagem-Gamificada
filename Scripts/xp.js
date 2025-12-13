
async function adicionarXP(nickname, quantidade) {
    try {
      const response = await fetch("http://127.0.0.1:5000/atualizar_xp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, xp: quantidade })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(`XP atualizado: ${data.xp_total}, Nível: ${data.nivel}`);
        return data;
      } else {
        alert("Erro ao atualizar XP: " + data.erro);
      }
  
    } catch (error) {
      console.error("Erro de conexão com o servidor.", error);
    }
  }

  function concluirAssunto(assuntoId) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return;
  
    fetch("http://127.0.0.1:5000/progresso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname: usuario.nickname,
        assunto: assuntoId
      })
    })
    .then(res => res.json())
    .then(dados => {
      console.log(dados);
      // Após registrar, redirecionar
      window.location.href = document.referrer;
    })
    .catch(err => {
      console.error("Erro ao salvar progresso:", err);
    });
  }