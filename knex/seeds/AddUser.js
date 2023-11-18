/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// const bcrypt = require('bcrypt')
const bcryptjs = require('bcryptjs')
exports.seed = async function(knex) {
  const password = await bcryptjs.hash('admin0101', 10)
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      first_name: 'Admin',
      last_name: 'admin',
      email: 'admin@gmail.com',
      password: password
      // created_at: knex.raw('CURRENT_TIMESTAMP')
    }
  ]);
};
