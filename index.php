<?php 
$echo = 12;

?>
<html>
<head>
	<meta charset="UTF-8" />
	<title>Document</title>
	<script src='js/anime.min.js'></script>
	<script src='js/coloda.js'></script>
	<script src='js/battle_scene.js'></script>
	<link rel="stylesheet" href="css/style.css" />
</head>
<body>
<div id="scene">

</div>
<script>
	//var BC = new blockCells(2,2,true);
	var Battle = new BattleScene({name:"Моя половина",arena_col:3,arena_row:2,items_col:1,spells_col:1});	
	//console.log(Battle);
	document.body.querySelector("#scene").appendChild(Battle.getSceneNode());
	Battle.processRound();


</script>

<!--
  <div class="cart cart--left-rotate" style="margin-left:200px">
	<div class="cart-front"><span><</span></div>
	<div class="cart-back"><span>></span></div>
  </div>

  <div class="cart cart--right-rotate" style="margin-left:200px">
	<div class="cart-front"><span>Front</span></div>
	<div class="cart-back"><span>Back</span></div>
  </div>
-->
</body>
</html>