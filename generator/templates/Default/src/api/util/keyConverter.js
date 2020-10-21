function camelToSnake(data) {
  if (!isIterableObject(data)) {
    throw new Error('keyConverter::camelToSnake data is not iterable');
  }

  const target = Array.isArray(data) ? [] : {};

  Object.keys(data)
    .forEach((key) => {
      Object.assign(target, {
        [convertCamelToSnake(key)]: isIterableObject(data[key])
          ? camelToSnake(data[key])
          : data[key],
      });
    });

  return target;
}

function convertCamelToSnake(key) {
  return key.replace(/[A-Z]/g, (value) => `_${value[0].toLowerCase()}`);
}

function snakeToCamel(data) {
  if (!isIterableObject(data)) {
    throw new Error('keyConverter::snakeToCamel data is not iterable');
  }

  const target = Array.isArray(data) ? [] : {};

  Object.keys(data)
    .forEach((key) => {
      Object.assign(target, {
        [convertSnakeToCamel(key)]: isIterableObject(data[key])
          ? snakeToCamel(data[key])
          : data[key],
      });
    });

  return target;
}

function convertSnakeToCamel(key) {
  return key.replace(/_\w/g, (value) => value[1].toUpperCase());
}

function isIterableObject(target) {
  return typeof target === 'object' && target !== null && !(target instanceof Blob) && !(target instanceof Date);
}

export {
  snakeToCamel,
  camelToSnake,
  convertCamelToSnake,
  convertSnakeToCamel,
};
