const boxes = document.querySelectorAll('.item');
let dragSrcEl = null; 


function handleDragStart(e) {
    dragSrcEl = this;
    this.classList.add('dragging');
    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); 
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    e.stopPropagation(); 
    e.preventDefault();

    this.classList.remove('over');

    if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}


function handleDragEnd(e) {
    // Loại bỏ class làm mờ
    this.classList.remove('dragging');
    
    boxes.forEach(box => {
        box.classList.remove('over');
    });
}

boxes.forEach(box => {
    box.addEventListener('dragstart', handleDragStart);
    box.addEventListener('dragenter', handleDragEnter);
    box.addEventListener('dragover', handleDragOver);
    box.addEventListener('dragleave', handleDragLeave);
    box.addEventListener('drop', handleDrop);
    box.addEventListener('dragend', handleDragEnd);
});