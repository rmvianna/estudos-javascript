let PACIENTES = new Array();

document.addEventListener("DOMContentLoaded", (event) => {
    carregarPacientes();
    atualizarTabela();
    
    document.querySelector("#adicionar-paciente").addEventListener("click", (event) => {
        event.preventDefault();

        let formPaciente = document.querySelector("#form-adiciona");

        let paciente = new Paciente(
            formPaciente.nome.value,
            formPaciente.peso.value,
            formPaciente.altura.value,
            formPaciente.gordura.value
        );

        PACIENTES.push(paciente);
        adicionarPacienteTabela(paciente);
    });
});

function carregarPacientes() {
    document.querySelectorAll("#tabela-pacientes .paciente").forEach((linha) => {
        PACIENTES.push(new Paciente(
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

    PACIENTES.forEach(paciente => {
        adicionarPacienteTabela(paciente);
    });
}

function adicionarPacienteTabela(paciente) {
    let tr = document.createElement("tr");
    tr.classList.add("paciente");

    let tdNome = document.createElement("td");
    tdNome.classList.add("info-nome");
    tdNome.textContent = paciente.nome;
    tr.appendChild(tdNome);

    let tdPeso = document.createElement("td");
    tdPeso.classList.add("info-peso");
    tdPeso.textContent = paciente.peso;
    tr.appendChild(tdPeso);

    let tdAltura = document.createElement("td");
    tdAltura.classList.add("info-altura");
    tdAltura.textContent = paciente.altura;
    tr.appendChild(tdAltura);

    let tdGordura = document.createElement("td");
    tdGordura.classList.add("info-gordura");
    tdGordura.textContent = paciente.gordura;
    tr.appendChild(tdGordura);

    let tdImc = document.createElement("td");
    tdImc.classList.add("info-imc");

    try {
        tdImc.textContent = paciente.imc;
    } catch (e) {
        tdImc.textContent = e.message;
        tr.classList.add("paciente-invalido");
    }

    tr.appendChild(tdImc);

    document.querySelector("#tabela-pacientes").appendChild(tr);
}