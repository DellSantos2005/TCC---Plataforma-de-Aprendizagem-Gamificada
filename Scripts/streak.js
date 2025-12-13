
function atualizarStreak() {
    const hoje = new Date().toDateString();
    const ultimoAcesso = localStorage.getItem("ultimoAcesso") || "";
    let streakAtual = parseInt(localStorage.getItem("streakDias")) || 0;

    // Se o último acesso foi ontem, continua a sequência
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);

    if (ultimoAcesso === ontem.toDateString()) {
        streakAtual += 1;
    }
    // Se acessou hoje novamente, não faz nada
    else if (ultimoAcesso === hoje) {
        return;
    }
    // Se passou mais de um dia, zera o streak
    else {
        streakAtual = 1;
    }

    localStorage.setItem("ultimoAcesso", hoje);
    localStorage.setItem("streakDias", streakAtual);
}

function obterStreakAtual() {
    return parseInt(localStorage.getItem("streakDias")) || 0;
}