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
}

export default Model;
