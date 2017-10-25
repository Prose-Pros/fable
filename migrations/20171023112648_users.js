
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table)=>{
      table.increments().primary()
      table.string('username').notNullable()
      table.string('email').notNullable()
      table.string('code')
      table.boolean('loggedIn').defaultTo('false')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};
