document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector("#buscar-paciente").addEventListener("click", function() {
        buscarPacientesExternos();
    });
});

function buscarPacientesExternos() {
    const URL = "https://raw.githubusercontent.com/loresgarcia/Pacientes-API/master/pacientes.json";

    let xhr = new XMLHttpRequest();
    xhr.open("GET", URL);

    document.querySelector("#erro-busca-paciente").classList.add("oculto");

    xhr.addEventListener("load", function() {
        console.log(xhr);
        if (xhr.status == 200) {
            try {
                let pacientesExternos = JSON.parse(xhr.responseText);

                pacientesExternos.forEach(dados => {
                    let paciente = new Paciente(dados.nome, dados.peso, dados.altura, dados.gordura);
                    PacienteDAO.salvar(paciente);
                });
            } catch (e) {
                exibirMensagemErroManipulacao(e.message);
            }
        } else {
            exibirMensagemErroBusca(xhr);
        }
    });

    xhr.send();
}

function exibirMensagemErroBusca(xhr) {
    let msgErro = document.querySelector("#erro-busca-paciente");

    msgErro.classList.remove("oculto");
    msgErro.innerHTML = "Falha na busca de pacientes. Dados técnicos da requisição:<br/>"
        + "<b>URL:</b> " + xhr.responseURL + "<br/>"
        + "<b>Status:</b> " + xhr.status + "<br/>"
        + "<b>Erro:</b> " + xhr.responseText;
}

function exibirMensagemErroManipulacao(erro) {
    let msgErro = document.querySelector("#erro-busca-paciente");

    msgErro.classList.remove("oculto");
    msgErro.innerHTML = "Falha ao adicionar pacientes na lista:<br/>"
        + "<b>Erro:</b> " + erro;

}