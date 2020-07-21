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
     */
    mapResponse(data) {
        throw new Error(`${this.constructor.name}::mapResponse unset, keys: ${Object.keys(data).join(', ')}`);
    }
}

export default Model;
