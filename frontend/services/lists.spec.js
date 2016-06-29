import {expect} from 'chai';
import {Lists} from './lists';

describe('Lists service', () => {
  describe('Lists', () => {
    describe('getById', () => {
      it('should find item by id', () => {
        const items = [{id: 1},{id: 2},{id: 3}];

        expect(Lists(items).getById(2)).to.be.equal(items[1]);
      });

      it('should return undefined if items not found', () => {
        const items = [{id: 1},{id: 2},{id: 3}];

        expect(Lists(items).getById(4)).to.be.equal(undefined);
      });
    });
  });
});