 /* --------------------------------------- КАРТА -----------------------------------------------*/
function cart(obj){
	if (obj == undefined){
		obj = {};
 	}
	this.name = (obj.name!=undefined) ? obj.name : "Карта";
	this.node = false;
	/* Основные параметры для механики игры */
	this.live_value = 1; // Жизни
	this.max_live_value = 1; // Жизни
	this.strong_value = 1; // Сила атаки
	this.defense_value = 0; // Оборона/Защита
	this.distanse_attack_value = 1; // Дистанция атаки
	this.type = "warrion";
	this.max_live((obj.live!=undefined) ? obj.live : 3);
	this.live((obj.live!=undefined) ? obj.live : 1);
	this.strong((obj.strong!=undefined) ? obj.strong : 1);
	this.defense((obj.defense!=undefined) ? obj.defense : 0);
	
};

cart.prototype.max_live = function(value){
	if (!arguments.length) return this.max_live_value;
	if (value < 0) { value = 0} // Макс жизнь не может быть меньше нуля
	this.max_live_value = value;
}
cart.prototype.live = function(value){
	if (!arguments.length) return this.live_value;
	if (value > this.max_live_value) {value = this.max_live_value;}
	this.live_value = value;
}
cart.prototype.strong = function(value){
	if (!arguments.length) return this.strong_value;
	if (value < 1) {value = 1} // Макс сила не может быть меньше 1
	this.strong_value = value;
}
cart.prototype.defense = function(value){	
	if (!arguments.length) return this.defense_value;
	if (value < 0) {value = 0} // Макс жизнь не может быть меньше нуля
	this.defense_value = value;
}
cart.prototype.distanse_attack = function(value){	
	if (!arguments.length) return this.distanse_attack_value;
	if (value < 1) {value = 1} // Макс сила не может быть меньше 1
	this.distanse_attack_value = value;
}

/** Построение html */ 
cart.prototype.getInnerHtml = function(){
	var innerHtml = '<div class="cart-front">'
					   +  this.name + '<br/>'
					   +  this.live() + '<br/>'
					   +  this.strong() + '<br/>'
					   +  this.defense() + '<br/>'
					+ '</div>'
					+ '<div class="cart-back"></div>';
	return innerHtml;
}
/** Создать узел */ 
cart.prototype.setNode = function(){
	var cartNode = document.createElement('div');
	cartNode.className = "cart";
	cartNode.innerHTML = this.getInnerHtml();
	this.node = cartNode;
	return this.node;
 }
 /** Получить узел */  
cart.prototype.getNode = function(){
	if (!this.node){
	   return this.setNode();
	}
	return this.node;
}
 /** Показать что карта доступна для выбора*/  
cart.prototype.viewCanSelect = function(level){
	if (level == undefined || level<1) level = 1; 
	// если level 1 подсвечиваем карту которая будет делать действие 
	// если level 2 подсвечиваем свою карту которая будет принимать положительное действие
	// если level 3 подсвечиваем вражескую карту, которая будет принимать отрицательное действие
	this.getNode().classList.add("cart__can-selected-level-1");
 }
  /** Показать что карта выбрана*/
cart.prototype.viewSelected = function(level){
	if (level == undefined || level<1) level = 1; 
	// если level 1 подсвечиваем карту которая будет делать действие 
	// если level 2 подсвечиваем свою карту которая будет принимать положительное действие
	// если level 3 подсвечиваем вражескую карту, которая будет принимать отрицательное действие
	this.getNode().classList.remove("cart__can-selected-level-1");
	this.getNode().classList.add("cart__selected-level-1");
 }

 /* --------------------------------------- КОЛОДА КАРТ -----------------------------------------------*/
