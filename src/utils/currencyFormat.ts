const currencyFormat = (amount: number, dp?: boolean) => {
    return `N${amount
      .toFixed(dp ? 2 : 0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  };
  
  export default currencyFormat;