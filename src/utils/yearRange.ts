const currentYear = (new Date()).getFullYear();

const yearRange = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

// get the year range from 10 years ago to current year
// console.log(yearRange(currentYear, currentYear - 10, -1))

export default yearRange