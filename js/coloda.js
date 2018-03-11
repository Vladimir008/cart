 /* --------------------------------------- КАРТА -----------------------------------------------*/
function cart(obj){
	if (obj == undefined){
		obj = {};
 	}
	this.name = (obj.name!=undefined) ? obj.name : "Карта";
	this.node = false;
	/* Основные параметры для механики игры */
	this.changeLive = 0; // Величина изменения жизни
	this.live_value = 1; // Жизни
	this.max_live_value = 1; // Жизни
	this.strong_value = 1; // Сила атаки
	this.defense_value = 0; // Оборона/Защита
	this.distanse_attack_value = 1; // Дистанция атаки
	this.type_block_cell = "arena"; // arena || items || spells
	this.type = "warrion";
	this.max_live((obj.live!=undefined) ? obj.live : 3);
	this.live((obj.live!=undefined) ? obj.live : 1);
	this.strong((obj.strong!=undefined) ? obj.strong : 1);
	this.defense((obj.defense!=undefined) ? obj.defense : 0);
	this.row = false;
	this.col = false;
};

cart.prototype.max_live = function(value){
	if (!arguments.length) return this.max_live_value;
	if (value < 0) { value = 0} // Макс жизнь не может быть меньше нуля
	this.max_live_value = value;
}
cart.prototype.live = function(value){
	if (!arguments.length) return this.live_value;
	if (value > this.max_live_value) {value = this.max_live_value;}
	this.changeLive = value - this.live_value;
	//console.log(this.changeLive);
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
cart.prototype.getInnerHtml = function(showChange){
	var innerHtml = '<div class="cart-front">'
					   +  this.name + '<br/>'
					   +  this.live() + '<br/>'
					   +  this.strong() + '<br/>'
					   +  this.defense() + '<br/>'
					+ '</div>'
					+ '<div class="cart-back"></div>';
	if (showChange && this.changeLive != 0){
		//console.log('Изменение жизни',this.changeLive);
		innerHtml += '<div class="cart-change-info cart-change-info--life cart-change-info--plus">'
				+ this.changeLive
				+ '</div>'; 
	}
	return innerHtml;
}
/** Создать узел */ 
cart.prototype.setNode = function(){
	var cartNode = document.createElement('div');
	cartNode.className = "cart";
	cartNode.innerHTML = this.getInnerHtml(false);
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
 /** обновить узел */ 
cart.prototype.updateNode = function(){
	if (!this.node){
		this.setNode();
	}
	else{
		this.node.innerHTML = this.getInnerHtml(true);
	}
	return this.node;
}
// Получить 
cart.prototype.getRow = function(){
	return this.row;
}
 /** Показать что карта доступна для выбора*/  
cart.prototype.viewCanSelect = function(level){
	if (level == undefined || level<1) level = 1; 
	// если level 1 подсвечиваем карту которая будет делать действие 
	// если level 2 подсвечиваем свою карту которая будет принимать положительное действие
	// если level 3 подсвечиваем вражескую карту, которая будет принимать отрицательное действие
	if (level == 1){
		this.getNode().classList.add("cart__can-selected-level-1");
	}
	else if(level == 2){
		this.getNode().classList.add("cart__can-selected-level-2");
	}
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
 cart.prototype.viewClearSelect = function(){ 
	var classList = this.getNode().classList;  
	classList.remove("cart__can-selected-level-1");
	classList.remove("cart__selected-level-1");
	classList.remove("cart__can-selected-level-2");
	classList.remove("cart__selected-level-2");
	classList.remove("cart__can-selected-level-3");
	classList.remove("cart__selected-level-3");
 }
 
 cart.prototype.basicAttackCart = function(cart){
	cart.live(cart.live() - this.strong());
	cart.updateNode();
	var animateAttack = anime({
		targets: cart.node.querySelector(".cart-change-info--life"),
		opacity:{
			value:[1, 0],
			duration: 500,
			delay:500,
			easing:"easeOutQuint",
		},
		translateY:{
			value:"-40px",
			duration: 500,
			easing:"easeInOutQuad",
		},
	  });
	return 1000;
}

 cart.prototype.attackCart = function(cart){
	var time = this.basicAttackCart(cart);
	return time;
 }
 cart.prototype.counterattackCart = function(cart){
	var time = this.basicAttackCart(cart);
	return time;
 }
 cart.prototype.dead = function(time){
	var node = this.node;
	var animateAttack = anime({
		targets: node,
		opacity:{
			value:[1, 0],
			duration: 700,
			delay:0,
			easing:"easeOutQuint",
		},
	});
	//Потом событие для смерти

	// А потом уже все, очищаем память
	return 700;
 }
 /* --------------------------------------- КОЛОДА КАРТ -----------------------------------------------*/
function koloda(){
	this.init = function(){
		this.carts = [
			new cart({name:'Юлия',strong:2,live:4}),
			new cart({name:'Юличка',strong:2,live:4}),
			new cart({name:'Оля',strong:1,live:4}),
			new cart({name:'Олечка',strong:1,live:4}),
			new cart({name:'Ева',strong:2,live:4}),
			new cart({name:'Евачка',strong:2,live:4}),
			new cart({name:'Владимир',strong:1,live:4}),
			new cart({name:'Вова',strong:1,live:4}),
			new cart({name:'Ева',strong:2,live:4}),
			new cart({name:'Евачка',strong:2,live:4}),
			new cart({name:'Владимир',strong:1,live:4}),
			new cart({name:'Вова',strong:1,live:4}),
			new cart({name:'Ева',strong:2,live:4}),
			new cart({name:'Евачка',strong:2,live:4}),
			new cart({name:'Владимир',strong:1,live:4}),
			new cart({name:'Вова',strong:1,live:4}),
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
	this.cart.row = this.row;
	this.cart.col = this.col;
}
/**
 *  Анимировано добавляет карту в ячейку
 */
cellCart.prototype.addCart = function(cart_obj){
	// TODO Сделать здесь анимацию
	if (this.cart == false){
		this.setCart(cart_obj);
		this.updateNode();
	}
}
cellCart.prototype.getCart = function(){
	return this.cart;
}
cellCart.prototype.setNode = function(){
   var cartCellNode = (!this.node) ? document.createElement('div') : this.node;
   cartCellNode.className = "cell-cart";
   cartCellNode.setAttribute("row",this.row);
   cartCellNode.setAttribute("col",this.col);
   this.node = cartCellNode;  
   this.setInnerNodes();
   
   return this.node;
}
cellCart.prototype.setInnerNodes = function(){
	this.node.innerHTML = '';
	if (this.cart!=undefined && this.cart!=false){
		this.node.appendChild(this.cart.getNode());
   }
}
cellCart.prototype.getNode = function(){
	if (!this.node){
	   return this.setNode();
	}
	return this.node;
}
cellCart.prototype.updateNode = function(){
	if (!this.node){
		this.setNode();
	}
	else{
		this.setInnerNodes();
	}
	return this.node;
}
cellCart.prototype.clearDeadCart = function(){
	var delayTime = this.cart.dead();
	var th = this;
	setTimeout(function(){
		th.clearCart();
	},delayTime);
}
cellCart.prototype.clearCart = function(){
	this.cart = false;
	this.updateNode();
	return true;
}
cellCart.prototype.viewCanAddCart = function(level){
	if (level == undefined || level<1) level = 1;
	// если level 1 подсвечиваем карту которая будет делать действие 
	if (level == 1){
		this.getNode().classList.add("cell-cart--can-added");
	}
	/*
	else if(level == 2){
		this.getNode().classList.add("");
	}
	*/
	return true;
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
	 if (query.deadCart === true || query.deadCart === false){
		query.cart = true;
	 }
	 this.cells.forEach(function(item){
		var bAdd = true;
		//console.log(item.cart);
		if (item.row>distanse){ bAdd = false} // Достаточна ли дистанция	
		else if (row && item.row!=row){ bAdd = false} // Строка
		else if (col && item.col!=col){ bAdd = false} // Строка
		else if (query.cart === false && item.cart !== false) {bAdd = false} // Карта ячейки (нет)
		else if (query.cart === true && item.cart === false) {bAdd = false} // Карта (tсть)
		else if ((query.deadCart === true && item.cart !== false && item.cart.live() > 0)) {bAdd = false} // Нужна мертвая карты
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
	//this.bAddCart = false; // была ли уже добавлена карта???

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
if (count==undefined || isNaN(count) || count<=0) count = 1; 
	return this.koloda.getCarts(count);
}
halfTable.prototype.addCartFromColoda = function(){
	var carts = this.getCartsFromColoda();
	return carts[0];
}
// Заполним первую строку картами
halfTable.prototype.fillFirstRow = function(){
	var carts = this.getCartsFromColoda(this.arena_col);
	//console.log(carts);
	//console.log(this.arena_col);
	for(var i = 1; i<=this.arena_col;i++){
		var selectCell = this.arena.getCell(i,1);
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