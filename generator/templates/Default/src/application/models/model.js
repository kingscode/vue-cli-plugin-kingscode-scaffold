/**
 *
 */
class Model {
  /**
   * @return {{}};
   */
  mapForRequest() {
    throw new Error(`${this.constructor.name}::mapForRequest unset`);
  }

  /**
   * @param data {{}}
   * @return {model}
   */
  mapResponse(data) {
    return this.initializeObjectFromApi(data, this);
  }

  /**
   * @private
   * @param data
   * @param assignable
   * @return {model}
   */
  initializeObjectFromApi(data, assignable) {
    Object.keys(assignable)
      .forEach(key => {
        const value = assignable[key];
        const type = typeof value;

        if (typeof data[key] === type) {
          assignable[key] = data[key];
          return;
        }

        const defaultValue = this.getDefaultValueFromType(type, value);

        assignable[key] = data[key] || defaultValue;
      });

    Object.keys(data)
      .forEach(key => {
        if (typeof assignable[key] === 'undefined') {
          assignable[key] = data[key];
        }
      });

    return assignable;
  }

  /**
   * @private
   * @param type
   * @param defaultModelValue
   * @return {*}
   */
  getDefaultValueFromType(type, defaultModelValue) {
    let defaultValue;

    if (type === 'string') {
      defaultValue = defaultModelValue || '';
    } else if (type === 'boolean') {
      defaultValue = defaultModelValue || false;
    } else if (type === 'number') {
      defaultValue = defaultModelValue || 0;
    } else if (Array.isArray(defaultModelValue)) {
      defaultValue = defaultModelValue || [];
    } else {
      defaultValue = defaultModelValue || null;
    }

    return defaultValue;
  }
}

export default Model;
