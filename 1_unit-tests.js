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

    test('Invalid input (double fraction) should return "invalid number"', function(done) {
      let input = '3/7/2kg';
      assert.strictEqual(convertHandler.getNum(input), 'invalid number');
      done();
    });

    test('Default to 1 when no numerical input is provided', function(done) {
      let input = 'kg';
      assert.strictEqual(convertHandler.getNum(input), 1);
      done();
    });

  });

  suite('Function convertHandler.getUnit(input)', function() {

    test('Valid unit inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg'];
      const output = ['gal','L','mi','km','lbs','kg'];
      input.forEach(function(ele, i) {
        assert.strictEqual(convertHandler.getUnit(ele), output[i]);
      });
      done();
    });

    test('Invalid input unit should return "invalid unit"', function(done) {
      let input = '32g';
      assert.strictEqual(convertHandler.getUnit(input), 'invalid unit');
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit(input)', function() {

    test('Return the correct return unit for each valid input unit', function(done) {
      const input = ['gal','L','mi','km','lbs','kg'];
      const expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.strictEqual(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.spellOutUnit(input)', function() {

    test('Spell out the full unit names', function(done) {
      const input = ['gal','L','mi','km','lbs','kg'];
      const expect = ['gallon','liter','mile','kilometer','pound','kilogram'];
      input.forEach(function(ele, i) {
        assert.strictEqual(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.convert(input)', function() {

    test('Convert gal to L', function(done) {
      let input = [5, 'gal'];
      let expected = 18.92705;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Convert L to gal', function(done) {
      let input = [5, 'L'];
      let expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Convert mi to km', function(done) {
      let input = [5, 'mi'];
      let expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Convert km to mi', function(done) {
      let input = [5, 'km'];
      let expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Convert lbs to kg', function(done) {
      let input = [5, 'lbs'];
      let expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('Convert kg to lbs', function(done) {
      let input = [5, 'kg'];
      let expected = 11.0231;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

  });

});
