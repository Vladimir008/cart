 /* --------------------------------------- КАРТА -----------------------------------------------*/
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
	var type = "warrion";
	var distanse_attack; // Дистанция атаки
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
		if (value < 1) {value = 1} // Макс сила не может быть меньше 1
		strong = value;
	}
	this.defense = function(value){	
		if (!arguments.length) return defense;
		if (value < 0) {value = 0} // Макс жизнь не может быть меньше нуля
		defense = value;
	}
	this.distanse_attack = function(value){	
		if (!arguments.length) return distanse_attack;
		if (value < 1) {value = 1} // Макс сила не может быть меньше 1
		distanse_attack = value;
	}
	this.max_live((obj.live!=undefined) ? obj.live : 3);
	this.live((obj.live!=undefined) ? obj.live : 1);
	this.strong((obj.strong!=undefined) ? obj.strong : 1);
	this.defense((obj.defense!=undefined) ? obj.defense : 0);

	/* Построение html */ 
	this.getInnerHtml = function(){
		 var innerHtml = '<div class="cart-front">'
							+  this.name + '<br/>'
							+  this.live() + '<br/>'
							+  this.strong() + '<br/>'
							+  this.defense() + '<br/>'
		 				+ '</div>'
		 				+ '<div class="cart-back"></div>';
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
	
	 this.getCarts = function (count){
		 if (count==undefined || isNaN(count) || count<=0) count = 0; 
	 	 var carts = this.carts;
		 var return_carts = []; 
		 for (var i = 1; i<=count; i++){
		 	var rand = Math.floor(Math.random() * carts.length);
		  	return_carts.push(carts.splice(rand,1)[0]);
		 }
		  return return_carts;
	}
	return this.init();

}

 /* --------------------------------------- ЯЧЕЙКА -----------------------------------------------*/
 function cellCart(col,row,cart_obj){
 	this.row = row;
 	this.col = col;
 	this.cart = false;
	//this.cart = new cart({name:'Дама',strong:12}); // Временно
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
	this.getNode = function(){
		if (!this.node){
		   return this.setNode();
		}
		return this.node;
	}
 };

 /* --------------------------------------- ГРУППА ЯЧЕЕК -----------------------------------------------*/
 function blockCells(col,row,inverse){
	 this.col = (col!=undefined && col > 0) ? col : 1;
	 this.row = (row!=undefined && row > 0) ? row : 1;
	 this.inverse = (inverse!=undefined) ? inverse : false;
	 this.cells = [];
	 this.node = false;
	 this.init = function(){	
		for (var j = (this.inverse) ? this.col : 1 ; 
		(this.inverse) ? (j>=1) : (j<=this.row); 
		(this.inverse) ? j-- : j++
		){
			for (var i = 1; i<=this.col; i++){
				this.cells.push(new cellCart(i,j));
			}
		}
		 return true;
	 }

	 this.setNode = function(){
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
	 this.getNode = function(){
		 if (!this.node){
			return this.setNode();
		 }
		 return this.node;
	 }
	 this.getCell = function(col,row){ 
		var num = (!this.inverse) ? this.row*(row-1)+(col-1) : this.row*(this.row - row)+(col-1); 
		console.log(num);
		if (this.cells[num]==undefined){
			console.error("Нет такой ячейки");
		}
		return this.cells[num];
	 };
	 return this.init();
 }

 /*--------------- КАРТА ИГРОКА ------------------------------------*/
 function playerProfile(obj){
	if (obj == undefined){
		obj = {};
	}
	this.node = false;
	this.init = function(){
		 this.name = "Игрок";
		 this.cells = [new cellCart(1,1,new cart({name:"Игрок"}))];
		 
		 this.nps = (obj.nps!=undefined) ? obj.nps : true;
		 this.opponent = (obj.opponent!=undefined) ? obj.opponent : false;
	}
	this.setNode = function(){
		var playerNode = document.createElement('div');
		playerNode.className = "player";
		playerNode.innerHTML = '';
		playerNode.appendChild(this.cells[0].getNode());
		this.node = playerNode;
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
	this.init = function(){
 		this.arena = new blockCells(this.arena_col,this.arena_row,this.inverse);
 		this.spells = new blockCells(this.spells_col);
		this.items = new blockCells(this.items_col);
		this.player = new playerProfile();
		this.koloda = new koloda();
 	}

	 // Получить карты из колоды
	 this.getCartsFromColoda = function(count){
		if (count==undefined || isNaN(count) || count<=0) count = 0; 
		return this.koloda.getCarts(count);
	 }
	 // Заполним первую строку картами
	 this.fillFirstRow = function(){
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
	 

 	return this.init();
 }

 
