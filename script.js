const numberToWords = (num) => {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const toWords = (n) => {
        if (n < 20) return ones[n];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? '-' + ones[n % 10] : '');
        if (n < 1000) return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 !== 0 ? ' and ' + toWords(n % 100) : '');
        if (n < 1000000) return toWords(Math.floor(n / 1000)) + ' thousand' + (n % 1000 !== 0 ? ' ' + toWords(n % 1000) : '');
        if (n < 1000000000) return toWords(Math.floor(n / 1000000)) + ' million' + (n % 1000000 !== 0 ? ' ' + toWords(n % 1000000) : '');
        return toWords(Math.floor(n / 1000000000)) + ' billion' + (n % 1000000000 !== 0 ? ' ' + toWords(n % 1000000000) : '');
    };

    return num === 0 ? 'zero' : toWords(num);
};


const calculateGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
};

const inputs = document.querySelectorAll('input[type="number"]');
const grandTotalElement = document.getElementById('grand-total');
const grandTotalWordsElement = document.getElementById('grand-total-words');
const percentageElement = document.getElementById('percentage');
const gradeElement = document.getElementById('grade');

inputs.forEach(input => {
    input.addEventListener('input', () => {
        const max = parseInt(input.getAttribute('data-max'));
        const value = input.valueAsNumber;
        const errorMsg = input.nextElementSibling;

        if (value > max) {
            errorMsg.textContent = `Value should not exceed ${max}`;
            input.value = max;
        } else {
            errorMsg.textContent = '';
        }

        const row = input.closest('tr');
        const theory = row.querySelector('.theory').valueAsNumber || 0;
        const practical = row.querySelector('.practical').valueAsNumber || 0;
        const total = theory + practical;

        row.querySelector('.total').textContent = total;
        row.querySelector('.total-words').textContent = numberToWords(total);

        let grandTotal = 0;
        let totalSubjects = 0;
        document.querySelectorAll('.total').forEach(totalCell => {
            grandTotal += parseInt(totalCell.textContent);
            totalSubjects++;
        });

        const maxTotal = totalSubjects * 100;
        const percentage = (grandTotal / maxTotal) * 100;
        const grade = calculateGrade(percentage);

        grandTotalElement.textContent = grandTotal;
        grandTotalWordsElement.textContent = numberToWords(grandTotal);
        percentageElement.textContent = percentage.toFixed(2) + '%';
        gradeElement.textContent = grade;
    });
});
