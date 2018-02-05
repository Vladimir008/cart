 /*-------------------------- СЦЕНА БИТВА ------------------------------------*/
 function BattleScene(obj){
    if (obj == undefined){
       obj = {};
    }
    
    this.init = function(){
       this.round = 1;
       this.isFillTable = false; // Заполнен стол???
       this.isYouTurn = true; // Ваша очередь???
       
       this.arena_row = obj.arena_row = (obj.arena_row!=undefined) ? obj.arena_row : 3;
        this.arena_col = obj.arena_col = (obj.arena_col!=undefined) ? obj.arena_col : 4;
        this.spells_col = obj.spells_col = (obj.spells_col!=undefined) ? obj.spells_col : 3;
        this.items_col = obj.items_col = (obj.items_col!=undefined) ? obj.items_col : 3; 
       var settings = {
            arena_row:this.arena_row,
            arena_col:this.arena_col,
            spells_col:this.spells_col,
            items_col:this.items_col,
        }
       this.backHalfTable = new halfTable(Object.assign({inverse:true}, settings));
       this.frontHalfTable = new halfTable(settings);
       this.selectedHalfTable = this.frontHalfTable; // Выбранный стол (стол, который сейчас ходит)
       this.nonSelectedHalfTable = this.backHalfTable; // Невыбранный стол (стол, на которого ходят)
    }
   
    
    /**
     * Играется раунд. Проверяем если раунд первый и не заполнен стол - заполняем стол.
     * Далее, играет текущая половина стола
     * @return {boolean} Отметка о корректном выполении функции
     */
    this.processRound = function (){
       if (this.round == 1 && this.isFillTable == false){ 
          console.log("Вызываем fillCartTable");
          this.fillCartTable();
       }
       this.processRoundForHalfTable(this.selectedHalfTable);
       return true;
      };
   
    /**
     * Играет половина стола
     * @param {halfTable} - выбранная половина стола (обьект)
     * @param {oppHalfTable} - противоложная половина стола (обьект)
     * @return {boolean} Отметка о корректном выполении функции
     */
   this.processRoundForHalfTable = function (halfTable,oppHalfTable){
   
       // НА ПОТОМ: if (!halfTable.bAddCart){  НА Если новая карта ЕЩЁ не добавлена
           //	this.addCartToHalfTable(halfTable);
       //}
       //else{
           var carts = this.getCartsForSelected(halfTable,oppHalfTable); // Получили карты
           // functuion // пометили карты для клика, навесли на них функцию Battle.processRound
       //}
       return true;
   }
   
   /**
    *  Заполняет стол картами - применяется обычно на первом ходу
    * @param {halfTable} - половина стола (обьект)
     * @return {boolean} Отметка о корректном выполении функции
   */
   this.fillCartTable = function (){
       this.frontHalfTable.fillFirstRow();
       this.backHalfTable.fillFirstRow();
       return true;
    };
    
   /**
    * ЗАГЛУШКА Добавляет новую карту на стол
    */
   this.addCartToHalfTable = function (halfTable){
       this.getCartFromColoda(halfTable);
   }
   /**
    * ЗАГЛУШКА Берет карту из колоды половины стола и кладет на арену
    */
    this.getCartFromColodaHalfTable = function(halfTable){

    }

   /**
    *   Определяет и отдает карты для выбора
     * @param {object} halfTable- выбранная половина стола (обьект)
     * @param {object} oppHalfTable - противоложная половина стола (обьект)
    * @param {object} cart - карта (обьект). Если задана то параметы выбора могут измениться
     * @return {boolean} Отметка о корректном выполении функции
   */
   this.getCartsForSelected = function(halfTable,oppHalfTable){
       /**
        * 
        * @param {object} obj - обьект выборки
        * @return {array} выбранные ячейки
        */
       var queryCell = function(obj){
        if (obj == undefined) obj = {}; 
        //obj.halfTable - какие ячейки брать из выбранной половины стола
        if (obj.halfTable == undefined) obj.halfTable = ["arena","spells","items","player"];
         //obj.oppHalfTable - какие карты брать из противоложной половины стола
        if (obj.oppHalfTable == undefined) obj.oppHalfTable = ["arena","spells","items","player"];
        // Расстояние от края максимальное
        if (obj.distanse == undefined) obj.distanse = 10;
        // Строка
        if (obj.row == undefined) obj.row = false;
        // Cтолбей
        if (obj.col == undefined) obj.col = false;
        // Собираем ячейки из нужных областей
        var cells = []; 
        
        obj.halfTable.forEach(function(item){
            if (halfTable[item]!=undefined && !halfTable[item].cells!=undefined){
                cells = cells.concat(halfTable[item].cells);  
            }
        });
        return cells;
       };
       
       // Если карта для хода ещё не выбрана
       if (halfTable.selectedCart == false || halfTable.selectedCart == undefined){
           console.log(halfTable.arena.cells);
           var cells = queryCell();
           console.log(cells);
           var selectedCarts = [];
           cells.forEach(function(item){
               var cart = item.getCart();
               if (cart != false){
                   selectedCarts.push(cart);
               }
           });
           selectedCarts.forEach(function(item){
               item.getNode().onclick = function(){
                   halfTable.selectedCart = item;
                   console.log("Сработал onclick");
                   console.log(item);
               };
           });

       }
       return true;
   }
    // Получить список для выбора карт
    this.gettCellsForSelected = function(halfTable){}
    
    this.addCartToCell = function (cell,cart){
       // Проверяем что ячейка не занята, делаем анимацию, и убираем this.selectCart
       return true;
    };
    
   
   // Конец раунда
   this.EndProcessRound = function (){

   }
   
   // Конец Раунда
   this.EndProcessRoundForHalfTable = function (){
       
   }


    //Получить узел сцены
    this.getSceneNode = function(){
       var Node = document.createElement('div');
       Node.className = "game-table";
       Node.innerHTML =  '<div class="game-table__back"></div>'
           + '<div class="game-table__front"></div>';
       Node.querySelector(".game-table__back").appendChild(this.getHalfTableNode(this.backHalfTable));
       Node.querySelector(".game-table__front").appendChild(this.getHalfTableNode(this.frontHalfTable));
       
       return Node;
   }
   // Получить узел половины стола
   this.getHalfTableNode = function(halfTable){
       var Node = document.createElement('div');
       if (halfTable.inverse){
           Node.className = "half-table half-table--inverse";
           Node.innerHTML =  
           '<div class="half-table__player-place"></div>'
           + '<div class="half-table__left">'
               + '<div class="half-table__spells"></div>'
               + '<div class="half-table__items"></div>'
           + '</div>'
           + '<div class="half-table__center">'
               + '<div class="half-table__arena"></div>'
           + '</div>'
           + '<div class="half-table__right">'
           + '</div>';
       }
       else{
           Node.className = "half-table";
           Node.innerHTML =  '<div class="half-table__left">'
               + '<div class="half-table__items"></div>'
               + '<div class="half-table__spells"></div>'
           + '</div>'
           + '<div class="half-table__center">'
               + '<div class="half-table__arena"></div>'
           + '</div>'
           + '<div class="half-table__right">'
           + '</div>'
           + '<div class="half-table__player-place"></div>';
       }

       Node.querySelector(".half-table__items").appendChild(halfTable.items.getNode());
       Node.querySelector(".half-table__spells").appendChild(halfTable.spells.getNode());
       Node.querySelector(".half-table__arena").appendChild(halfTable.arena.getNode());
       Node.querySelector(".half-table__player-place").appendChild(halfTable.player.getNode());
       return Node;
   }
   
    return this.init();
}