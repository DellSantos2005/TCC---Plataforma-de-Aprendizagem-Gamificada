const DB_KEY = "plataforma_db";
const LOGADO_KEY = "usuario_logado";

/* ---------- Inicialização ---------- */

function iniciarDB() {
  if (!localStorage.getItem(DB_KEY)) {
    const dbInicial = {
      usuarios: [
        {
          id: 1,
          nome: "Eliedson Silva",
          nickname: "eli.tech",
          senha: "123456",
          curso: "TI",

          xp: 0,
          nivel: 1,
          diasSeguidos: 1,

          primeiroLogin: new Date().toISOString().split("T")[0],
          ultimoLogin: new Date().toISOString().split("T")[0],

          progresso: {},
          desafios: {
            diario: null,
            tematico: [],
            seguranca: []
          }
        }
      ]
    };

    localStorage.setItem(DB_KEY, JSON.stringify(dbInicial));
  }
}

iniciarDB();

/* ---------- Utilidades ---------- */

function getDB() {
  return JSON.parse(localStorage.getItem(DB_KEY));
}

function salvarDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

/* ---------- Usuários ---------- */

function buscarUsuarioPorNickname(nickname) {
  const db = getDB();
  return db.usuarios.find(u => u.nickname === nickname);
}

function loginUsuario(nickname, senha) {
  const usuario = buscarUsuarioPorNickname(nickname);
  if (!usuario) return null;
  if (usuario.senha !== senha) return null;

  localStorage.setItem(LOGADO_KEY, usuario.id);
  atualizarStreak(usuario.id);
  return usuario;
}

function getUsuarioLogado() {
  const id = localStorage.getItem(LOGADO_KEY);
  if (!id) return null;

  const db = getDB();
  return db.usuarios.find(u => u.id == id);
}

function logoutUsuario() {
  localStorage.removeItem(LOGADO_KEY);
}

/* ---------- XP e Nível ---------- */

function adicionarXP(quantidade) {
  const db = getDB();
  const usuario = getUsuarioLogado();
  if (!usuario) return;

  usuario.xp += quantidade;
  usuario.nivel = Math.floor(usuario.xp / 100) + 1;

  salvarDB(db);
}

/* ---------- Progresso ---------- */

function concluirAssunto(assuntoId) {
  const db = getDB();
  const usuario = getUsuarioLogado();
  if (!usuario) return;

  usuario.progresso[assuntoId] = true;
  salvarDB(db);
}

/* ---------- Streak ---------- */

function atualizarStreak(idUsuario) {
  const db = getDB();
  const usuario = db.usuarios.find(u => u.id === idUsuario);
  if (!usuario) return;

  const hoje = new Date().toISOString().split("T")[0];
  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);

  if (usuario.ultimoLogin === ontem.toISOString().split("T")[0]) {
    usuario.diasSeguidos++;
  } else if (usuario.ultimoLogin !== hoje) {
    usuario.diasSeguidos = 1;
  }

  usuario.ultimoLogin = hoje;
  salvarDB(db);
}

/* ---------- Desafios ---------- */

function desafioDiarioConcluido() {
  const usuario = getUsuarioLogado();
  if (!usuario) return false;

  const hoje = new Date().toISOString().split("T")[0];
  return usuario.desafios.diario === hoje;
}

function concluirDesafioDiario(xp = 50) {
  const db = getDB();
  const usuario = getUsuarioLogado();
  if (!usuario) return;

  const hoje = new Date().toISOString().split("T")[0];
  usuario.desafios.diario = hoje;
  adicionarXP(xp);
  salvarDB(db);
}

function concluirDesafioTematico(evento, xp = 100) {
  const db = getDB();
  const usuario = getUsuarioLogado();
  if (!usuario) return;

  if (!usuario.desafios.tematico.includes(evento)) {
    usuario.desafios.tematico.push(evento);
    adicionarXP(xp);
  }

  salvarDB(db);
}

/* ---------- Ranking ---------- */

function gerarRanking(tipo = "campus") {
  const db = getDB();
  let usuarios = [...db.usuarios];

  if (tipo === "curso") {
    const usuario = getUsuarioLogado();
    if (!usuario) return [];
    usuarios = usuarios.filter(u => u.curso === usuario.curso);
  }

  return usuarios
    .sort((a, b) => b.xp - a.xp)
    .map((u, i) => ({
      posicao: i + 1,
      nome: u.nome,
      curso: u.curso,
      xp: u.xp
    }));
}
