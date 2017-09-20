let chai = require('chai');
let should = chai.should();

const configuration = require('../express/utils/config');

describe('Configuration', () => {
  it('Should be a defined object', () => {
    configuration.should.be.defined;
    configuration.should.be.an('object');
  });

  it('Should have port property with number value', () => {
    configuration.port.should.be.defined;
    configuration.port.should.be.a('number');
  });

  describe('Should have a database property', () => {
    it('- being a defined object', () => {
      configuration.database.should.not.be.defined;
      configuration.database.should.be.an('object');
    });
    
    describe('With a connection property object', () => {
      it('- being a defined object', () => {
        configuration.database.connection.should.be.defined;
        configuration.database.connection.should.be.an('object');
      });
      
      it('With properties host, user, password and database strings', () => {
        configuration.database.connection.host.should.be.defined;
        configuration.database.connection.user.should.be.defined;
        configuration.database.connection.password.should.be.defined;
        configuration.database.connection.database.should.be.defined;
        configuration.database.connection.host.should.be.a('string');
        configuration.database.connection.user.should.be.a('string');
        configuration.database.connection.password.should.be.a('string');
        configuration.database.connection.database.should.be.a('string');
      });
    });

    it('With salt and pepper strings', () => {
      configuration.database.salt.should.be.defined;
      configuration.database.pepper.should.be.defined;
      configuration.database.salt.should.be.a('string');
      configuration.database.pepper.should.be.a('string');
    });
  });
});
