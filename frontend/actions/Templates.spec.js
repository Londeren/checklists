import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {expect} from 'chai';

import config from '../../config';
import {addTemplate, updateTemplate, fetchTemplates} from './Templates';
import {TEMPLATE_ADD, TEMPLATE_UPDATE,
  TEMPLATE_FETCH_STARTED, TEMPLATE_FETCH_COMPLETED, TEMPLATE_FETCH_ERROR} from '../constants/ActionTypes';


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

    it('should create an action to update a template', () => {
      const id = "1";
      const name = 'Template name';
      const items = [
        {
          name: 'first item'
        }
      ];
      const expectedAction = {
        id,
        type: TEMPLATE_UPDATE,
        name,
        items
      };

      expect(updateTemplate(id, name, items)).to.include(expectedAction);
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
            "id": '328398ba-c578-48b4-9129-6ec70f787de6',
            "name": 'Practical Assurance',
            "items": [
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
        .get('/templates.json')
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


});