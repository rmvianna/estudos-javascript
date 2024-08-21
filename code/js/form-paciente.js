document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#adicionar-paciente").addEventListener("click", (event) => {
        event.preventDefault();
        salvarPaciente();
    });
});

function salvarPaciente() {
    let formPaciente = document.querySelector("#form-adiciona");

    let paciente = new Paciente(
        formPaciente.nome.value,
        formPaciente.peso.value,
        formPaciente.altura.value,
        formPaciente.gordura.value
    );

    if (validarPaciente(paciente)) {
        PacienteDAO.salvar(paciente);
        formPaciente.reset();
        formPaciente.nome.disabled = false;
    }
}

function validarPaciente(paciente) {
    limparErros();
    let tudoValido = true;

    [validarNome, validarAltura, validarPeso, validarGordura].forEach(validacao => {
        if (!validacao(paciente)) {
            tudoValido = false;
        }
    });

    return tudoValido;
}

function validarNome(paciente) {
    let ehValido = paciente.ehNomeValido();
    if (!ehValido) {
        exibirMensagemErro("O nome do paciente é inválido", "nome");
    }

    return ehValido;
}

function validarAltura(paciente) {
    let ehValido = paciente.ehAlturaValida();
    if (!ehValido) {
        exibirMensagemErro("A altura do paciente é inválida", "altura");
    }

    return ehValido;
}

function validarPeso(paciente) {
    let ehValido = paciente.ehPesoValido();
    if (!ehValido) {
        exibirMensagemErro("O peso do paciente é inválido", "peso");
    }

    return ehValido;
}

function validarGordura(paciente) {
    let ehValido = paciente.ehGorduraValida();
    if (!ehValido) {
        exibirMensagemErro("O percentual de gordura do paciente é inválido", "gordura");
    }

    return ehValido;
}

function exibirMensagemErro(msg, campo) {
    let itemLista = document.createElement("li");
    itemLista.textContent = msg;

    document.querySelector("#mensagens-erro").appendChild(itemLista);
    document.querySelector("#" + campo).classList.add("campo-invalido");
}

function limparErros() {
    document.querySelectorAll(".campo").forEach(campo => {
        campo.classList.remove("campo-invalido");
    });

    let listaErros = document.querySelector("#mensagens-erro");

    while (listaErros.firstChild) {
        listaErros.removeChild(listaErros.lastChild);
    }
}

function carregarPacienteFormulario(paciente) {
    let formPaciente = document.querySelector("#form-adiciona");

    formPaciente.nome.value = paciente.nome;
    formPaciente.nome.disabled = true;

    formPaciente.peso.value = paciente.peso;
    formPaciente.altura.value = paciente.altura;
    formPaciente.gordura.value = paciente.gordura;

    formPaciente.peso.focus();
}