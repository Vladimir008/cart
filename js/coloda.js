// Карта
function cart(obj){
	if (obj == undefined){
		obj = {};
 	}
	this.name = (obj.name!=undefined) ? obj.name : "Карта";
	this.node = false;
	
	/* Основные параметры для механики игры */
	var max_live;
	var live; // Жизни
	var strong; // Сила атаки
	var defense; // Оборона/Защита
	this.max_live = function(value){
		if (!arguments.length) return max_live;
		if (value < 0) { value = 0} // Макс жизнь не может быть меньше нуля
		max_live = value;
	}
	this.live = function(value){
		if (!arguments.length) return live;
		if (value > max_live) {value = max_live;}
		live = value;
	}
	this.strong = function(value){
		if (!arguments.length) return strong;
		if (value < 1) {value = 1} // Макс жизнь не может быть меньше нуля
		strong = value;
	}
	this.defense = function(value){	
		if (!arguments.length) return defense;
		if (value < 1) {value = 1} // Макс жизнь не может быть меньше нуля
		defense = value;
	}
	this.max_live((obj.live!=undefined) ? obj.live : 10);
	this.live((obj.live!=undefined) ? obj.live : 1);
	this.strong((obj.strong!=undefined) ? obj.strong : 1);
	this.defense((obj.defense!=undefined) ? obj.defense : 0);

	/* Построение html */ 
	this.getInnerHtml = function(){
		 var innerHtml = '';
		 return innerHtml;
	 }
	 this.setNode = function(){
		var cartNode = document.createElement('div');
		cartNode.className = "cart";
		cartNode.innerHTML = this.getInnerHtml();
		this.node = cartNode;
		return this.node;
	 }
	 this.getNode = function(){
		 if (!this.node){
			return this.setNode();
		 }
		 return this.node;
	 }
	 
};

//Колода карт
function koloda(){

	this.init = function(){
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
	} 
	
	 this.getCart = function (){
	 	 var carts = this.carts;
	 	 var rand = Math.floor(Math.random() * carts.length);
    	return carts.splice(rand,1)[0];
	}
	return this.init();

}

//ячейка области
 function cellCart(col,row,cart_obj){
 	this.row = row;
 	this.col = col;
 	this.cart = false;
	this.cart = new cart({name:'Дама',strong:12}); // Временно
	this.node = false;
	this.setCart = function(cart_obj){
		this.cart = cart_obj;
	}
	this.getCart = function(){
		return this.cart;
	}
	if (cart_obj != undefined && cart_obj != false){
		this.setCart(cart_obj);
	}

	this.setNode = function(){
	   var cartCellNode = document.createElement('div');
	   cartCellNode.className = "cell-cart";
	   if (this.cart!=undefined && this.cart!=false){
			cartCellNode.appendChild(this.cart.getNode());
	   }
	   this.node = cartCellNode;
	   return this.node;
	}
	this.getNode = function(){
		if (!this.node){
		   return this.setNode();
		}
		return this.node;
	}
 };

 // --------Группа ячеек
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
	 this.node = false;
	 this.init = function(){
		 for (var j = 1; j<=row; j++){
			 for (var i = 1; i<=col; i++){
				 this.cells.push(new cellCart(i,j));
			 }
		 }
		 return true;
	 }

	 this.setNode = function(){
		var blockCellsNode = document.createElement('div');
		blockCellsNode.className = "block-cells";
		var blockCellsRowNode = document.createElement('div');
		blockCellsRowNode.className = 'block-cells__row';
		var selectRow = 1;
 		this.cells.forEach(function(item, i){
			if (item.row!=selectRow){
				blockCellsNode.appendChild(blockCellsRowNode.cloneNode(true));
				blockCellsRowNode = document.createElement('div');
				blockCellsRowNode.className = 'block-cells__row';
				selectRow = item.row; 
			}
			blockCellsRowNode.appendChild(item.getNode());
		});
		blockCellsNode.appendChild(blockCellsRowNode);
		this.node = blockCellsNode;
		return this.node;
	 }
	 this.getNode = function(){
		 if (!this.node){
			return this.setNode();
		 }
		 return this.node;
	 }
	 return this.init();
 }
 
 // Игровое место (половина стола)
 function halfTable(obj){
	if (obj == undefined){
		obj = {};
 	}
 	this.name = (obj.inverse!=undefined) ? obj.inverse : false;
 	this.arena_row = (obj.arena_row!=undefined) ? obj.arena_row : 3;
 	this.arena_col = (obj.arena_col!=undefined) ? obj.arena_col : 4;

 	this.spells_col = (obj.spells_col!=undefined) ? obj.spells_col : 3;
 	this.items_col = (obj.items_col!=undefined) ? obj.items_col : 3;
 	this.node = false;
	 
	 this.init = function(){
 		this.arena = new blockCells(this.arena_col,this.arena_row);
 		this.spells = new blockCells(this.spells_col);
 		this.items = new blockCells(this.items_col);
 	}

	 this.setNode = function(){
		var halfTableNode = document.createElement('div');
		halfTableNode.className = "block-cells";
		halfTableNode.innerHTML =  '<div class="half-table__left">'
			+ '<div class="half-table__items"></div>'
			+ '<div class="half-table__spells"></div>'
		+ '</div>'
		+ '<div class="half-table__center">'
			+ '<div class="half-table__arena"></div>'
		+ '</div>'
		+ '<div class="half-table__right">'
		+ '</div>';
		console.log(halfTableNode.querySelector(".half-table__items"));
		halfTableNode.querySelector(".half-table__items").appendChild(this.items.getNode());
		halfTableNode.querySelector(".half-table__spells").appendChild(this.spells.getNode());
		halfTableNode.querySelector(".half-table__arena").appendChild(this.arena.getNode());
		this.node = halfTableNode;
		return this.node;
	 }
	 this.getNode = function(){
		 if (!this.node){
			return this.setNode();
		 }
		 return this.node;
	 }
 	return this.init();
 }
 function Table(obj){
	 	if (obj == undefined){
			obj = {};
	 	}
	 	this.arena_row = obj.arena_row = (obj.arena_row!=undefined) ? obj.arena_row : 3;
	 	this.arena_col = obj.arena_col = (obj.arena_col!=undefined) ? obj.arena_col : 4;
	 	this.spells_col = obj.spells_col = (obj.spells_col!=undefined) ? obj.spells_col : 3;
	 	this.items_col = obj.items_col = (obj.items_col!=undefined) ? obj.items_col : 3;
	 	this.init = function(){
	 		var settings = {
	 			arena_row:this.arena_row,
	 		}
	 	}
	 	return this.init();
 }

 
 //console.log(koloda.getCart());