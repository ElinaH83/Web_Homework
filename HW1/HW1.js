document.addEventListener('DOMContentLoaded', function() {
    const formulas = document.querySelectorAll('formula');
    formulas.forEach(initFormula);
});

function initFormula(formula) {
    const evaluator = formula.getAttribute('evaluator');
    const outputElement = document.getElementById(formula.getAttribute('output'));
    if (!outputElement) return;

    const variables = [...new Set(evaluator.match(/[a-zA-Z]+/g) || [])];
    variables.forEach(variable => {
        const input = document.getElementById(variable);
        if (input) {
            input.addEventListener('input', () => updateFormula(evaluator, outputElement));
        }
    });
    updateFormula(evaluator, outputElement);
}

function updateFormula(evaluator, outputElement) {
    try {
        // Validate all inputs first
        const variables = evaluator.match(/[a-zA-Z]+/g) || [];
        const hasInvalidInput = variables.some(variable => {
            const input = document.getElementById(variable);
            return input && /[^\d.]/.test(input.value.trim());
        });

        if (hasInvalidInput) {
            throw new Error('Invalid input');
        }

        const expression = evaluator.replace(/[a-zA-Z]+/g, varName => {
            const input = document.getElementById(varName);
            return input ? parseFloat(input.value) || 0 : 0;
        });

        const result = eval(expression);
        
        outputElement.textContent = result.toLocaleString('fa-IR');
        outputElement.classList.remove('invalid');
    } catch (error) {
        outputElement.textContent = 'فرمول نامعتبر';
        outputElement.classList.add('invalid');
    }
}