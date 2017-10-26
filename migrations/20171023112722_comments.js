
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('comments', (table)=>{
      table.increments()
      table.text('comment')
      table.integer('story_id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('comments')
  ])
};
