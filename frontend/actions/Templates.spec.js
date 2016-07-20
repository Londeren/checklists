import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {expect} from 'chai';

import config from '../../config';
import {addTemplate, updateTemplate, fetchTemplates, storeTemplate} from './Templates';
import {TEMPLATE_ADD,
  TEMPLATE_FETCH_STARTED, TEMPLATE_FETCH_COMPLETED,
  TEMPLATE_STORE_STARTED, TEMPLATE_STORE_COMPLETED,
  TEMPLATE_UPDATE_STARTED, TEMPLATE_UPDATE_COMPLETED} from '../constants/ActionTypes';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Templates actions', () => {

  describe('addTemplate', () => {

    it('should create an action to create a template', () => {
      const name = 'Template name';
      const items = [
        {
          name: 'first item'
        }
      ];
      const expectedAction = {
        type: TEMPLATE_ADD,
        name,
        items
      };

      expect(addTemplate(name, items)).to.include(expectedAction);
    });

  });

  describe('updateTemplate', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should create TEMPLATE_UPDATE_COMPLETED when template has been updated', (done) => {
      const setupTemplate = {
        id: '328398ba-c578-48b4-9129-6ec70f787de6',
        name: 'Practical Assurance',
        items: [
          {
            id: '7251d6df-10d6-4ca5-892e-f21ede975033',
            name: 'Drive Garden',
            done: false
          }
        ]
      };

      nock(config.get('base_path'))
        .put('/api/templates')
        .reply(200, setupTemplate);

      const expectedActions = [
        {type: TEMPLATE_UPDATE_STARTED},
        {type: TEMPLATE_UPDATE_COMPLETED, ...setupTemplate}
      ];
      const store = mockStore({templates: [setupTemplate]});

      store.dispatch(updateTemplate(setupTemplate.id, setupTemplate.name, setupTemplate.items))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
        .then(done)
        .catch(done);
    });
  });

  describe('fetchTemplates', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should create TEMPLATE_FETCH_COMPLETED when fetching templates has been done', (done) => {
      //<editor-fold desc="const setupTemplates = {}">
      const setupTemplates = {
        'templates': [
          {
            id: '328398ba-c578-48b4-9129-6ec70f787de6',
            name: 'Practical Assurance',
            items: [
              {
                id: '7251d6df-10d6-4ca5-892e-f21ede975033',
                name: 'Drive Garden',
                done: false
              }
            ]
          }
        ]
      };
      //</editor-fold>

      nock(config.get('base_path'))
        .get('/api/templates')
        .reply(200, setupTemplates);

      const expectedActions = [
        {type: TEMPLATE_FETCH_STARTED},
        {type: TEMPLATE_FETCH_COMPLETED, templates: setupTemplates.templates}
      ];
      const store = mockStore({templates: []});

      store.dispatch(fetchTemplates())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
        .then(done)
        .catch(done);
    });
  });

  describe('storeTemplate', () => {
    afterEach(() => {
      nock.cleanAll()
    });

    it('should create TEMPLATE_STORE_COMPLETED when storing template has been done', (done) => {
      const setupTemplate = {
        id: '328398ba-c578-48b4-9129-6ec70f787de6',
        name: 'Practical Assurance',
        items: [
          {
            id: '7251d6df-10d6-4ca5-892e-f21ede975033',
            name: 'Drive Garden',
            done: false
          }
        ]
      };

      nock(config.get('base_path'))
        .post('/api/templates')
        .reply(200, setupTemplate);

      const expectedActions = [
        {type: TEMPLATE_STORE_STARTED},
        {type: TEMPLATE_STORE_COMPLETED, ...setupTemplate}
      ];
      const store = mockStore({templates: []});

      store.dispatch(storeTemplate(setupTemplate.name, setupTemplate.items))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
        .then(done)
        .catch(done);
    });
  });


});