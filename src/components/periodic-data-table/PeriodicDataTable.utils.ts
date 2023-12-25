export function normalizePercentage(numbers: number[]): number[] {
    const initialValue = numbers[0];
    return numbers.map(num => {
        const percent = num / initialValue;
        return Math.round(percent * 100);
    }).slice(1);
}

export function normalizeYearOverYear(numbers: number[]): number[] {
    return numbers.map((val, index) => {
        let previousVal = val;
        if (index > 0) {
            previousVal = numbers[index - 1];
        }
        const decimal =  (val - previousVal) / Math.abs(previousVal);
        return Math.round(decimal * 100);
    }).slice(1);
}

export function generateColor(): string {
    return `rgb(${generateRGBnum()}, ${generateRGBnum()}, ${generateRGBnum()})`;
}

function generateRGBnum(): number {
    return Math.round(Math.random() * 255);
}
