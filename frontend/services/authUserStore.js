const supportsLocalStorage = (typeof localStorage !== 'undefined') && localStorage !== null;
const STORAGE_USER_KEY = 'AuthUser';

function inMemoryStorage() {
  let storage = {};

  return {
    set: function set(key, value) {
      storage[key] = value;
    },
    get: function get(key) {
      return storage[key];
    }
  }
}


const userStore = {
  save: function save(user) {
    storage.set(STORAGE_USER_KEY, JSON.stringify(user));
  },
  get: function get() {
    try {
      return JSON.parse(storage.get(STORAGE_USER_KEY));
    } catch(err) {
      return undefined;
    }
  }
};


let storage;
if(supportsLocalStorage) {
  storage = localStorage;
} else {
  storage = inMemoryStorage();
}


export default userStore;