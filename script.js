const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClear = document.querySelector('[data-all-clear]');
const del = document.querySelector('[data-delete]');
const equal = document.querySelector('[data-equals]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');

class Calculator{
    constructor(currentOperandTextElement, previousOperandTextElement){
        this.currentOperandTextElement = currentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;   //you can empty string also
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumbers(number){
        if(number === '.' && this.currentOperand.includes('.'))return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    appendOperations(operation){
        if(this.currentOperand === '') return;              //Operation button will not show if currentOperand is empty    
        if(this.previousOperand != ''){
            this.compute();                                    //this is to compute first expression firstly because we cant let further go more than one expression
        }
        this.operation = operation;  
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        let computation;

        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
        
            case '-':
                computation = prev - curr;
                break;

            case '/':
                computation = prev / curr;
                break;

            case '*':
                computation = prev * curr;
                break;

            default: return;
                break;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''     //optional
    }

    getDisplay(number){
        const stringNumber = number.toString();
        const integerNumber = parseFloat(stringNumber.split('.')[0]);
        const decimalNumber = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerNumber)){
            integerDisplay = '';
        } else{
            integerDisplay = integerNumber.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalNumber != null){
            return `${integerDisplay}.${decimalNumber}`; 
          }
          else{
            return integerDisplay;
          }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplay(this.currentOperand);
        this.previousOperandTextElement.innerText = `${this.getDisplay(this.previousOperand)} ${this.operation}`; 
        if(this.operation == null){
            this.previousOperandTextElement.innerText = '';
        }
    }

    numberAnimation(number){
        if(number == '.'){
            number = 'period';
        }
        document.querySelector(`.btn${number}`).classList.add('pressed');

        setTimeout(()=>{
        document.querySelector(`.btn${number}`).classList.remove('pressed');

        },150)
    }
    
    operationAnimation(operation){
        switch (operation) {
            case '+':
                operation = 'plus'
                break;
            
            case '-':
                operation = 'minus'
                break;
            
            case '/':
                operation = 'divide'
                break;

            case '*':
                operation = 'multiply'
                break;
            
            default:
                break;
        }
        document.querySelector(`.${operation}`).classList.add('pressed');

        setTimeout(()=>{
        document.querySelector(`.${operation}`).classList.remove('pressed');

        },150)
    }

    clearAnimation(){
        document.querySelector('.AC').classList.add('pressed');

        setTimeout(()=>{
        document.querySelector('.AC').classList.remove('pressed');

        },150)
    }

    deleteAnimation(){
        document.querySelector('.del').classList.add('pressed');

        setTimeout(()=>{
        document.querySelector('.del').classList.remove('pressed');

        },150)
    }

    equalAnimation(){
        document.querySelector('.equal').classList.add('pressed');

        setTimeout(()=>{
        document.querySelector('.equal').classList.remove('pressed');

        },150)
    }

}

const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement);

numberButtons.forEach((element) => {
    element.addEventListener('click',() =>{
        calculator.appendNumbers(element.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach((element) => {
    element.addEventListener('click',() =>{
        calculator.appendOperations(element.innerText);
        calculator.updateDisplay();
    })
})

allClear.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

del.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

equal.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

document.addEventListener('keydown', (e) => {
    if(e.key === '.' ||
       e.key === '9' ||
       e.key === '8' ||
       e.key === '7' ||
       e.key === '6' ||
       e.key === '5' ||
       e.key === '4' ||
       e.key === '3' ||
       e.key === '2' ||
       e.key === '1' ||
       e.key === '0'
    ){
      calculator.appendNumbers(e.key);
      calculator.updateDisplay();
      calculator.numberAnimation(e.key);
    }
    else if(e.key === 'Backspace'){
      calculator.delete();
      calculator.updateDisplay();
      calculator.deleteAnimation();
    }
    else if(e.key === 'c'){
      calculator.clear();
      calculator.updateDisplay();
      calculator.clearAnimation();
    }
    else if(e.key === 'Enter' || e.key === '='){
      calculator.compute();
      calculator.updateDisplay();
      calculator.equalAnimation();
    }
    else if(e.key === '*' ||
            e.key === '/' ||
            e.key === '+' ||
            e.key === '-'
    ){
      calculator.appendOperations(e.key);
      calculator.updateDisplay();
      calculator.operationAnimation(e.key);
    }
    else{
        return;
    }
  })

