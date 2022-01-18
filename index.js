var currLevel = 0;
var isStarted = false;
var canTakeUserInput = false;
var userCurrIdx = 0;
var gamePattern = [];
var userPattern = [];
var colors = ["green","red","yellow","blue"];

$(document).on('keypress',function(){
    if(isStarted == false){
        isStarted = true;
        startsGame();
    }
});

$(".btn").on('click',function(){
    if(canTakeUserInput == true){
        var id = this.id;
        userPattern.push(id);
        showBlink(id);
        playMusic(id);
        var flag = true;
        for(var i=0;i<userPattern.length;i++){
            if(userPattern[i] === gamePattern[i]){
                continue;
            }else{
                flag = false;
                gameEnds();
            }
        }

        if(flag == true && userPattern.length === gamePattern.length){
                
            setTimeout(function(){
                userPattern = [];
                isUserValid = false;
                startsGame();
            },1000);
        
        }
    }
    
    
});

function startsGame(){
    showLevel();
    generaterPattern();
    
}

function showLevel(){
    currLevel += 1;
    $("h1").text("Level " + currLevel);
}

function generaterPattern(){
    var randomNumber = Math.floor(Math.random()*4);
    showBlink(colors[randomNumber]);
    playMusic(colors[randomNumber]);
    gamePattern.push(colors[randomNumber]);
    canTakeUserInput = true;
    //takeUserPattern();
}

function showBlink(id){

    $("#" + id).addClass("pressed");
    setTimeout(function(){
        $("#" + id).removeClass("pressed");    
    },100);
}

function playMusic(id){
    
    var audio = new Audio("sounds/" + id + ".mp3");
    audio.play();
}

function gameEnds(){
    $("h1").text("game-Over, Press any key to start ");
    playMusic("wrong");
    
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    currLevel = 0;
    isStarted = false;
    canTakeUserInput = false;
    userCurrIdx = 0;
    gamePattern = [];
    userPattern = [];

}