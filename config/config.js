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
  preview: {
    username: "node-http-user",
    password: "node-http-user",
    database: "node-http-db",
    host: `${process.env.HELM_RELEASE}-db.${process.env.HELM_RELEASE}.svc.cluster.local`,
    dialect: 'mysql',
  },    
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  staging: {
    username: "node-http-user",
    password: "node-http-user",
    database: "node-http-db",
    host: "jx-staging-node-http-db.jx-staging.svc.cluster.local",
    dialect: 'mysql',
  },
  production: {
    username: "node-http-user",
    password: "node-http-user",
    database: "node-http-db",
    host: "jx-production-node-http-db.jx-production.svc.cluster.local",
    dialect: 'mysql',
  }
};
