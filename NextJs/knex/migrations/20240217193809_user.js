/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("username").notNullable();
        table.unique('username');
        table.string("email").notNullable();
        table.unique('email');
        table.string("password").notNullable();
        table.string("adress");
        table.string("nonce");
        table.timestamps();
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw("DROP TABLE users CASCADE");
};
