// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const FormatService = {

    formatToDollarValue: (value: number): string => {
        return formatter.format(value);
    },

    roundToDollarValue: (value: number): number => {
        return Math.round(value * 100)  / 100;
    }

}

export default FormatService;