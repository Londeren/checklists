import {expect} from 'chai';
import {getRouteUrl} from './routes';

describe('Routes service', () => {
  describe('getRouteUrl', () => {
    it('should replace params in template', () => {
      const template = '/path/:to/:any/:params';
      const params = {
        any: 'any',
        params: 'params'
      };

      const expected = `/path/:to/${params.any}/${params.params}`;

      expect(getRouteUrl(template, params)).to.equal(expected);
    });

    it('should replace params if they exists', () => {
      const template = '/path/to/:any/params';
      const params = {
        params: 'params'
      };

      const expected = '/path/to/:any/params';

      expect(getRouteUrl(template, params)).to.equal(expected);
    });



  });
});