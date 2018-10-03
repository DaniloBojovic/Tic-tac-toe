
let btnNewGame = document.getElementById('btn-new-game');
let btnReset = document.getElementById('btn-reset');
let arrayForTable = [];
var isOver = false;
var xArray = [];
var oArray = [];
let winnerArray = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [3, 4, 5],
    [2, 4, 6],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8]
]
let reset = false;
let txtArea = document.getElementById('txt-area');
var player = "";
var divBtns = document.getElementsByClassName('buttons')[0];
var buttons = divBtns.getElementsByTagName("button");
btnNewGame.disabled = false;

btnNewGame.addEventListener('click', function(){
    btnNewGame.disabled = true;
    btnNewGame.style.opacity = 0.40;
    arrayForTable = [0,1,2,3,4,5,6,7,8];
    isOver = false;
    xArray = [];
    oArray = [];
    reset = false;
    disableOrEnable();
    txtArea.innerText = "Game started";
});

function disableOrEnable(){

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = '?';
        buttons[i].style.backgroundColor = '#fff';
        buttons[i].disabled = false;
    }
}

function gameOver(array){
    for (let i = 0; i < buttons.length; i++) {
        if(array !== undefined){
            for (let j = 0; j < array.length; j++) {
                if(buttons[i].value == array[j]){ //== sign compare string value and int value
                    buttons[i].style.background = 'yellow';
                    break;
                }
            }
        }
        buttons[i].disabled = true;
        console.log(buttons[i]);
    }
    btnNewGame.disabled = false;
    btnNewGame.style.opacity = 1;
}

function fillTable(stringValue, btnId){
    player = "YOU";
    var value = parseFloat(stringValue);
    var buttonX = document.getElementById(btnId);
    buttonX.innerText = 'x';
    buttonX.style.backgroundColor = 'silver';
    buttonX.disabled = true;
    xArray.push(value);
    arrayForTable.splice(arrayForTable.indexOf(value), 1);
    if(xArray.length >= 3){
        checkIsPlayerWinner(xArray, winnerArray, player);
    }
    if(!isOver){
        autoFillTable(arrayForTable);
    }
    else{
        gameOver();
    }
}

function autoFillTable(arrayForTable){
    player = "COMPUTER";
    var randomValueFromArray = arrayForTable[Math.floor(Math.random() * arrayForTable.length)];
    var createBtnId = 'btn' + randomValueFromArray;
    var buttonO = document.getElementById(createBtnId);
    buttonO.innerText = 'o';
    buttonO.style.backgroundColor = "silver";
    buttonO.disabled = true;
    oArray.push(randomValueFromArray);
    if(oArray.length >= 3){
        checkIsPlayerWinner(oArray, winnerArray, player);
    }
    arrayForTable.splice(arrayForTable.indexOf(randomValueFromArray), 1);
    if(isOver){
        gameOver();
    }
}

function checkIsPlayerWinner(array, winnerArray, player){
    array.sort();
    for (var i = 0; i < winnerArray.length; i++) {
        console.log("HERE " + winnerArray[i]);
        isPlayerArrayInWinnerArray(winnerArray[i],array);
    }
    // winnerArray.map((value) => {
    //     if(isOver!==true)
    //         isPlayerArrayInWinnerArray(value,array);
    // });
}

function isPlayerArrayInWinnerArray(arrayFromWinnerArrays, array){
    winningArray = [];
    var counter = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < arrayFromWinnerArrays.length; j++) {
            if(array[i]==arrayFromWinnerArrays[j]){
                counter++;
                winningArray.push(array[i]);
                break;
            }
        }       
    }
    if(counter==3){
        txtArea.innerText = `${player} WON!!!`;
        isOver = true;
        gameOver(winningArray);
    }
    if(!isOver && arrayFromWinnerArrays === winnerArray[winnerArray.length - 1] && array.length > 4){
        txtArea.innerText = 'NO ONE WON!!!';
        isOver = true;
        gameOver();
    }
};


