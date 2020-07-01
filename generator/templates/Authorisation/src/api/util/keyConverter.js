function camelToSnake(data) {
    const target = Array.isArray(data) ? [] : {};

    if (typeof data !== 'object') return;

    Object.keys(data).forEach(key => {
        Object.assign(target, {
            [convertCamelToSnake(key)]: isObject(data[key]) ? camelToSnake(data[key]) : data[key],
        });
    });

    return target;
}

function convertCamelToSnake(key) {
    return key.replace(/[A-Z]/g, value => {
        return '_' + value[0].toLowerCase();
    });
}

function snakeToCamel(data) {
    const target = Array.isArray(data) ? [] : {};

    if (typeof data !== 'object') return;

    Object.keys(data).forEach(key => {
        Object.assign(target, {
            [convertSnakeToCamel(key)]: isObject(data[key]) ? snakeToCamel(data[key]) : data[key],
        });
    });

    return target;
}

function convertSnakeToCamel(key) {
    return key.replace(/_\w/g, value => {
        return value[1].toUpperCase();
    });
}

function isObject(target) {
    return typeof target === 'object' && target !== null;
}

export {
    snakeToCamel,
    camelToSnake,
};
