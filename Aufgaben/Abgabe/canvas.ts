const canvas = <HTMLCanvasElement> document.getElementById('pitch'),
 ctx: CanvasRenderingContext2D = canvas.getContext('2d'),
 homePlayerSelect = <any>document.getElementById('selectHomePlayer'),
 guestPlayerSelect= <any>document.getElementById('selectGuestPlayer'),
 formsH = <HTMLElement>document.getElementById("formsH"),
 formsG = <HTMLElement>document.getElementById("formsG"),
 selectHomeSub = <HTMLInputElement>document.getElementById("selectHomeSub"),
 selectGuestSub = <HTMLInputElement>document.getElementById("selectGuestSub"),
 subListH = <HTMLInputElement>document.getElementById("selectHomeSub"),
 subListG = <HTMLInputElement>document.getElementById("selectGuestSub"),
 confirmSubH = <HTMLElement>document.getElementById("confirmSubH"),
 confirmSubG = <HTMLElement>document.getElementById("confirmSubG"),
 speedMinH = <any>document.getElementById("speedMinH"),
 speedMaxH = <any>document.getElementById("speedMaxH"),
 speedMinG = <any>document.getElementById("speedMinG"),
 speedMaxG = <any>document.getElementById("speedMaxG"),
 accuracyMinH = <any>document.getElementById("accuracyMinH"),
 accuracyMaxH = <any>document.getElementById("accuracyMaxH"),
 accuracyMinG = <any>document.getElementById("accuracyMinG"),
 accuracyMaxG = <any>document.getElementById("accuracyMaxG"),
 trickotH = <HTMLInputElement>document.getElementById("trickotColorH"),
 trickotG = <HTMLInputElement>document.getElementById("trickotColorG"),
 possession = <HTMLElement>document.getElementById("possession"); // HTML Elements
 
 let phase: boolean = true, //Phase ( Ball or Players Move )
 mousePos: Array<number>, // Mouse Position after click
 deviatedBool: boolean = false,
 deviatedPos: Array<number>, // Coordinates with accuracy of player
 goalsHome: number = 0, // variable counter for goals (used for scoreboard)
 goalsGuest: number = 0, 
 goalScored: boolean = false; // variable to decide if a goal is scored => rest player positions


formsH.style.display = "none";
formsG.style.display = "none";
selectHomeSub.style.display = "none";
selectGuestSub.style.display = "none";
confirmSubH.style.display = "none";
confirmSubG.style.display = "none"; // hide elements (confirm button etc)



class player {
  number: number; //atributes of this class
  team: string;
  speed: number;
  startingX: number;
  startingY: number;
  accuracy: number;
  x: number;
  y: number;
  possession: boolean;
  trickotColor: string;
  name: string;
  constructor(number, team, speed, startingX, startingY, accuracy, possession, trickotColor, name) {  //gets called when we create a new player
    this.number = number;
    this.team = team;
    this.speed = speed;
    this.startingX = startingX;
    this.startingY = startingY;
    this.accuracy = accuracy;
    this.x = startingX;
    this.y = startingY;
    this.possession = possession;
    this.trickotColor = trickotColor;
    this.name = name;
  }
  draw(ctx): void { //draws player
    ctx.beginPath();
    ctx.strokeStyle = this.trickotColor;
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
    ctx.font = '8pt Calibri';
    ctx.stroke();
    ctx.textAlign = "center"; //positions number in middle of circle
    ctx.fillText(this.number, this.x, this.y);
    ctx.closePath();
  }

}

class ball {
  x: number;
  y: number;
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
  }


  draw(ctx): void { //draws the balls
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#FFFF00";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.closePath();
  }
}

class referee {  //analog to player
  speed: number;
  x: number;
  y: number;
  constructor(speed, startingX, startingY) {
    this.speed = speed;
    this.x = startingX;
    this.y = startingY;
  }

  draw(ctx): void {
    ctx.beginPath();
    ctx.strokeStyle = "#42f5e9";
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
  }
}

