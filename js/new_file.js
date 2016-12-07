function intel(){
	   	  var max=-Infinity;
	   	  var pos={};
	   	  for(var k in kongbai)
	   	  {
	   	  	  var x=parseInt(k.split("_")[0]);
	   	  	  var y=parseInt(k.split("_")[1]);
	   	  	  var m=panduan(x,y,"black");
	   	  	  if(m>max)
	   	  	  {
	   	  		  max=m;
	   	  		  pos={x:x,y:y};
	   	  	  }
	   	  }
	   	  
	   	  var max2=-Infinity;
	   	  var pos2={};
	   	  for(var k in kongbai)
	   	  {
	   	  	  var x=parseInt(k.split("_")[0]);
	   	  	  var y=parseInt(k.split("_")[1]);
	   	  	  var m=panduan(x,y,"white");
	   	  	  if(m>max2)
	   	  	  {
	   	  		  max2=m;
	   	  		  pos2={x:x,y:y};
	   	  	  }
	   	  }
   	      if(max>max2)
   	      {
   	      	return pos;
   	      }
   	      else 
   	      {
   	      	return pos2;
   	      }
      }


if(AI)
   	   {
	   	   qizi(x,y,bR,"black");
	   	   if(panduan(x,y,"black")>=5)
	   	   {
	   	  		$(canvas).off("click");
	   	  		$(".victory").css({"display":"block"});
	   	  		$(".victory .vN h1").html("黑棋赢了！");
	   	    }
	   	   var p=intel();
	   	   qizi(p.x,p.y,"white");
//	   	   console.log(p.x,p.y);
	   	   if(panduan(p.x,p.y,"black")>=5)
	   	   {
	   	  		$(canvas).off("click");
	   	  		$(".victory").css({"display":"block"});
	   	  		$(".victory .vN h1").html("白棋赢了！");
	   	    }
	   	   return false;
   	   }
