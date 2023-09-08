let container=document.querySelector('.container');
let touchStartX, touchStartY;
//create divs 
let itemsArray=['main-face']
itemsArray.map(item=>{
    let itemDiv=document.createElement('div')
    itemDiv.classList.add(item)
    container.appendChild(itemDiv) 
})

// Touch events for mobile devices
container.addEventListener('touchstart', function (e) {
    e.preventDefault();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

container.addEventListener('touchmove', function (e) {
    e.preventDefault();
    if (dragItem) {
        console.log(dragItem)
        const offsetX = e.touches[0].clientX - touchStartX;
        const offsetY = e.touches[0].clientY - touchStartY;
        dragItem.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }
});

container.addEventListener('touchend', function () {
    if (dragItem) {
        dragItem.style.transform = '';
    }
    dragItem = null;
});


//create main image 
let mainFaceImage=document.createElement('img')
mainFaceImage.setAttribute('src','./SVG/Asset 2.svg')
document.querySelector('.main-face').appendChild(mainFaceImage)

//create divs inside of it main div refer to facial organs
let organs=["brows","eyes","nose","mouth"]
organs.map(item=>{
    let organsDiv=document.createElement('div')
    organsDiv.classList.add(item)
    document.querySelector('.main-face').appendChild(organsDiv) 
})
//create boxs contains images of facial organs
let boxImages={
faces:['./SVG/face/Asset 8.svg','./SVG/face/Asset 9.svg',
"./SVG/face/Asset 10.svg","./SVG/face/Asset 11.svg",
"./SVG/face/Asset 12.svg","./SVG/face/Asset 13.svg"],

eyes:["./SVG/eyes/Asset 2.svg", "./SVG/eyes/Asset 3.svg" ,"./SVG/eyes/Asset 4.svg" ,"./SVG/eyes/Asset 5.svg"],

brows:[ "./SVG/brows/Asset 18.svg" ,"./SVG/brows/Asset 19.svg" ,"./SVG/brows/Asset 20.svg" ],

noses:["./SVG/moses/Asset 21.svg" ,"./SVG/moses/Asset 22.svg" ,"./SVG/moses/Asset 23.svg"],

lips:['./SVG/lips/Asset 14.svg','./SVG/lips/Asset 15.svg',
"./SVG/lips/Asset 16.svg","./SVG/lips/Asset 17.svg"]
}
for (const category in boxImages) {
    console.log(category)
    if (Object.hasOwnProperty.call(boxImages, category)) {
      const images = boxImages[category];
      const categoryBox = document.createElement('div');
      categoryBox.classList.add(category);
  
      images.forEach((imageUrl, index) => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.setAttribute('draggable', 'true');
  
        const imageOfBox = document.createElement('img');
        imageOfBox.setAttribute('src', imageUrl);
        imageOfBox.classList.add(category.slice(0,category.length-1))
        box.appendChild(imageOfBox);
        categoryBox.appendChild(box);
      });
  
      container.appendChild(categoryBox);
    }
  }
  
  
  
  
  
  
  





let mainFace = document.querySelector('.main-face');
let dragItem = null;
 
  
container.addEventListener('dragstart', function (e) {
    console.log(e.target);
    dragItem = e.target;
    e.dataTransfer.setData('text/plain', ''); 

    // Necessary for some browsers to enable dragging
    e.target.style.opacity = '0.5';
   
});

container.addEventListener('dragend', function () {
    if (dragItem) {
        dragItem.style.opacity = '1';
    }
    dragItem = null;
});


mainFace.addEventListener('dragover', function (e) {
    e.preventDefault();
});

mainFace.addEventListener('drop', function (e) {
    e.preventDefault();
    if (dragItem && dragItem.classList && dragItem.classList.contains('face')) {
        if (mainFace.children[0].tagName === 'IMG') {
            mainFace.children[0].src = dragItem.src;
            
    }
}
else if(dragItem && dragItem.classList && dragItem.classList.contains('brow')){
    if (mainFace.children[1] ) {
        dragItem.style.opacity = '1';
        mainFace.children[1].innerHTML=''
        mainFace.children[1].appendChild( dragItem.cloneNode(true));
    }
}
else if(dragItem && dragItem.classList && dragItem.classList.contains('eye')){
    if (mainFace.children[2] ) {
        dragItem.style.opacity = '1';
        mainFace.children[2].innerHTML=''
        mainFace.children[2].appendChild( dragItem.cloneNode(true));
    }
}
else if(dragItem && dragItem.classList && dragItem.classList.contains('nose')){
    if (mainFace.children[3] ) {
        dragItem.style.opacity = '1';
        mainFace.children[3].innerHTML=''
        mainFace.children[3].appendChild( dragItem.cloneNode(true));
    }
}
else if(dragItem && dragItem.classList && dragItem.classList.contains('lip')){
    if (mainFace.children[4] ) {
        dragItem.style.opacity = '1';
        mainFace.children[4].innerHTML=''
        mainFace.children[4].appendChild( dragItem.cloneNode(true));
    }
}
});

// Prevent the default behavior for drag and drop on the entire document
document.addEventListener('dragover', function (e) {
    e.preventDefault();
});

document.addEventListener('drop', function (e) {
    e.preventDefault();
});
