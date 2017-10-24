
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'bethjaw',
          email: 'beth@email.com',
          code: 'abcd1'
        },
        {
          username: 'davef',
          email: 'dave@email.com',
          code: 'efgh2'
        },
        {
          username: 'mikejones',
          email: 'mike@email.com',
          code: 'ijkl3'
        }
      ]);
    });
};
