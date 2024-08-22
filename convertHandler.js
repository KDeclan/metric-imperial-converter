function ConvertHandler() {
  
  this.getNum = function(input) {
    let numStr = input.match(/^[^a-zA-Z]+/); // Match anything until a letter is found
    
    if (numStr) {
        numStr = numStr[0];
        
        // Check for invalid double fraction (more than one '/')
        if (numStr.split('/').length > 2) {
            throw new Error('Invalid input: double fraction');
        }

        // Handle valid fraction
        if (numStr.includes('/')) {
            let fractionParts = numStr.split('/');
            return parseFloat(fractionParts[0]) / parseFloat(fractionParts[1]);
        } else {
            return parseFloat(numStr);
        }
    }
    
    // Default to 1 if no valid number is provided
    return 1;
};




  
this.getUnit = function(input) {
  let result;
  // Match the unit part of the input (all characters after the number)
  let match = input.match(/[a-zA-Z]+$/);
  
  if (match) {
      result = match[0];
  }
  return result || '';
};

  
  this.getReturnUnit = function(initUnit) {
    let result;
    let units = new Map([
      ['gal', 'L'],
      ['mi', 'km'],
      ['lbs', 'kg'],
      ['L', 'gal'],
      ['km', 'mi'],
      ['kg', 'lbs'],
  ]);

    if (units.has(initUnit)) {
      result = units.get(initUnit);
    } else {
      throw new Error("Invalid input: Not a unit.");
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    let units = new Map([
      ['gal', 'gallon'],
      ['mi', 'mile'],
      ['lbs', 'pound'],
      ['L', 'liter'],
      ['km', 'kilometer'],
      ['kg', 'kilogram'],
  ]);

  if (units.has(unit)) {
    result = units.get(unit);
  } else {
    throw new Error("Invalid input: Not a unit.");
  }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    if (isNaN(initNum)) {
        throw new Error("Invalid number");
    }

    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        throw new Error("Invalid unit");
    }

    return parseFloat(result.toFixed(5));
};

  
  this.getString = function(initNum, initUnit) {
    returnNum = this.convert(initNum, initUnit);
    returnUnit = this.getReturnUnit(initUnit);

    let result = `${initNum} ${this.spellOutUnit(initUnit)}s converts to ${returnNum} ${this.spellOutUnit(returnUnit)}s`;
    return result;
  };
  
}

module.exports = ConvertHandler;
