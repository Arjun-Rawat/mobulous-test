module.exports = {
  port: 3000,
  mongoose: {
    url: "mongodb://localhost:27017/task",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: "fdsfsdfsfQWIJW!!!!565fdsfds@@@fffdsffdsf",
    accessExpirationMinutes: 86400, //24hours
    refreshExpirationDays: 30,
  },
};
