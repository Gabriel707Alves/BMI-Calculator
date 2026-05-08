const bnt = document.getElementById('btn-calc')

bnt.addEventListener('click', () =>{
    let inputHeight = document.getElementById('height').value
    let inputWeight = document.getElementById('weight').value

    calcBmi = Number(inputWeight / (inputHeight / 100)**2).toPrecision(3)
    
    let result = document.getElementById('result')
    result.textContent = calcBmi


})
