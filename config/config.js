module.exports = {
  // development: {
  //   dialect: "sqlite",
  //   storage: "./db.development.sqlite"
  // },
  development: {
    username: "node-http-user",
    password: "node-http-user",
    database: "node-http-db",
    host: "jx-smlsunxie-node-http-pr-4-db.jx-smlsunxie-node-http-pr-4.svc.cluster.local",
    dialect: 'mysql',
  },  
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    use_env_variable: 'DATABASE_URL'
  }
};
