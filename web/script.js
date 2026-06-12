const API = "http://localhost:3000";
const modal = document.getElementById("modal");

function abrirModal() {
    if (modal) {
        modal.style.display = "block";
    }
}

function fecharModal() {
    if (modal) {
        modal.style.display = "none";
    }
}

window.addEventListener("click", function (event) {
    if (event.target === modal) {
        fecharModal();
    }
});

const formQuarto = document.getElementById("formQuarto");

if (formQuarto) {
    formQuarto.addEventListener("submit", function (event) {
        event.preventDefault();

        const quarto = {
            numero: document.getElementById("numero").value,
            tipo: document.getElementById("tipo").value
        };

        fetch(`${API}/quartos/cadastrar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quarto)
        })
        .then(resposta => resposta.json())
        .then(() => {
            alert("Quarto cadastrado com sucesso!");
            formQuarto.reset();
        })
        .catch(erro => {
            console.error(erro);
            alert("Erro ao cadastrar quarto.");
        });
    });
}


const formReserva = document.getElementById("formReserva");

if (formReserva) {
    formReserva.addEventListener("submit", function (event) {
        event.preventDefault();

        const reserva = {
            hospede: document.getElementById("hospede").value,
            data_entrada: document.getElementById("entrada").value,
            data_saida: document.getElementById("saida").value,
            quarto_id: Number(document.getElementById("quarto_id").value)
        };

        fetch(`${API}/reservas/cadastrar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reserva)
        })
        .then(resposta => resposta.json())
        .then(() => {
            alert("Reserva cadastrada com sucesso!");
            formReserva.reset();
        })
        .catch(erro => {
            console.error(erro);
            alert("Erro ao cadastrar reserva.");
        });
    });
}


function carregarQuartos() {
    fetch(`${API}/quartos/listar`)
        .then(resposta => resposta.json())
        .then(quartos => {
            atualizarTabelaQuartos(quartos);
        })
        .catch(erro => {
            console.error("Erro ao carregar quartos:", erro);
        });
}


function carregarReservas() {
    fetch(`${API}/reservas/listar`)
        .then(resposta => resposta.json())
        .then(reservas => {
            atualizarTabelaReservas(reservas);
        })
        .catch(erro => {
            console.error("Erro ao carregar reservas:", erro);
        });
}


function atualizarTabelaQuartos(quartos) {
    const tabela = document.getElementById("lista-quartos");
    const mensagem = document.getElementById("sem-quartos");

    if (!tabela) return;

    tabela.innerHTML = "";

    if (quartos.length > 0) {
        if (mensagem) {
            mensagem.style.display = "none";
        }

        quartos.forEach(function (quarto) {
            tabela.innerHTML += `
                <tr>
                    <td>${quarto.numero}</td>
                    <td>${quarto.tipo}</td>
                    <td>
                        <button class="btn-azul">
                            <i class="fa-solid fa-eye"></i>
                            Ver Reservas
                        </button>

                        <button class="btn-vermelho" onclick="excluirQuarto(${quarto.id})">
                            <i class="fa-solid fa-trash"></i>
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });

    } else {
        if (mensagem) {
            mensagem.style.display = "block";
        }
    }
}

function atualizarTabelaReservas(reservas) {
    const tabela = document.getElementById("lista-reservas");
    const mensagem = document.getElementById("sem-reservas");

    if (!tabela) return;

    tabela.innerHTML = "";

    if (reservas.length > 0) {
        if (mensagem) {
            mensagem.style.display = "none";
        }

        reservas.forEach(function (reserva) {
            tabela.innerHTML += `
                <tr>
                    <td>${reserva.id}</td>
                    <td>${reserva.hospede}</td>
                    <td>${reserva.data_entrada}</td>
                    <td>${reserva.data_saida}</td>
                    <td>
                        <button class="btn-vermelho" onclick="excluirReserva(${reserva.id})">
                            <i class="fa-solid fa-trash"></i>
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });

    } else {
        if (mensagem) {
            mensagem.style.display = "block";
        }
    }
}

function excluirQuarto(id) {
    const confirmar = confirm("Deseja realmente excluir este quarto?");

    if (!confirmar) return;

    fetch(`${API}/quartos/excluir/${id}`, {
        method: "DELETE"
    })
    .then(resposta => resposta.json())
    .then(() => {
        alert("Quarto excluído com sucesso!");
        carregarQuartos();
    })
    .catch(erro => {
        console.error(erro);
        alert("Erro ao excluir quarto.");
    });
}

function excluirReserva(id) {
    const confirmar = confirm("Deseja realmente excluir esta reserva?");

    if (!confirmar) return;

    fetch(`${API}/reservas/excluir/${id}`, {
        method: "DELETE"
    })
    .then(resposta => resposta.json())
    .then(() => {
        alert("Reserva excluída com sucesso!");
        carregarReservas();
    })
    .catch(erro => {
        console.error(erro);
        alert("Erro ao excluir reserva.");
    });
}

carregarQuartos();
carregarReservas();