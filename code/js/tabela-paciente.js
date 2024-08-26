document.addEventListener("DOMContentLoaded", (event) => {
    carregarPacientes();
    atualizarTabela(PacienteDAO.obterTodos());

    PacienteDAO.addSalvarListener((paciente) => {
        let linha = document.querySelector("#p" + paciente.id);
        if (linha === null) {
            adicionarPacienteTabela(paciente);
        } else {
            atualizarPacienteTabela(paciente);
        }
    });

    document.querySelector("#tabela-pacientes").addEventListener("dblclick", function(event) {
        let linha = event.target.parentNode;
        linha.classList.add("fade-out");

        window.setTimeout(function() {
            linha.remove();
            PacienteDAO.remover(linha.id.substring(1));
        }, 500);
    });

    document.querySelector("#tabela-pacientes").addEventListener("click", function(event) {
        let linha = event.target.parentNode;
        let pacienteSelecionado = PacienteDAO.obterPorId(linha.id.substring(1));
        console.log(linha.id.substring(1));
        carregarPacienteFormulario(pacienteSelecionado);
    });

    document.querySelector("#filtro-nome").addEventListener("input", function() {
        let filtroPaciente = this.value;
        filtrarTabela("info-nome", function(nomePaciente) {
            return nomePaciente.indexOf(filtroPaciente.toUpperCase()) > -1;
        });
    });
});

function carregarPacientes() {
    document.querySelectorAll("#tabela-pacientes .paciente").forEach((linha) => {
        PacienteDAO.salvar(new Paciente(
            linha.querySelector(".info-nome").textContent,
            linha.querySelector(".info-peso").textContent,
            linha.querySelector(".info-altura").textContent,
            linha.querySelector(".info-gordura").textContent
        ));
    });
}

function atualizarTabela(pacientes) {
    let tabelaPacientes = document.querySelector("#tabela-pacientes");

    while (tabelaPacientes.firstChild) {
        tabelaPacientes.removeChild(tabelaPacientes.lastChild);
    }

    pacientes.forEach(paciente => {
        adicionarPacienteTabela(paciente);
    });
}

function adicionarPacienteTabela(paciente) {
    let tr = document.createElement("tr");
    tr.classList.add("paciente");
    tr.id = "p" + paciente.id;

    adicionarDadosPacienteTabela(tr, paciente);

    document.querySelector("#tabela-pacientes").appendChild(tr);
}

function atualizarPacienteTabela(paciente) {
    let tr = document.querySelector("#p" + paciente.id);

    while (tr.firstChild) {
        tr.removeChild(tr.lastChild);
    }    

    adicionarDadosPacienteTabela(tr, paciente);
}

function adicionarDadosPacienteTabela(tr, paciente) {
    tr.appendChild(gerarColunaPaciente(paciente.nome, "info-nome"));
    tr.appendChild(gerarColunaPaciente(paciente.peso, "info-peso"));
    tr.appendChild(gerarColunaPaciente(paciente.altura, "info-altura"));
    tr.appendChild(gerarColunaPaciente(paciente.gordura, "info-gordura"));

    try {
        tr.appendChild(gerarColunaPaciente(paciente.imc, "info-imc"));
    } catch (e) {
        tr.appendChild(gerarColunaPaciente(e.message, "info-nome"));
        tr.classList.add("paciente-invalido");
    }
}

function gerarColunaPaciente(info, tipoInfo) {
    let coluna = document.createElement("td");
    coluna.classList.add(tipoInfo);
    coluna.textContent = info;

    return coluna;
}

function filtrarTabela(celula, filtro) {
    document.querySelectorAll(".paciente").forEach(linha => {
        let conteudoCelula = linha.getElementsByClassName(celula)[0].textContent.toUpperCase();

        if (filtro(conteudoCelula)) {
            linha.classList.remove("oculto");
        } else {
            linha.classList.add("oculto");
        }
    });
}