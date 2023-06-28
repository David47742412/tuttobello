export default () => ({
  database: {
    name: process.env.DB_NAME,
    user: process.env.USR_NAME,
    host: process.env.HOST_DB,
    password: process.env.PASSWORD_USR_DB,
    port: parseInt(process.env.PUERTO_DB, 10),
  },
  jwt_secret: process.env.JWT_SECRET,
});
