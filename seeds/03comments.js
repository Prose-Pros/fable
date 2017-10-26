
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          // id: 1,
          comment: 'This story rules',
          story_id: 1
        },
        {
          // id: 2,
          comment: 'You have great use of characterization',
          story_id: 3
        },
        {
          // id: 3,
          comment: 'Love it!',
          story_id: 2
        }
      ]);
    });
};
