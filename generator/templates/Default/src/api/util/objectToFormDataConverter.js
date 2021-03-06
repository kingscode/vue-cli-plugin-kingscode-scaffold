function isIterableObject(input) {
  return typeof input === 'object' && input !== null && !(input instanceof Blob) && !(input instanceof Date);
}

function objectToFormData(obj) {
  if (!isIterableObject(obj)) {
    throw new Error('objectToFormDataConverter::objectToFormData data is not iterable');
  }

  const data = new FormData();

  return convert(obj, data);
}

function convert(obj, data, parent) {
  Object.keys(obj)
    .forEach((key, i) => {
      const val = obj[key];
      let finalName = parent || key;

      if (parent) {
        if (Array.isArray(obj)) {
          finalName = `${parent}[${i}]`;
        } else if (isIterableObject(obj)) {
          finalName = `${parent}[${key}]`;
        }
      }
      if (val instanceof Blob) {
        data.append(finalName, val, val.name);
      } else if (val instanceof Date) {
        data.append(finalName, val.toISOString());
      } else if (val instanceof FileList) {
        for (let x = 0; x < val.length; x++) {
          data.append(`${finalName}[${x}]`, val.item(x));
        }
      } else if (isIterableObject(val)) {
        convert(val, data, finalName);
      } else if (typeof val === 'boolean') {
        data.append(finalName, val ? '1' : '0');
      } else if (val === '' || val === null) {
        data.append(finalName, '');
      } else if (typeof val === 'number') {
        data.append(finalName, val);
      } else if (val) {
        data.append(finalName, val);
      }
    });

  return data;
}

export default objectToFormData;
