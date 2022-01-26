class GraphRead
{
    aTarget = 0;
    a = 0;
    constructor(name, x, y, gDir)
    {
        this.name = name;
        this.x = x;
        this.y = y;
        this.aTarget = 0;
        this.dir = gDir;
        //this.a = 0;
        
    }

    input(inputValue)
    {
        //console.log(">>>>>>>  "+inputValue);
        if(inputValue!=null)
        {
            this.aTarget = inputValue;
        }
    }

    show()
    {
       this.a = lerp(this.a,this.aTarget,0.2);
       //console.log("AAAAAAA"+this.a);
        fill(0,255,0,this.a);
        noStroke();
        //fill(255,0,0);
        ellipse((this.x*displayfactor)+offX,(this.y*displayfactor)+offY,lRadius,lRadius);

     ////
     noFill();
     let wpt;
    let offText;
    if(this.dir==1)
    {
        wpt = (RgraphPosX+map(this.a,0,255,0,100)*displayfactor*this.dir);
        offText=15;
        textAlign(LEFT,CENTER);
        fill(0);
        text(this.name.substring(0,this.name.length-5)+": "+map(this.a,0,255,0,100).toFixed(2)+"%",wpt+offText,this.y);   

    }
    else
    {
           
        wpt = (LgraphPosX+map(this.a,0,255,0,100)*displayfactor*this.dir);
        offText= 15;
        textAlign(RIGHT,CENTER);
        fill(0);
        text(map(this.a,0,255,0,100).toFixed(2)+"% : "+ this.name.substring(0,this.name.length-5),wpt+(offText*this.dir),this.y);   

            //console.log("left");    
    }

    stroke(0); 
    strokeWeight(0.5);
    noFill();
     ellipse(wpt+(10*displayfactor*this.dir)/2,this.y*displayfactor,10*displayfactor,10*displayfactor);
     line(this.x*displayfactor+offX,this.y*displayfactor,wpt,this.y);   
    



    }
}

class Sensor
{
  movement = 0;
  temperature = 0;
  pitch = 0;
  roll = 0;
  yaw = 0;
  inColor = 
  {
      r:0,
      g:0,
      b:0
  } 
  brightness = 0;
  altitude = 0; 
 constructor(x,y,moveKey,tempKey,pitchKey,rollKey,yawKey,rKey,gKey,bKey,brightKey,altKey)
 {
  this.x = x;
  this.y = y;
  this.moveKey = moveKey;
  this.tempKey = tempKey;
  this.pitchKey = pitchKey;
  this. rollKey = rollKey;
  this.yawKey = yawKey;
  this.rKey = rKey;
  this.gKey = gKey;
  this.bKey = bKey;
  this.brightKey = brightKey;
  this.altKey = altKey;

 }

 input(mve,temper,pitchin,rollin,yawin,r,g,b,bright,al)
 {
    this.movement = mve;
    this.temperature = temper;
    this.pitch = pitchin;
    this.roll = rollin;
    this.yaw = yawin;
    this.inColor.r = r;
    this.inColor.g = g;
    this.inColor.b = b;

    this.brightness = bright;
    this.altitude = al;
    
 }

 show(mx, my)
 {
    let xpos = (this.x*displayfactor)+offX;
    let ypos = (this.y*displayfactor)+offY; 
    let popdis = dist(mx,my,xpos,ypos);
    let rWidth = 150*displayfactor;
    let rHeight = 120*displayfactor;
    let spacing = 12;
    let typ = 16;
    let xyp = 12;
    //console.log(popdis);
    if(popdis<=10)
    {
        rectMode(CENTER);
        stroke(0);
        strokeWeight(0.5);
        fill(255,255,255,120);
        rect(xpos,ypos,rWidth,rHeight);
        textAlign(LEFT);
        textSize(12);
        fill(0);
        text(this.moveKey,xpos-(rWidth/2)+xyp,ypos-(rHeight/2)+typ);
        text("movement: "+this.movement.toFixed(4),xpos-(rWidth/2)+xyp,ypos-(rHeight/2)+(typ+=spacing));
        text("pitch: "+this.pitch.toFixed(4),xpos-(rWidth/2)+xyp,ypos-(rHeight/2)+(typ+=spacing));
        text("roll: "+this.roll.toFixed(4),xpos-(rWidth/2)+xyp,ypos-(rHeight/2)+(typ+=spacing));
        text("yaw: "+this.yaw.toFixed(4),xpos-(rWidth/2)+xyp,ypos-(rHeight/2)+(typ+=spacing));
        text("light level: "+this.brightness.toFixed(4),xpos-(rWidth/2)+xyp,ypos-(rHeight/2)+(typ+=spacing));
        text("temperature: "+this.temperature.toFixed(4),xpos-(rWidth/2)+xyp,ypos-(rHeight/2)+(typ+=spacing));
        text("altitude: "+this.altitude.toFixed(4),xpos-(rWidth/2)+xyp,ypos-(rHeight/2)+(typ+=spacing));
    }



 }



}