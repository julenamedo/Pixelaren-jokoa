const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// sortu sugearen unitatea (pixela)
const box = 32;

// argazkiak kargatu

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const kkImg = new Image();
kkImg.src = "img/kk.png"

// sortu sugea

let snake = [];

snake[0] = 
{
    x : 9 * box,
    y : 10 * box
};

// sortu janaria

let food = 
{
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}
// sortu obstakuluak (kaka)
let kk;
kk =
{
    x : 1*box,
    y : 3*box
}

// score markagailua sortu

let score = 0;

//sugearen kontrola

let d;

document.addEventListener("keydown",direction);

function direction(event)
{
    let key = event.keyCode;
    if( key == 37)
    {
        d = "LEFT";
    }
    else if(key == 38)
    {
        d = "UP";
    }
    else if(key == 39)
    {
        d = "RIGHT";
    }
    else if(key == 40)
    {
        d = "DOWN";
    }
}

// kolisioaren funtzioa
function collision()
{
    if(snake.x == kk.x && snake.y == kk.y)
    {
        return true;
    }
    else
    {
        return false;
    }
}

// margotu dena canvasean

function draw()
{
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < 1 ; i++)
    {
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "blue";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    
    // behin sugea mugitzen denean zein zen aurreko posizioa
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // noranzkoak zehaztu
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // sugea janaria jaten badu
    if(snakeX == food.x && snakeY == food.y)
    {
        kk = 
        {
            x : snakeX,
            y : snakeY
        }
        score++;
        food = 
        {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // sugearen izatxa ez da kentzen
    }
    //kaka margotu jaten duenean
    if(score>0)
    {
        ctx.drawImage(kkImg,kk.x,kk.y);
    }
    
    // geitu buru berri bat, baina gorputza ez da handitzen
    
    let newHead = 
    {
        x : snakeX,
        y : snakeY
    }
    
    // Galdu duzu
    
    if(snakeX <= 0 * box || snakeX >= 18 * box || snakeY <= 2*box || snakeY >= 18 * box || collision()==true)
    {
        clearInterval(game);
        alert('Game over');
        location.reload();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}
function ocultar()
{
    document.getElementById('kk').style.display = "none";  
}
function mostrar()
{
    document.getElementById('kk').style.display = "block";
}

// funtzioaren interbaloa

let game = setInterval(draw,100);