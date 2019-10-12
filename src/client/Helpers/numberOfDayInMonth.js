    // Calculate number of days in month and year, Including the temporal year.
    // x - month [1...12]
    // y - year 
    function numberOfDayInMonth(x, y) {
        // Authour Юрий Пальчук Enam 
        // https://habrahabr.ru/post/261773/
       return 28 + ((x + Math.floor(x / 8)) % 2) + 2 % x + Math.floor((1 + (1 - (y % 4 + 2) % (y % 4 + 1)) * ((y % 100 + 2) % (y % 100 + 1)) + (1 - (y % 400 + 2) % (y % 400 + 1))) / x) + Math.floor(1/x) - Math.floor(((1 - (y % 4 + 2) % (y % 4 + 1)) * ((y % 100 + 2) % (y % 100 + 1)) + (1 - (y % 400 + 2) % (y % 400 + 1)))/x); 
    }

export default numberOfDayInMonth;