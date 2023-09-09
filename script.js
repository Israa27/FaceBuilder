let container = document.querySelector('.container');
let touchStartX, touchStartY;
let dragItem = null;


// Create divs
let itemsArray = ['main-face'];
itemsArray.forEach(item => {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add(item);
    container.appendChild(itemDiv);
});


// Create main image
let mainFaceImage = document.createElement('img');
mainFaceImage.setAttribute('src', './SVG/Asset 2.svg');
document.querySelector('.main-face').appendChild(mainFaceImage);

// Create divs inside the main div referring to facial organs
let organs = ["brow", "eye", "nose", "mouth"];
organs.forEach(item => {
    let organsDiv = document.createElement('div');
    organsDiv.classList.add(item);
    document.querySelector('.main-face').appendChild(organsDiv);
});

// Create boxes containing images of facial organs
let boxImages = {
    faces: ['./SVG/face/Asset 8.svg', './SVG/face/Asset 9.svg', "./SVG/face/Asset 10.svg", "./SVG/face/Asset 11.svg", "./SVG/face/Asset 12.svg", "./SVG/face/Asset 13.svg"],
    eyes: ["./SVG/eyes/Asset 2.svg", "./SVG/eyes/Asset 3.svg", "./SVG/eyes/Asset 4.svg", "./SVG/eyes/Asset 5.svg"],
    brows: ["./SVG/brows/Asset 18.svg", "./SVG/brows/Asset 19.svg", "./SVG/brows/Asset 20.svg"],
    noses: ["./SVG/moses/Asset 21.svg", "./SVG/moses/Asset 22.svg", "./SVG/moses/Asset 23.svg"],
    lips: ['./SVG/lips/Asset 14.svg', './SVG/lips/Asset 15.svg', "./SVG/lips/Asset 16.svg", "./SVG/lips/Asset 17.svg"]
};

for (const category in boxImages) {
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
            imageOfBox.classList.add(category.slice(0, category.length - 1))
            box.appendChild(imageOfBox);
            categoryBox.appendChild(box);
        });

        container.appendChild(categoryBox);
    }
}

let mainFace = document.querySelector('.main-face');



