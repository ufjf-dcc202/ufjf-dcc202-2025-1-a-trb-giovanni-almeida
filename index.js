const jardim = document.getElementById("jardim");
const stagePlantas = [{ "planta": "abobora1", "stages": 2 }, { "planta": "abobora2", "stages": 2 }, { "planta": "abobora3", "stages": 1 },
{ "planta": "alface1", "stages": 3 }, { "planta": "alface2", "stages": 2 }, { "planta": "alface3", "stages": 2 },
{ "planta": "nabo1", "stages": 3 }, { "planta": "nabo2", "stages": 3 }, { "planta": "nabo3", "stages": 1 },
{ "planta": "tomate1", "stages": 3 }, { "planta": "tomate2", "stages": 3 }, { "planta": "tomate3", "stages": 1 }];

let sementesAdquiridas = ["abobora1", "alface1", "nabo1"];
let sementesDisponiveis = [
    { nome: "tomate1", preco: 15 },
    { nome: "cenoura1", preco: 20 },
    { nome: "batata1", preco: 25 },
    { nome: "morango1", preco: 30 }
];



document.getElementById('passarTempo').addEventListener('click', passarTempo);
document.getElementById('semente1').addEventListener('click', () => itemAtual = document.getElementById('semente1').dataset.semente);
document.getElementById('semente2').addEventListener('click', () => itemAtual = document.getElementById('semente2').dataset.semente);
document.getElementById('semente3').addEventListener('click', () => itemAtual = document.getElementById('semente3').dataset.semente);
document.getElementById('colher').addEventListener('click', () => itemAtual = "foice");
document.getElementById('regar').addEventListener('click', () => itemAtual = "irrigador");
document.getElementById("loja").addEventListener("click", abrirLoja);
document.getElementById("fecharLoja").addEventListener("click", () => {
    document.getElementById("lojaModal").style.display = "none";
});

let dinheiro = 1000;
let itemAtual = null;

for (let i = 0; i < 12; i++) {
    let linha = document.createElement("tr");
    for (let j = 0; j < 12; j++) {
        let espaco = document.createElement("td");
        espaco.dataset.etapa = 0;
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

    if (espaco.classList.contains("plantavel") && sementesAdquiridas.includes(itemAtual)) {
        espaco.classList.remove("plantavel");
        espaco.classList.add("plantado");
        espaco.classList.add(itemAtual);
        return;
    }

    if (itemAtual === "irrigador") {
        // Última etapa, a planta não é regada
        if (espaco.classList.contains("abobora3") || espaco.classList.contains("alface3") || espaco.classList.contains("nabo3")) {
            return;
        }

        if (espaco.classList.contains("plantado")) {
            espaco.classList.add('irrigada');
            return;
        }
    }

    if (itemAtual === "foice") {
        if (espaco.classList.contains("abobora3") || espaco.classList.contains("alface3") || espaco.classList.contains("nabo3")) {
            dinheiro += 10;
            atualizarDinheiro()
            espaco.classList = "";
            espaco.classList.add("plantavel");
            return;
        }
    }
})

