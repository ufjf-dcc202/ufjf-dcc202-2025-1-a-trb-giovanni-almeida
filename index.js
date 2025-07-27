const jardim = document.getElementById("jardim");

let semente = null;

for (let i = 0; i < 12; i++) {
    let linha = document.createElement("tr");
    for (let j = 0; j < 12; j++) {
        let espaco = document.createElement("td");
        espaco.etapa = 0;
        linha.appendChild(espaco);
    }
    jardim.appendChild(linha);
}

jardim.addEventListener("mousedown", (e) => {
    let espaco = e.target;
    
    if (espaco.classList.contains("pedras") || espaco.classList.contains("mato")) {
        espaco.classList = "";
        espaco.classList.add("plantavel");
    }

    if (semente && espaco.classList.contains("plantavel")) {
        espaco.classList.remove("plantavel");
        espaco.classList.add(semente);
    }
})