var dog, happyDog, dogImage, happyDogImage, database, food, foodStock;

function preload()
{
	dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  dog = createSprite(250, 250, 5, 5);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  foodStock = database.ref("Food");
  foodStock.on("value", readStock); 
  
}


function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(food);
    dog.addImage(happyDogImage);
  }

  textSize(25);
  fill("White");
  text("Press The Up Arrow Key To Feed The Dog!", 15, 100);

  textSize(25);
  fill("White");
  text("Food Remaining: " + food, 100, 400);
  
  drawSprites();
  //add styles here
}

function readStock(data) {
  food = data.val();
}

function writeStock(x) {
if (x <= 0) {
  x = 0;
}
else {
  x = x-1;
}
database.ref("/").update({
  Food: x
})
}


