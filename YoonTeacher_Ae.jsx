
/*
Script Written by KVVNN
Coded for pentacomm Corp. only
Copyright 2021. PENTACOMM Corp. all rights reserved
*/

var programTitle = "YoonTeacher_v0.1a";


var editSec = 1.5;
var markerTranstion = new MarkerValue("set here");
var effectCount = 4;



// MAINWINDOW
// ==========
var MainWindow = new Window("palette", undefined, undefined, {resizeable: true}); 
    MainWindow.text = programTitle;
    MainWindow.preferredSize.width = 319; 
    MainWindow.orientation = "column"; 
    MainWindow.alignChildren = ["center","center"]; 
    MainWindow.spacing = 10; 
    MainWindow.margins = 16; 

var statictext1 = MainWindow.add("group"); 
    statictext1.orientation = "column"; 
    statictext1.alignChildren = ["left","center"]; 
    statictext1.spacing = 0; 
    statictext1.add("statictext", undefined, "Select effect and set duration.", {name: "statictext1"}); 
    statictext1.add("statictext", undefined, "Press Active button and BOOM!", {name: "statictext1"}); 

// GROUP1
// ======
var group1 = MainWindow.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 10; 
    group1.margins = 0; 

// GROUP2
// ======
var group2 = group1.add("group", undefined, {name: "group2"}); 
    group2.orientation = "column"; 
    group2.alignChildren = ["left","center"]; 
    group2.spacing = 10; 
    group2.margins = 9; 


var radiobuttonList = [];

var radiobutton1 = group2.add("radiobutton", undefined, undefined, {name: "radiobutton1"}); 
    radiobutton1.text = "RotateAndSize (default = 2 sec)"; 
    radiobuttonList.push(radiobutton1);

var radiobutton2 = group2.add("radiobutton", undefined, undefined, {name: "radiobutton2"}); 
    radiobutton2.text = "SpreadAndSize (default = 3 sec)"; 
    radiobuttonList.push(radiobutton2);

var radiobutton3 = group2.add("radiobutton", undefined, undefined, {name: "radiobutton3"}); 
    radiobutton3.text = "SlideOnly (default = 0.5 sec)"; 
    radiobutton3.value = true; 
    radiobuttonList.push(radiobutton3);

var radiobutton4 = group2.add("radiobutton", undefined, undefined, {name: "radiobutton4"}); 
    radiobutton4.text = "(Add Soon)"; 
    radiobuttonList.push(radiobutton4);




// PANEL1
// ======
var Panel1 = group1.add("panel", undefined, undefined, {name: "Panel1"}); 
    Panel1.text = "Settings"; 
    Panel1.orientation = "column"; 
    Panel1.alignChildren = ["left","center"]; 
    Panel1.spacing = 10; 
    Panel1.margins = 10; 

// GROUP3
// ======
var group3 = Panel1.add("group", undefined, {name: "group3"}); 
    group3.orientation = "row"; 
    group3.alignChildren = ["center","center"]; 
    group3.spacing = 2; 
    group3.margins = 0; 

var statictext2 = group3.add("statictext", undefined, undefined, {name: "statictext2"}); 
    statictext2.text = "Duration"; 
//이펙트 길이 설정
var edittext1 = group3.add('edittext {justify: "right", properties: {name: "edittext1"}}'); 
    edittext1.text = editSec; 
    edittext1.preferredSize.width = 35; 

var statictext3 = group3.add("statictext", undefined, undefined, {name: "statictext3"}); 
    statictext3.text = "sec"; 

// PANEL1
// ======
var ActiveButton = Panel1.add("button", undefined, undefined, {name: "ActiveButton"}); 
    ActiveButton.text = "Active!"; 
    ActiveButton.alignment = ["center","center"]; 

// MAINWINDOW
// ==========
var statictext4 = MainWindow.add("statictext", undefined, undefined, {name: "statictext4"}); 
    statictext4.text = "Script written by @KK_vvnn"; 
    statictext4.justify = "center"; 
var statictext5 = MainWindow.add("statictext", undefined, undefined, {name: "statictext5"}); 
    statictext5.text = "Effect created by @aliceblue"; 
    statictext5.justify = "center";
var statictext6 = MainWindow.add("statictext", undefined, undefined, {name: "statictext5"}); 
    statictext6.text = "Copyright 2021. PENTACOMM Corp. all rights reserved"; 
    statictext6.justify = "center"; 

MainWindow.show();


function secChange(){
    editSec = Number(edittext1.text); 
    }
//  버튼 활성화시 .show로 윈도우 내보내 이후에 .onClick = function(){}으로 한번 더 묶어서 사용할 것. 함수는 이 이후에 나와야 함 
    ActiveButton.onClick = function(){selectEffect();};

