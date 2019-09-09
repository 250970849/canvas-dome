/* var div = document.getElementById('canvas')
var painting = false

//按下鼠标
div.onmousedown=function(a){
    painting = true
    var x = a.clientX
    var y = a.clientY
    var divA = document.createElement('div')
    divA.style = "width: 6px ;height: 6px;" 
    + "background: black; border-radius: 3px;"
    + "position: absolute; left: "+(x-3)+"px;"+"top: "+(y-3)+"px;"
    div.appendChild(divA)
}

// 动鼠标
div.onmousemove=function(a){
    if(painting){
        var x = a.clientX
        var y = a.clientY
        var divA = document.createElement('div')
        divA.style = "width: 6px ;height: 6px;" 
            + "background: black; border-radius: 3px;"
            + "position: absolute; left: "+(x-3)+"px;"+"top: "+(y-3)+"px;"
        div.appendChild(divA)
    }
}

//松开鼠标
div.onmouseup=function(){
    painting = false
} */

var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')
var lineWidth = 5

autoSetCanvasSize(yyy)

listenToMouse(yyy)

var eraserEnabled = false
pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
clear.onclick = function(){
    context.clearRect(0, 0, yyy.width, yyy.height);
}
download.onclick = function(){
    var url =  yyy.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我 的 画'
    a.target = '_blank'
    a.click()
}
red.onclick = function(){
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function(){
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick = function(){
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    green.classList.remove('active')
    red.classList.remove('active')
}

thin.onclick = function(){
    lineWidth = 5
}

thick.onclick = function(){
    lineWidth = 10
}

function autoSetCanvasSize(canvas){
    setCanvasSize()
    window.onresize = function(){
        setCanvasSize()
    }
    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth
        var pageHeiht = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeiht
   
      
    }
}


function drawLine(x1,y1,x2,y2){
    context.lineJoin = "round"
    context.beginPath();
    context.moveTo(x1,y1)
    context.lineWidth = lineWidth
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}



function listenToMouse(canvas){
    var  using = false
    var lastPoint = {
        x: undefined, 
        y: undefined
    }
    //特 性 检 测
    if(document.body.ontouchstart === undefined){
        // 非 触 屏 手 机
        canvas.onmousedown = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{

                lastPoint = {
                    "x":x,
                    "y":y
                }
            } 
        }
        canvas.onmousemove = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
    
            if(!using){return}
    
            if(eraserEnabled){
                    context.clearRect(x-5,y-5,10,10)
            }else{    
                var newPoint = {
                    "x":x, 
                    "y":y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x,newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function(aaa){
            using = false
        }
    }else{
        // 触 屏 手 机
        canvas.ontouchstart = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{
                lastPoint = {
                    "x":x,
                    "y":y
                }
            } 
        }
        
        canvas.ontouchmove = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
    
            if(!using){return}
    
            if(eraserEnabled){
                    context.clearRect(x-5,y-5,10,10)
            }else{    
                var newPoint = {
                    "x":x, 
                    "y":y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x,newPoint.y)
                lastPoint = newPoint
            }
        }
        
        canvas.ontouchend = function(aaa){
            using = false
        }
    }
    
}



 
