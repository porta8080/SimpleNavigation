<?php



?>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src='http://code.jquery.com/jquery-1.11.3.min.js'></script>
    <script src='simple_navigation.js'></script>
    <style>
      #a{
          background: black;
      }
      
      #b{
          background: red;
      }
      
      #c{
          background: green;
      }
      
      #d{
          background: blue;
      }
      
      #e{
          background: yellow;
      }
      
      #f{
          background: pink;
      }
      
      #menu{
          position: absolute;
          right: 0px;
          top: 0px;
          z-index: 1000;
          padding: 20px;
      }
      
      button{
          color: white;
      }
    </style>
    
    <script>
      $(function(){
         $.simpleNavigation('section');
      });
    </script>
</head>
<body>
    <div id="menu">
      <button onclick='SimpleNavigation.previous()'>Anterior</button>
      <button onclick='SimpleNavigation.next()'>Próximo</button>
    </div>
    <section id='a' data-sn data-sn-mode='fade'></section>
    <section id='b' data-sn data-sn-mode='hide'></section>
    <section id='c' data-sn-mode='fade'></section>
    <section id='d' data-sn-mode='hide'></section>
    <section id='e' data-sn-mode='fade'></section>
    <section id='f' data-sn-mode='fade'></section>
    
    <!-- fade, vertical, horizontal, contract, expand, hide -->
</body>
</html>