container.addEventListener('dragstart', function (e) {
    dragItem = e.target;
    e.dataTransfer.setData('text/plain', '');
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
    } else if (dragItem && dragItem.classList && dragItem.classList.contains('brow')) {
        if (mainFace.children[1]) {
            dragItem.style.opacity = '1';
            mainFace.children[1].innerHTML = '';
            mainFace.children[1].appendChild(dragItem.cloneNode(true));
        }
    } else if (dragItem && dragItem.classList && dragItem.classList.contains('eye')) {
        if (mainFace.children[2]) {
            dragItem.style.opacity = '1';
            mainFace.children[2].innerHTML = '';
            mainFace.children[2].appendChild(dragItem.cloneNode(true));
        }
    } else if (dragItem && dragItem.classList && dragItem.classList.contains('nose')) {
        if (mainFace.children[3]) {
            dragItem.style.opacity = '1';
            mainFace.children[3].innerHTML = '';
            mainFace.children[3].appendChild(dragItem.cloneNode(true));
        }
    } else if (dragItem && dragItem.classList && dragItem.classList.contains('lip')) {
        if (mainFace.children[4]) {
            dragItem.style.opacity = '1';
            mainFace.children[4].innerHTML = '';
            mainFace.children[4].appendChild(dragItem.cloneNode(true));
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
// Select the container with items you want to make sortable

if (window.matchMedia("(max-width: 600px)").matches) { 
    // Function to initialize SortableJS for a specific container and items
function initializeSortable(containerSelector, itemSelector, onEndCallback) {
    const container = document.querySelector(containerSelector);

    // Initialize SortableJS with touch support for the specified container
    new Sortable(container, {
        animation: 150, // You can customize the animation duration
        touchStartThreshold: 10, // Customize the touch threshold as needed
        onStart(evt) {
            // Add any necessary onStart logic
            // For example, you can change the item's appearance while dragging
            evt.from.querySelectorAll(itemSelector).forEach(item => {
                item.style.opacity = '0.5';
            });
        },
        onEnd(evt) {
            // Add any necessary onEnd logic
            // For example, you can reset the item's appearance after dragging
            evt.from.querySelectorAll(itemSelector).forEach(item => {
                item.style.opacity = '1';
            });

            // Callback function for when the sorting ends
            if (typeof onEndCallback === 'function') {
                onEndCallback(evt);
            }
        },
        // Add more options and callbacks as required
    });
}

// Callback function to handle replacing the main-face
function replaceMainFace(evt) {
    const mainFace = document.querySelector('.main-face');
    if (evt.newIndex !== null) {
        const selectedFace = evt.from.children[evt.newIndex];
        const mainFaceImage = mainFace.querySelector('img');

        // Replace the src attribute of the main-face image with the selected face image's src
        mainFaceImage.src = selectedFace.querySelector('img').src;
    }
}
// Callback function to handle append brows to the main-face
function appendbrowToMainFace(evt) {
    if (evt.newIndex !== null) {
        const selectedEye = evt.from.children[evt.newIndex];
        const mainFaceBrowsDiv = document.querySelector('.main-face .brow');
        
        // Clear the current content of the main-face eye div
        mainFaceBrowsDiv.innerHTML = '';
        
        // Append the selected eye to the main-face eye div
        mainFaceBrowsDiv.appendChild(selectedEye.cloneNode(true));
    }
}
// Callback function to handle append lip to the main-face
function appendLipToMainFace(evt) {
    if (evt.newIndex !== null) {
        const selectedNose = evt.from.children[evt.newIndex].querySelector('img'); // Get the selected nose image
        const mainFaceLipDiv = document.querySelector('.main-face .mouth');
        
        // Clear the current content of the main-face nose div
        mainFaceLipDiv.innerHTML = '';
        
        // Append the selected nose image to the main-face nose div
       mainFaceLipDiv.appendChild(selectedNose.cloneNode(true));
    }
}
// Callback function to handle append nose to the main-face
function appendNoseToMainFace(evt) {
    if (evt.newIndex !== null) {
        const selectedNose = evt.from.children[evt.newIndex].querySelector('img'); // Get the selected nose image
        const mainFaceNoseDiv = document.querySelector('.main-face .nose');
     
        mainFaceNoseDiv.innerHTML = '';
        mainFaceNoseDiv.appendChild(selectedNose.cloneNode(true));
    }
}
// Callback function to handle append brows to the main-face
function appendBrowToMainFace(evt) {
    if (evt.newIndex !== null) {
        const selectedNose = evt.from.children[evt.newIndex].querySelector('img'); // Get the selected nose image
        const mainFaceBrowDiv = document.querySelector('.main-face .brow');
        
    
        mainFaceBrowDiv.innerHTML = '';
        mainFaceBrowDiv.appendChild(selectedNose.cloneNode(true));
    }
}
// Callback function to handle append eyes to the main-face
function appendEyeToMainFace(evt) {
    if (evt.newIndex !== null) {
        const selectedNose = evt.from.children[evt.newIndex].querySelector('img'); // Get the selected nose image
        const mainFaceEyeDiv = document.querySelector('.main-face .eye');
        
        mainFaceEyeDiv.innerHTML = '';
        mainFaceEyeDiv.appendChild(selectedNose.cloneNode(true));
    }
}

initializeSortable('.eyes', '.box', appendEyeToMainFace);
initializeSortable('.brows', '.box', appendBrowToMainFace);
initializeSortable('.noses', '.box', appendNoseToMainFace);
initializeSortable('.lips', '.box', appendLipToMainFace);
// Call the initializeSortable function for the faces container
initializeSortable('.faces', '.box', replaceMainFace); // For the faces container and its items

}