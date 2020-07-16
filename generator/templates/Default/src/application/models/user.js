import Model from './model.js';

class User extends Model {
    name = '';
    email = '';

    mapForRequest() {
        return {
            name: this.name,
            email: this.email,
        };
    }
}

export default User;
