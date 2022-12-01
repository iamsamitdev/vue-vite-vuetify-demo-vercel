const formatter = new Intl.NumberFormat('en-US', {
    // style: 'currency',
    // currency: 'USD',
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2
})

export const toCurrency = (value: number) => formatter.format(value)