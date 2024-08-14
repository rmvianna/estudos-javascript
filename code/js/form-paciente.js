function salvarPaciente(pacienteDAO) {
    let formPaciente = document.querySelector("#form-adiciona");

    let paciente = new Paciente(
        formPaciente.nome.value,
        formPaciente.peso.value,
        formPaciente.altura.value,
        formPaciente.gordura.value
    );

    pacienteDAO.salvar(paciente);
}