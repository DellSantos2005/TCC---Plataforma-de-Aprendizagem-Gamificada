// ========================================
// SISTEMA DE DADOS - GITHUB PAGES
// utils.js - Base do Sistema
// ========================================

// ========================================
// CONFIGURAÇÃO
// ========================================
const BASE_PATH = '/TCC---Plataforma-de-Aprendizagem-Gamificada';
const getPath = (path) => `${BASE_PATH}${path}`;

// ========================================
// ESTRUTURA PADRÃO DE USUÁRIO
// ========================================

const criarUsuarioPadrao = (usuario, senha, curso) => {
  // Desafios temáticos por curso
  const desafiosTematicos = curso === "Informática" ? {
    "semana-codigo-limpo": false,
    "seguranca-digital": false
  } : {
    "seguranca-eletricidade": false,
    "eficiencia-energetica": false,
    "instalacoes-residenciais": false,
    "automacao-industrial": false
  };

  return {
    // Dados pessoais
    usuario: usuario,
    senha: senha,
    curso: curso,
    campus: "Camaçari",
    primeiroLogin: new Date().toLocaleDateString('pt-BR'),
    
    // Sistema de XP e Nível
    xp: 0,
    nivel: 1,
    
    // Estatísticas
    estatisticas: {
      diasSeguidos: 1,
      ultimoLogin: new Date().toDateString(),
      totalJogos: 0,
      totalAcertos: 0,
      totalErros: 0
    },
    
    // Sistema de Progresso
    progresso: {
      "1ano": {
        liberado: true,
        disciplinas: curso === "Informática" ? {
          "informatica-basica": {
            liberado: true,
            concluido: false,
            assuntos: {
              "IntroducaoComputador": { concluido: false, xp: 0 },
              "sistemas-operacionais": { concluido: false, xp: 0 },
              "pacote-office": { concluido: false, xp: 0 },
              "internet-seguranca": { concluido: false, xp: 0 }
            }
          },
          "LogicaProgramacao": {
            liberado: false,
            concluido: false,
            assuntos: {
              "VariaveisTiposDados": { concluido: false, xp: 0 },
              "estruturas-condicionais": { concluido: false, xp: 0 },
              "lacos-repeticao": { concluido: false, xp: 0 },
              "funcoes": { concluido: false, xp: 0 }
            }
          }
        } : {
          "desenho-tecnico": {
            liberado: true,
            concluido: false,
            assuntos: {
              "Normas-Convencoes": { concluido: false, xp: 0 },
              "simbologia-eletrica": { concluido: false, xp: 0 },
              "plantas-diagramas": { concluido: false, xp: 0 },
              "projeto-instalacao": { concluido: false, xp: 0 }
            }
          },
          "fundamentos-eletricidade": {
            liberado: false,
            concluido: false,
            assuntos: {
              "Carga-Corrente": { concluido: false, xp: 0 },
              "tensao-potencial": { concluido: false, xp: 0 },
              "resistencia-ohm": { concluido: false, xp: 0 },
              "circuitos-basicos": { concluido: false, xp: 0 }
            }
          }
        }
      },
      "2ano": {
        liberado: false,
        disciplinas: curso === "Informática" ? {
          "banco-de-dados-1": {
            liberado: true,
            concluido: false,
            assuntos: {
              "conceitos-banco-dados": { concluido: false, xp: 0 },
              "modelo-relacional": { concluido: false, xp: 0 },
              "linguagem-sql": { concluido: false, xp: 0 },
              "normalizacao": { concluido: false, xp: 0 }
            }
          },
          "linguagem-programacao-1": {
            liberado: false,
            concluido: false,
            assuntos: {
              "sintaxe-variaveis": { concluido: false, xp: 0 },
              "decisao": { concluido: false, xp: 0 },
              "repeticao": { concluido: false, xp: 0 },
              "vetores-matrizes": { concluido: false, xp: 0 }
            }
          }
        } : {
          "instalacoes-eletricas-1": {
            liberado: true,
            concluido: false,
            assuntos: {
              "circuitos-iluminacao": { concluido: false, xp: 0 },
              "Tomadas-Disjuntores": { concluido: false, xp: 0 },
              "Calculo-Carga": { concluido: false, xp: 0 },
              "Dimensionamento-Cabos": { concluido: false, xp: 0 }
            }
          },
          "maquinas-eletricas": {
            liberado: false,
            concluido: false,
            assuntos: {
              "motores-eletricos": { concluido: false, xp: 0 },
              "Transformadores": { concluido: false, xp: 0 },
              "Equipamentos-Protecao": { concluido: false, xp: 0 },
              "instalacoes-industriais": { concluido: false, xp: 0 }
            }
          }
        }
      }
    },
    
    // Sistema de Desafios
    desafios: {
      diario: {
        ultimaData: null,
        concluido: false
      },
      tematicos: desafiosTematicos,
      competitivo: {
        vitorias: 0,
        derrotas: 0
      }
    },
    
    // Avatar (será configurado depois)
    avatar: null
  };
};

