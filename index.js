const jardim = document.getElementById("jardim");
const stagePlantas = [{ "planta": "abobora1", "stages": 2 }, { "planta": "abobora2", "stages": 2 }, { "planta": "abobora3", "stages": 1 },
{ "planta": "alface1", "stages": 3 }, { "planta": "alface2", "stages": 2 }, { "planta": "alface3", "stages": 2 },
{ "planta": "nabo1", "stages": 3 }, { "planta": "nabo2", "stages": 3 }, { "planta": "nabo3", "stages": 1 },
{ "planta": "trigo1", "stages": 3 }, { "planta": "trigo2", "stages": 3 }, { "planta": "trigo3", "stages": 1 },
{ "planta": "cenoura1", "stages": 3 }, { "planta": "cenoura2", "stages": 3 }, { "planta": "cenoura3", "stages": 1 },
{ "planta": "batata1", "stages": 3 }, { "planta": "batata2", "stages": 3 }, { "planta": "batata3", "stages": 1 },
{ "planta": "couve1", "stages": 3 }, { "planta": "couve2", "stages": 3 }];


let sementesAdquiridas = ["abobora1", "alface1", "nabo1"];
let sementesDisponiveis = [
    { nome: "trigo1", preco: 100 },
    { nome: "cenoura1", preco: 100 },
    { nome: "batata1", preco: 200 },
    { nome: "couve1", preco: 300 }
];


document.getElementById('passarTempo').addEventListener('click', passarTempo);
document.getElementById('semente1').addEventListener('click', () => itemAtual = document.getElementById('semente1').dataset.semente);
document.getElementById('semente2').addEventListener('click', () => itemAtual = document.getElementById('semente2').dataset.semente);
document.getElementById('semente3').addEventListener('click', () => itemAtual = document.getElementById('semente3').dataset.semente);
document.getElementById('prepararSolo').addEventListener('click', () => itemAtual = "enxada");
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
            espaco.classList.add("naoplantavel");
        }
        linha.appendChild(espaco);
    }
    jardim.appendChild(linha);
}


jardim.addEventListener("mousedown", (e) => {
    let espaco = e.target;

    if (espaco.classList.contains("pedra") || espaco.classList.contains("mato")) {
        espaco.classList = "";
        espaco.classList.add("naoplantavel");
        return;
    }

    if (espaco.classList.contains("plantavel") && sementesAdquiridas.includes(itemAtual)) {
        espaco.classList.remove("plantavel");
        espaco.classList.add("plantado");
        espaco.classList.add(itemAtual);
        return;
    }

    if (itemAtual === "enxada") {
        espaco.classList = "";
        espaco.classList.add("plantavel");
        return;
    }

    if (itemAtual === "irrigador") {
        // Última etapa, a planta não é regada
        if (espaco.classList.contains("abobora3") || espaco.classList.contains("alface3") || espaco.classList.contains("nabo3") ||
            espaco.classList.contains("trigo3") || espaco.classList.contains("cenoura3") || espaco.classList.contains("batata3") || espaco.classList.contains("couve2")) {
            return;
        }

        if (espaco.classList.contains("plantado")) {
            espaco.classList.add('irrigada');
            return;
        }
    }

    if (itemAtual === "foice") {
        if (espaco.classList.contains("abobora3") || espaco.classList.contains("alface3") || espaco.classList.contains("nabo3") ||
            espaco.classList.contains("trigo3") || espaco.classList.contains("cenoura3") || espaco.classList.contains("batata3") || espaco.classList.contains("couve2")) {
            dinheiro += 10;
            atualizarDinheiro()
            espaco.classList = "";
            espaco.classList.add("naoplantavel");
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

        let plantaEncontrada = stagePlantas.find(planta => planta.planta === proximaClassePlanta)

        if (plantaEncontrada) {
            espaco.classList.remove(classePlanta);
            espaco.classList.add(proximaClassePlanta);
            espaco.classList.remove("irrigada");
            espaco.dataset.etapa = 0;
            return;
        }
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