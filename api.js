'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;

    try {
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.json({ error: 'Invalid number and unit' });
      } else if (initNum === 'invalid number') {
        return res.json({ error: 'Invalid number' });
      } else if (initUnit === 'invalid unit') {
        return res.json({ error: 'Invalid unit' });
      }

      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string
      });

    } catch (error) {
      res.json({ error: error.message });
    }
  });
};