class assistant {  //analog
  speed: number;
  startingX: number;
  startingY: number;
  x: number;
  y: number;
  constructor(speed, startingX, startingY) {
    this.speed = speed;
    this.startingX = startingX;
    this.startingY = startingY;
    this.x = startingX;
    this.y = startingY;
  }

  draw(ctx): void {
    ctx.beginPath();
    ctx.strokeStyle = "#42f5e9";
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
  }


}

class pitch {
  constructor() {
  }

  draw(ctx):void {
    // Outer lines
    ctx.beginPath(); //begin to draw
    ctx.rect(0, 0, canvas.width, canvas.height); //draw rectangle
    ctx.fillStyle = "#060"; //set fill color (green)
    ctx.fill(); //fill the element
    ctx.lineWidth = 1; //width of drawn line
    ctx.strokeStyle = "#FFF"; //set color to white
    ctx.stroke(); //draw
    ctx.closePath(); //stop drawing

    ctx.fillStyle = "#FFF";

    // Mid line
    ctx.beginPath(); 
    ctx.moveTo(canvas.width / 2, 0); //move "drawer" to starting position
    ctx.lineTo(canvas.width / 2, canvas.height); //create line to this position
    ctx.stroke(); //draw the line
    ctx.closePath();

    //Mid circle
    ctx.beginPath() 
    ctx.arc(canvas.width / 2, canvas.height / 2, 73, 0, 2 * (Math.PI), false); //draw full circle
    ctx.stroke(); //execute drawing
    ctx.closePath();
    //Mid point
    ctx.beginPath() //analog
    ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();

    //Home penalty box
    ctx.beginPath();  //analog
    ctx.rect(0, (canvas.height - 322) / 2, 132, 322);
    ctx.stroke();
    ctx.closePath();
    //Home goal box
    ctx.beginPath();  //analog
    ctx.rect(0, (canvas.height - 146) / 2, 44, 146);
    ctx.stroke();
    ctx.closePath();
    //Home goal  //anlog
    ctx.beginPath();
    ctx.moveTo(1, (canvas.height / 2) - 22);
    ctx.lineTo(1, (canvas.height / 2) + 22);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    ctx.lineWidth = 1;

    //Home penalty point  //analog
    ctx.beginPath()
    ctx.arc(88, canvas.height / 2, 1, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.closePath();
    //Home half circle
    ctx.beginPath()
    ctx.arc(88, canvas.height / 2, 73, 0.29 * Math.PI, 1.71 * Math.PI, true);
    ctx.stroke();
    ctx.closePath();

    //Away penalty box
    ctx.beginPath();
    ctx.rect(canvas.width - 132, (canvas.height - 322) / 2, 132, 322);
    ctx.stroke();
    ctx.closePath();
    //Away goal box
    ctx.beginPath();
    ctx.rect(canvas.width - 44, (canvas.height - 146) / 2, 44, 146);
    ctx.stroke();
    ctx.closePath();
    //Away goal 
    ctx.beginPath();
    ctx.moveTo(canvas.width - 1, (canvas.height / 2) - 22);
    ctx.lineTo(canvas.width - 1, (canvas.height / 2) + 22);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    ctx.lineWidth = 1;
    //Away penalty point
    ctx.beginPath()
    ctx.arc(canvas.width - 88, canvas.height / 2, 1, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.closePath();
    //Away half circle
    ctx.beginPath()
    ctx.arc(canvas.width - 88, canvas.height / 2, 73, 0.71 * Math.PI, 1.29 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();

    //Home L corner
    ctx.beginPath()
    ctx.arc(0, 0, 8, 0, 0.5 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
    //Home R corner
    ctx.beginPath()
    ctx.arc(0, canvas.height, 8, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.closePath();
    //Away R corner
    ctx.beginPath()
    ctx.arc(canvas.width, 0, 8, 0.5 * Math.PI, 1 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
    //Away L corner
    ctx.beginPath()
    ctx.arc(canvas.width, canvas.height, 8, 1 * Math.PI, 1.5 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
  }


}

let field = new pitch();  //create a pitch
let playball = new ball(); //create the ball
let Neuer = new player(1, "home", 150, 40, canvas.height/2, 100, false, "#0047AB", "Neuer"); //create player
let Ruediger = new player(2, "home", 150, 190, 260, 100, false, "#0047AB", "Ruediger");
let Hummels = new player(5, "home", 150, 260, 60, 100, false, "#0047AB", "Hummels");
let Ginter = new player(4, "home", 150, 285, 250, 100, false, "#0047AB", "Ginter");
let Gosens = new player(20, "home", 150, 280, 440, 100, false, "#0047AB", "Gosens");
let Kroos = new player(8, "home", 150, 500, 120, 100, false, "#0047AB", "Kroos");
let Guendogan = new player(21, "home", 150, 530, 460, 100, false, "#0047AB", "Guendogan");
let Kimmich = new player(6, "home", 150, 660, 85, 100, false, "#0047AB", "Kimmich");
let Harvertz = new player(7, "home", 150, 610, 260, 100, false, "#0047AB", "Harvertz");
let Mueller = new player(25, "home", 150, 710, 180, 100, false, "#0047AB", "Mueller");
let Gnabry = new player(10, "home", 150, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Gnabry");
let Halstenberg = new player(3, "home", 100, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Halstenberg");
let Volland = new player(9, "home", 100, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Volland");
let Goretzka = new player(18, "home", 100, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Goretzka");
let Trapp = new player(22, "home", 100, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Trapp");
let Werner = new player(11, "home", 100, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Werner");
let Patricio = new player(1, "guest", 100, 760, 270, 100, false, "#FF0000", "Patricio");
let Semedo = new player(2, "guest", 100, 650, 75, 100, false, "#FF0000", "Semedo");
let Pepe = new player(3, "guest", 100, 625, 270, 100, false, "#FF0000", "Pepe");
let Dias = new player(4, "guest", 100, 630, 425, 100, false, "#FF0000", "Dias");
let Guerreiro = new player(5, "guest", 100, 480, 90, 100, false, "#FF0000", "Guerreiro");
let Pereira = new player(13, "guest", 100, 390, 405, 100, false, "#FF0000", "Pereira");
let Silva = new player(10, "guest", 100, 315, 85, 100, false, "#FF0000", "Silva");
let Fernandes = new player(11, "guest", 100, 250, 260, 100, false, "#FF0000", "Fernandes");
let Carvalho = new player(14, "guest", 100, 480, 280, 100, false, "#FF0000", "Carvalho");
let Jota = new player(21, "guest", 100, 140, 130, 100, false, "#FF0000", "Jota");
let Ronaldo = new player(7, "guest", 100, 140, 380, 100, false, "#FF0000", "Ronaldo");
let Goncalves = new player(19, "guest", 100, 140, 380, 100, false, "#FF0000", "Goncalves");
let Lopes = new player(12, "guest", 100, 140, 380, 100, false, "#FF0000", "Lopes");
let Dalot = new player(20, "guest", 100, 140, 380, 100, false, "#FF0000", "Dalot");
let Sanches = new player(16, "guest", 100, 140, 380, 100, false, "#FF0000", "Sanches");
let Neves = new player(18, "guest", 100, 140, 380, 100, false, "#FF0000", "Neves");

let assistantTop = new assistant(100, canvas.width / 2, 0.5);
let assistantBot = new assistant(100, canvas.width / 2, canvas.height-0.5);
let ref = new referee(80, canvas.width/20 + 80, canvas.height/2 + 80);

let activePlayers = [Neuer, Ruediger, Hummels, Ginter, Gosens, Kroos, Guendogan, Kimmich, Harvertz, Mueller, Gnabry, Patricio, Semedo, Pepe, Dias, Guerreiro, Pereira, Silva, Fernandes, Carvalho, Jota, Ronaldo];  //save all players that are currently playing
let activeH = [Neuer, Ruediger, Hummels, Ginter, Gosens, Kroos, Guendogan, Kimmich, Harvertz, Mueller, Gnabry]; //active home players
let activeG = [Patricio, Semedo, Pepe, Dias, Guerreiro, Pereira, Silva, Fernandes, Carvalho, Jota, Ronaldo]; //active guest players
let substitutesH = [Halstenberg, Volland, Goretzka, Trapp, Werner]; //subs of home team
let substitutesG = [Goncalves, Lopes, Dalot, Sanches, Neves]; //subs of guest team

function fillActiveHome() : void { //fills select box with active players
  for (let i = 0; i < activeH.length; i++) { //iterate over array
    let hplayer = activeH[i].name; //save name of player
    let el = document.createElement("option"); //new option in select box
    el.textContent = hplayer;  
    el.value = hplayer;
    homePlayerSelect.appendChild(el); //add option
  };
}


function fillActiveGuest() : void{  //analog
  for (let i = 0; i < activeG.length; i++) {
    let gplayer = activeG[i].name;
    let el = document.createElement("option");
    el.textContent = gplayer;
    el.value = gplayer;
    guestPlayerSelect.appendChild(el);
  };
}


function fillSubHome() : void { //analog
  for (let i = 0; i < substitutesH.length; i++) {
    let shplayer = substitutesH[i].name;
    let el = document.createElement("option");
    el.textContent = shplayer;
    el.value = shplayer;
    subListH.appendChild(el);
  };
}


function fillSubGuest() : void{ //analog
  for (let i = 0; i < substitutesG.length; i++) {
    let sgplayer = substitutesG[i].name;
    let el = document.createElement("option");
    el.textContent = sgplayer;
    el.value = sgplayer;
    subListG.appendChild(el);
  };
}
fillActiveHome(); //initialize lists
fillActiveGuest();
fillSubHome();
fillSubGuest();

function changeTrickotH(): void { //used to change trickot colors for home team

  let players: Array<any> = activeH.concat(substitutesH);
  for (let i = 0; i < players.length; i++) { //iterate over all home team players
    switch (trickotH.value) { //decide what color gets set
      case "Black":
        players[i].trickotColor = "#000000"; //set color to black
        break;
      case "Blue":
        players[i].trickotColor = "#0000ff";
        break;
      case "Green":
        players[i].trickotColor = "#00ff00";
        break;
      case "Purple":
        players[i].trickotColor = "#a020f0";
        break;
      case "Red":
        players[i].trickotColor = "#ff0000";
        break;
    }
  }
  redraw(); //redraw the field and players
}

function changeTrickotG(): void{ //analog

  let players: Array<any> = activeG.concat(substitutesG);
  for (let i = 0; i < players.length; i++) {
    switch (trickotG.value) {
      case "Black":
        players[i].trickotColor = "#000000";
        break;
      case "Blue":
        players[i].trickotColor = "#0000ff";
        break;
      case "Green":
        players[i].trickotColor = "#00ff00";
        break;
      case "Purple":
        players[i].trickotColor = "#a020f0";
        break;
      case "Red":
        players[i].trickotColor = "#ff0000";
        break;
    }
  }
  redraw();
}

function showHomeSub():void { 
  selectHomeSub.style.display = "block"; //displays select box for substitutes 
  confirmSubH.style.display = "block"; //displays confirm button
}

function showGuestSub():void {//analog
  selectGuestSub.style.display = "block";
  confirmSubG.style.display = "block";
}

function cancelSubHome(): void { //removes visibilty of buttons
  confirmSubH.style.display = "none";
  subListH.style.display = "none";
}

function cancelSubGuest():void {
  confirmSubG.style.display = "none";
  subListG.style.display = "none";
}

function cancelAttributesH():void {
  formsH.style.display = "none";
}

function cancelAttributesG(): void {
  formsG.style.display = "none";
}

function randomNumber(min, max) {
  let a = Math.floor(min);
  let b = Math.floor(max);
  let c;
  if(a > b){
    c = b;
    b = a;
    a = c;
  }
  return Math.floor(Math.random() * (b - a)) + a;
}

function confirmAttributesH():void { 
  let speedMin = speedMinH.value; //selected speed value
  let speedMax = speedMaxH.value; //selected speed value
  if(speedMin < 0){
    speedMin = 0;
  }
  let accuracyMax = accuracyMaxH.value; //selected accuracy value
  let accuracyMin = accuracyMinH.value; //selected accuracy value
  if(accuracyMax > 100){
    accuracyMax = 100;
  }
  if(accuracyMin < 0){
    accuracyMin = 0;
  }
  let homePlayer; 
  let speed = randomNumber(speedMin, speedMax) //calculate random number between min and max
  let accuracy = randomNumber(accuracyMin, accuracyMax); //calculate random number between min and max
  for (let i = 0; i < activeH.length; i++) { //get selected player
    if (activeH[i].name == homePlayerSelect.value) {
      homePlayer = activeH[i]; //set selected player
    }
  }
  homePlayer.speed = speed; //set speed 
  homePlayer.accuracy = accuracy;
  formsH.style.display = "none"; //hide buttons
}

function confirmAttributesG():void { //analog
  let speedMin = speedMinG.value; //selected speed value
  let speedMax = speedMaxG.value; //selected speed value
  if(speedMin < 0){
    speedMin = 0;
  }
  let accuracyMin = accuracyMinG.value; //selected accuracy value
  let accuracyMax = accuracyMaxG.value; //selected accuracy value
  if(accuracyMax > 100){
    accuracyMax = 100;
  }
  if(accuracyMin < 0){
    accuracyMin = 0;
  }
  let accuracy = randomNumber(accuracyMin, accuracyMax); //calculate random number between min and max
  let guestPlayer;
  let speed = randomNumber(speedMin, speedMax); //calculate random number between min and max
  console.log(accuracy);
  console.log(speed);
  for (let i = 0; i < activeG.length; i++) {
    if (activeG[i].name == guestPlayerSelect.value) {
      guestPlayer = activeG[i];
    }
  }
  guestPlayer.accuracy = accuracy;
  guestPlayer.speed = speed;
  formsG.style.display = "none";
}

function changeAttributesH():void {
  let name = homePlayerSelect.value; //get selected players name
  let player; // variable for object
  for (let i = 0; i < activeH.length; i++) {
    if (activeH[i].name == name) {
      player = activeH[i]; //set selected player
    }
  }
  formsH.style.display = "block"; //show the slides
}

function changeAttributesG():void { //analog
  let name = guestPlayerSelect.value;
  let player;
  for (let i = 0; i < activeH.length; i++) {
    if (activeG[i].name == name) {
      player = activeG[i];
    }
  }
  formsG.style.display = "block";
}

function confirmSubHome():void {
  let e: any = homePlayerSelect.value; //saves the name of selected player
  let f: any = selectHomeSub.value; //saves the name of selected sub
  let x: number;
  let y: number; 
  for (let i = 0; i < activeH.length; i++) { //iterate over all active players
    if (activeH[i].name == e) { //check if name equals selected players name
      substitutesH.push(activeH[i]); //add selected player to substitutes
      x = activeH[i].x; //saves x coordinate from active player
      y = activeH[i].y; //saves y coordinate from active player
      activeH.splice(i, 1); //remove selected player from active players
      for (let k = 0; k < activePlayers.length; k++) { 
        if (activePlayers[k].name == e) {
          activePlayers.splice(k, 1);
        }
      }
    }
  }
  for (let i = 0; i < substitutesH.length; i++) { //iterates over all substitutes 
    if (substitutesH[i].name == f) { //check if names equals selected substitutes
      substitutesH[i].x = x; //set x coordinate to x coordinate of selected active player
      substitutesH[i].y = y;
      activeH.push(substitutesH[i]); //add player to active home players
      activePlayers.push(substitutesH[i]); //add player to active players
      substitutesH.splice(i, 1); //remove player from substitutes list
    }
  }
  emptySelect(homePlayerSelect); //removes all elements from select box
  emptySelect(selectHomeSub);
  fillActiveHome(); //adds all allements to select box
  fillSubHome();
  redraw(); 
  confirmSubH.style.display = "none"; //hides select box and buttons
  selectHomeSub.style.display = "none";
}

function confirmSubGuest(): void { //analog
  let e: any = guestPlayerSelect.value;
  let f: any = selectGuestSub.value;
  let x: number;
  let y: number;
  for (let i = 0; i < activeG.length; i++) {
    if (activeG[i].name == e) {
      substitutesG.push(activeG[i]);
      x = activeG[i].x;
      y = activeG[i].y;
      activeG.splice(i, 1);
      for (let k = 0; k < activePlayers.length; k++) {
        if (activePlayers[k].name == e) {
          activePlayers.splice(k, 1);
        }
      }
    }
  }
  for (let i = 0; i < substitutesG.length; i++) {
    if (substitutesG[i].name == f) {
      substitutesG[i].x = x;
      substitutesG[i].y = y;
      activeG.push(substitutesG[i]);
      activePlayers.push(substitutesG[i]);
      substitutesG.splice(i, 1);
    }
  }
  emptySelect(guestPlayerSelect);
  emptySelect(selectGuestSub);
  fillActiveGuest();
  fillSubGuest();
  redraw();
  confirmSubG.style.display = "none";
  selectGuestSub.style.display = "none";
}

function redraw():void { //redraws all elements
  ctx.clearRect(0, 0, innerWidth, innerHeight); //clears everything
  field.draw(ctx); //draws new field
  playball.draw(ctx); //draws the ball
  activePlayers.forEach(element => { element.draw(ctx); }); //draws all players
  assistantTop.draw(ctx); //draws the assistants
  assistantBot.draw(ctx);
  ref.draw(ctx); //draw referee
}

function emptySelect(box):void { //empties a select box
  let length = box.options.length;
  for (let i = length - 1; i >= 0; i--) {
    box.options[i] = null;
  }
}


function assistantMovement(assistant): void { //updates position of assistant
  if(assistant.x > playball.x){
    assistant.x -= assistant.speed / 100;
  }
  if(assistant.x < playball.x){
    assistant.x += assistant.speed / 100;
  }
}

function refereeMovement(ref): void { //analog

  if(ref.x > playball.x + 80){
    ref.x -= ref.speed / 100;
  }
  if(ref.y > playball.y + 80){
    ref.y -= ref.speed / 100;
  }
  if(ref.x < playball.x - 80){
    ref.x += ref.speed / 100;
  }
  if(ref.y < playball.y - 80){
    ref.y += ref.speed / 100;
  }
}

function getMousePosition(canvas, event): Array<number> {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  return [x, y];
}



canvas.addEventListener("mousedown", function (e) {
  mousePos = getMousePosition(canvas, e); //save mouse coordinates
  play(); //call main function
});

function assistantAnimation(): void { //animate movement of assistant
  assistantMovement(assistantTop); //update position
  assistantMovement(assistantBot);
  redraw(); //redraw to show new positions
  requestAnimationFrame(assistantAnimation); //recursive call
}
function refereeAnimation(): void { //analog
  refereeMovement(ref);
  redraw();
  requestAnimationFrame(refereeAnimation);
}

function playerAnimation(): void {
  for (let i = 0; i < activePlayers.length; i++) {
    if (playerMovement(activePlayers[i])) { //check if a player has reached the ball
      return; //cancel movements
    }
  };
  redraw();
  requestAnimationFrame(playerAnimation);
}


function playerMovement(player): boolean { //moves players
  let distance = Math.abs((playball.x - player.x) +  (playball.y - player.y)); //distance to ball
  if (distance <= 240) { //canvas field is 8 times bigger than real live field => radius of 30 times 8 cause realtion of real field to canvas is 1/8
    let vector = [((playball.x - player.x) / distance), ((playball.y - player.y) / distance)]; //vector for movement
    player.x += vector[0] * (player.speed/100); //update x position of player
    player.y += vector[1] * (player.speed/100); //update y position of player
    if (distance <= 2) { //check if player has reached the ball
      player.possession = true; //player now is in possession of ball
      goalScored = false; // set variable to false cause no goal is scored
      possession.innerHTML = player.name; //update name in possession html element
      return true; // return true because now a player is in possession of the ball
    }
  } else {
    let distance = Math.abs((player.startingX - player.x) + (player.startingY - player.y));
    if (distance >= 2) {
      let vector = [((player.startingX - player.x) / distance), ((player.startingY - player.y) / distance)];
      player.x += vector[0] * (player.speed/100);
      player.y += vector[1] * (player.speed/100);
    }
  }
}

function ballAnimation(): void { 
  for (let i = 0; i < activeH.length; i++) { //check if any player has possession
    if (activeH[i].possession == true) {
      if(!deviatedBool){  // check if deviated pos is still set (goal scenario)
        deviatedPos = ballDeviation(activeH[i], mousePos); // calculate new deviatedPos
        deviatedBool = true;  //set variable to true
      }

      if (ballMovement(activeH[i])) { 
        return;
      }

    }
  };

  for (let i = 0; i < activeG.length; i++) {
    if (activeG[i].possession == true) {
      if(!deviatedBool){
        deviatedPos = ballDeviation(activeG[i], mousePos);
        deviatedBool = true;        
      }
      if (ballMovement(activeG[i])) { //check if goal was scored
        return;
      }


    };
  }
  requestAnimationFrame(ballAnimation); //recursive call
}


function ballMovement(player): boolean { 
  let distance: number = Math.abs((deviatedPos[0] - playball.x) + (deviatedPos[1] - playball.y)); //check distance of ball to its desired position
  let vector = [((deviatedPos[0] - playball.x) / distance), ((deviatedPos[1] - playball.y) / distance)]; //calculate vector for movement
  let bool1: boolean  = (canvas.height / 2) - 21 <= playball.y; //check if ball has crossed the goal line
  let bool2: boolean = playball.y <= (canvas.height / 2) + 21;
  let bool3: boolean = (canvas.height / 2) - 21 <= playball.y;
  let bool4: boolean = playball.y <= (canvas.height / 2) + 21 ;
  playball.x += vector[0] * (0.1 + distance / 40); //calculate new position of ball
  playball.y += vector[1] * (0.1 + distance / 40);
  redraw();




  if(playball.x < 1 && bool1 && bool2 && !goalScored){
    goalsGuest++;
    document.getElementById("guestGoals").innerHTML = ""+ goalsGuest;
    reset();
    return true;
  } else if(playball.x > canvas.width - 1 && bool3 && bool4 && !goalScored){
    goalsHome++;
    document.getElementById("homeGoals").innerHTML = "" + goalsHome;
    reset();
    return true;
  }

  if (distance <= 1) { 
    player.possession = false;
    deviatedBool = false;
    return true;
  }
}

function ballDeviation(player, mousePos): Array<number>{  //calculate position where ball actually ends up
    let distance = Math.abs((mousePos[0]-playball.x)+(mousePos[1]-playball.y)), //calcuate distance
    maxDeviation = (distance / 1.5) * (1-player.accuracy/100), //calculate max deviation
    posXrange = [mousePos[0] - maxDeviation/2, mousePos[0] + maxDeviation/2], //calculate possible x values
    posYrange = [mousePos[1] - maxDeviation/2, mousePos[1] + maxDeviation/2], //calculate possible y values
    randomX = (Math.random() * (posXrange[1] - posXrange[0]) + posXrange[0]).toFixed(4), //calculate random position within this range
    randomY = (Math.random() * (posYrange[1] - posYrange[0]) + posYrange[0]).toFixed(4),
    deviatedPos = [randomX, randomY]; //array with final x and y value
    
    return deviatedPos; //return position where ball will end up
}

function reset(): void { //resets all elements to default position
  activePlayers.forEach(element => {
    element.x = element.startingX;
    element.y = element.startingY;
  });
  playball.x = canvas.width / 2;
  playball.y = canvas.height / 2;
  deviatedBool = false;
  redraw();
}

function play(): void { //main function
  if (phase) { //check if players should move or ball should move
    playerAnimation(); //move players with animation
    assistantAnimation();
    refereeAnimation();
    phase = false ; //add +1 to phase so next time ball moves
  } else {
    ballAnimation(); // move ball with animation
    phase = true;
  }

}
(function (): void {

  field.draw(ctx);
  playball.draw(ctx);
  activePlayers.forEach(element => { element.draw(ctx); });
  assistantTop.draw(ctx);
  assistantBot.draw(ctx);
  ref.draw(ctx);

})();

