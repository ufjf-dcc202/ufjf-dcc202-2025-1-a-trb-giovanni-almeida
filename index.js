const jardim = document.getElementById("jardim");


document.getElementById('semente1').addEventListener('click', () => semente = 'semente1');
document.getElementById('semente2').addEventListener('click', () => semente = 'semente2');
document.getElementById('semente3').addEventListener('click', () => semente = 'semente3');
let semente = null;


for (let i = 0; i < 12; i++) {
    let linha = document.createElement("tr");
    for (let j = 0; j < 12; j++) {
        let espaco = document.createElement("td");
        espaco.etapa = 0;
        let random = Math.random();
        if (random < 0.1) {
            espaco.classList.add("pedra");
        }
        else if (random < 0.2) {
            espaco.classList.add("mato");
        }
        else {
            espaco.classList.add("plantavel");
        }
        linha.appendChild(espaco);
    }
    jardim.appendChild(linha);
}


jardim.addEventListener("mousedown", (e) => {
    let espaco = e.target;
    if (espaco.classList.contains("pedra") || espaco.classList.contains("mato")) {
        espaco.classList = "";
        espaco.classList.add("plantavel");
        return;
    }

    if (semente && espaco.classList.contains("plantavel")) {
        console.log(semente)
        espaco.classList.remove("plantavel");
        espaco.classList.add("plantado");
        espaco.classList.add(semente);
        return;
    }

    document.getElementById('regar').addEventListener('click', () => {
        document.querySelectorAll('#jardim td.plantado').forEach(espaco => {
            if (espaco.classList.contains("semente1_3") || espaco.classList.contains("semente2_3") || espaco.classList.contains("semente3_3")) {
                return;
            }
            espaco.classList.add('irrigada');
        });
    });

    document.getElementById('tempo').addEventListener('click', () => {
        document.querySelectorAll('#jardim td.plantado').forEach(espaco => {
            if (espaco.classList.contains("irrigada")) {
                // Planta 1
                if (espaco.classList.contains("semente1")) {
                    espaco.classList.remove("semente1");
                    espaco.classList.add("semente1_2");
                    espaco.classList.remove("irrigada");
                    return;
                }

                if (espaco.classList.contains("semente1_2")) {
                    espaco.classList.remove("semente1_2");
                    espaco.classList.add("semente1_3");
                    espaco.classList.remove("irrigada");
                    return;
                }


                // Planta 2
                if (espaco.classList.contains("semente2")) {
                    espaco.classList.remove("semente2");
                    espaco.classList.add("semente2_2");
                    espaco.classList.remove("irrigada");
                    return;
                }

                if (espaco.classList.contains("semente2_2")) {
                    espaco.classList.remove("semente2_2");
                    espaco.classList.add("semente2_3");
                    espaco.classList.remove("irrigada");
                    return;
                }


                // Planta 3
                if (espaco.classList.contains("semente3")) {
                    espaco.classList.remove("semente3");
                    espaco.classList.add("semente3_2");
                    espaco.classList.remove("irrigada");
                    return;
                }

                if (espaco.classList.contains("semente3_2")) {
                    espaco.classList.remove("semente3_2");
                    espaco.classList.add("semente3_3");
                    espaco.classList.remove("irrigada");
                    return;
                }
            }
        });
    });
})