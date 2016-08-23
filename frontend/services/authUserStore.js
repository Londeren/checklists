const supportsLocalStorage = (typeof localStorage !== 'undefined') && localStorage !== null;
const STORAGE_USER_KEY = 'AuthUser';

function inMemoryStorage() {
  let storage = {};

  return {
    setItem: function setItem(key, value) {
      storage[key] = value;
    },
    getItem: function getItem(key) {
      return storage[key];
    },
    removeItem: function removeItem(key) {
      delete storage[key];
    }
  }
}


const userStore = {
  save: function save(user) {
    storage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
  },
  get: function get() {
    try {
      return JSON.parse(storage.getItem(STORAGE_USER_KEY));
    } catch(err) {
      return undefined;
    }
  },
  delete: function remove() {
    storage.removeItem(STORAGE_USER_KEY);
  }
};


let storage;
if(supportsLocalStorage) {
  storage = localStorage;
} else {
  storage = inMemoryStorage();
}


export default userStore;