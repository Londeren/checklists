import {jsdom} from 'jsdom'
import config from '../config';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

global.config = {
  base_path: config.get('base_path')
};