// ========================================
// SISTEMA DE AUTENTICAÇÃO
// auth.js - VERSÃO SEM CADASTRO PÚBLICO
// ========================================

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
// SISTEMA DE LOGIN (SEM OPÇÃO DE CADASTRO)
// ========================================

const realizarLogin = (usuario, senha) => {
  console.log('🔍 Iniciando processo de login...');
  console.log('👤 Usuário:', usuario);
  
  // Validar formato
  if (!validarUsuario(usuario)) {
    console.log('❌ Formato de usuário inválido');
    return {
      sucesso: false,
      mensagem: "Formato de usuário inválido! Use: nome.sobrenome"
    };
  }
  
  if (!validarSenha(senha)) {
    console.log('❌ Formato de senha inválido');
    return {
      sucesso: false,
      mensagem: "Formato de senha inválido! Use: IFBA.XXXXXXXXXXX (11 dígitos)"
    };
  }
  
  console.log('✅ Formato válido, buscando usuário...');
  
  // Verificar se usuário existe
  const dadosUsuario = buscarUsuario(usuario);
  
  if (!dadosUsuario) {
    console.log('❌ Usuário não encontrado no sistema');
    return {
      sucesso: false,
      mensagem: "Usuário não encontrado! Entre em contato com o administrador do sistema."
    };
  }
  
  console.log('✅ Usuário encontrado!');
  
  // Verificar senha
  if (dadosUsuario.senha !== senha) {
    console.log('❌ Senha incorreta');
    return {
      sucesso: false,
      mensagem: "Senha incorreta!"
    };
  }
  
  console.log('✅ Senha correta!');
  console.log('💾 Salvando sessão...');
  
  // Login bem-sucedido
  salvarSessao(usuario);
  atualizarDiasSeguidos();
  
  console.log('✅ Login realizado com sucesso!');
  
  return {
    sucesso: true,
    mensagem: "Login realizado com sucesso!",
    usuario: dadosUsuario
  };
};

// ========================================
// CADASTRO ADMINISTRATIVO (APENAS NO CÓDIGO)
// ========================================

// Função para administradores cadastrarem usuários diretamente no código
const cadastrarUsuarioAdmin = (usuario, senha, curso) => {
  // Validar formato
  if (!validarUsuario(usuario)) {
    console.error("❌ Formato de usuário inválido! Use: nome.sobrenome");
    return false;
  }
  
  if (!validarSenha(senha)) {
    console.error("❌ Formato de senha inválido! Use: IFBA.XXXXXXXXXXX (11 dígitos)");
    return false;
  }
  
  // Verificar se usuário já existe
  if (usuarioExiste(usuario)) {
    console.warn("⚠️ Usuário já existe:", usuario);
    return false;
  }
  
  // Criar novo usuário
  const novoUsuario = criarUsuarioPadrao(usuario, senha, curso);
  
  if (salvarUsuario(novoUsuario)) {
    console.log("✅ Usuário cadastrado com sucesso:", usuario);
    return true;
  } else {
    console.error("❌ Erro ao cadastrar usuário");
    return false;
  }
};

// ========================================
// SISTEMA DE LOGOUT
// ========================================

const realizarLogout = () => {
  limparSessao();
  window.location.href = '../Login/index.html';
};

