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
autoSetCanvasSize(yyy)
listenToMouse(yyy)

var eraserEnabled = false
eraser.onclick = function(){
    eraserEnabled = true
    actions.className = 'actions x'
}

brush.onclick = function(){
    eraserEnabled = false
    actions.className = 'actions'
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

function drawCircle(x,y,radius){
    context.beginPath()
    context.arc(x,y,radius,0,Math.PI*2)
    context.fill()
}
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.moveTo(x1,y1)
    context.lineWidth = 5
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
                context.clearRect(x,y,10,10)
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
}