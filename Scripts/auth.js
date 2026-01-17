// ========================================
// SISTEMA DE AUTENTICAÇÃO - GITHUB PAGES
// auth.js - TCC Plataforma de Aprendizagem Gamificada
// ========================================

// ========================================
// CONFIGURAÇÃO DO GITHUB PAGES
// ========================================
const BASE_PATH = '/TCC---Plataforma-de-Aprendizagem-Gamificada';

// Função helper para caminhos
const getPath = (path) => `${BASE_PATH}${path}`;

console.log('🌐 Rodando no GitHub Pages');
console.log('📁 Base Path:', BASE_PATH);

// ========================================
// VALIDAÇÕES
// ========================================

const validarUsuario = (usuario) => {
  // Formato: nome.sobrenome (letras minúsculas e ponto)
  const regex = /^[a-z]+\.[a-z]+$/;
  return regex.test(usuario);
};

const validarSenha = (senha) => {
  // Formato: IFBA.XXXXXXXXXXX (11 dígitos após o ponto)
  const regex = /^IFBA\.\d{11}$/;
  return regex.test(senha);
};

// ========================================
// SISTEMA DE LOGIN
// ========================================

const realizarLogin = (usuario, senha) => {
  console.log('🔍 Iniciando login...');
  console.log('👤 Usuário:', usuario);
  
  // Validar formato
  if (!validarUsuario(usuario)) {
    return {
      sucesso: false,
      mensagem: "❌ Formato de usuário inválido!\n\nUse: nome.sobrenome\nExemplo: joao.silva"
    };
  }
  
  if (!validarSenha(senha)) {
    return {
      sucesso: false,
      mensagem: "❌ Formato de senha inválido!\n\nUse: IFBA.XXXXXXXXXXX\nOnde X são 11 dígitos\nExemplo: IFBA.12345678901"
    };
  }
  
  // Buscar usuário
  const dadosUsuario = buscarUsuario(usuario);
  
  if (!dadosUsuario) {
    return {
      sucesso: false,
      mensagem: "❌ Usuário não encontrado!\n\n⚠️ Se você é um aluno novo, entre em contato com a coordenação.\n\n📧 Para professores da banca:\nUsuário: prof.avaliador\nSenha: IFBA.99999999999"
    };
  }
  
  // Verificar senha
  if (dadosUsuario.senha !== senha) {
    return {
      sucesso: false,
      mensagem: "❌ Senha incorreta!"
    };
  }
  
  // Login bem-sucedido
  salvarSessao(usuario);
  atualizarDiasSeguidos();
  
  console.log('✅ Login realizado!');
  
  return {
    sucesso: true,
    mensagem: `✅ Bem-vindo(a), ${formatarNome(usuario)}!`,
    usuario: dadosUsuario
  };
};

// ========================================
// FORMATAÇÃO DE NOME
// ========================================

const formatarNome = (usuario) => {
  return usuario
    .split('.')
    .map(parte => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(' ');
};

// ========================================
// CADASTRO ADMINISTRATIVO
// ========================================

const cadastrarUsuarioAdmin = (usuario, senha, curso) => {
  if (!validarUsuario(usuario)) {
    console.error("❌ Formato de usuário inválido!");
    return false;
  }
  
  if (!validarSenha(senha)) {
    console.error("❌ Formato de senha inválido!");
    return false;
  }
  
  if (usuarioExiste(usuario)) {
    console.warn("⚠️ Usuário já existe:", usuario);
    return false;
  }
  
  const novoUsuario = criarUsuarioPadrao(usuario, senha, curso);
  
  if (salvarUsuario(novoUsuario)) {
    console.log("✅ Usuário cadastrado:", usuario);
    return true;
  }
  
  return false;
};

// ========================================
// SISTEMA DE LOGOUT
// ========================================

const realizarLogout = () => {
  console.log('👋 Logout...');
  limparSessao();
  window.location.href = getPath('/pages/Login/index.html');
};

// ========================================
// NAVEGAÇÃO
// ========================================

const navegarPara = (caminho) => {
  window.location.href = getPath(caminho);
};

window.navegarPara = navegarPara;

// ========================================
// INICIALIZAÇÃO LOGIN
// ========================================

const inicializarLogin = () => {
  console.log('📝 Inicializando login...');
  
  // Verificar se já está logado
  const sessao = obterSessao();
  if (sessao) {
    console.log('✅ Já logado, redirecionando...');
    navegarPara('/pages/Principal/Home.html');
    return;
  }
  
  // Configurar formulário
  const formLogin = document.getElementById('login-form');
  if (!formLogin) return;
  
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const usuarioInput = document.getElementById('usuario');
    const senhaInput = document.getElementById('senha');
    
    if (!usuarioInput || !senhaInput) {
      alert('❌ Erro nos campos!');
      return;
    }
    
    const usuario = usuarioInput.value.trim().toLowerCase();
    const senha = senhaInput.value.trim();
    
    if (!usuario || !senha) {
      alert('⚠️ Preencha todos os campos!');
      return;
    }
    
    const resultado = realizarLogin(usuario, senha);
    
    if (resultado.sucesso) {
      alert(resultado.mensagem);
      navegarPara('/pages/Principal/Home.html');
    } else {
      alert(resultado.mensagem);
      senhaInput.value = '';
      senhaInput.focus();
    }
  });
  
  // Configurar placeholders
  const usuarioInput = document.getElementById('usuario');
  const senhaInput = document.getElementById('senha');
  
  if (usuarioInput) {
    usuarioInput.setAttribute('autocomplete', 'username');
    usuarioInput.setAttribute('placeholder', 'ex: joao.silva');
  }
  
  if (senhaInput) {
    senhaInput.setAttribute('autocomplete', 'current-password');
    senhaInput.setAttribute('placeholder', 'IFBA.12345678901');
  }
  
  console.log('✅ Login configurado');
};

// ========================================
// EXECUÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.pathname;
  
  if (url.includes('Login') || url.includes('index.html')) {
    inicializarLogin();
  }
});

// ========================================
// COMANDOS DE CONSOLE
// ========================================

window.cadastrarAluno = (usuario, senha, curso) => {
  const sucesso = cadastrarUsuarioAdmin(usuario, senha, curso);
  if (sucesso) {
    console.log(`✅ ${usuario} cadastrado!`);
    console.log(`Curso: ${curso}`);
  }
  return sucesso;
};

window.listarUsuarios = () => {
  const usuarios = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave.startsWith('usuario_')) {
      const usuario = JSON.parse(localStorage.getItem(chave));
      usuarios.push({
        usuario: usuario.usuario,
        curso: usuario.curso,
        xp: usuario.xp,
        nivel: usuario.nivel
      });
    }
  }
  
  usuarios.sort((a, b) => a.usuario.localeCompare(b.usuario));
  console.table(usuarios);
  console.log(`Total: ${usuarios.length} usuários`);
  
  return usuarios;
};

console.log('✅ auth.js carregado');
