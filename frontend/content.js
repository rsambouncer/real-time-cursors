  const HOST = location.origin.replace(/^http/, 'ws');
  const ws = new WebSocket(HOST);
    ws.binaryType = 'arraybuffer';
  var bForCCC=true;const ccc = function(mmm){if(bForCCC) bForCCC=confirm(mmm);};

  
  const myCanvas = document.getElementById("myCanvas");
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;
  const DRAW = myCanvas.getContext("2d");
  function line(x1,y1,x2,y2){
    DRAW.beginPath();
    DRAW.moveTo(x1,y1);
    DRAW.lineTo(x2,y2);
    DRAW.stroke();
  }
  function circle(x,y,r){
    DRAW.beginPath();
    DRAW.arc(x,y,r,0,2*Math.PI);
    DRAW.fill();
    DRAW.stroke();
  }
  function rect(x1,y1,w,h){
    DRAW.beginPath();
    DRAW.rect(x1,y1,w,h);
    DRAW.fill();
    DRAW.stroke();
  }
  function distsqrd(x1,y1,x2,y2){
    return (x1-x2)*(x1-x2)+(y1-y2)*(y1-y2);
  }
  
  
  function loadingScreen(){
    DRAW.fillStyle = "rgb(0,0,255)";
    DRAW.strokeStyle = "rgb(0,255,0)";
    DRAW.lineWidth = 5;
    circle(100,100,50);
    rect(100,100,200,200);
    circle(250,250,1);
    line(100,50,200,50);
    line(200,50,200,200);
    line(25,375,375,25);
    DRAW.fillStyle = "rgb(255,255,255)";
    DRAW.strokeStyle = "rgb(0,0,0)";
    DRAW.lineWidth = 1;
  }
  loadingScreen();





  
  var mycoordsBuffer = new ArrayBuffer(2*4);//length 2
    var mycoords = new Float32Array(mycoordsBuffer);
    mycoords[0] = 0;
    mycoords[1] = 0;
  var allcoords = [];
  var interval;
  document.addEventListener('mousemove',function(mouseE){
    mycoords[0] = mouseE.clientX;
    mycoords[1] = mouseE.clientY;
    document.getElementById("score").innerHTML = "x: "+mycoords[0]+" y:"+mycoords[1];
  });
  ws.onmessage = function(event){
    allcoords = new Float32Array(event.data);
  };  
  ws.onclose = function(event){
    window.clearInterval(interval);
  }
  function drawScene(){
    DRAW.clearRect(0,0,myCanvas.width,myCanvas.height);
    for(var a=0;a<allcoords.length;a+=3){
      rect(allcoords[a+1]-5,allcoords[a+2]-5,10,10);
    }
    window.requestAnimationFrame(drawScene);
  }
  ws.onopen = function(event){
    interval=window.setInterval(function(){ws.send(mycoordsBuffer);}, 20);
    window.setTimeout(function(){window.requestAnimationFrame(drawScene);}, 200);
  }


