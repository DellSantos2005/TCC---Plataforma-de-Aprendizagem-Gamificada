// Verifica se já existe um usuário salvo

if (!localStorage.getItem("usuario")) {
    const hoje = new Date().toISOString().split("T")[0];

    const usuario = {
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
    // Verifica se o login é contínuo (dias seguidos)
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const hoje = new Date().toISOString().split("T")[0];

    if (usuario.ultimoLogin !== hoje) {
        const dataUltimo = new Date(usuario.ultimoLogin);
        const dataHoje = new Date(hoje);
        const diffDias = (dataHoje - dataUltimo) / (1000 * 60 * 60 * 24);

        usuario.ultimoLogin = hoje;

        if (diffDias === 1) {
            usuario.diasSeguidos += 1;
        } else if (diffDias > 1) {
            usuario.diasSeguidos = 1;
        }

        localStorage.setItem("usuario", JSON.stringify(usuario));
    }
}

const usuario = JSON.parse(localStorage.getItem("usuario"));
document.getElementById("nome-usuario").textContent = usuario.nome;
document.getElementById("nickname-usuario").textContent = usuario.nickname;
document.getElementById("primeiro-login").textContent = "Primeiro Login: " + usuario.primeiroLogin;
document.getElementById("xp-total").textContent = "XP: " + usuario.xp;
document.getElementById("dias-seguidos").textContent = "Dias Seguidos: " + usuario.diasSeguidos;