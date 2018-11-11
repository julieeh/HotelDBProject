const Model = require('objection').Model;

class Users extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  $beforeUpdate() {
    this.updated_at = knex.fn.now();
  }
  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['first_name', 'last_name', 'email', 'is_customer'],

      properties: {
        id: { type: 'string' },
        first_name: { type: 'string', minLength: 1, maxLength: 31 },
        last_name: { type: 'string', minLength: 1, maxLength: 31 },
        address: { type: 'string', maxLength: 255 },
        email: { type: 'email'},
        is_customer: { type: 'boolean'},
        created_at: { type : 'date-time' },
        updated_at: { type : 'date-time' },

      },
    };
  }


}

module.exports = Users;
