/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('users', function (table) {
      table.increments('id');
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).nullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    //   table.timestamp('deleted_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').defaultTo(null);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
    // return knex.schema
    // .dropTable('users')
    // return Promise.all([
    //     knex.schema.dropTableIfExists('users')
    // ]);
    return knex.schema.dropTableIfExists('users')
};

exports.config = { transaction: false }