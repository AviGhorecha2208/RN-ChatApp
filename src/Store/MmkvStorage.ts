import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const MMKVStorage = {
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value ? value : null);
  },
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
  clear: () => {
    storage.clearAll();
    return Promise.resolve();
  },
  getAllKeys: () => {
    const keys = storage.getAllKeys();
    return Promise.resolve(keys);
  },
  multiSet: (keyValuePairs: [string, string][]) => {
    keyValuePairs.forEach(([key, value]) => storage.set(key, value));
    return Promise.resolve();
  },
  multiRemove: (keys: string[]) => {
    keys.forEach((key) => storage.delete(key));
    return Promise.resolve();
  },
  multiGet: (keys: string[]) => {
    const values = keys.map((key) => storage.getString(key));
    return Promise.resolve(values);
  },
  multiMerge: (keyValuePairs: [string, string][]) => {
    keyValuePairs.forEach(([key, newValue]) => {
      const existingValue = storage.getString(key);
      const mergedValue = existingValue
        ? JSON.stringify({ ...JSON.parse(existingValue), ...JSON.parse(newValue) })
        : newValue;
      storage.set(key, mergedValue);
    });
    return Promise.resolve();
  },
  flushGetRequests: () => {
    return Promise.resolve();
  },
};
