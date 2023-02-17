let sprite;
let test;
let img;
let line;
let oldMouseX;
let oldMouseY;
let bob;
let frame;
let img2;
let bobBanana;
let bobTheBanana;
let frame2;
let bounce;
let grapes;
let grapeTimerOn;
let grapeTimer;
let firstGrapeTimer;
let selectedFruit;
let orangeTop;
let mouseFollower;
let firstBanana;
let firstGrape;


function preload(){
	img10 = loadImage('assets/highlight2.png');
	img9 = loadImage('assets/highlight.png');
	img8 = loadImage('assets/grapes2.png');
	img7 = loadImage('assets/grapes.png');
	img6 = loadImage('assets/bananaTop.png');
	img5 = loadImage('assets/orange2.png');
	img4 = loadImage('assets/orange.png');
	img3 = loadImage('assets/banana4.png');
	img2 = loadImage('assets/banana.png');
	img = loadImage('assets/thingy5.png');
}

function setup() {
	new Canvas(1000, 590);
	world.allowSleeping = true;

	frame = 0;
	frameRate(60);

	world.gravity.y = 15;

	firstGrapeTimer = true;

	thingy = new Sprite(100,110);
	thingy.img = img;
	thingy.r = 20;
	thingy.collider = 'dynamic';
	thingy.layer = 1;
	thingy.bounciness = 0;

	topBar = new Sprite(500,30,1000,60);
	topBar.collider = 'none';
	topBar.layer = -1;
	topBar.color = 'gray';
	//topBarBarrier = new Sprite(500,60,1000,3);
	//topBarBarrier.collider = 'static';
	//topBarBarrier.color = 'black';

	platform = new Sprite(100,150, 100, 20, 'static');

	img2.resize(150,0);
	img3.resize(150,0);
	img4.resize(30,0);
	img5.resize(60,0);
	img6.resize(90,0);
	img7.resize(120,0);
	img8.resize(75,0);
	img9.resize(90,50);

	mouseFollower = new Sprite(200,200,0);
	mouseFollower.visible = false;

	bobTheBanana = new Group();
	firstBanana = true;
	grapes = new Group();
	BobTheBanana(100,400,30,false);
	Grapes(300,300);

	orangeTop = new Sprite(50,30);
	orangeTop.collider = 'static';
	orangeTop.img = img5;
	bananaTop = new Sprite(150,30,'static');
	bananaTop.img = img6;
	grapeTop = new Sprite(235,33,'static');
	grapeTop.img = img8;
	grapeTop.rotation = 30;
	highlight = new Sprite(-500,-500,'none');
	highlight.img = img9

	mouseFollower.overlaps(thingy);
	mouseFollower.overlaps(platform);
	mouseFollower.overlaps(bobTheBanana);
	mouseFollower.overlaps(grapes);
	mouseFollower.overlaps(platform);

	selectedFruit = 'none'
}

function BobTheBanana(x,y,rotate,debug){
	bobBanana = new bobTheBanana.Sprite(x,y,100,20);
	bobBanana.collider = 'static';
	bobBanana.img = img2;
	bobBanana.rotation = rotate; 
	bobBanana.bounciness = 1;
	bobBanana.debug = debug;
}

function Grapes(x,y){
	grape = new grapes.Sprite(x,y, 40);
	grape.collider = 'static';
	grape.img = img7;
}
function Cherry(){

}

