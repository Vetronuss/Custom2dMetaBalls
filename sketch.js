var points = []
var pointAmount = 20;
var size = 20;
var s;
var c;
function setup() {
  createCanvas(windowWidth, windowHeight);
  s = new shape(mouseX,mouseY,50,120);
  c = new shape(width/2,height/2,50,120);
}

function draw() {
  background(100);
  
  s.update(mouseX,mouseY,c);
  s.draw();
  
  c.update(width/2,height/2,s);
  c.draw();
  
  
  
  
}

class shape
{
  constructor(x,y,size,detail)
  {
    this.ax = x;
    this.ay = y;
    this.size = size;
    this.points = [];
    this.detail = detail
  }
  
  //r = (1/r^2)^2
  //(x−x0)^2+(y−y0)^2=r^2
  update(x,y, other)
  {
    this.ax = x;
    this.ay = y;
    this.points = [];
    for (var i = 0; i < TWO_PI; i+=TWO_PI/this.detail)
    {
      var cx = (x+cos(i)*this.size);
      var cy = (y+sin(i)*this.size);
      
      var angle = atan2(cy-other.ay,cx-other.ax)
      var r = distance(cx,cy,other.ax,other.ay)
      var offset = sq(1/sq(r))
      offset *= 1000000000
      offset = constrain(offset,0,r)
      
      
      var f = distance(cx,cy,this.ax,this.ay)
      
      
      
      cx = cx - cos(angle)*(offset)
      cy = cy - sin(angle)*(offset)
      
      
      
      
      
     
      
      
      this.points.push([cx,cy]);
    }
    text(round(distance(this.ax,this.ay,other.ax,other.ay)),100,300)
  }
  
  draw()
  {
    beginShape();
    for (var i = 0; i < this.points.length; i++)
    {
      curveVertex(this.points[i][0],this.points[i][1])
    }
    endShape()
    
  }
}



function distance(x1,y1,x2,y2)
{
  var distance = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
  return distance;
}