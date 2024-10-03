const unitTypeSelect = document.getElementById('unit-type');
const fromUnitSelect = document.getElementById('from-unit');
const toUnitSelect = document.getElementById('to-unit');
const converterForm = document.getElementById('converter-form');
const resultElement = document.getElementById('result');

const units = {
    length: ['Metros', 'Pies'],
    weight: ['Kilogramos', 'Libras'],
    temperature: ['Celsius', 'Fahrenheit']
};

const conversionFunctions = {
    length: (value, from, to) => {
        if (from === 'Metros' && to === 'Pies') return value * 3.28084;
        if (from === 'Pies' && to === 'Metros') return value / 3.28084;
    },
    weight: (value, from, to) => {
        if (from === 'Kilogramos' && to === 'Libras') return value * 2.20462;
        if (from === 'Libras' && to === 'Kilogramos') return value / 2.20462;
    },
    temperature: (value, from, to) => {
        if (from === 'Celsius' && to === 'Fahrenheit') return (value * 9/5) + 32;
        if (from === 'Fahrenheit' && to === 'Celsius') return (value - 32) * 5/9;
    }
};

function populateUnits(unitType) {
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    units[unitType].forEach(unit => {
        const option1 = document.createElement('option');
        option1.value = unit;
        option1.textContent = unit;
        fromUnitSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = unit;
        option2.textContent = unit;
        toUnitSelect.appendChild(option2);
    });
}

unitTypeSelect.addEventListener('change', (e) => {
    populateUnits(e.target.value);
});

converterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = parseFloat(document.getElementById('input-value').value);
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const unitType = unitTypeSelect.value;

    if (fromUnit === toUnit) {
        resultElement.textContent = `No se puede convertir entre las mismas unidades.`;
    } else {
        const result = conversionFunctions[unitType](value, fromUnit, toUnit);
        resultElement.textContent = `Resultado: ${result.toFixed(2)} ${toUnit}`;
    }
});

// Inicializar con la primera opción
populateUnits(unitTypeSelect.value);
