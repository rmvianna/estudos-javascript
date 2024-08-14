let pacienteDAO = new PacienteDAO();

document.addEventListener("DOMContentLoaded", (event) => {
    carregarPacientes();
    atualizarTabela(pacienteDAO.obterTodos());

    pacienteDAO.addSalvarListener((paciente) => {
        adicionarPacienteTabela(paciente);
    });
    
    document.querySelector("#adicionar-paciente").addEventListener("click", (event) => {
        event.preventDefault();
        salvarPaciente(pacienteDAO);
    });
});

function carregarPacientes() {
    document.querySelectorAll("#tabela-pacientes .paciente").forEach((linha) => {
        pacienteDAO.salvar(new Paciente(
            linha.querySelector(".info-nome").textContent,
            linha.querySelector(".info-peso").textContent,
            linha.querySelector(".info-altura").textContent,
            linha.querySelector(".info-gordura").textContent
        ));
    });
}
