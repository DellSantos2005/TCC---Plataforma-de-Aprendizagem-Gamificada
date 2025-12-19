
// CRIA / RECUPERA USUÁRIO


if (!localStorage.getItem("usuario")) {
    const hoje = new Date().toISOString().split("T")[0];

    const usuario = {
        id: 1, // 🔥 ESSENCIAL PARA PROGRESSO E AUTH
        nome: "Eliedson Silva",
        nickname: "eli.tech",
        curso: "TI", // ou "Eletro"
        primeiroLogin: hoje,
        ultimoLogin: hoje,
        diasSeguidos: 1,
        xp: 0
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
} else {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const hoje = new Date().toISOString().split("T")[0];

    // Garante que usuários antigos também tenham ID
    if (!usuario.id) {
        usuario.id = 1;
    }

    if (usuario.ultimoLogin !== hoje) {
        const dataUltimo = new Date(usuario.ultimoLogin);
        const dataHoje = new Date(hoje);
        const diffDias = (dataHoje - dataUltimo) / (1000 * 60 * 60 * 24);

        usuario.ultimoLogin = hoje;

        if (diffDias === 1) {
            usuario.diasSeguidos += 1;
        } else {
            usuario.diasSeguidos = 1;
        }

        localStorage.setItem("usuario", JSON.stringify(usuario));
    }
}

// ===============================
// ATUALIZA INTERFACE (SE EXISTIR)
// ===============================

const usuario = JSON.parse(localStorage.getItem("usuario"));

if (document.getElementById("nome-usuario"))
    document.getElementById("nome-usuario").textContent = usuario.nome;

if (document.getElementById("nickname-usuario"))
    document.getElementById("nickname-usuario").textContent = usuario.nickname;

if (document.getElementById("primeiro-login"))
    document.getElementById("primeiro-login").textContent =
        "Primeiro Login: " + usuario.primeiroLogin;

if (document.getElementById("xp-total"))
    document.getElementById("xp-total").textContent =
        "XP: " + usuario.xp;

if (document.getElementById("dias-seguidos"))
    document.getElementById("dias-seguidos").textContent =
        usuario.diasSeguidos;tem("usuario"));
document.getElementById("nome-usuario").textContent = usuario.nome;
document.getElementById("nickname-usuario").textContent = usuario.nickname;
document.getElementById("primeiro-login").textContent = "Primeiro Login: " + usuario.primeiroLogin;
document.getElementById("xp-total").textContent = "XP: " + usuario.xp;

document.getElementById("dias-seguidos").textContent = "Dias Seguidos: " + usuario.diasSeguidos;
