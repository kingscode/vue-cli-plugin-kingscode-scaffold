export default {
    methods: {
        appendFormData(form_data, values, startKey = '') {
            if (typeof values === 'object') {
                for (let key in values) {
                    let currentKey = startKey.length ? startKey + '[' + key + ']' : key;

                    if (typeof values[key] === 'object' && !(values[key] instanceof File)) {
                        this.appendFormData(form_data, values[key], currentKey);
                    } else if (typeof values[key] !== 'undefined') {
                        form_data.append(currentKey, values[key]);
                    }
                }
            }
        },
    },
};