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

        if (typeof data === 'undefined') {
          assignable[key] = value;
          return;
        }

        const apiValue = data[key];
        assignable[key] = this.convertByType(type, value, apiValue);
      });

    return assignable;
  }

  convertByType(type, currentValue, apiValue) {
    if (type === 'object' && currentValue && typeof currentValue.mapResponse === 'function') {
      return currentValue.mapResponse(apiValue);
    } else if (type === 'string') {
      return apiValue ? String(apiValue) : '';
    } else if (type === 'boolean') {
      return Boolean(apiValue);
    } else if (type === 'number') {
      return parseFloat(apiValue);
    }
    return apiValue || currentValue;
  }
}

export default Model;
