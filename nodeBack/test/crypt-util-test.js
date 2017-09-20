let chai = require('chai');
let should = chai.should();

const CryptoUtil = require('../express/utils/crypt-utils');

const correctPlain = 'teacher1';
const wrongPlain = 'wrong';
const cypher = '$2a$10$r6bfB78dyHmZOCCMUSeIneIujxN86wstqVqZrYwGObwwNDLxn5pxm';

describe('CryptUtils', () => {
  describe('#comparePassword', () => {
    it('Should be defined', () => {
      CryptoUtil.comparePassword.should.be.defined;
    });

    it('Should return truthy value when password match', () => {
      return CryptoUtil.comparePassword(correctPlain, cypher)
      .then(function(res)  {
        res.should.be.defined;
        res.should.be.truthy;
      });
    });

    it('Should return falsy value when password don\'t match', () => {
      return CryptoUtil.comparePassword(wrongPlain, cypher)
      .then(function(res)  {
        res.should.be.defined;
        res.should.be.falsy;
      });
    });
  });
});
