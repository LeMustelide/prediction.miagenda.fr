function nextNum(object) {
    number = parseFloat(object.parentElement.querySelector('.box').innerHTML);
    const box = object.parentElement.querySelector('.box');
    const max = parseFloat(box.getAttribute('max'));
    const min = parseFloat(box.getAttribute('min'));
    if (number < max) {
        object.parentElement.querySelector('.box').innerHTML = number + 0.5;
        object.parentElement.querySelector('.input').value = number + 0.5;
    }
}

function prevNum(object) {
    number = parseFloat(object.parentElement.querySelector('.box').innerHTML);
    
    const box = object.parentElement.querySelector('.box');
    const max = parseFloat(box.getAttribute('max'));
    const min = parseFloat(box.getAttribute('min'));
    if (number > min) {
        object.parentElement.querySelector('.box').innerHTML = number - 0.5;
        console.log(object.parentElement.querySelector('.box').innerHTML);
        object.parentElement.querySelector('.input').value = number - 0.5;
        console.log("input: " + object.parentElement.querySelector('.input').value);
    }
}