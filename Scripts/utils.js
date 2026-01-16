// ========================================
// utils.js - VERSAO AJUSTADA PARA GITHUB PAGES
// (inclui navegacao absoluta + auth guard)
// ========================================

// ---------- CONFIG DE NAVEGACAO (GitHub Pages) ----------
(function () {
  const repoName = "TCC---Plataforma-de-Aprendizagem-Gamificada"; // <-- TROQUE se o repo tiver outro nome
  const isGitHubPages = location.hostname.endsWith("github.io");
  const base = isGitHubPages ? `/${repoName}` : "";

  window.urlApp = (path) => {
    const p = path.startsWith("/") ? path : `/${path}`;
    return base + p;
  };

  window.navegarPara = (path) => {
    location.href = window.urlApp(path);
  };

  window.isGitHubPages = isGitHubPages;
})();

// ========================================
// Estrutura padrao de um novo usuario
// ========================================
const criarUsuarioPadrao = (usuario, senha, curso) => {
  const desafiosTematicos =
    curso === "Informática"
      ? {
          "semana-codigo-limpo": false,
          "seguranca-digital": false,
        }
      : {
          "seguranca-eletricidade": false,
          "eficiencia-energetica": false,
          "instalacoes-residenciais": false,
          "automacao-industrial": false,
        };

  return {
    usuario,
    senha,
    curso,
    campus: "Camaçari",
    primeiroLogin: new Date().toLocaleDateString("pt-BR"),

    xp: 0,
    nivel: 1,

    estatisticas: {
      diasSeguidos: 1,
      ultimoLogin: new Date().toDateString(),
      totalJogos: 0,
      totalAcertos: 0,
      totalErros: 0,
    },

    progresso: {
      "1ano": {
        liberado: true,
        disciplinas:
          curso === "Informática"
            ? {
                "informatica-basica": {
                  liberado: true,
                  concluido: false,
                  assuntos: {
                    IntroducaoComputador: { concluido: false, xp: 0 },
                    "sistemas-operacionais": { concluido: false, xp: 0 },
                    "pacote-office": { concluido: false, xp: 0 },
                    "internet-seguranca": { concluido: false, xp: 0 },
                  },
                },
                LogicaProgramacao: {
                  liberado: false,
                  concluido: false,
                  assuntos: {
                    VariaveisTiposDados: { concluido: false, xp: 0 },
                    "estruturas-condicionais": { concluido: false, xp: 0 },
                    "lacos-repeticao": { concluido: false, xp: 0 },
                    funcoes: { concluido: false, xp: 0 },
                  },
                },
              }
            : {
                "desenho-tecnico": {
                  liberado: true,
                  concluido: false,
                  assuntos: {
                    "Normas-Convencoes": { concluido: false, xp: 0 },
                    "simbologia-eletrica": { concluido: false, xp: 0 },
                    "plantas-diagramas": { concluido: false, xp: 0 },
                    "projeto-instalacao": { concluido: false, xp: 0 },
                  },
                },
                "fundamentos-eletricidade": {
                  liberado: false,
                  concluido: false,
                  assuntos: {
                    "Carga-Corrente": { concluido: false, xp: 0 },
                    "tensao-potencial": { concluido: false, xp: 0 },
                    "resistencia-ohm": { concluido: false, xp: 0 },
                    "circuitos-basicos": { concluido: false, xp: 0 },
                  },
                },
              },
      },

      "2ano": {
        liberado: false,
        disciplinas:
          curso === "Informática"
            ? {
                "banco-de-dados-1": {
                  liberado: true,
                  concluido: false,
                  assuntos: {
                    "conceitos-banco-dados": { concluido: false, xp: 0 },
                    "modelo-relacional": { concluido: false, xp: 0 },
                    "linguagem-sql": { concluido: false, xp: 0 },
                    normalizacao: { concluido: false, xp: 0 },
                  },
                },
                "linguagem-programacao-1": {
                  liberado: false,
                  concluido: false,
                  assuntos: {
                    "sintaxe-variaveis": { concluido: false, xp: 0 },
                    decisao: { concluido: false, xp: 0 },
                    repeticao: { concluido: false, xp: 0 },
                    "vetores-matrizes": { concluido: false, xp: 0 },
                  },
                },
              }
            : {
                "instalacoes-eletricas-1": {
                  liberado: true,
                  concluido: false,
                  assuntos: {
                    "circuitos-iluminacao": { concluido: false, xp: 0 },
                    "Tomadas-Disjuntores": { concluido: false, xp: 0 },
                    "Calculo-Carga": { concluido: false, xp: 0 },
                    "Dimensionamento-Cabos": { concluido: false, xp: 0 },
                  },
                },
                "maquinas-eletricas": {
                  liberado: false,
                  concluido: false,
                  assuntos: {
                    "motores-eletricos": { concluido: false, xp: 0 },
                    Transformadores: { concluido: false, xp: 0 },
                    "Equipamentos-Protecao": { concluido: false, xp: 0 },
                    "instalacoes-industriais": { concluido: false, xp: 0 },
                  },
                },
              },
      },
    },

    desafios: {
      diario: {
        ultimaData: null,
        concluido: false,
      },
      tematicos: desafiosTematicos,
      competitivo: {
        vitorias: 0,
        derrotas: 0,
      },
    },
  };
};

