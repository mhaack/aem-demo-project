/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign, no-shadow */
export function store(data = {}, name = 'store') {
  function handler(name, data) {
    return {
      get(obj, prop) {
        if (prop === '_isProxy') return true;
        /**
        * Checks if the property value is an object or an array.
        * If it is, and if the property does not already have a
        * proxy attached to it, then create a new proxy object.
        */
        if (typeof obj[prop] === 'object' && obj[prop] !== null && !obj[prop]._isProxy) {
          obj[prop] = new Proxy(obj[prop], handler(name, data));
        }
        return obj[prop];
      },
      set(obj, prop, value) {
        if (obj[prop] === value) return true;
        obj[prop] = value;
        return true;
      },
      deleteProperty(obj, prop) {
        delete obj[prop];
        return true;
      },
    };
  }

  return new Proxy(data, handler(name, data));
}
