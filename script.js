const cells = document.querySelectorAll('.cell');
const statusTxt = document.querySelector('.status');
const resetBtn = document.querySelector('.reset');
const winConditions = [
    [0,1,2], [0,3,6], [0,4,8],
    [3,4,5], [1,4,7], [2,4,6]
    [6,7,8], [2,5,8],
];