// ========================================
// FUNCOES LOCALSTORAGE
// ========================================
const salvarUsuario = (dadosUsuario) => {
  try {
    localStorage.setItem(`usuario_${dadosUsuario.usuario}`, JSON.stringify(dadosUsuario));
    return true;
  } catch (e) {
    console.error("Erro ao salvar usuario:", e);
    return false;
  }
};

const buscarUsuario = (usuario) => {
  try {
    const dados = localStorage.getItem(`usuario_${usuario}`);
    return dados ? JSON.parse(dados) : null;
  } catch (e) {
    console.error("Erro ao buscar usuario:", e);
    return null;
  }
};

const usuarioExiste = (usuario) => localStorage.getItem(`usuario_${usuario}`) !== null;

const salvarSessao = (usuario) => localStorage.setItem("sessao_ativa", usuario);
const obterSessao = () => localStorage.getItem("sessao_ativa");
const limparSessao = () => localStorage.removeItem("sessao_ativa");

const obterUsuarioLogado = () => {
  const usuario = obterSessao();
  return usuario ? buscarUsuario(usuario) : null;
};

const atualizarUsuarioLogado = (novosDados) => {
  const usuario = obterSessao();
  if (usuario) return salvarUsuario(novosDados);
  return false;
};

// ========================================
// XP / NIVEL
// ========================================
const calcularNivel = (xpTotal) => Math.floor(xpTotal / 100) + 1;
const xpParaProximoNivel = (nivelAtual) => nivelAtual * 100;

const adicionarXP = (quantidade) => {
  const usuario = obterUsuarioLogado();
  if (!usuario) {
    console.error("❌ Usuario nao encontrado ao tentar adicionar XP");
    return false;
  }

  const nivelAntes = usuario.nivel;

  usuario.xp += quantidade;
  usuario.nivel = calcularNivel(usuario.xp);

  const salvou = atualizarUsuarioLogado(usuario);
  if (salvou && usuario.nivel > nivelAntes) {
    console.log(`🎉 LEVEL UP! Nivel ${nivelAntes} → ${usuario.nivel}`);
  }
  return salvou;
};

// ========================================
// DIAS SEGUIDOS
// ========================================
const atualizarDiasSeguidos = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return false;

  const hoje = new Date().toDateString();
  const ultimoLogin = usuario.estatisticas.ultimoLogin;

  if (ultimoLogin !== hoje) {
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);

    if (ultimoLogin === ontem.toDateString()) usuario.estatisticas.diasSeguidos++;
    else usuario.estatisticas.diasSeguidos = 1;

    usuario.estatisticas.ultimoLogin = hoje;
    return atualizarUsuarioLogado(usuario);
  }

  return false;
};

// ========================================
// AUTH GUARD (ajustado para GitHub Pages)
// ========================================
const verificarAutenticacao = () => {
  const sessao = obterSessao();
  if (!sessao) {
    navegarPara("/pages/Login/index.html");
    return false;
  }
  return true;
};

// ========================================
// RANKING
// ========================================
const obterUsuariosPorCurso = (curso) => {
  const usuarios = [];
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave && chave.startsWith("usuario_")) {
      const usuario = JSON.parse(localStorage.getItem(chave));
      if (usuario.curso === curso) usuarios.push(usuario);
    }
  }
  return usuarios.sort((a, b) => b.xp - a.xp);
};

const obterTodosUsuarios = () => {
  const usuarios = [];
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave && chave.startsWith("usuario_")) {
      usuarios.push(JSON.parse(localStorage.getItem(chave)));
    }
  }
  return usuarios.sort((a, b) => b.xp - a.xp);
};

// ========================================
// AUTO-CADASTRO (PRIMEIRA VEZ)
// ========================================
const inicializarUsuariosPadrão = () => {
  if (localStorage.getItem("sistema_inicializado")) return;

  const usuariosPadrao = [
    { usuario: "prof.avaliador", senha: "IFBA.99999999999", curso: "Informática" },
    { usuario: "banca.um", senha: "IFBA.11111111111", curso: "Informática" },
    { usuario: "banca.dois", senha: "IFBA.22222222222", curso: "Eletrotécnica" },
    { usuario: "joao.silva", senha: "IFBA.12345678901", curso: "Informática" },
    { usuario: "rafael.martins", senha: "IFBA.90123456789", curso: "Eletrotécnica" },
  ];

  usuariosPadrao.forEach((dados, index) => {
    if (usuarioExiste(dados.usuario)) return;

    const usuario = criarUsuarioPadrao(dados.usuario, dados.senha, dados.curso);
    usuario.xp = Math.floor(Math.random() * 300) + 50;
    usuario.nivel = Math.floor(usuario.xp / 100) + 1;

    salvarUsuario(usuario);
  });

  localStorage.setItem("sistema_inicializado", "true");
};

try {
  inicializarUsuariosPadrão();
} catch (e) {
  console.error("❌ Erro ao inicializar usuarios:", e);
}
