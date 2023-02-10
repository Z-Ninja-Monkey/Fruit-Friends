let sprite;
let test;
let img;
let line;
let oldMouseX;
let oldMouseY;
function setup() {
	new Canvas(1000, 590);
	world.gravity.y = 15;
	img = loadImage('assets/thingy5.png');
	thingy = new Sprite(100,30);
	thingy.img = img;
	thingy.r = 20;
	thingy.collider = 'dynamic';
	thingy.layer = 1;
	thingy.bounciness = 0;
	
}

function draw() {
	clear();
	background('gray');
	if (mouse.pressing()){
		if ((Math.abs((mouse.x - oldMouseX)) < 15 && Math.abs((mouse.x - oldMouseX)) > 3) || (Math.abs((mouse.y - oldMouseY)) < 15) && Math.abs((mouse.y - oldMouseY)) > 3){

		} else if ((Math.abs((mouse.x - oldMouseX)) < 15 && Math.abs((mouse.x - oldMouseX)) > 3) || (Math.abs((mouse.y - oldMouseY)) < 15) && Math.abs((mouse.y - oldMouseY)) > 3){
			CreateLine(oldMouseX,oldMouseY,mouse.x,mouse.y,20);
		}
		
		
	}
	oldMouseX = mouse.x;
	oldMouseY = mouse.y;
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