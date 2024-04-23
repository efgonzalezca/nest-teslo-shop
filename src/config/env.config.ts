export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  dbHost: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_NAME || 'TesloDB',
  dbPort: process.env.DB_PORT || 5432,
  dbUsername: process.env.DB_USERNAME || 'username',
  dbPassword: process.env.DB_PASSWORD || 'password',
  port: process.env.PORT || 4000,
  defaultLimit: +process.env.DEFAULT_LIMIT || 5
})