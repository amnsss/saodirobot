function robotWork() {
  var startPosition,
  	  currPosition = {},
  	  mapInfo = document.getElementById('input').value,
  	  mapInfoObj = parseMapInfo(mapInfo);
  for(var i=1; i<=mapInfoObj.x; i++) {
  	for(var j=1; j<=mapInfoObj.y; j++) {
  		// 改变起点 初始化路径和地图
  		if(mapInfoObj.isOk(i, j)) {	
  		  mapInfoObj.mapArr[i][j] = 1;	
  		  mapInfoObj.r--;
  		  startPosition = {x: i, y: j};
  		  currPosition.x = startPosition.x;
  		  currPosition.y = startPosition.y;
  		  route = '';
  		  saodi(currPosition, mapInfoObj, route, startPosition);
  		  mapInfoObj = parseMapInfo(mapInfo);
  		}
  	}
  }
  console.log('over');
}

function saodi(currPosition, mapInfoObj, route, startPosition) {
  while(mapInfoObj.r) {
  	turnUp(currPosition, mapInfoObj, route, startPosition);
  	turnRight(currPosition, mapInfoObj, route, startPosition);
	turnDown(currPosition, mapInfoObj, route, startPosition);
	turnLeft(currPosition, mapInfoObj, route, startPosition);
	return ;
  }
  if(mapInfoObj.r === 0) {
  	// 打印startPosition route结果
  	console.log(startPosition.x+' '+startPosition.y+' '+route);
  }
}

function turnUp(currPosition, mapInfoObj, route, startPosition) {
  /*
  * 1.判断能否转向
  * 能:
  *   1.直线移到被挡住
  *     1.移动一步 mapInfoObj.r减1
  *     2.此位置值变为1 表示已走
  *   2.修改 currPosition 继续调用 saodi()
  *   3.复原 currPosition mapInfoObj 状态
  * 否:
  *   结束返回
  */
  var x = currPosition.x;
  var y = currPosition.y;
  var count = 0; 	
  x--;
  if(mapInfoObj.isOk(x, y)) { 
  	// 添加路径
  	route += 'u';
  	// 直线移动
  	do {
  	  mapInfoObj.mapArr[x][y] = 1;
  	  mapInfoObj.r--;
  	  count++;
  	  x--;
  	} while(mapInfoObj.isOk(x, y))
  	x++;
  	// 被挡住后 继续调用 saodi()
  	currPosition.x = x;
  	saodi(currPosition, mapInfoObj, route, startPosition);
  	// 复原 currPosition mapInfoObj 状态
  	currPosition.x += count;
  	for(var k=0; k<count; k++) {
  		mapInfoObj.mapArr[x][y] = 0;
  		mapInfoObj.r++;
  		x++;
  	}
  }
  return ;
}
function turnRight(currPosition, mapInfoObj, route, startPosition) {
  var x = currPosition.x;
  var y = currPosition.y;
  var count = 0; 	
  y++;
  if(mapInfoObj.isOk(x, y)) { 
  	// 添加路径
  	route += 'r';
  	// 直线移动
  	do {
  	  mapInfoObj.mapArr[x][y] = 1;
  	  mapInfoObj.r--;
  	  count++;
  	  y++;
  	} while(mapInfoObj.isOk(x, y))
  	y--;
  	// 被挡住后 继续调用 saodi()
  	currPosition.y = y;
  	saodi(currPosition, mapInfoObj, route, startPosition);
  	// 复原 currPosition mapInfoObj 状态
  	currPosition.y -= count;
  	for(var k=0; k<count; k++) {
  		mapInfoObj.mapArr[x][y] = 0;
  		mapInfoObj.r++;
  		y--;
  	}
  }
  return ;
}
function turnDown(currPosition, mapInfoObj, route, startPosition) {
  var x = currPosition.x;
  var y = currPosition.y;
  var count = 0; 	
  x++;
  if(mapInfoObj.isOk(x, y)) { 
  	// 添加路径
  	route += 'd';
  	// 直线移动
  	do {
  	  mapInfoObj.mapArr[x][y] = 1;
  	  mapInfoObj.r--;
  	  count++;
  	  x++;
  	} while(mapInfoObj.isOk(x, y))
  	x--;
  	// 被挡住后 继续调用 saodi()
  	currPosition.x = x;
  	saodi(currPosition, mapInfoObj, route, startPosition);
  	// 复原 currPosition mapInfoObj 状态
  	currPosition.x -= count;
  	for(var k=0; k<count; k++) {
  		mapInfoObj.mapArr[x][y] = 0;
  		mapInfoObj.r++;
  		x--;
  	}
  }
  return ;
}
function turnLeft(currPosition, mapInfoObj, route, startPosition) {
  var x = currPosition.x;
  var y = currPosition.y;
  var count = 0; 	
  y--;
  if(mapInfoObj.isOk(x, y)) { 
  	// 添加路径
  	route += 'l';
  	// 直线移动
  	do {
  	  mapInfoObj.mapArr[x][y] = 1;
  	  mapInfoObj.r--;
  	  count++;
  	  y--;
  	} while(mapInfoObj.isOk(x, y))
  	y++;
  	// 被挡住后 继续调用 saodi()
  	currPosition.y = y;
  	saodi(currPosition, mapInfoObj, route, startPosition);
  	// 复原 currPosition mapInfoObj 状态
  	currPosition.y += count;
  	for(var k=0; k<count; k++) {
  		mapInfoObj.mapArr[x][y] = 0;
  		mapInfoObj.r++;
  		y++;
  	}
  }
  return ;
}

function parseMapInfo(mapInfo) {
  var mapInfoArr = mapInfo.split('&'),
  	  mapInfoObj = {};
  mapInfoObj.level = mapInfoArr[0].slice(6);
  mapInfoObj.r = 0;
  mapInfoObj.x = parseInt(mapInfoArr[1].slice(2));
  mapInfoObj.y = parseInt(mapInfoArr[2].slice(2));
  mapStr = mapInfoArr[3].slice(4);
  mapInfoObj.mapArr = [];
  for(var i=1; i<=mapInfoObj.x; i++){
  	mapInfoObj.mapArr[i] = [];
  	for(var j=1; j<=mapInfoObj.y; j++){
  		mapInfoObj.mapArr[i][j] = parseInt(mapStr[(i-1)*mapInfoObj.y + j - 1]);
  		if(!mapInfoObj.mapArr[i][j]) {
  		  mapInfoObj.r++;
  		}
  	}
  }
  mapInfoObj.isOk = function(x, y) {
  	if(0<x && x<=this.x && 0<y && y<=this.y) {
  		return this.mapArr[x][y] === 0 ? true : false;
  	}
  	return false;
  }
  return mapInfoObj;
}