// ========================================
// LOCALSTORAGE - USUÁRIOS
// ========================================

const salvarUsuario = (dadosUsuario) => {
  try {
    localStorage.setItem(`usuario_${dadosUsuario.usuario}`, JSON.stringify(dadosUsuario));
    return true;
  } catch (e) {
    console.error("❌ Erro ao salvar:", e);
    return false;
  }
};

const buscarUsuario = (usuario) => {
  try {
    const dados = localStorage.getItem(`usuario_${usuario}`);
    return dados ? JSON.parse(dados) : null;
  } catch (e) {
    console.error("❌ Erro ao buscar:", e);
    return null;
  }
};

const usuarioExiste = (usuario) => {
  return localStorage.getItem(`usuario_${usuario}`) !== null;
};

// ========================================
// LOCALSTORAGE - SESSÃO
// ========================================

const salvarSessao = (usuario) => {
  localStorage.setItem('sessao_ativa', usuario);
};

const obterSessao = () => {
  return localStorage.getItem('sessao_ativa');
};

const limparSessao = () => {
  localStorage.removeItem('sessao_ativa');
};

const obterUsuarioLogado = () => {
  const usuario = obterSessao();
  return usuario ? buscarUsuario(usuario) : null;
};

const atualizarUsuarioLogado = (novosDados) => {
  const usuario = obterSessao();
  if (usuario) {
    return salvarUsuario(novosDados);
  }
  return false;
};

// ========================================
// SISTEMA DE XP E NÍVEIS
// ========================================

const calcularNivel = (xpTotal) => {
  return Math.floor(xpTotal / 100) + 1;
};

const xpParaProximoNivel = (nivelAtual) => {
  return nivelAtual * 100;
};

const adicionarXP = (quantidade) => {
  const usuario = obterUsuarioLogado();
  if (!usuario) {
    console.error('❌ Usuário não encontrado');
    return false;
  }
  
  console.log('💰 +' + quantidade + ' XP');
  
  const nivelAntes = usuario.nivel;
  usuario.xp += quantidade;
  usuario.nivel = calcularNivel(usuario.xp);
  
  if (usuario.nivel > nivelAntes) {
    console.log(`🎉 LEVEL UP! ${nivelAntes} → ${usuario.nivel}`);
  }
  
  return atualizarUsuarioLogado(usuario);
};

// ========================================
// SISTEMA DE DIAS SEGUIDOS
// ========================================

const atualizarDiasSeguidos = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return false;
  
  const hoje = new Date().toDateString();
  const ultimoLogin = usuario.estatisticas.ultimoLogin;
  
  if (ultimoLogin !== hoje) {
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);
    
    if (ultimoLogin === ontem.toDateString()) {
      usuario.estatisticas.diasSeguidos++;
    } else {
      usuario.estatisticas.diasSeguidos = 1;
    }
    
    usuario.estatisticas.ultimoLogin = hoje;
    return atualizarUsuarioLogado(usuario);
  }
  
  return false;
};

