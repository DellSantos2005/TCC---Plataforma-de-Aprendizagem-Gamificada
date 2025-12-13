
// Define a tabela de níveis (exemplo simples)
const niveisXP = [
    { nivel: 1, xp: 0 },
    { nivel: 2, xp: 100 },
    { nivel: 3, xp: 250 },
    { nivel: 4, xp: 500 },
    { nivel: 5, xp: 1000 }
  ];
  
  // Adiciona XP ao usuário
  function adicionarXP(quantidade) {
    let xpAtual = parseInt(localStorage.getItem("xpTotal")) || 0;
    xpAtual += quantidade;
    localStorage.setItem("xpTotal", xpAtual);
  
    verificarNivel();
  }
  
  // Calcula o nível com base no XP total
  function verificarNivel() {
    const xpTotal = parseInt(localStorage.getItem("xpTotal")) || 0;
    let nivelAtual = 1;
  
    for (let i = 0; i < niveisXP.length; i++) {
      if (xpTotal >= niveisXP[i].xp) {
        nivelAtual = niveisXP[i].nivel;
      }
    }
  
    localStorage.setItem("nivelAtual", nivelAtual);
  }
  
  // Retorna o XP e Nível atuais
  function getStatusUsuario() {
    const xp = parseInt(localStorage.getItem("xpTotal")) || 0;
    const nivel = parseInt(localStorage.getItem("nivelAtual")) || 1;
    return { xp, nivel };
  }