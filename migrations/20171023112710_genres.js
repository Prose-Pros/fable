
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('genres', (table)=>{
      table.increments()
      table.string('genre')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('genres')
  ])
};
