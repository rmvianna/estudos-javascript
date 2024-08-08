document.addEventListener("DOMContentLoaded", (event) => {
    atualizarIMC();
});

function atualizarIMC() {
    document.querySelectorAll("#tabela-pacientes .paciente").forEach((linha) => {
        let imcTD = linha.querySelector(".info-imc");

        try {
            let pesoTd = linha.querySelector(".info-peso").textContent;
            let alturaTd = linha.querySelector(".info-altura").textContent;

            let paciente = new Paciente(pesoTd, alturaTd);
            imcTD.textContent = paciente.imc;
        } catch (e) {
            imcTD.textContent = e.message;
        }
    });
}
