module.exports = {
    "username":  process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || null,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": "postgres",
    "seederStorage": "sequelize",
    "migrationStorageTableName": "account_migrations"
}