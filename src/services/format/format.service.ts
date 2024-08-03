// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const FormatService = {

    formatToDollarValue: (value: number): string => {
        return formatter.format(value);
    },

    formatToPercentValue: (value: number): string => {
        return `${roundToDollarValue(value)}%`
    },

    formatToDecimalValue: (value: number): string => {
        return String(roundToDollarValue(value));
    },

    roundToDollarValue: (value: number): number => {
        return roundToDollarValue(value);
    }

}

const roundToDollarValue = (value: number): number => {
    return Math.round(value * 100)  / 100;
};

export default FormatService;
