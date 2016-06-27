import {expect} from 'chai';
import {Templates} from './templates';

describe('Templates service', () => {
  describe('Templates', () => {
    describe('getById', () => {
      it('should find item by id', () => {
        const items = [{id: 1},{id: 2},{id: 3}];

        expect(Templates(items).getById(2)).to.be.equal(items[1]);
      });

      it('should return undefined if items not found', () => {
        const items = [{id: 1},{id: 2},{id: 3}];

        expect(Templates(items).getById(4)).to.be.equal(undefined);
      });
    });
  });
});