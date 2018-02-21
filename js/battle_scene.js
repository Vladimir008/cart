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
       this.selectedCart = false; // Выбранная карта

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
   this.addEventsForInteractionCarts = function(){




        var OppFirstLineCart = function(){
            return this.queryCartFromCells(
                this.queryCell({
                     halfTable:{},
                     oppHalfTable:{
                        arena:{row:1}
                    }
                 })
            );
         };
        
        // Перед началом взаимодействия
        // Очистить события и выдения всех карт, кроме 
        this.clearCanSelectedCart(false);

       // Если карта для хода ещё не выбрана
       if (this.selectedCart == false || this.selectedCart == undefined){

            var canSelectedCarts = this.queryCartFromCells(
                    this.queryCell({
                        halfTable:{arena:{distanse:1}},
                        oppHalfTable:{}
                    })
            );
           canSelectedCarts.forEach(function(item){
                item.viewCanSelect(1);
                item.getNode().onclick = function(){
                   item.viewSelected(1);
                   Battle.selectedCart = item; // Запоминаем выбранную карту для нашей половины стола
                   log.add("Сработал onclick - выбрана ходящая карта");  
                   Battle.processRound();
               };
           });
       }
       // Проверяем выбрана ли вторая карта
       else{
            var rowSelectedCart = this.selectedCart.getRow();
            var distanse = this.selectedCart.distanse_attack();
            var canSelectedCarts = this.queryCartFromCells(
                this.queryCell({
                    halfTable:{},
                    oppHalfTable:{arena:{distanse:distanse - rowSelectedCart + 1}},
                })
            );
            canSelectedCarts.forEach(function(item){
                item.viewCanSelect(2);
                item.getNode().onclick = function(){
                    log.add("Сработал onclick - выбрана карта на которую ходят");  
                    Battle.clearCanSelectedCart(true);
                    Battle.interactionCarts(item);
                }
            });
       }

       return true;
   }
   this.interactionCarts = function(cart){
        this.selectedCart.attackCart(cart);
        var varThis = this; 
        setTimeout(function(){
            cart.counterattackCart(varThis.selectedCart);
        },500);
        setTimeout(function(){
            varThis.selectedCart = false;
            varThis.processRound();
        },1000);

        
   }
      /**
        * Очистка представления выбранных карт из ячеек
        * @param {boolean} full - убирать ли выбранную карту?
        * @return {void} выбранные ячейки
        */
    this.clearCanSelectedCart = function(full){
        if (full == undefined) full = false;
        var allCarts = this.queryCartFromCells(this.queryCell());
        var selectedCart = this.selectedCart;
        allCarts.forEach(function(item){
            if (full || item != selectedCart){
                item.viewClearSelect();
                item.getNode().onclick = null;
            }
        });
    }
       /**
        * Очистка умерших карт из ячеек
        * @param {boolean} full - убирать ли выбранную карту?
        * @return {void} выбранные ячейки
        */
        this.clearDeadCart = function(){
            var cells = this.queryCell({
                    halfTable:{arena:{deadCart:true}},
                    oppHalfTable:{arena:{deadCart:true}}
            });
            console.log();
            cells.forEach(function(item){
                item.clearDeadCart();
            });
           // console.log("Убрать карты",carts);
            /*
            */
        }
        
        /**
        * Извлечение карт из ячеек
        * @param {object} obj - обьект выборки
        * @return {array} выбранные ячейки
        */
        this.queryCartFromCells = function(cells,obj){
            var carts = [];
            cells.forEach(function(item){
                var cart = item.getCart();
                if (cart != false){
                    carts.push(cart);
                }
            });
            return carts;
        }
        /**
        * Выборка ячеек по необходимым параметрам выборки
        * @param {object} obj - параметры выборки
        * @return {array} выбранные ячейки
        */
        this.queryCell = function(obj){
                   
            var halfTable = this.selectedHalfTable
            ,oppHalfTable = this.nonSelectedHalfTable;
            if (obj == undefined) obj = {}; 
            //obj.halfTable - какие ячейки брать из выбранной половины стола
            if (obj.halfTable == undefined) obj.halfTable = {"arena":{},"spells":{},"items":{},"player":{}};
            //obj.oppHalfTable - какие карты брать из противоложной половины стола
            if (obj.oppHalfTable == undefined) obj.oppHalfTable = {"arena":{},"spells":{},"items":{},"player":{}};
            var cells = [];     
            // Собираем ячейки из текущей области
            if (obj.halfTable!==false){
                for (key in obj.halfTable) {
                    if (halfTable[key]!=undefined && !halfTable[key].cells!=undefined){
                        cells = cells.concat(halfTable[key].queryCell(obj.halfTable[key]));
                    }
                }
            }
            // Собираем ячейки из противоположной
            if (obj.oppHalfTable!==false){
                for (key in obj.oppHalfTable) {
                    if (oppHalfTable[key]!=undefined && !oppHalfTable[key].cells!=undefined){
                        cells = cells.concat(oppHalfTable[key].queryCell(obj.oppHalfTable[key]));
                    } 
                }
            }
            return cells;
       };
   
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
/**
 * Играется раунд. Проверяем если раунд первый и не заполнен стол - заполняем стол.
 * Далее, играет текущая половина стола
 * @return {boolean} Отметка о корректном выполении функции
 */
BattleScene.prototype.processRound = function (){
    // Заполняем первые ряды
    if (this.round == 1 && this.isFillTable == false){ 
        this.fillCartTable();
        this.isFillTable = true;
    }
    // НА ПОТОМ: if (!this.selectedHalfTable.bAddCart){  НА Если новая карта ЕЩЁ не добавлена
            //	this.addCartToHalfTable(halfTable);
        //}
    //else{
    this.addEventsForInteractionCarts();
     

    // Конец раунда - очистка умерших карт
    this.clearDeadCart(); // Вопрос стоит ли делать проверку вначале, или в конце???

    return true;
};