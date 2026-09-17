const calculatorForm = document.querySelector('#calculator');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const resultElement = document.querySelector('#result');
const statusElement = document.querySelector('#bmi-status-value');
const healthyRangeElement = document.querySelector('#healthy-range');
const resultCard = document.querySelector('.bmi-result-content');

function getBmiCategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Healthy weight';
    if (bmi < 30) return 'Overweight';
    return 'Obesity';
}

function validateInput(input) {
    const fieldGroup = input.closest('.field-group');
    const errorElement = fieldGroup.querySelector('.field-error');
    const value = Number(input.value);
    let errorMessage = '';

    if (input.value.trim() === '') errorMessage = `Enter your ${input.name}.`;
    else if (!Number.isFinite(value) || value <= 0) errorMessage = 'Enter a value greater than zero.';
    else if (value < Number(input.min) || value > Number(input.max)) errorMessage = `Use a value between ${input.min} and ${input.max}.`;

    fieldGroup.classList.toggle('invalid', Boolean(errorMessage));
    input.setAttribute('aria-invalid', String(Boolean(errorMessage)));
    errorElement.textContent = errorMessage;
    return !errorMessage;
}

function calculateBmi(height, weight) {
    const heightInMeters = height / 100;
    return weight / heightInMeters ** 2;
}

function showResult(bmi, height) {
    const minimumHealthyWeight = 18.5 * (height / 100) ** 2;
    const maximumHealthyWeight = 24.9 * (height / 100) ** 2;
    resultElement.textContent = bmi.toFixed(1);
    statusElement.textContent = getBmiCategory(bmi);
    healthyRangeElement.textContent = `A healthy weight for your height is between ${minimumHealthyWeight.toFixed(1)} kg and ${maximumHealthyWeight.toFixed(1)} kg.`;
    resultCard.classList.remove('updated');
    requestAnimationFrame(() => resultCard.classList.add('updated'));
}

calculatorForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const heightIsValid = validateInput(heightInput);
    const weightIsValid = validateInput(weightInput);

    if (!heightIsValid || !weightIsValid) {
        calculatorForm.querySelector('.invalid input')?.focus();
        return;
    }

    const height = Number(heightInput.value);
    const weight = Number(weightInput.value);
    showResult(calculateBmi(height, weight), height);
});

[heightInput, weightInput].forEach((input) => {
    input.addEventListener('input', () => {
        if (input.closest('.field-group').classList.contains('invalid')) validateInput(input);
    });
});
