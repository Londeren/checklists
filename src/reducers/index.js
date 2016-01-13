import {combineReducers} from 'redux';
import {DOCUMENT_FETCH_COMPLETED} from '../constants/actions';

const initialState = {
  documents: [
    {
      id: 'blabla',
      status: 'done',
      pdfFile: 'http://ya.ru',
      config: {
        documentTemplateId: '',
        callbackUrl: ''
      },
      log: ''
    }
  ]
};

const documents = function(state = initialState.documents, action) {
  switch(action.type)
  {
    case DOCUMENT_FETCH_COMPLETED:
      return action.documents;
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  documents
});

export default rootReducer;

