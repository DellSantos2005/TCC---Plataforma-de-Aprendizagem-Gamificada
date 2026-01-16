// Scripts/auth.js

function validarUsuario(usuario) {
  // nome.sobrenome
  return /^[a-z]+\.[a-z]+$/.test(usuario);
}

function validarSenha(senha) {
  // IFBA.XXXXXXXXXXX (11 dígitos)
  return /^IFBA\.\d{11}$/.test(senha);
}

// "banco" simples só pra testar (troque pelo seu buscarUsuario/DB)
function buscarUsuarioFake(usuario) {
  const usuarios = {
    "joao.silva": { usuario: "joao.silva", senha: "IFBA.12345678901", curso: "Informática" },
    "ana.costa": { usuario: "ana.costa", senha: "IFBA.12345678904", curso: "Eletrotécnica" }
  };
  return usuarios[usuario] || null;
}

function salvarSessao(usuarioObj) {
  localStorage.setItem("sessao", JSON.stringify({
    usuario: usuarioObj.usuario,
    curso: usuarioObj.curso,
    loginEm: new Date().toISOString()
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const msg = document.getElementById("msg");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario")?.value.trim();
    const senha = document.getElementById("senha")?.value.trim();

    if (!usuario || !senha) {
      msg.textContent = "Preencha usuário e senha.";
      return;
    }

    if (!validarUsuario(usuario)) {
      msg.textContent = "Usuário inválido. Use: nome.sobrenome (minúsculo).";
      return;
    }

    if (!validarSenha(senha)) {
      msg.textContent = "Senha inválida. Use: IFBA.XXXXXXXXXXX (11 dígitos).";
      return;
    }

    const dadosUsuario = buscarUsuarioFake(usuario);
    if (!dadosUsuario) {
      msg.textContent = "Usuário não encontrado.";
      return;
    }

    if (dadosUsuario.senha !== senha) {
      msg.textContent = "Senha incorreta.";
      return;
    }

    // OK
    salvarSessao(dadosUsuario);

    // Redireciona para Home (ajuste se sua estrutura for diferente)
    window.location.href = "../Principal/Home.html";
  });
});
