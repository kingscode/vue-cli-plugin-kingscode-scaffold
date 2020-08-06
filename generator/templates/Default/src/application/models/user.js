import Model from './model.js';

class User extends Model {
  id = 0;
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
