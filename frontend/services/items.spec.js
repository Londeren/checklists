import {expect} from 'chai';
import {Items} from './items';

describe('Items service', () => {
  describe('Items', () => {
    describe('getById', () => {
      it('should find item by id', () => {
        const items = [{id: 1},{id: 2},{id: 3}];

        expect(Items(items).getById(2)).to.be.equal(items[1]);
      });

      it('should return undefined if items not found', () => {
        const items = [{id: 1},{id: 2},{id: 3}];

        expect(Items(items).getById(4)).to.be.equal(undefined);
      });

    });
  });
});