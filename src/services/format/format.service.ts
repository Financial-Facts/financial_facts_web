// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const FormatService = {

    formatToDollarValue: (value: number): string => {
        return formatter.format(value);
    }

}

export default FormatService;