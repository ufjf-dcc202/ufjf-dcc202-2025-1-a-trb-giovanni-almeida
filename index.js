const jardim = document.getElementById("jardim");

for (let i = 0; i < 12; i++) {
    let linha = document.createElement("tr");
    for (let j = 0; j < 12; j++) {
        let espaco = document.createElement("td");
        linha.appendChild(espaco)
    }
    jardim.appendChild(linha)
}