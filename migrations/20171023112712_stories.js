
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('stories', (table)=>{
      table.increments()
      table.string('title')
      table.text('story')
      table.integer('user_id')
      table.integer('genre_id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('stories')
  ])
};