function draw() {

	frame += 1;
	frame2 += 1;
	clear();
	background('lightgray');

	//mouseFollower.speed = 5;
	mouseFollower.moveTowards(mouse,1);

	//console.log(mouseFollower.x);

	if (thingy.collides(bobTheBanana)){
		frame2 = 0;
		bounce = 3;
	} else if (frame2 > 2) {
		//bounce = 1;
		if (frame2 > 5){
			bounce = 2;
		} 
		if (frame2 > 7){
			bounce = 0;
		}
	} else{
		//bounce = false;
	}
	if (bounce === 1){
		bobTheBanana.img = img4;
		bobTheBanana[0].img.offset.y = -10;
	} else if (bounce === 2) {
		bobTheBanana.img = img2
		bobTheBanana[0].img.offset.y = 10;
	} else if (bounce === 3){
		bobTheBanana.img = img3;
		bobTheBanana[0].img.offset.y = 10;
	} else {
		bobTheBanana.img = img2
	}
	bobTheBanana[0].img.offset.x = 10;
	
	if (thingy.overlaps(grapes)){
		grapes.remove();
		world.gravity.y = 3;
		thingy.velocity.y = 1;
		thingy.rotationSpeed /= 2;
		grapeTimerOn = true;
	}
	if (grapeTimerOn == true){
		if (firstGrapeTimer == true){
			grapeTimer = millis();
			firstGrapeTimer = false
		}
		if(millis() > grapeTimer + 750){
			firstGrapeTimer = true
			grapeTimerOn = false;
			grapeTimer = 0
			world.gravity.y = 15;
		}
	}
	if (mouseFollower.overlapping(orangeTop)>0 && mouse.pressing()){
		selectedFruit = 'orange';
	}else if (mouseFollower.overlapping(bananaTop)>0 && mouse.pressing()){
		selectedFruit = 'banana';
	}else if (mouseFollower.overlapping(grapeTop)>0 && mouse.pressing()) {
		selectedFruit = 'grape'
	}
	if (selectedFruit == 'orange'){
		highlight.x = orangeTop.x;
		highlight.y = orangeTop.y;
	}else if (selectedFruit == 'banana'){
		highlight.x = bananaTop.x;
		highlight.y = bananaTop.y;
	}else if (selectedFruit == 'grape'){
		highlight.x = grapeTop.x;
		highlight.y = grapeTop.y;
	}

	if (mouse.pressing() && selectedFruit == 'orange' && mouse.y > 60){
		if (Math.abs((mouse.x - oldMouseX)) > 40 || Math.abs((mouse.y - oldMouseY)) > 40){
			CreateLine(oldMouseX,oldMouseY,mouse.x,mouse.y,11,false,'static',false);
	    } else if ((Math.abs((mouse.x - oldMouseX)) < 40 && Math.abs((mouse.x - oldMouseX)) > 15) || (Math.abs((mouse.y - oldMouseY)) < 40) && Math.abs((mouse.y - oldMouseY)) > 15){
			CreateLine(oldMouseX,oldMouseY,mouse.x,mouse.y,16,false,'static',false);
		} else if ((Math.abs((mouse.x - oldMouseX)) < 15 && Math.abs((mouse.x - oldMouseX)) > 2) || (Math.abs((mouse.y - oldMouseY)) < 15) && Math.abs((mouse.y - oldMouseY)) > 2){
			CreateLine(oldMouseX,oldMouseY,mouse.x,mouse.y,30,false,'static',false);
		}
		CreateLine(oldMouseX,oldMouseY,mouse.x,mouse.y,100,true,'none',true);
		
	}
	if (mouse.released()){

	}
	if (mouse.pressing() && selectedFruit == 'banana' && mouse.y > 60 && firstBanana == true){
		BobTheBanana(mouse.x,mouse.y,0,false);
		firstBanana = false
	}
	if (mouse.pressing() && selectedFruit == 'grape' && mouse.y > 60){
		Grapes(mouse.x,mouse.y,false)
	}
	oldMouseX = mouse.x;
	oldMouseY = mouse.y;
	if (frame === 100){
		platform.collider = 'none';
		platform.visible = false;
		console.log('yes it was me that ran');
		//thingy.bounciness = 0.5;

	}
	//console.log(frame);
}

function CreateLine(x,y,x2,y2,perc,visi,collide,tex){
line = new Group();
let moveAmount;
line.visible = visi;
line.img = img4;
line.r = 15;
line.stroke = 'red';
line.layer = 1;
let spritething = new Sprite(0,0,0,0,0,'none');
spritething.visible = false;
	function SetMoveAmount(x,y,x2,y2,percent){
		let xDifference = x2 - x;
		let yDifference = y2 - y;
		let xMove = xDifference*(percent/100);
		let yMove = yDifference*(percent/100);
		moveAmount = [xMove,yMove];
	}
	SetMoveAmount(x,y,x2,y2,perc);
	console.log(moveAmount);
	spritething.x = x;
	spritething.y = y;
	len = 100 / perc;
	lineNum = 0;
	for (b = 0; b < len; b++) {
		let linedot = new line.Sprite();
		linedot.x = spritething.x;
		linedot.y = spritething.y;
		linedot.collider = 'static';
		if (linedot.overlaps(line)){
			linedot.remove();
		}
		linedot.collider = collide;
		spritething.x += moveAmount[0];
		spritething.y += moveAmount[1];
		if (lineNum != 0){
			lineNum += 1;
		}
		
	}
	
}
