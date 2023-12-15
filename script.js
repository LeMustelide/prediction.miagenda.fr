function nextNum(object) {
    number = parseInt(object.parentElement.querySelector('.box').innerHTML);
    box = object.parentElement.querySelector('.box');
    max = parseInt(box.getAttribute('max'));
    min = parseInt(box.getAttribute('min'));
    if (number < max) {
        object.parentElement.querySelector('.box').innerHTML = number + 1;
        object.parentElement.querySelector('.input').value = number + 1;
        console.log(number + 1);
    }
}

function prevNum(object) {
    number = parseInt(object.parentElement.querySelector('.box').innerHTML);
    
    box = object.parentElement.querySelector('.box');
    max = parseInt(box.getAttribute('max'));
    min = parseInt(box.getAttribute('min'));
    if (number > min) {
        object.parentElement.querySelector('.box').innerHTML = number - 1;
        object.parentElement.querySelector('.input').value = number - 1;
        console.log(number - 1);
    }
}