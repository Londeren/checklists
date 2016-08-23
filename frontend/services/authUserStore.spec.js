import chai, {expect} from 'chai';
import userStore from './authUserStore';

const data = {
  key: 'test'
};

describe('Auth user store', () => {
  it('should save data', () => {
    userStore.save(data);

    expect(userStore.get()).to.be.eql(data);
  });

  it('should get data', () => {
    expect(userStore.get()).to.be.eql(data);
  })
});