// ========================================
// INICIALIZAÇÃO DA PÁGINA DE LOGIN
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.pathname;
  
  // Só executar na página de login
  if (url.includes('index.html') || url.includes('Login')) {
    // Verificar se já está logado
    const sessao = obterSessao();
    if (sessao) {
      // Já está logado, redirecionar
      window.location.href = '../Principal/Home.html';
      return;
    }
    
    // Configurar formulário de login
    const formLogin = document.getElementById('login-form');
    
    if (formLogin) {
      formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const usuarioInput = document.getElementById('usuario');
        const senhaInput = document.getElementById('senha');
        
        if (!usuarioInput || !senhaInput) {
          alert('Erro: Campos de login não encontrados!');
          return;
        }
        
        const usuario = usuarioInput.value.trim();
        const senha = senhaInput.value.trim();
        
        if (!usuario || !senha) {
          alert('Por favor, preencha todos os campos!');
          return;
        }
        
        console.log('🔐 Tentando login:', usuario);
        
        const resultado = realizarLogin(usuario, senha);
        
        if (resultado.sucesso) {
          console.log('✅ Login bem-sucedido!');
          alert(resultado.mensagem);
          window.location.href = '../Principal/Home.html';
        } else {
          console.log('❌ Falha no login:', resultado.mensagem);
          alert(resultado.mensagem);
        }
      });
      
      console.log('📝 Formulário de login configurado');
    } else {
      console.warn('⚠️ Formulário de login não encontrado na página');
    }
  }
});

// ========================================
// CADASTRAR USUÁRIOS DA TURMA (EXECUTE UMA VEZ)
// ========================================

// Esta função deve ser executada UMA VEZ para cadastrar todos os alunos da turma
// Depois de executar, você pode comentar a chamada da função

const cadastrarAlunosTurma = () => {
  // ========================================
  // INSTRUÇÕES PARA O ADMINISTRADOR:
  // ========================================
  // 1. Edite a lista abaixo com os dados reais dos alunos
  // 2. Abra o navegador (F12) → Console
  // 3. Digite: cadastrarAlunosTurma()
  // 4. Pressione Enter
  // 5. Após cadastrar todos, comente esta função
  
  const alunos = [
    // EXEMPLO - Informática
    { usuario: "joao.silva", senha: "IFBA.12345678901", curso: "Informática" },
    { usuario: "maria.santos", senha: "IFBA.12345678902", curso: "Informática" },
    { usuario: "pedro.oliveira", senha: "IFBA.12345678903", curso: "Informática" },
    
    // EXEMPLO - Eletrotécnica
    { usuario: "ana.costa", senha: "IFBA.12345678904", curso: "Eletrotécnica" },
    { usuario: "lucas.almeida", senha: "IFBA.12345678905", curso: "Eletrotécnica" },
    
    // ========================================
    // ADICIONE MAIS ALUNOS AQUI:
    // ========================================
    // { usuario: "nome.sobrenome", senha: "IFBA.XXXXXXXXXXX", curso: "Informática ou Eletrotécnica" },
  ];
  
  console.log("🔄 Iniciando cadastro de alunos...");
  
  let cadastrados = 0;
  let jaExistentes = 0;
  let erros = 0;
  
  alunos.forEach(aluno => {
    const sucesso = cadastrarUsuarioAdmin(aluno.usuario, aluno.senha, aluno.curso);
    
    if (sucesso) {
      cadastrados++;
    } else if (usuarioExiste(aluno.usuario)) {
      jaExistentes++;
    } else {
      erros++;
    }
  });
  
  console.log("\n📊 RESUMO DO CADASTRO:");
  console.log(`✅ Cadastrados: ${cadastrados}`);
  console.log(`⚠️ Já existentes: ${jaExistentes}`);
  console.log(`❌ Erros: ${erros}`);
  console.log(`📝 Total processados: ${alunos.length}`);
  
  if (cadastrados > 0) {
    console.log("\n✅ Cadastro concluído! Os alunos já podem fazer login.");
  }
};

// ========================================
// CADASTRAR UM ÚNICO ALUNO (FUNÇÃO AUXILIAR)
// ========================================

const cadastrarAluno = (usuario, senha, curso) => {
  console.log(`\n🔄 Cadastrando aluno: ${usuario}`);
  const sucesso = cadastrarUsuarioAdmin(usuario, senha, curso);
  
  if (sucesso) {
    console.log(`✅ Aluno ${usuario} cadastrado com sucesso!`);
    console.log(`📧 Dados de acesso:`);
    console.log(`   Usuário: ${usuario}`);
    console.log(`   Senha: ${senha}`);
    console.log(`   Curso: ${curso}`);
  }
  
  return sucesso;
};

