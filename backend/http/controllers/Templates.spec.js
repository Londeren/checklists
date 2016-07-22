import {expect} from 'chai';
import supertest from 'supertest-as-promised';
import {connect, disconnect, mongoose} from '../../libs/db';
import seed from '../../seed';
import app from '../../app';

const request = supertest.agent(app.listen());

describe('Templates controller', () => {
  before(async () => await connect());
  beforeEach(async () => await seed(mongoose.connection));
  after(() => disconnect());


  it('should return all templates on call /api/templates', async function() {
    const res = await request.get('/api/templates')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).to.have.property('templates');
    // @todo

  });

  it('should not store template with no passed parameters');


});