import {expect, should} from 'chai';
import supertest from 'supertest-as-promised';
import find from 'lodash/find';
import {connect, disconnect, mongoose} from '../../libs/db';
import seed from '../../seed';
import seedTemplates from '../../seed/templates.json';
import seedUsers from '../../seed/users.json';
import app from '../../app';
import User from '../../models/User';

const api = supertest.agent(app.listen());


describe('Templates controller', () => {
  let accessToken;

  before(async() => await connect());
  beforeEach(async() => {
    await seed(mongoose.connection);

    const seedUser = find(seedUsers, {login: 'admin'});
    const user = await User.findOne({login: seedUser.login});

    accessToken = user.generateToken();
  });
  after(() => disconnect());


  it('should return all templates on call GET /api/templates', async() => {
    const response = await api.get('/api/templates')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).have.property('templates');

    seedTemplates.forEach((template, key) => {
      Object.keys(template).forEach((templateKey) => {
        expect(response.body.templates[key][templateKey]).to.deep.equal(template[templateKey]);
      })
    });
  });

  it('should not save template with no passed parameters POST /api/templates', async() => {
    const response = await api.post('/api/templates')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).have.property('error');
    expect(response.body.error).have.property('message');
    expect(response.body.error.message).have.property('message');
    expect(response.body.error.message).have.property('errors');
  });

  it('should save template with proper parameters POST /api/templates', async() => {
    const newTemplate = {
      id: 'testId',
      name: 'test',
      items: [
        {
          id: 'testId1',
          name: 'test1',
          done: false
        }, {
          id: 'testId2',
          name: 'test2',
          done: true
        }
      ]
    };

    const response = await api.post('/api/templates')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newTemplate)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).to.deep.equal(newTemplate);
  });

  it('should not update template with no passed parameters PUT /api/templates', async() => {
    const response = await api.put('/api/templates')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).have.property('error');
    expect(response.body.error).have.property('message');
    expect(response.body.error.message).have.property('message');
    expect(response.body.error.message).have.property('errors');
  });

  it('should update template with proper parameters PUT /api/templates', async() => {
    let updateTemplate = seedTemplates.slice()[0];
    updateTemplate.name = 'New template name';

    const response = await api.post('/api/templates')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateTemplate)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).to.deep.equal(updateTemplate);
  });


});