function koloda(){
	this.init = function(){
		this.carts = [
			new cart({name:'Юлия',strong:2,live:2}),
			new cart({name:'Юличка',strong:2,live:2}),
			new cart({name:'Оля',strong:1,live:3}),
			new cart({name:'Олечка',strong:1,live:3}),
			new cart({name:'Ева',strong:2,live:1}),
			new cart({name:'Евачка',strong:2,live:1}),
			new cart({name:'Владимир',strong:1,live:1}),
			new cart({name:'Вова',strong:1,live:1}),
		   ];
	}
	return this.init();
}
koloda.prototype.getCarts = function (count){
	if (count==undefined || isNaN(count) || count<=0) count = 0; 
	 var carts = this.carts;
	var return_carts = []; 
	for (var i = 1; i<=count; i++){
		var rand = Math.floor(Math.random() * carts.length);
		 return_carts.push(carts.splice(rand,1)[0]);
	}
	
	 return return_carts;
}
 /* --------------------------------------- ЯЧЕЙКА -----------------------------------------------*/
 function cellCart(col,row,cart_obj){
 	this.row = row;
 	this.col = col;
 	this.cart = false;
	//this.cart = new cart({name:'Дама',strong:12}); // Временно
	this.node = false;
	if (cart_obj != undefined && cart_obj != false){
		this.setCart(cart_obj);
	}
 };
 cellCart.prototype.setCart = function(cart_obj){
	this.cart = cart_obj;
}
cellCart.prototype.getCart = function(){
	return this.cart;
}
cellCart.prototype.setNode = function(){
   var cartCellNode = (!this.node) ? document.createElement('div') : this.node;
   cartCellNode.className = "cell-cart";
   cartCellNode.setAttribute("row",this.row);
   cartCellNode.setAttribute("col",this.col);
   if (this.cart!=undefined && this.cart!=false){
		cartCellNode.appendChild(this.cart.getNode());
   }
   this.node = cartCellNode; 
   return this.node;
}
cellCart.prototype.getNode = function(){
	if (!this.node){
	   return this.setNode();
	}
	return this.node;
}
 /* --------------------------------------- ГРУППА ЯЧЕЕК -----------------------------------------------*/
 function blockCells(col,row,inverse){
	 this.col = (col!=undefined && col > 0) ? col : 1;
	 this.row = (row!=undefined && row > 0) ? row : 1;
	 this.inverse = (inverse!=undefined) ? inverse : false;
	 this.cells = [];
	 this.node = false;
	 this.init = function(){	
		for (var j = (this.inverse) ? this.row : 1 ; 
		(this.inverse) ? (j>=1) : (j<=this.row); 
		(this.inverse) ? j-- : j++
		){
			for (var i = 1; i<=this.col; i++){
				this.cells.push(new cellCart(i,j));
			}
		}
		 return true;
	 }

	 
	 return this.init();
 }
 blockCells.prototype.setNode = function(){
	var blockCellsNode = document.createElement('div');
	blockCellsNode.className = "block-cells";
	// Идем построчно
	for (var i = (this.inverse) ? this.row : 1 ; 
		(this.inverse) ? (i>=1) : (i<=this.row); 
		(this.inverse) ? i-- : i++
	){
		var blockCellsRowNode = document.createElement('div');
		blockCellsRowNode.className = 'block-cells__row';
		this.cells.forEach(function(item){
			if (item.row==i){ // Выбираем только те ячейки которык должны быть в этой строке
				blockCellsRowNode.appendChild(item.getNode());
			}
		});
		blockCellsNode.appendChild(blockCellsRowNode);
	}
	//this.node = blockCellsNode;
	//return this.node;
	return blockCellsNode;
 }
 blockCells.prototype.getNode = function(){
	 if (!this.node){
		return this.setNode();
	 }
	 return this.node;
 }
 blockCells.prototype.getCell = function(col,row){ 
	var num = (!this.inverse) ? this.col*(row-1)+(col-1) : this.col*(this.row - row)+(col-1); 
	
	console.log(col,row,num);
	console.log(this.cells);
	if (this.cells[num]==undefined){
		console.error("Нет такой ячейки");
	}
	return this.cells[num];
 };
 
