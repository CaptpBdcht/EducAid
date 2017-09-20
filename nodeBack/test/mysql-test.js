let expect = require('chai').expect;
let assert = require('chai').assert;
let sinon = require('sinon');

const MySQLConnector = require('../express/utils/mysql-connector');

describe('MySQLConnector', () => {
  describe('#connect', () => {
    it('Should be defined', () => {
      expect(MySQLConnector.connect).to.be.defined;
    });
  });
});
