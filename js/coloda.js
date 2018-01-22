// Карта
function cart(obj){
	if (obj == undefined){
		obj = {};
 	}
	this.name = (obj.name!=undefined) ? obj.name : "Карта";
	this.live = (obj.live!=undefined) ? obj.live : 1; // Жизни
	this.strong = (obj.strong!=undefined) ? obj.strong : 1; // Сила атаки
	this.defense = (obj.defense!=undefined) ? obj.defense : 0; // Оборона/Защита
	this.node = false;
	this.getHtml = function(){
 		var html = '';
 		html +='<div class="cart">';
 		html += '</div>';
 		return html;
 	};
 	this.getInnerHtml = function(){
		 var innerHtml = '';
		 return innerHtml;
 	}
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
 function cellCart(col,row,cart_obj){
 	 this.row = row;
 	 this.col = col;
 	 this.cart = false;
 	 this.cart = new cart({name:'Дама',strong:12}); // Временно
 	 this.setCart = function(cart_obj){
 	 	 this.cart = cart_obj;
 	 }
 	 this.getCart = function(){
 	 	 return this.cart;
 	 }
 	 if (cart_obj != undefined && cart_obj != false){
 	 	this.setCart(cart_obj);
 	 }
 	 this.getHtml = function(){
 		var html = '';
 		html +='<div class="cell-cart" data-row="'+this.row+'"'
 				+' data-col="'+this.col+'">';
 		if (cart!=undefined && cart!=false){
 			html += this.cart.getHtml();
 		}
 		html +='</div>';
 		return html;
 	};
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
	 this.init = function(){
		 for (var j = 1; j<=row; j++){
			 for (var i = 1; i<=col; i++){
				 this.cells.push(new cellCart(i,j));
			 }
		 }
		 return true;
	 }
 	this.getHtml = function(){
 		var html = '';
 		html +='<div class="block-cells">'
 				+'<div class="block-cells__row">';
 		var selectRow = 1;
 		this.cells.forEach(function(item, i) {
 			if (item.row!=selectRow){
 				html += '</div>' 
 						+ '<div class="block-cells__row">';
 				selectRow = item.row; 
 			}
 			html += item.getHtml();
 		});
 		html += '</div>' 
 			+'</div>'; // block-cells
 		return html;
 	};
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
 	
 	this.init = function(){
 		this.arena = new blockCells(this.arena_col,this.arena_row);
 		this.spells = new blockCells(this.spells_col);
 		this.items = new blockCells(this.items_col);
 	}
 	this.getHtml = function(){
 		var html = '';
 		html +='<div class="half-table">'
	 			+ '<div class="half-table__left">'
 					+ '<div class="half-table__items">' + this.items.getHtml() + '</div>'
 					+ '<div class="half-table__spells">' + this.spells.getHtml() + '</div>'
	 			+ '</div>'
	 			+ '<div class="half-table__center">'
	 				+ '<div class="half-table__arena">' + this.arena.getHtml() + '</div>'
	 			+ '</div>'
	 			+ '<div class="half-table__right">'
	 			+ '</div>'
	 		+ '</div>';
 		return html;
 	};
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