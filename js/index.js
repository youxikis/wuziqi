$(document).ready(function(){

	var canvas=$("#canvas").get(0);
	var ctx=canvas.getContext("2d");
	var reg=40;
	var sR=5;
	var bR=18;
	var flag=true;
	var qi={};
	var AI=false;
 	kong={};
 	var gameStatus="pause";
 	var t;
	var audio=$("#audio").get(0);
	
	var canvas2=$("#hei").get(0);
	var ctx2=canvas2.getContext("2d");
	
	var heiqi=$(".heiqi");
	var baiqi=$(".baiqi");
/********************画棋盘***********************/
	//
	function l(c){
		return (c+0.5)*reg+0.5
	}
	function qipan(){
		ctx.save();
		ctx.beginPath();
		for(var i=0;i<15;i++){
			
			ctx.moveTo(l(i),l(0));
			ctx.lineTo(l(i),l(14));
			
			ctx.moveTo(l(0),l(i));
			ctx.lineTo(l(14),l(i));
		}
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
		circle5();
		for(var i=0;i<15;i++){
   			for(var j=0;j<15;j++){
   				kong[i+"_"+j]="1";
   			}
   		}
	}
	qipan();
	function circle5(){
		ctx.save();
		ctx.beginPath();
		circle(3,3,sR);
		circle(3,11,sR);
		circle(7,7,sR);
		circle(11,3,sR);
		circle(11,11,sR);
		ctx.closePath();
		ctx.restore();
	}
	function circle(x,y,r){
		ctx.save();
		ctx.beginPath();
		ctx.arc(l(x),l(y),r,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}

	
/***********************************落子**棋子*******************************/
	
	function qizi(x,y,r,color){
		qi[x+'_'+y]=color;
		ctx.save();
		ctx.beginPath();
		var g=ctx.createRadialGradient(0, 0, 6, 0, 0, bR);
		if(color=="black"){
			g.addColorStop(0.05,"#fff");
			g.addColorStop(0.3,"#999");
			g.addColorStop(1,"#000");
				
		}else{
			g.addColorStop(0.05,"#ccc");
			g.addColorStop(0.1,"#fff");
			g.addColorStop(1,"#fff");
		}
		ctx.fillStyle=g;
		ctx.arc(l(x),l(y),r,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
		
		gameStatus="play";
    	delete kong[m(x,y)];
    	console.log(kong)
		
	}

	function duiyi(e){
		
		var x=Math.floor((e.offsetX+0.5)/40);
		var y=Math.floor((e.offsetY+0.5)/40);
		if(qi[x+'_'+y]){
			return;
		}
		if(AI)
   	   {	
   	   		console.log(3)
	   	   qizi(x,y,bR,"black");
	   	   if(panduan(x,y,"black")>=5)
	   	   {
	   	  		$(canvas).off("click");
	   	  		$(".victory").css({"display":"block"});
	   	  		$(".victory .vN h1").html("黑棋赢了！");
	   	    }
	   	   var p=intel();
	   	   qizi(p.x,p.y,bR,"white");
	   	   console.log(p.x,p.y);
	   	   if(panduan(p.x,p.y,"white")>=5)
	   	   {
	   	  		$(canvas).off("click");
	   	  		$(".victory").css({"display":"block"});
	   	  		$(".victory .vN h1").html("白棋赢了！");
	   	    }
	   	   return false;
   	   }
   	   
		if(flag){
			heiqi.removeClass("border");
			baiqi.addClass("border");
			clearInterval(tt1);
			tt2=setInterval(daojishi2,1000);
//			clearInterval(t);
//			n=0;
//			t=setInterval(render,1000)
			
			qizi(x,y,bR,"black");
			
			if(panduan(x,y,"black")>=5){
				console.log($(".victory vN h1"))
				$(".victory .vN h1").html("黑棋赢了！")
				$(".victory").show();
				$(canvas).off("click");
			}
		}else{
			baiqi.removeClass("border");
			heiqi.addClass("border");
			clearInterval(tt2);
			tt1=setInterval(daojishi,1000);
//			clearInterval(t);
//			n=0;
//			t=setInterval(render,1000)

			qizi(x,y,bR,"white");
			
			if(panduan(x,y,"white")>=5){
				$(".victory").show();
				console.log($(".victory vN h1"))
				$(".victory .vN h1").html("白棋赢了！");
				$(canvas).off("click");
				
			}
		}
		flag=!flag;
		return false;
		
	}
	$(canvas).on("click",duiyi);
		
/*******************************表盘*************************************/	
	var n=0;
	function miaozhen(){
			
			ctx2.save();
			ctx2.beginPath();
			ctx2.rotate(Math.PI / 180 * 6 * n);
			ctx2.arc(0,0,10,0,Math.PI*2);
			ctx2.moveTo(0,10);
			ctx2.lineTo(0,30);
			ctx2.moveTo(0,-10);
			ctx2.lineTo(0,-85);
			ctx2.closePath();
			ctx2.stroke();
			ctx2.restore();
			n++;
	}
	function biaopan(){
		
		ctx2.save();
		for(var i=0;i<60;i++){
			ctx2.beginPath();
		    ctx2.moveTo(0,-110)
		    
		    if(i%5==0){
		    	ctx2.lineTo(0,-95);
		    }else{
		   	 	ctx2.lineTo(0,-105);	
		    }
		    ctx2.rotate(Math.PI/180*6)
			ctx2.closePath();
			ctx2.stroke();
			
		}
		ctx2.restore();
	}  
	function jinzhi(){
		ctx2.save();
		ctx2.translate(150,150);
		biaopan();
		miaozhen();
		ctx2.restore();
	}
	 jinzhi();  
/**********************************************************************/
	function render(){
		
		ctx2.save();
		ctx2.clearRect(0, 0, 300, 600);
		ctx2.translate(150,150);
		biaopan();
		miaozhen();
		ctx2.restore();
	}
 /***************************倒计时   开始游戏*******************************/	
    var daoh=$("#daoh");
    var daob=$("#daob");
    var start=$(".start");
    var i=9;
    var j=60;
    var i2=9;
    var j2=60;
    var tt1;
    var tt2;
    function daojishi(){
    	j--;
    	
    	if(j==0){
    		j=59;
    		i--;
    		
    		
    	}
    	if(j<=9){
			daoh.html('0'+i+':'+'0'+j);	
    	}else{
    		daoh.html('0'+i+':'+j);
    	}
    	if(i<0){
    		daoh.html('00'+':'+'00');	
    		clearInterval(tt1)
    	}
    	
    	
    }
    function daojishi2(){
    	j2--;
    	
    	if(j2==0){
    		j2=59;
    		i2--;
    		
    		
    	}
    	if(j2<=9){
			daob.html('0'+i2+':'+'0'+j2);	
    	}else{
    		daob.html('0'+i2+':'+j2);
    	}
    	if(i<0){
    		daob.html('00'+':'+'00');	
    		clearInterval(tt2)
    	}
    	
    }
    start.on("click",function(){
    	tt1=setInterval(daojishi,1000);
    	heiqi.addClass("border");
    	
    })
/**************************结束游戏*************************************/    
    var ended=$(".ended");
    ended.on("click",function(){
    	clearInterval(tt1);
    	clearInterval(tt2);
//  	ended[0].style.color="red"
    })
/*************************重新开始************************************/ 
    var restart=$(".restart");
    function re(){
    	qipan();
    	circle5();
    }
    function restart0(){
    	gameStatus="pause";
    	$(canvas).on("click",duiyi);
    	clearInterval(tt1);
    	clearInterval(tt2);
    	 i=9;j=60;
	     i2=9;j2=60;
	     daoh.html('10'+':'+'00');
	     daob.html('10'+':'+'00');
		 qi={};
	     ctx.clearRect(0, 0, 600, 600);
	     re();
	     flag=true;
	     heiqi.removeClass("border");
		 baiqi.removeClass("border");
		 
//		 $(".renji").addClass("border2");
//		 $(".renren").addClass("border2");
    }
    restart.on("click",restart0)
    
/******************************判断输赢************************************/
	function m(x,y){
		return x+'_'+y
	}
	
	function panduan(x,y,color){
		var i;
		
		var r=1;
		i=1;while(qi[m(x+i,y)]===color){r++;i++;}
		i=1;while(qi[m(x-i,y)]===color){r++;i++;}
		
		var c=1;
		i=1;while(qi[m(x,y+i)]===color){c++;i++;}
		i=1;while(qi[m(x,y-i)]===color){c++;i++;}
		
		var zx=1;
		i=1;while(qi[m(x+i,y-i)]===color){zx++;i++;}
		i=1;while(qi[m(x-i,y+i)]===color){zx++;i++;}
		
		var yx=1;
		i=1;while(qi[m(x+i,y+i)]===color){yx++;i++;}
		i=1;while(qi[m(x-i,y-i)]===color){yx++;i++;}
		
		return Math.max(r,c,zx,yx);
	}
    
    $(".victory ").get(0).addEventListener("click",function(){
    	$(this).css("display","none");
    },false)
    //再来一次
    $("#zailai").on("click",restart0)
/*******************************棋谱****************************************/
	function chessManual(){
		
		ctx.save();
		ctx.font = "25px serif";
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		
		var i=1;
		for(k in qi){
			var arr=k.split('_');
			if(qi[k]==="black"){
				ctx.fillStyle="#fff";
			}else if(qi[k]==="white"){
				ctx.fillStyle="#000";
			}
			ctx.fillText(i++,l(parseInt(arr[0])),l(parseInt(arr[1])));
		}
		$("<img>").attr("src",canvas.toDataURL()).appendTo(".qipuN");
		$("<a>").attr("href",canvas.toDataURL()).attr("download","qipu.png").appendTo(".qipuN");
		ctx.restore();
		$(".qipuBox").css("display","block");
	}
	
	$(".qipu").on("click",function(){
		chessManual();
	})
	
	$(".qipuBox").get(0).addEventListener("click",function(){
		$(this).css("display","none");
	//		restart();
		ctx.clearRect(0, 0, 600, 600);
		re();
		for(k in qi){
			var arr=k.split('_');
			console.log(qi[k])
			console.log(l(parseInt(arr[0])))
			qizi(parseInt(arr[0]),parseInt(arr[1]),bR,qi[k]);
		}
		
	},false)
//收集画布中所有像素，生成图片,浏览器认识，字符串形式存储的图片
//$("<img>").attr("src",canvas.toDataURL()).appendTo("");
//点击直接下载
//$("<a>").attr("href",canvas.toDataURL()).attr("download","qipu.png").appendTo("");

/**********************人机**********************************/

	function intel(){
	   	  var max=-Infinity;
	   	  var pos={};
	   	  for(var k in kong)
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
	   	  for(var k in kong)
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

   	 
 // 
    function renji(){
 		if(gameStatus=="play"){
   	   	  return;
   	    }
 		$(".renren").removeClass("border2");
 		$(this).addClass("border2");
   	    AI=true;
 	}
 	$(".renji").on("click",renji)
 	$(".renren").addClass("border2");
 	function renren(){
 		
 		if(gameStatus=="play"){
   	   	    return;
   	    }
 		$(".renji").removeClass("border2");
 		$(".renren").addClass("border2");
 		AI=false;
 	}
 	$(".renren").on("click",renren)
/*************************游戏说明*********************************/
	$(".produce").on("click",function(){
		$(".proTan").css("display","block")
	})
	$(".proTan").on("click",function(){
		$(".proTan").css("display","none")
	})
})