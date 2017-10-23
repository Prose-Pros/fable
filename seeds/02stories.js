
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stories').del()
    .then(function () {
      // Inserts seed entries
      return knex('stories').insert([
        {
          id: 1,
          title: 'This is a Story',
          story: 'I choked on a pineapple. It was great',
          user_id: 1,
          genre_id: 1
        },
        {
          id: 2,
          title: 'This is a better story',
          story: 'Once upon a time in a...',
          user_id: 2,
          genre_id: 3
        },
        {
          id: 3,
          title: 'This one is awesome',
          story: 'There was a man who lived in a shoe...',
          user_id: 3,
          genre_id: 5
        }
      ]);
    });
};
