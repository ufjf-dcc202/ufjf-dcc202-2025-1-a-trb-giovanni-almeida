const jardim = document.getElementById("jardim");
const plantas = ["abobora1", "alface1", "nabo1"];


document.getElementById('abobora').addEventListener('click', () => acao = 'abobora1');
document.getElementById('alface').addEventListener('click', () => acao = 'alface1');
document.getElementById('nabo').addEventListener('click', () => acao = 'nabo1');
document.getElementById('regar').addEventListener('click', () => acao = 'regar');

let acao = null;


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

    if (espaco.classList.contains("plantavel") && plantas.includes(acao)) {
        espaco.classList.remove("plantavel");
        espaco.classList.add("plantado");
        espaco.classList.add(acao);
        return;
    }

    document.getElementById('regar').addEventListener('click', () => {
        document.querySelectorAll('#jardim td.plantado').forEach(espaco => {
            if (espaco.classList.contains("abobora3") || espaco.classList.contains("alface3") || espaco.classList.contains("nabo3")) {
                return;
            }
            espaco.classList.add('irrigada');
        });
    });

    document.getElementById('tempo').addEventListener('click', () => {
        document.querySelectorAll('#jardim td.irrigada').forEach(espaco => {
            // Planta 1
            if (espaco.classList.contains("abobora1")) {
                espaco.classList.remove("abobora1");
                espaco.classList.add("abobora2");
                espaco.classList.remove("irrigada");
                return;
            }

            if (espaco.classList.contains("abobora2")) {
                espaco.classList.remove("abobora2");
                espaco.classList.add("abobora3");
                espaco.classList.remove("irrigada");
                return;
            }


            // Planta 2
            if (espaco.classList.contains("alface1")) {
                espaco.classList.remove("alface1");
                espaco.classList.add("alface2");
                espaco.classList.remove("irrigada");
                return;
            }

            if (espaco.classList.contains("alface2")) {
                espaco.classList.remove("alface2");
                espaco.classList.add("alface3");
                espaco.classList.remove("irrigada");
                return;
            }


            // Planta 3
            if (espaco.classList.contains("nabo1")) {
                espaco.classList.remove("nabo1");
                espaco.classList.add("nabo2");
                espaco.classList.remove("irrigada");
                return;
            }

            if (espaco.classList.contains("nabo2")) {
                espaco.classList.remove("nabo2");
                espaco.classList.add("nabo3");
                espaco.classList.remove("irrigada");
                return;
            }
        });
    });
})