// ========================================
// LISTAR TODOS OS USUÁRIOS CADASTRADOS
// ========================================

const listarUsuariosCadastrados = () => {
  console.log("\n👥 USUÁRIOS CADASTRADOS:\n");
  
  let contador = 0;
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
      contador++;
    }
  }
  
  // Ordenar por nome
  usuarios.sort((a, b) => a.usuario.localeCompare(b.usuario));
  
  // Exibir em tabela
  console.table(usuarios);
  
  console.log(`\n📊 Total: ${contador} usuário(s) cadastrado(s)`);
  
  return usuarios;
};

// ========================================
// REMOVER UM USUÁRIO (CUIDADO!)
// ========================================

const removerUsuario = (usuario) => {
  if (confirm(`⚠️ TEM CERTEZA que deseja remover o usuário "${usuario}"?\n\nEsta ação NÃO pode ser desfeita!`)) {
    if (usuarioExiste(usuario)) {
      localStorage.removeItem(`usuario_${usuario}`);
      console.log(`✅ Usuário "${usuario}" removido com sucesso!`);
      return true;
    } else {
      console.error(`❌ Usuário "${usuario}" não encontrado!`);
      return false;
    }
  }
  
  console.log("❌ Remoção cancelada.");
  return false;
};

// ========================================
// RESETAR SENHA DE UM ALUNO
// ========================================

const resetarSenhaAluno = (usuario, novaSenha) => {
  if (!usuarioExiste(usuario)) {
    console.error(`❌ Usuário "${usuario}" não encontrado!`);
    return false;
  }
  
  if (!validarSenha(novaSenha)) {
    console.error("❌ Formato de senha inválido! Use: IFBA.XXXXXXXXXXX (11 dígitos)");
    return false;
  }
  
  const dadosUsuario = buscarUsuario(usuario);
  dadosUsuario.senha = novaSenha;
  
  if (salvarUsuario(dadosUsuario)) {
    console.log(`✅ Senha do usuário "${usuario}" resetada com sucesso!`);
    console.log(`📧 Nova senha: ${novaSenha}`);
    return true;
  } else {
    console.error("❌ Erro ao resetar senha");
    return false;
  }
};

// ========================================
// EXPORTAR LISTA DE ALUNOS PARA PLANILHA
// ========================================

const exportarListaAlunos = () => {
  const usuarios = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave.startsWith('usuario_')) {
      const usuario = JSON.parse(localStorage.getItem(chave));
      usuarios.push({
        Usuario: usuario.usuario,
        Curso: usuario.curso,
        'Primeiro Login': usuario.primeiroLogin,
        'XP Total': usuario.xp,
        Nivel: usuario.nivel,
        'Dias Seguidos': usuario.estatisticas.diasSeguidos
      });
    }
  }
  
  // Converter para CSV
  const headers = Object.keys(usuarios[0]).join(',');
  const linhas = usuarios.map(u => Object.values(u).join(',')).join('\n');
  const csv = headers + '\n' + linhas;
  
  // Download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `alunos_cadastrados_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  
  console.log("✅ Lista de alunos exportada com sucesso!");
};

// ========================================
// EXPOR FUNÇÕES ADMINISTRATIVAS NO CONSOLE
// ========================================

// Estas funções ficam disponíveis no console do navegador (F12)
window.adminCadastrarTurma = cadastrarAlunosTurma;
window.adminCadastrarAluno = cadastrarAluno;
window.adminListarAlunos = listarUsuariosCadastrados;
window.adminRemoverAluno = removerUsuario;
window.adminResetarSenha = resetarSenhaAluno;
window.adminExportarLista = exportarListaAlunos;