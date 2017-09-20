let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

let appMock = require('./app-mock');

chai.use(chaiHttp);

describe('AuthenticationRoute', () => {
  it('Should test route', () => {
    chai.request(appMock)
    .get('/login')
    .end((err, res) => {
      console.warn('loli');
      res.should.have.status(200);
      done();
    });
  });
});
