const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      let input = '32kg';
      assert.strictEqual(convertHandler.getNum(input), 32);
      done();
    });
    
    test('Decimal number input', function(done) {
      let input = '3.5mi';
      assert.strictEqual(convertHandler.getNum(input), 3.5);
      done();
    });
    
    test('Fractional input', function(done) {
      let input = '3/4lbs';
      assert.strictEqual(convertHandler.getNum(input), 0.75);
      done();
    });

    test('Fractional input with decimal', function(done) {
      let input = '5.5/10gal';
      assert.strictEqual(convertHandler.getNum(input), 0.55);
      done();
    });

    test('Default to 1 when no numerical input is provided', function(done) {
      let input = 'kg';
      assert.strictEqual(convertHandler.getNum(input), 1);
      done();
    });

    test('Invalid input (double fraction) should throw an error', function(done) {
        let input = '3/7/2kg';
        assert.throws(() => convertHandler.getNum(input), Error, 'Invalid input: double fraction');
        done();
    });

    test('Invalid input (alphabetic characters)', function(done) {
      let input = 'abc';
      assert.strictEqual(convertHandler.getNum(input), 1);
      done();
    });

  });

  suite('Function convertHandler.getUnit(input)', function() {

    test('Valid unit input', function(done) {
      let input = '32kg';
      assert.strictEqual(convertHandler.getUnit(input), 'kg');
      done();
    });

    test('Valid unit with decimal number', function(done) {
      let input = '3.5mi';
      assert.strictEqual(convertHandler.getUnit(input), 'mi');
      done();
    });

    test('Valid unit with fraction', function(done) {
      let input = '3/4lbs';
      assert.strictEqual(convertHandler.getUnit(input), 'lbs');
      done();
    });

    test('Valid unit with fractional decimal', function(done) {
      let input = '5.5/10gal';
      assert.strictEqual(convertHandler.getUnit(input), 'gal');
      done();
    });

    test('No numerical input, only unit', function(done) {
      let input = 'kg';
      assert.strictEqual(convertHandler.getUnit(input), 'kg');
      done();
    });

    test('Invalid input with no unit', function(done) {
      let input = '123';
      assert.strictEqual(convertHandler.getUnit(input), '');
      done();
    });

  });

  suite('Function convertHandler.getReturnUnit(input)', function() {

    test('Gallon input', function(done) {
        let input = 'gal';
        assert.strictEqual(convertHandler.getReturnUnit(input), 'L');
        done();
    });

    test('Miles input', function(done) {
        let input = 'mi';
        assert.strictEqual(convertHandler.getReturnUnit(input), 'km');
        done();
    });

    test('Pounds input', function(done) {
        let input = 'lbs';
        assert.strictEqual(convertHandler.getReturnUnit(input), 'kg');
        done();
    });

    test('Liter input', function(done) {
        let input = 'L';
        assert.strictEqual(convertHandler.getReturnUnit(input), 'gal');
        done();
    });

    test('Kilometer input', function(done) {
        let input = 'km';
        assert.strictEqual(convertHandler.getReturnUnit(input), 'mi');
        done();
    });

    test('Kilogram input', function(done) {
        let input = 'kg';
        assert.strictEqual(convertHandler.getReturnUnit(input), 'lbs');
        done();
    });
  });

  suite('Function convertHandler.spellOutUnit(input)', function() {

    test('Gallon input', function(done) {
        let input = 'gal';
        assert.strictEqual(convertHandler.spellOutUnit(input), 'gallon');
        done();
    });

    test('Miles input', function(done) {
        let input = 'mi';
        assert.strictEqual(convertHandler.spellOutUnit(input), 'mile');
        done();
    });

    test('Pounds input', function(done) {
        let input = 'lbs';
        assert.strictEqual(convertHandler.spellOutUnit(input), 'pound');
        done();
    });

    test('Liter input', function(done) {
        let input = 'L';
        assert.strictEqual(convertHandler.spellOutUnit(input), 'liter');
        done();
    });

    test('Kilometer input', function(done) {
        let input = 'km';
        assert.strictEqual(convertHandler.spellOutUnit(input), 'kilometer');
        done();
    });

    test('Kilogram input', function(done) {
        let input = 'kg';
        assert.strictEqual(convertHandler.spellOutUnit(input), 'kilogram');
        done();
    });
  });

  suite('Function convertHandler.convert(input)', function() {

    test('Gallon input', function(done) {
      let inputNum = 1;
      let inputUnit = 'gal';
      assert.strictEqual(convertHandler.convert(inputNum, inputUnit), 3.78541)
      done();
    });

    test('Liter input', function(done) {
      let inputNum = 1;
      let inputUnit = 'L';
      assert.strictEqual(convertHandler.convert(inputNum, inputUnit), 0.26417)
      done();
    });

    test('Pounds input', function(done) {
      let inputNum = 1;
      let inputUnit = 'lbs';
      assert.strictEqual(convertHandler.convert(inputNum, inputUnit), 0.45359)
      done();
    });

    test('Kilogram input', function(done) {
      let inputNum = 1;
      let inputUnit = 'kg';
      assert.strictEqual(convertHandler.convert(inputNum, inputUnit), 2.20462)
      done();
    });

    test('Miles input', function(done) {
      let inputNum = 1;
      let inputUnit = 'mi';
      assert.strictEqual(convertHandler.convert(inputNum, inputUnit), 1.60934)
      done();
    });

    test('Kilometer input', function(done) {
      let inputNum = 1;
      let inputUnit = 'km';
      assert.strictEqual(convertHandler.convert(inputNum, inputUnit), 0.62137)
      done();
    });
  });

  suite('Function convertHandler.getString(initNum, initUnit)', function() {

    test('Gallon Input', function(done) {
      let inputNum = 1;
      let inputUnit = 'gal';
      assert.strictEqual(convertHandler.getString(inputNum, inputUnit), '1 gallons converts to 3.78541 liters');
      done();
    });

    test('Liter Input', function(done) {
      let inputNum = 1;
      let inputUnit = 'L';
      assert.strictEqual(convertHandler.getString(inputNum, inputUnit), '1 liters converts to 0.26417 gallons');
      done();
    });

    test('Pounds Input', function(done) {
      let inputNum = 1;
      let inputUnit = 'lbs';
      assert.strictEqual(convertHandler.getString(inputNum, inputUnit), '1 pounds converts to 0.45359 kilograms');
      done();
    });

    test('Kilogram Input', function(done) {
      let inputNum = 1;
      let inputUnit = 'kg';
      assert.strictEqual(convertHandler.getString(inputNum, inputUnit), '1 kilograms converts to 2.20462 pounds');
      done();
    });

    test('Miles Input', function(done) {
      let inputNum = 1;
      let inputUnit = 'mi';
      assert.strictEqual(convertHandler.getString(inputNum, inputUnit), '1 miles converts to 1.60934 kilometers');
      done();
    });

    test('Kilometer Input', function(done) {
      let inputNum = 1;
      let inputUnit = 'km';
      assert.strictEqual(convertHandler.getString(inputNum, inputUnit), '1 kilometers converts to 0.62137 miles');
      done();
    });
  });
});
