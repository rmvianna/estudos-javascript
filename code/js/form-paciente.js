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

    PacienteDAO.salvar(paciente);

    formPaciente.reset();
}