/**
* Выборка ячеек по необходимым параметрам выборки
* @param {object} obj - параметры выборки
* @return {array} выбранные ячейки
*/
 blockCells.prototype.queryCell = function(query){ 

	//Проверка на расстояние от края максимальное
	 var distanse = (query.distanse != undefined) ? query.distanse : 100;
	 // проверка на строку
	 var row = (query.row != undefined) ? query.row : false;
	 // проверка на столбец
	 var col = (query.col != undefined) ? query.col : false;
	 //проверка на наличие карты
	
	 var cells = [];
	 this.cells.forEach(function(item){
		var bAdd = true;
		if (item.row>distanse){ bAdd = false} // Достаточна ли дистанция	
		else if (row && item.row!=row){ bAdd = false} // Строка
		else if (col && item.col!=col){ bAdd = false} // Строка
		else if (query.cart === false && item.cart !== false) {bAdd = false} // Карта ячейки (нет)
		else if (query.cart === true && item.cart === false){ bAdd = false} // Карта (tсть)

		if (bAdd){
			cells.push(item);
		}
	 });
	 return cells;
}
 /*--------------- КАРТА ИГРОКА ------------------------------------*/
 function playerProfile(obj){
	if (obj == undefined){
		obj = {};
	}
	this.node = false;
	this.name = "Игрок";
	this.cells = [new cellCart(1,1,new cart({name:"Игрок"}))];
	this.inverse = false;
	this.nps = (obj.nps!=undefined) ? obj.nps : true;
	this.opponent = (obj.opponent!=undefined) ? obj.opponent : false;
}

playerProfile.prototype = Object.create(blockCells.prototype);
playerProfile.prototype.setNode = function(){
   var playerNode = document.createElement('div');
   playerNode.className = "player";
   playerNode.innerHTML = '';
   playerNode.appendChild(this.cells[0].getNode());
   this.node = playerNode;
   return this.node;
} 
 /*--------------- ИГРОВАЯ ЗОНА ИГРОКА (его половина стола) ------------------------------------*/
 function halfTable(obj){
	if (obj == undefined){
		obj = {};
	 }
 	this.name = (obj.inverse!=undefined) ? obj.inverse : false;
 	this.arena_row = (obj.arena_row!=undefined) ? obj.arena_row : 3;
 	this.arena_col = (obj.arena_col!=undefined) ? obj.arena_col : 4;
	this.bAddCart = false; // была ли уже добавлена карта???
	this.selectedCart = false; // Выбранная 
	this.spells_col = (obj.spells_col!=undefined) ? obj.spells_col : 3;
 	this.items_col = (obj.items_col!=undefined) ? obj.items_col : 3;
 	this.node = false;
	this.inverse = (obj.inverse!=undefined) ? obj.inverse : false; // Перевернем или нет

 	this.arena = new blockCells(this.arena_col,this.arena_row,this.inverse);
 	this.spells = new blockCells(this.spells_col);
	this.items = new blockCells(this.items_col);
	this.player = new playerProfile();
	this.koloda = new koloda();
 }

// Получить карты из колоды
halfTable.prototype.getCartsFromColoda = function(count){
if (count==undefined || isNaN(count) || count<=0) count = 0; 
return this.koloda.getCarts(count);
}
// Заполним первую строку картами
halfTable.prototype.fillFirstRow = function(){
var carts = this.getCartsFromColoda(this.arena_col);
//console.log(carts);
//console.log(this.arena_col);
for(var i = 1; i<=this.arena_col;i++){
	var selectCell = this.arena.getCell(i,1);
		console.log(selectCell);
		selectCell.setCart(carts.shift());
		selectCell.setNode();
}
// Продолдим потом ....
}
 function log(){
	 this.add = function(mess){
		console.log(mess);
	 }
 }
 var log = new log();