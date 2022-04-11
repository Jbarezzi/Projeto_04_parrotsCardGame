let numberOfCards, 
    firstClick, 
    firstCard, 
    secondCard,
    idInterval,
    seconds = 0, 
    plays = 0;

function gameStart() {
    alert("Esse é o jogo da memórias dos Papagaios, escolha entre 4 e 14 cartas, lembrando de sempre escolher números pares e digitar com caracteres numéricos! 🦜");
    numberOfCards = prompt("Com quantas cartas deseja jogar?");
    
    let verification = (numberOfCards % 2 !== 0 || numberOfCards < 4 || numberOfCards > 14 || isNaN(numberOfCards));
    while (verification) {
        numberOfCards = prompt("Se atente as regras do jogo e digite um número par entre 4 e 14! Com quantas cartas deseja jogar?");
        verification = (numberOfCards % 2 !== 0 || numberOfCards < 4 || numberOfCards > 14 || isNaN(numberOfCards));
    }

    dealCards(numberOfCards);
    timer();
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
    if (window.screen.width > 414) {
        list.style.width = `${132 * (numberOfCards/2)}px`;
    } else {
        list.style.width = "117px"
    }
}

function selectCard(element) {
    const click = element.children[1].innerHTML;
    if (firstClick === undefined) {
        flip(element);
        firstClick = click;
        firstCard = element;
        plays++;
    } else if (click === firstClick) {
        flip(element);
        firstClick = undefined;
        plays++;
        endGame();
    } else if (click !== firstClick) {
        flip(element);
        secondCard = element;
        setTimeout(unflip, 1000);
        firstClick = undefined;
        plays++;
    }

}

function flip(card) {
    card.children[0].classList.add("flipped");
    card.children[1].classList.add("flipped");
}

function unflip() {
    firstCard.children[0].classList.remove("flipped");
    firstCard.children[1].classList.remove("flipped");
    secondCard.children[0].classList.remove("flipped");
    secondCard.children[1].classList.remove("flipped");
}

function endGame() {
    const cards = document.querySelectorAll("div.flipped");

    if (cards.length === 2*numberOfCards) {
        alert("Você ganhou em " + plays + " jogadas e " + seconds + " segundos!");
        clearInterval(idInterval);
        restartGame();
    }
}

function restartGame() {
    let restart = prompt("Você deseja reiniciar o jogo? (sim ou não)");
    if (restart === "sim") {
        cleanScreen();
        gameStart();
    } else if (restart === "não") {
        alert("Obigado por Jogar!")
    } else {
        restartGame();
    }

}

function cleanScreen() {
    const list = document.querySelector("ul");
    list.innerHTML = "";
    seconds = 0;
}

function timer() {
    idInterval = setInterval(increment, 1000);
}

function increment() {
    seconds++;
    document.querySelector(".timer").innerHTML = formatTime(seconds);
}

function formatTime(seconds) {
    return [
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
    ]
        .join(":");
}

gameStart();