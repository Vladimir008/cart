// сarta
function cart(obj){
	if (obj == undefined){
		obj = {};
 	}
 	if (obj.name != undefined){ this.name = obj.name; }
 	else {this.name = 'Карта треф';}
	// Жизни
 	if (obj.live != undefined){this.live = obj.live;}
	else {this.live = 1;}
	// Сила атаки
 	if (obj.strong != undefined){this.strong = obj.strong;}
	else{this.strong = 1;}
 	// Защита 
 	if (obj.defense != undefined){this.defense = obj.defense;}
	else{this.defense = 0;}
};

//Колода карт
function koloda(){

	 this.carts = [
	  new cart({name:'Карта1'}),
	  new cart({live:3}),
	  new cart({name:'Дама',strong:12}),
	  new cart({name:'Король',live:12}),
	  new cart({name:'Дама2',strong:12}),
	  new cart({name:'Дама3',strong:12}),
	  new cart({name:'Дама4',strong:12}),
	  new cart({name:'Дама5',strong:12}),
	  new cart({name:'Дама6',strong:12}),
	  new cart({name:'Дама7',strong:12}),
	 ];
	 this.getCart = function (){
	 	 var carts = this.carts;
	 	 var rand = Math.floor(Math.random() * carts.length);
    return carts.splice(rand,1)[0];
	 }
	 this.n = 3;
}

//ячейка области
 function cellCart(col,row,cart){
 	 this.row = col;
 	 this.col = row;
 	 this.cart = false;
 	 this.setCart = function(cart){
 	 	 this.cart = cart;
 	 }
 	 this.getCart = function(){
 	 	 return this.cart;
 	 }
 	if (cart != undefined && cart != false){
 	 	this.setCart(cart);
 	 }
 };

 // Группа ячейка
 function blockCells(col,row){
	 if (col == undefined){
		 col = 1;
	 }
	 if (row == undefined){
		 row = 1;
	 }
	 this.col = col;
	 this.row = row;
	 this.cells = [];
	 this.init = function(){
		 for (var i = 1; i<=col; i++){
			 for (var j = 1; j<=row; j++){
				 this.cells.push(new cellCart(i,j));
			 }
		 }
		 return true;
	 }
	 return this.init();
 }
 
 // Игровое место (половина стола)
 function halfTable(obj){
	if (obj == undefined){
		obj = {};
 	}
 	this.name = (obj.name!=undefined) ? obj.name : "";
 	this.arena_row = (obj.arena_row!=undefined) ? obj.arena_row : 2;
 	this.arena_col = (obj.arena_col!=undefined) ? obj.arena_col : 3;

 	this.spells_col = (obj.spells_col!=undefined) ? obj.spells_col : 3;
 	this.items_col = (obj.items_col!=undefined) ? obj.items_col : 3;
 }

 
 //console.log(koloda.getCart());