function selectEffect(){
    
    //activeitem 에러메시지 넣는 방법
         if ((app.project.activeItem == null) || !(app.project.activeItem instanceof CompItem)) {
            alert("Please select or open a composition first.", programTitle);
            return false;
        }
           
   if (radiobutton1.value==true){
            effect1();     
        }else if (radiobutton2.value==true){
            effect2();
        }else if (radiobutton3.value==true){
            effect3();
        }else{
            effect4();
            }
       }
      
 /*       for (i=0; i<radiobuttonList.length; i++){
                if(radiobuttonList[i]==true)
                effect{i}
            
            }
        }
    }*/












    
function effect1(){
  //사용자가 undo했을 때 한 사건으로 처리되도록 꼭 undo그룹으로 묶어줄 것.
 app.beginUndoGroup("effectgroup");
    
    secChange();
    
    var effectSec = editSec;

   
    //adjustment layer만드는 법 = 꼭 solid로 만들것 / solid name은 변수로 따로 지정해줄 것/ .adjustmentLayer값을 True로 만들어줄 것
    var solidName = "RotateAndSize Transition";

  
  //.addSolid(color,name,width,height,pexel, duration)
   var controller = app.project.activeItem.layers.addSolid([0.5, 0.5, 0.5], solidName, 1920, 1080, 1.0, effectSec);
    markerTranstion.duration = 0;
    controller.property("Marker").setValueAtTime(effectSec/2, markerTranstion);
    controller.adjustmentLayer = true;
    controller.motionBlur = true;
    controller.label = 10;
    
    //키프레임 ease값 통일을 위해 변수 설정       //new KeyFrameEase(time,percent)
    var easeIn = new KeyframeEase(effectSec/2,80);
    var easeOut = new KeyframeEase(effectSec/2,80);
  
    //회전시 주변부 채우기 위한 motion tile 효과
    //.setValue()값으로 해당하는 값 주기
    var effectMotionTile = controller.property("Effects").addProperty("Motion Tile");
    effectMotionTile("Output Height").setValue(130);
    effectMotionTile("Output Width").setValue(130);
    effectMotionTile("Mirror Edges").setValue(true);

    //addkey의 인덱스는 [0,1,2,3.....]        //.addkey(time=second)
    var effect1 = controller.property("Effects").addProperty("Transform");
    effect1("Uniform Scale").setValue(true);
    var addRotationStart = effect1.Rotation.addKey(0);
    var addRotationEnd = effect1.Rotation.addKey(effectSec);
    var addScaleStart = effect1("Scale Height").addKey(0);
    var addScaleMid = effect1("Scale Height").addKey(effectSec/2);
    var addScaleEnd = effect1("Scale Height").addKey(effectSec);

    //.setValueAtKey 메소드로 키에 value를 삽입. index는 1부터 시작.      //.setValueAtKey(index,value)
    //setTemporalEaseAtKey메소드를 활용해 Ease값 적용       //setTemporalEaseAtKey(인덱스, [easeOut값], [easeIn값])
    effect1.Rotation.setValueAtKey(1,0);
    effect1.Rotation.setValueAtKey(2,360);
    effect1.Rotation.setTemporalEaseAtKey(1, [easeIn], [easeOut]);    
    effect1.Rotation.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
    
    effect1("Scale Height").setValueAtKey(1,100);
    effect1("Scale Height").setValueAtKey(2,300);
    effect1("Scale Height").setValueAtKey(3,100);
    effect1("Scale Height").setTemporalEaseAtKey(1, [easeIn], [easeOut]);
    //setTemporalAutoBezierAtKey(index,boolean) -> 오토베지어값주기!!
    effect1("Scale Height").setTemporalAutoBezierAtKey(2, 1);
    effect1("Scale Height").setTemporalEaseAtKey(3, [easeIn], [easeOut]);
    
    var effect2 = controller.property("Effects").addProperty("VR Chromatic Aberrations");
    var addRsplitStart = effect2("Aberration (Red)").addKey(0);
    var addRsplitMid = effect2("Aberration (Red)").addKey(effectSec/2);
    var addRsplitEnd = effect2("Aberration (Red)").addKey(effectSec);
    
    var addBsplitStart = effect2("Aberration (Blue)").addKey(0);
    var addBsplitMid = effect2("Aberration (Blue)").addKey(effectSec/2);
    var addBsplitEnd = effect2("Aberration (Blue)").addKey(effectSec);
    
    effect2("Aberration (Red)").setValueAtKey(1,0);
    effect2("Aberration (Red)").setValueAtKey(2,20);
    effect2("Aberration (Red)").setValueAtKey(3,0);
    effect2("Aberration (Red)").setTemporalEaseAtKey(1, [easeIn], [easeOut]);    
    effect2("Aberration (Red)").setTemporalEaseAtKey(3, [easeIn], [easeOut]);
    
    effect2("Aberration (Blue)").setValueAtKey(1,0);
    effect2("Aberration (Blue)").setValueAtKey(2,20);
    effect2("Aberration (Blue)").setValueAtKey(3,0);
    effect2("Aberration (Blue)").setTemporalEaseAtKey(1, [easeIn], [easeOut]);    
    effect2("Aberration (Blue)").setTemporalEaseAtKey(3, [easeIn], [easeOut]);

app.endUndoGroup;
}





