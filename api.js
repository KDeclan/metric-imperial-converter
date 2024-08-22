'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;

    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    // Check for invalid number and unit
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.json({ error: 'invalid number and unit' });
    } 
    // Check for invalid number
    else if (initNum === 'invalid number' || initNum === '') {
        return res.json({ error: 'invalid number' });
    } 
    // Check for invalid unit
    else if (initUnit === 'invalid unit' || initUnit === '') {
        return res.json({ error: 'invalid unit' });
    }

    // If both number and unit are valid
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string
    });
  });
};
