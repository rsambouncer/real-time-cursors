module.exports.exportFunction = function(peoples){
  return function(){
    var infoBuffer = new ArrayBuffer(peoples.length*12);
    console.log(peoples.length);
    var info = new Float32Array(infoBuffer);
    var a=0; for(var p in peoples){
      info[a++] = peoples[p].ws.id;
      info[a++] = peoples[p].x;
      info[a++] = peoples[p].y;
    }
    for(var p in peoples){
      var bbb = new ArrayBuffer(12);
        var iii = new Float32Array(bbb);
        iii[0] = 5;
        iii[1] = 300;
        iii[2] = 500;
      peoples[p].ws.send(bbb);
    }
  };
};