function passarTempo() {
    document.querySelectorAll('#jardim td.irrigada').forEach(espaco => {
        let classePlanta = espaco.classList[1];
        let planta = classePlanta.slice(0, -1);
        let nivel = Number(classePlanta.slice(-1));
        nivel++;
        let proximaClassePlanta = planta + String(nivel);

        let teste = stagePlantas.find(planta => planta.planta === proximaClassePlanta)

        if (teste) {
            espaco.classList.remove(classePlanta);
            espaco.classList.add(proximaClassePlanta);
            espaco.classList.remove("irrigada");
            espaco.dataset.etapa = 0;
            return;
        }
        console.log(teste)

        // // Planta 1
        // if (espaco.classList.contains("abobora1")) {
        //     espaco.classList.remove("abobora1");
        //     espaco.classList.add("abobora2");
        //     espaco.classList.remove("irrigada");
        //     espaco.dataset.etapa = 0;
        //     return;
        // }

        // if (espaco.classList.contains("abobora2")) {
        //     espaco.classList.remove("abobora2");
        //     espaco.classList.add("abobora3");
        //     espaco.classList.remove("irrigada");
        //     espaco.dataset.etapa = 0;
        //     return;
        // }


        // // Planta 2
        // if (espaco.classList.contains("alface1")) {
        //     espaco.classList.remove("alface1");
        //     espaco.classList.add("alface2");
        //     espaco.classList.remove("irrigada");
        //     espaco.dataset.etapa = 0;
        //     return;
        // }

        // if (espaco.classList.contains("alface2")) {
        //     espaco.classList.remove("alface2");
        //     espaco.classList.add("alface3");
        //     espaco.classList.remove("irrigada");
        //     espaco.dataset.etapa = 0;
        //     return;
        // }


        // // Planta 3
        // if (espaco.classList.contains("nabo1")) {
        //     espaco.classList.remove("nabo1");
        //     espaco.classList.add("nabo2");
        //     espaco.classList.remove("irrigada");
        //     espaco.dataset.etapa = 0;
        //     return;
        // }

        // if (espaco.classList.contains("nabo2")) {
        //     espaco.classList.remove("nabo2");
        //     espaco.classList.add("nabo3");
        //     espaco.classList.remove("irrigada");
        //     espaco.dataset.etapa = 0;
        //     return;
        // }
    })

    // Plantas que não forem irrigadas/passar muito tempo, viram mato
    document.querySelectorAll('#jardim td.plantado:not(.irrigado)').forEach(espaco => {
        espaco.dataset.etapa++;
        let stageMaximo = stagePlantas.find(stage => stage.planta === espaco.classList[1]);

        if (espaco.dataset.etapa > stageMaximo.stages) {
            espaco.classList = "";
            espaco.classList.add("mato")
        }
    })
}

function atualizarDinheiro() {
    document.getElementById('dinheiro').textContent = `Dinheiro: ${dinheiro}`;
}

function abrirLoja() {
    const lista = document.getElementById("listaSementes");
    lista.innerHTML = "";
    sementesAdquiridas.forEach(semente => {
        const botao = document.createElement("button");
        botao.textContent = `${semente.charAt(0).toUpperCase() + semente.slice(1, -1)}`;
        botao.addEventListener("click", () => atribuirSemente(semente));
        lista.appendChild(botao);
    });

    sementesDisponiveis.forEach(semente => {
        const botao = document.createElement("button");
        botao.textContent = `${semente.nome.charAt(0).toUpperCase() + semente.nome.slice(1, -1)} - ${semente.preco} moedas`;
        botao.addEventListener("click", () => comprarSemente(semente));
        lista.appendChild(botao);
    });
    document.getElementById("lojaModal").style.display = "flex";
}

function comprarSemente(semente) {
    if (dinheiro < semente.preco) {
        alert("Dinheiro insuficiente!");
        return;
    }
    dinheiro -= semente.preco;
    atualizarDinheiro();
    sementesDisponiveis = sementesDisponiveis.filter(sementeDisponivel => sementeDisponivel.nome !== semente.nome);
    sementesAdquiridas.push(semente.nome);

    console.log(sementesAdquiridas)

    atribuirSemente(semente.nome);
}

function atribuirSemente(semente) {
    // Escolher botão (1,2,3) para substituir
    const slot = prompt("Qual botão você quer substituir? (1, 2 ou 3)");
    if (slot < 1 || slot > 3) {
        alert("Opção inválida!");
        return;
    }

    const botoes = [document.getElementById("semente1"), document.getElementById("semente2"), document.getElementById("semente3")];
    const botaoEscolhido = botoes[slot - 1];
    botaoEscolhido.textContent = `${semente.charAt(0).toUpperCase() + semente.slice(1, -1)}`;
    botaoEscolhido.dataset.semente = semente; // salva nome para uso no plantio

    alert(`Semente de ${semente.charAt(0).toUpperCase() + semente.slice(1, -1)} atribuída ao botão ${slot}!`);
    document.getElementById("lojaModal").style.display = "none";
}