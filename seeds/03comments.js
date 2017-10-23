
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {
          id: 1,
          comment: 'This story rules',
          user_id: 1,
          story_id: 1
        },
        {
          id: 2,
          comment: 'You have great use of characterization',
          user_id: 2,
          story_id: 3
        },
        {
          id: 3,
          comment: 'Love it!',
          user_id: 3,
          story_id: 2
        }
      ]);
    });
};
