
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('genres').del()
    .then(function () {
      // Inserts seed entries
      return knex('genres').insert([
        {id: 1, genre: 'Fantasy'},
        {id: 2, genre: 'Horror'},
        {id: 3, genre: 'Mystery'},
        {id: 4, genre: 'Satire'},
        {id: 5, genre: 'Sci-Fi'},
        {id: 6, genre: 'Romance'},
        {id: 7, genre: 'Nonfiction'},
        {id: 8, genre: 'Miscellaneous'}
      ]);
    });
};
