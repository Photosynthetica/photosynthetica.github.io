/*
Send and Display messages from everyone who is connected
 */


// server variables for apps to communicate they must use THE SAME KEYS
//get these keys from your PubNub account
//within your group, you will use 1 of your accounts for the project

let dataServer;

let subKey = "sub-c-dae40c04-757c-11ec-87be-4a1e879706fb";

//interface variables
let sendText;
let sendButton;

///This is my username for the server
let myID = "My Name";

//name used to sort your messages. used like a radio station. can be called anything
let channelName = "airbubble";

///image
let screenW = 800;
let screenH = 400;
let offX = 250;
let offY = 0;
let lRadius = 80;


let bgImage;

let displayfactor = 1;
let RgraphPosX;
let rox = 300;
let lox = 310;
let LgraphPosX;
let imageCenter;

let oname = "r1alpha";
//let r1 = new GraphRead("r1alpha",100,100);

//This object is going to hold all the messages as they come in.
let dataReceived = [];

let lights = [];
let sensors = [];

//message template for the data
let dataToSend = 
{
textMessage:''
};


function preload()
{
bgImage = loadImage('image/bgImage.png');;

}

function setup() 
{
  
  createCanvas(1000,700);
  
  lights.push(new GraphRead("r1alpha",259,487,1));
  lights.push(new GraphRead("r2alpha",277,468,1));
  lights.push(new GraphRead("r3alpha",299,450,1));
  lights.push(new GraphRead("r4alpha",323,426,1));
  lights.push(new GraphRead("r5alpha",347,402,1));
  lights.push(new GraphRead("r6alpha",376,373,1));
  lights.push(new GraphRead("r7alpha",407,342,1));
  lights.push(new GraphRead("r8alpha",439,307,1));
  lights.push(new GraphRead("r9alpha",469,270,1));
  lights.push(new GraphRead("r10alpha",482,225,1));
  lights.push(new GraphRead("r11alpha",477,182,1));
  lights.push(new GraphRead("r12alpha",462,144,1));

  lights.push(new GraphRead("l1alpha",77,143,-1));
  lights.push(new GraphRead("l2alpha",49,178,-1));
  lights.push(new GraphRead("l3alpha",30,218,-1));
  lights.push(new GraphRead("l4alpha",22,258,-1));
  lights.push(new GraphRead("l5alpha",19,299,-1));
  lights.push(new GraphRead("l6alpha",22,334,-1));
  lights.push(new GraphRead("l7alpha",28,367,-1));
  lights.push(new GraphRead("l8alpha",36,397,-1));
  lights.push(new GraphRead("l9alpha",44,422,-1));
  lights.push(new GraphRead("l10alpha",52,445,-1));
  lights.push(new GraphRead("l11alpha",58,464,-1));
  lights.push(new GraphRead("l12alpha",62,482,-1));

  sensors.push(new Sensor(276,480,"sr1/","sr1/temp","sr1/pitch","sr1/roll","sr1/yaw","sr1/colorR","sr1/colorG","sr1/colorB","sr1/bright","sr1/altitude"));
  sensors.push(new Sensor(374,392,"sr2/","sr2/temp","sr2/pitch","sr2/roll","sr2/yaw","sr2/colorR","sr2/colorG","sr2/colorB","sr2/bright","sr2/altitude"));
  sensors.push(new Sensor(469,290,"sr3/","sr3/temp","sr3/pitch","sr3/roll","sr3/yaw","sr3/colorR","sr3/colorG","sr3/colorB","sr3/bright","sr3/altitude"));
  sensors.push(new Sensor(483,161,"sr4/","sr4/temp","sr4/pitch","sr4/roll","sr4/yaw","sr4/colorR","sr4/colorG","sr4/colorB","sr4/bright","sr4/altitude"));

  sensors.push(new Sensor(49,158,"sl1/","sl1/temp","sl1/pitch","sl1/roll","sl1/yaw","sl1/colorR","sl1/colorG","sl1/colorB","sl1/bright","sl1/altitude"));
  sensors.push(new Sensor(10,276,"sl2/","sl2/temp","sl2/pitch","sl2/roll","sl2/yaw","sl2/colorR","sl2/colorG","sl2/colorB","sl2/bright","sl2/altitude"));
  sensors.push(new Sensor(25,386,"sl3/","sl3/temp","sl3/pitch","sl3/roll","sl3/yaw","sl3/colorR","sl3/colorG","sl3/colorB","sl3/bright","sl3/altitude"));
  sensors.push(new Sensor(55,474,"sl4/","sl4/temp","sl4/pitch","sl4/roll","sl4/yaw","sl4/colorR","sl4/colorG","sl4/colorB","sl4/bright","sl4/altitude"));



   // initialize pubnub
  dataServer = new PubNub(
  {
    subscribe_key : subKey,  
    ssl: true,  //enables a secure connection. This option has to be used if using the OCAD webspace
    uuid: myID
  });
  
  //attach callbacks to the pubnub object to handle messages and connections
  dataServer.addListener({ message: readIncoming });
  dataServer.subscribe({channels: [channelName]});



}

function draw() 
{
    background(255);
    image(bgImage,offX,offY,(bgImage.width*displayfactor),(bgImage.height*displayfactor));
    noStroke();
    fill(0);  //read the color values from the message
    //console.log(bgImage.width+" "+bgImage.height);
    imageCenter = offX+((bgImage.width*displayfactor)/2);
    RgraphPosX = imageCenter+(rox*displayfactor);
    LgraphPosX = imageCenter-(lox*displayfactor);
    
    for(let i =0;i<lights.length;i++)
    {
    lights[i].show();
    }
    
    for(let i =0;i<sensors.length;i++)
    {
    sensors[i].show(mouseX,mouseY);
    }   


}




function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  //https://www.w3schools.com/jsref/jsref_push.asp
  //add the message to the array
  //console.log(inMessage.message.map[oname]);
  //dataReceived.unshift(inMessage);


 // graph.input(inMessage.message.map[graph.name]);

  for(let i =0;i<lights.length;i++)
  {
  lights[i].input(inMessage.message.map[lights[i].name]);
  }
  for(let i =0;i<sensors.length;i++)
  {
  let mv = inMessage.message.map[sensors[i].moveKey];
  let tk = inMessage.message.map[sensors[i].tempKey];
  let pk = inMessage.message.map[sensors[i].pitchKey];
  let rk = inMessage.message.map[sensors[i].rollKey];
  let yk = inMessage.message.map[sensors[i].yawKey];
  let crk = inMessage.message.map[sensors[i].rKey];
  let cgk = inMessage.message.map[sensors[i].gKey];  
  let cbk = inMessage.message.map[sensors[i].bKey];
  let brk = inMessage.message.map[sensors[i].brightKey];
  let alk = inMessage.message.map[sensors[i].altKey];


  sensors[i].input(mv,tk,pk,rk,yk,crk,cgk,cbk,brk,alk);
  }
  //r1.input(inMessage.message.map[r1.name]);
  //console.log(inMessage.message);
}

function mouseClicked()
{
  console.log(mouseX+","+mouseY);
}
