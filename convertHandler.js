function ConvertHandler() {
  
  this.getNum = function(input) {
    let numStr = input.match(/^[^a-zA-Z]+/);

    if (numStr) {
        numStr = numStr[0];

        // Check for invalid double fraction
        if (numStr.split('/').length > 2) {
            return 'invalid number';  // Return 'invalid number' instead of throwing
        }

        // Handle valid fraction
        if (numStr.includes('/')) {
            let fractionParts = numStr.split('/');
            if (fractionParts.length !== 2 || isNaN(fractionParts[0]) || isNaN(fractionParts[1])) {
                return 'invalid number';
            }
            return parseFloat(fractionParts[0]) / parseFloat(fractionParts[1]);
        } else {
            return isNaN(parseFloat(numStr)) ? 'invalid number' : parseFloat(numStr);
        }
    }

    return 1; // Default to 1
};


this.getUnit = function(input) {
  let result;
  let match = input.match(/[a-zA-Z]+$/);
  
  if (match) {
      result = match[0].toLowerCase();
      if (result === 'l') result = 'L'; // Handle special case for 'L'

      const validUnits = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
      if (!validUnits.includes(result)) {
          return 'invalid unit';
      }
  } else {
      return '';
  }
  
  return result;
};


this.getReturnUnit = function(initUnit) {
  const units = {
    gal: 'L',
    L: 'gal',
    lbs: 'kg',
    kg: 'lbs',
    mi: 'km',
    km: 'mi'
  };
  
  return units[initUnit] || 'invalid unit';
};

this.spellOutUnit = function(unit) {
  const units = {
    gal: 'gallon',
    mi: 'mile',
    lbs: 'pound',
    L: 'liter',
    km: 'kilometer',
    kg: 'kilogram'
  };

  return units[unit] || 'invalid unit';
};

this.convert = function(initNum, initUnit) {
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

  const conversionFactors = {
    gal: galToL,
    L: 1 / galToL,
    lbs: lbsToKg,
    kg: 1 / lbsToKg,
    mi: miToKm,
    km: 1 / miToKm
  };

  if (!conversionFactors.hasOwnProperty(initUnit)) {
      return NaN; // Handle invalid units properly
  }

  return parseFloat((initNum * conversionFactors[initUnit]).toFixed(5));
};


  this.getString = function(initNum, initUnit) {
    const returnNum = this.convert(initNum, initUnit);
    const returnUnit = this.getReturnUnit(initUnit);

    return `${initNum} ${this.spellOutUnit(initUnit)}s converts to ${returnNum} ${this.spellOutUnit(returnUnit)}s`;
  };
}

module.exports = ConvertHandler;