// ========================================
// RANKING
// ========================================

const obterUsuariosPorCurso = (curso) => {
  const usuarios = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave.startsWith('usuario_')) {
      const usuario = JSON.parse(localStorage.getItem(chave));
      if (usuario.curso === curso) {
        usuarios.push(usuario);
      }
    }
  }
  
  return usuarios.sort((a, b) => b.xp - a.xp);
};

const obterTodosUsuarios = () => {
  const usuarios = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave.startsWith('usuario_')) {
      const usuario = JSON.parse(localStorage.getItem(chave));
      usuarios.push(usuario);
    }
  }
  
  return usuarios.sort((a, b) => b.xp - a.xp);
};

// ========================================
// AUTENTICAÇÃO E NAVEGAÇÃO
// ========================================

const verificarAutenticacao = () => {
  const sessao = obterSessao();
  if (!sessao) {
    window.location.href = getPath('/pages/Login/index.html');
    return false;
  }
  return true;
};

const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ========================================
// INICIALIZAÇÃO DO SISTEMA
// ========================================

const inicializarSistema = () => {
  if (localStorage.getItem('sistema_inicializado')) {
    console.log('✅ Sistema já inicializado');
    return;
  }
  
  console.log('🔄 Inicializando sistema...');
  
  const usuariosPadrao = [
    // Professores/Banca
    { usuario: "prof.avaliador", senha: "IFBA.99999999999", curso: "Informática" },
    { usuario: "banca.um", senha: "IFBA.11111111111", curso: "Informática" },
    { usuario: "banca.dois", senha: "IFBA.22222222222", curso: "Eletrotécnica" },
    
    // Alunos TI
    { usuario: "joao.silva", senha: "IFBA.12345678901", curso: "Informática" },
    { usuario: "maria.santos", senha: "IFBA.23456789012", curso: "Informática" },
    { usuario: "pedro.oliveira", senha: "IFBA.34567890123", curso: "Informática" },
    { usuario: "ana.costa", senha: "IFBA.45678901234", curso: "Informática" },
    { usuario: "lucas.almeida", senha: "IFBA.56789012345", curso: "Informática" },
    
    // Alunos Eletro
    { usuario: "rafael.martins", senha: "IFBA.90123456789", curso: "Eletrotécnica" },
    { usuario: "camila.rocha", senha: "IFBA.01234567890", curso: "Eletrotécnica" },
    { usuario: "diego.pereira", senha: "IFBA.11122233344", curso: "Eletrotécnica" },
    { usuario: "fernanda.dias", senha: "IFBA.22233344455", curso: "Eletrotécnica" },
  ];
  
  let cadastrados = 0;
  
  usuariosPadrao.forEach((dados) => {
    if (!usuarioExiste(dados.usuario)) {
      const usuario = criarUsuarioPadrao(dados.usuario, dados.senha, dados.curso);
      // XP aleatório para popular ranking
      usuario.xp = Math.floor(Math.random() * 300) + 50;
      usuario.nivel = calcularNivel(usuario.xp);
      
      if (salvarUsuario(usuario)) {
        cadastrados++;
      }
    }
  });
  
  localStorage.setItem('sistema_inicializado', 'true');
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Sistema inicializado! ${cadastrados} usuários cadastrados.`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📧 CREDENCIAIS PARA AVALIAÇÃO:');
  console.log('   👨‍🏫 Professor: prof.avaliador / IFBA.99999999999');
  console.log('   👨‍🎓 Banca 1: banca.um / IFBA.11111111111');
  console.log('   👩‍🎓 Banca 2: banca.dois / IFBA.22222222222');
  console.log('   🧑‍💻 Aluno TI: joao.silva / IFBA.12345678901');
  console.log('   ⚡ Aluno Eletro: rafael.martins / IFBA.90123456789');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
};

// Executar inicialização
try {
  inicializarSistema();
} catch (erro) {
  console.error('❌ Erro ao inicializar:', erro);
}

console.log('✅ utils.js carregado');
