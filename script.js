
let gridItem =document.createElement('div');
gridItem.setAttribute('class','grid-item');
let gridBox = document.querySelector('#grid-box');
let colorPicker= document.querySelector('#color-picker');
let rgbMode= document.querySelector('#rgb');
let clearBtn=document.querySelector('#clear');
let pixelSlider= document.querySelector('#density');
let resolution = document.querySelector('#resolution');



colorPicker.addEventListener('change',(e)=>{
    color=e.target.value;
    colorMode=defaultMode;
} );
let oMode=document.querySelector('#opacity');

rgbMode.addEventListener('click',()=> colorMode=RainbowMode);
oMode.addEventListener('click',()=> {
    colorMode=opacityMode;
    color='rgba(0,0,0,0.1)';
});
let items = Number(pixelSlider.value)**2;
let dimension = 500/Number(pixelSlider.value);
let color= 'black';
let randomNumber = () => Math.floor(Math.random()*255);
let defaultMode = (e) =>{ 
    e.target.style.opacity=1;
    e.target.style.background=color;
}
let RainbowMode = (e) =>{
    e.target.style.opacity=1;
    e.target.style.background=`rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
}
let opacityMode = (e) =>{
    if(e.target.style.background.match(/0.9/)){
        return
    }
    opacity = e.target.style.background.match( /0.[0-9]/)
     if(Number(opacity) <= 0.8){ 
        e.target.style.background = `rgba(0,0,0,${Number(opacity)+0.1})`;  
    }
}

let colorMode = defaultMode;

const createSketchPad = () => {
    for(let i=0; i<items; i++){
        gridItem.setAttribute('id','grid'+i);
        gridItem.setAttribute('style',`width:${dimension}px;height:${dimension}px`)
        gridBox.appendChild(gridItem.cloneNode(true));
        document.querySelector('#grid'+i).addEventListener('mouseover',
        (e) => colorMode(e));

    }
};
let remakeSketchPad = (boxSize) => {
    let sketchPad = document.querySelector('#grid-box');
    let childrenNum =sketchPad.childNodes.length
    while(childrenNum > 0){
        sketchPad.removeChild(sketchPad.childNodes[0]);
        childrenNum--;
    }
    items =boxSize**2;
    dimension=(500/boxSize).toFixed(3);
    createSketchPad();
}

const clearSketchPad = () =>{
    let div = document.querySelectorAll('.grid-item');
    div.forEach(element => element.style.background='white')
}
clearBtn.addEventListener('click',clearSketchPad)
pixelSlider.addEventListener('change',(e) => {
    remakeSketchPad(Number(e.target.value));
    resolution.innerText= `${e.target.value} x ${e.target.value}`
})

createSketchPad();