function effect2(){
     app.beginUndoGroup("effectgroup");
     
    secChange();
    
    var effectSec = editSec;
    

    
    var solidName = "SpreadandSize Transition";
    var controller = app.project.activeItem.layers.addSolid([0.5,0.5,0.5],solidName,1920,1080,1,effectSec);
    controller.property("Marker").setValueAtTime(effectSec/2, markerTranstion);
    controller.adjustmentLayer = true;
    controller.motionBlur = true;
    controller.label = 10;

    var easeIn = new KeyframeEase(effectSec/2,100);
    var easeOut = new KeyframeEase(effectSec/2,100);
    var easeBlock = new KeyframeEase(1,1);


    var motionTile = controller.property("Effects").addProperty("Motion Tile");
    motionTile("Output Height").setValue(250);
    motionTile("Output Width").setValue(250);
    motionTile("Mirror Edges").setValue(true);
     
    var optics = controller.property("Effects").addProperty("Optics Compensation");
    var FOV = optics("Field Of View (FOV)");
    optics("Reverse Lens Distortion").setValue(true);
    
    var addOpticsStart = FOV.addKey(0);
    var addOpticsMid = FOV.addKey(effectSec/2);
    var addOpticsEnd = FOV.addKey(effectSec+1);
    
    FOV.setValueAtKey(1,0);
    FOV.setValueAtKey(2,150);
    FOV.setValueAtKey(3,0);
    FOV.setTemporalEaseAtKey(1, [easeIn], [easeOut]);
    FOV.setTemporalAutoBezierAtKey(2,1);  
    FOV.setTemporalEaseAtKey(3, [easeIn], [easeOut]);  
    
    
    var transformAdd = controller.property("Effects").addProperty("Transform");
    var rot = transformAdd.Rotation;
    var addRotStart = rot.addKey(effectSec/4);
    var addRotMidOpen = rot.addKey(effectSec/2);
    var addRotMidEnd = rot.addKey(effectSec/2-0.03);
    var addRotEnd = rot.addKey(effectSec/4*3);
    
    rot.setValueAtKey(1,0);
    rot.setValueAtKey(2,90);
    rot.setValueAtKey(3,270);
    rot.setValueAtKey(4,360);
    rot.setTemporalEaseAtKey(1, [easeIn], [easeOut]);
    rot.setInterpolationTypeAtKey(2, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.HOLD);
    rot.setInterpolationTypeAtKey(3, KeyframeInterpolationType.HOLD, KeyframeInterpolationType.BEZIER);
    rot.setTemporalEaseAtKey(4, [easeIn], [easeOut]);
    
    
    var sca = transformAdd.Scale;
    var scaStart = sca.addKey(effectSec/4);
    var scaMid = sca.addKey(effectSec/2);
    var scaEnd = sca.addKey(effectSec/4*3);
    
    sca.setValueAtKey(1,100);
    sca.setValueAtKey(2,200);
    sca.setValueAtKey(3,100);
    sca.setTemporalEaseAtKey(1, [easeIn], [easeOut]);
    sca.setTemporalAutoBezierAtKey(2,1);  
    sca.setTemporalEaseAtKey(3, [easeIn], [easeOut]);  
     
//wiggle , RGB split 추가 필요
     app.endUndoGroup;
    }

function effect3(){

    app.beginUndoGroup("effectgroup");
    
    secChange();
    
    var comp = app.project.activeItem;
    var effectSec = editSec;   

    var solidName = "SildeOnly Transition";
    var controller = app.project.activeItem.layers.addSolid([0.5,0.5,0.5],solidName,1920,1080,1,effectSec);
    controller.property("Marker").setValueAtTime(effectSec/2, markerTranstion);
    controller.adjustmentLayer = true;
    controller.motionBlur = true;
    controller.label = 10;
   
    var easeIn = new KeyframeEase(effectSec/2,100);
    var easeOut = new KeyframeEase(effectSec/2,100);
    var easeBlock = new KeyframeEase(1,1);
    
    var motionTile = controller.property("Effects").addProperty("Motion Tile");
    motionTile("Mirror Edges").setValue(true);
    
    var tileCenter = motionTile("Tile Center");
    var tileStart = tileCenter.addKey(0);
    var tileEnd = tileCenter.addKey(effectSec);
    
    tileCenter.setValueAtKey(1,[comp.width/2,comp.height/2]);
    tileCenter.setValueAtKey(2,[comp.width/2*5,comp.height/2]);
    tileCenter.setTemporalEaseAtKey(1, [easeIn], [easeOut]);
    tileCenter.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
    
    
   }

function effect4(){
    alert("ADD in next version");
    }