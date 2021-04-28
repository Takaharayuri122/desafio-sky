const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  senha: {
    type: String,
  },
  data_criacao: {
    type: Date,
    default: Date.now
  },
  data_atualizacao: {
    type: Date,
    default: Date.now
  },
  ultimo_login: {
    type: Date
  },
  token: {
    type: String
  },
  telefones: {
    type: []
  }
});


const User = mongoose.model('User', UserSchema);
module.exports = User;