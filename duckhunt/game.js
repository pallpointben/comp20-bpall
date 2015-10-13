
function init() {
	canvas = document.getElementById('game_canvas');
	ctx = canvas.getContext('2d');
	var background = new Image(256, 240);
	background.src = "duckhunt-background.gif";
	var ducks = new Image(375, 276); 
	ducks.src = "duckhunt_various_sheet.png";
	background.onload = function(){
		ctx.drawImage(background, 0, 0, 550, 400);
	}
	ducks.onload = function(){
		ctx.drawImage(ducks, 0, 120, 32, 32, 200, 128, 32, 32);
		ctx.drawImage(ducks, 128, 152, 32, 32, 350, 170, 32, 32);
	}
}