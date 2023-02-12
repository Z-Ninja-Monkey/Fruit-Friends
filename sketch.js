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

function preload(){
	img5 = loadImage('assets/banana4.png');
	img2 = loadImage('assets/banana.png');
	img = loadImage('assets/thingy5.png');
}

function setup() {
	new Canvas(1000, 590);
	world.allowSleeping = true;

	frame = 0;
	frameRate(60);

	world.gravity.y = 15;

	thingy = new Sprite(100,30);
	thingy.img = img;
	thingy.r = 20;
	thingy.collider = 'dynamic';
	thingy.layer = 1;
	thingy.bounciness = 0;

	platform = new Sprite(100,100, 100, 20, 'static');

	img2.resize(150,0);
	img5.resize(150,0);
	
	//img2.rotate = 123;
	bobTheBanana = new Group();
	BobTheBanana(90,400,0,true);

}

function BobTheBanana(x,y,rotate,debug){
	bobBanana = new bobTheBanana.Sprite(x,y,100,20);
	bobBanana.collider = 'static';
	bobBanana.img = img2;
	bobBanana.rotation = rotate; 
	bobBanana.bounciness = 1;
	bobBanana.debug = debug;
}

function draw() {

		
	frame += 1;
	frame2 += 1;
	clear();
	background('gray');
	if (thingy.collides(bobTheBanana)){
		frame2 = 0
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
		bobTheBanana.img = img5;
		bobTheBanana[0].img.offset.y = 10;
	} else {
		bobTheBanana.img = img2
	}
	


	if (mouse.pressing()){
		if (Math.abs((mouse.x - oldMouseX)) > 40 || Math.abs((mouse.y - oldMouseY)) > 40){
			CreateLine(oldMouseX,oldMouseY,mouse.x,mouse.y,11);
	    } else if ((Math.abs((mouse.x - oldMouseX)) < 40 && Math.abs((mouse.x - oldMouseX)) > 15) || (Math.abs((mouse.y - oldMouseY)) < 40) && Math.abs((mouse.y - oldMouseY)) > 15){
			CreateLine(oldMouseX,oldMouseY,mouse.x,mouse.y,16);
		} else if ((Math.abs((mouse.x - oldMouseX)) < 15 && Math.abs((mouse.x - oldMouseX)) > 2) || (Math.abs((mouse.y - oldMouseY)) < 15) && Math.abs((mouse.y - oldMouseY)) > 2){
			CreateLine(oldMouseX,oldMouseY,mouse.x,mouse.y,30);
		}
		
		
	}
	oldMouseX = mouse.x;
	oldMouseY = mouse.y;
	if (frame === 10){
		platform.collider = 'none';
		platform.visible = false;
		console.log('yes it was me that ran');
		//thingy.bounciness = 0.5;

	}
	//console.log(frame);
}

function CreateLine(x,y,x2,y2,perc){
line = new Group();
let moveAmount;
line.visible = true;
line.img = 'assets/thing.png';
line.r =  10;
line.collider = 'static';
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

	for (b = 0; b < len; b++) {
		let linedot = new line.Sprite();
		linedot.x = spritething.x;
		linedot.y = spritething.y;
		linedot.collider = 'static';
		spritething.x += moveAmount[0];
		spritething.y += moveAmount[1];
	}
	
}