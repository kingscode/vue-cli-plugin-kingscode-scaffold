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

  mapResponse(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
  }
}

export default User;
