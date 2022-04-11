let numberOfCards;

function gameStart() {
    alert("Esse é o jogo da memórias dos Papagaios, escolha entre 4 e 14 cartas, lembrando de sempre escolher números pares e digitar com caracteres numéricos! 🦜");
    numberOfCards = prompt("Com quantas cartas deseja jogar?");
    
    let verification = (numberOfCards % 2 !== 0 || numberOfCards < 4 || numberOfCards > 14 || isNaN(numberOfCards));
    while (verification) {
        numberOfCards = prompt("Se atente as regras do jogo e digite um número par entre 4 e 14! Com quantas cartas deseja jogar?");
        verification = (numberOfCards % 2 !== 0 || numberOfCards < 4 || numberOfCards > 14 || isNaN(numberOfCards));
    }

    dealCards(numberOfCards);
}

function dealCards(numberOfCards) {
    const cards = ["bobrossparrot.gif", "bobrossparrot.gif", "explodyparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "metalparrot.gif", "revertitparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "tripletsparrot.gif", "unicornparrot.gif", "unicornparrot.gif"];
    const list = document.querySelector("ul");

    ulSizeAdjust(list, numberOfCards);

    const cardsInGame = cards.slice(0, numberOfCards)
    cardsInGame.sort(randomizer);
    
    for (let i = 0; i < cardsInGame.length; i++) {
        list.innerHTML += `
        <li>
            <div class="card" onclick="selectCard(this)">
                <div class="front-face face">
                    <img src="./images/front.png">
                </div>
                <div class="back-face face">
                    <img src="./images/${cardsInGame[i]}">
                </div>
            </div>
        </li>`;
    }

}

function randomizer() {
    return Math.random() - 0.5;
}

function ulSizeAdjust(list, numberOfCards) {
    list.style.width = `${132 * (numberOfCards/2)}px`;
}

function flip(card) {
    card.children[0].classList.add("flipped");
    card.children[1].classList.add("flipped");
}

gameStart();