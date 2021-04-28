require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// eslint-disable-next-line no-undef
const mongoUrl = process.env.MONGO_URL;
try {
  mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.Promise = global.Promise;
} catch (error) {
  console.error('Erro ao conectar-se com o banco', error);
}

module.exports = mongoose;
