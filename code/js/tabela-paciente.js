document.addEventListener("DOMContentLoaded", (event) => {
    carregarPacientes();
    atualizarTabela();

    PacienteDAO.addSalvarListener((paciente) => {
        adicionarPacienteTabela(paciente);
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

function atualizarTabela() {
    let tabelaPacientes = document.querySelector("#tabela-pacientes");

    while (tabelaPacientes.firstChild) {
        tabelaPacientes.removeChild(tabelaPacientes.lastChild);
    }

    PacienteDAO.obterTodos().forEach(paciente => {
        adicionarPacienteTabela(paciente);
    });
}

function adicionarPacienteTabela(paciente) {
    let tr = document.createElement("tr");
    tr.classList.add("paciente");

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

    document.querySelector("#tabela-pacientes").appendChild(tr);
}

function gerarColunaPaciente(info, tipoInfo) {
    let coluna = document.createElement("td");
    coluna.classList.add(tipoInfo);
    coluna.textContent = info;

    return coluna;
}