<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="./css/custom.css">
<link rel="stylesheet" href="./css/smoothness/jquery-ui-1.9.2.custom.css">
<link rel="stylesheet" href="./css/jquery.kanban-board.plugin.css">
<script src="./js/jquery-1.8.3.js" type="text/javascript"></script>
<script src="./js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="./js/class-helper.js" type="text/javascript"></script>
<script src="./js/long-polling-helper.js" type="text/javascript"></script>
<script src="./js/jquery.issue-list.plugin.js" type="text/javascript"></script>
<!--script src="./js/jquery.kanban-board.plugin.js" type="text/javascript"></script-->
<script src="./js/kanban-board.jquery.js" type="text/javascript"></script>
<script src="./js/colResizable-1.3.min.js" type="text/javascript"></script>
<script src="./js/main.js" type="text/javascript"></script>
<script type="text/javascript">
/*var Test = new Class;
Test.include({
  _id: 123123123,
  func1: function(id){alert("funct1: "+id);},
  func2: function(id){alert("funct2: "+id);}
});
var test1 = new Test;
*/
$(document).ready(function() {

  /*var ws_supported = ("WebSocket" in window);
  if(ws_supported)
    alert("oblsluguje");
  */

  $("#output").kanbanBoard("init", {
    databaseUrl: './database.php',
    columns: ['TODO', 'Selected', 'Ongoing', 'Desing', 'Troubleshooting', 'Done']
  });

  //refresh_modified();
});
</script>
</head>
<body>
<header>header</header>
<nav>nav</nav>
<article>
<section>
<div id="output"></div>
</section>
</article>
<aside>aside</aside>
<footer>footer</footer>
</body>
</html>
