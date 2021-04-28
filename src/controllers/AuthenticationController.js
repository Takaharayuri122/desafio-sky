/* eslint-disable no-undef */
const User = require('../models/user');
const bcrypt = require("bcrypt");
const express = require('express');
const routes = express.Router();
const salt = bcrypt.genSaltSync(5);
const jwt = require('jsonwebtoken');
const moment = require('moment');


routes.get('/', async (request, response) => {
  return response.json({ result: true });
})


routes.post('/sign_up', async (request, response) => {
  try {
    let data = request.body;

    const checkExists = await User.findOne({ email: data.email });

    if (checkExists) {
      return response.status(500).json({
        mensagem: 'E-mail já existente'
      });

    }
    else {

      data.senha = bcrypt.hashSync(data.senha, salt);

      const query = await User.create(data);

      return response.status(201).json(query);
    }

  } catch (error) {
    return response.status(500).json({
      mensagem: 'Ocurreu um erro ao criar o usuário',
    })
  }
})

routes.post('/sign_in', async (request, response) => {
  try {

    let { email, senha } = request.body;

    let query = await User.findOne({ email: email });

    if (query) {
      if (bcrypt.compareSync(senha, query.senha)) {

        let mergeData = {
          ultimo_login: new Date,
          token: `Bearer ${generateToken(query.id)}`,
          data_atualizacao: new Date
        }

        await query.updateOne(mergeData);
        const _user = await User.findById(query.id);
        return response.status(200).json(_user);
      }
      else {
        return response.status(401).json({
          mensagem: 'Usuário e/ou senha inválidos'
        })
      }
    }
    else {
      return response.status(401).json({
        mensagem: 'Usuário e/ou senha inválidos'
      })
    }


  } catch (error) {

    return response.status(500).json({
      mensagem: 'Ocorreu um erro ao processar sua requisição',
    })
  }
})

routes.get('/search/:user_id', async (request, response) => {
  if (request.headers['authentication']) {
    const header = request.headers['authentication'];
    const verify = await authToken(header);


    if (verify) {
      const user = await getLoggedUser(verify);
      if (user) {
        const now = moment(new Date());
        const end = moment(user.ultimo_login);
        const duration = moment.duration(now.diff(end));
        const minutes = duration.asMinutes();
        if (minutes < 30) {
          const query = await User.findById(request.params.user_id);
          if (query) {
            return response.status(200).json(query);
          }
          else {
            return response.status(500).json({
              mensagem: 'Usuário não encontrado'
            })
          }
        }
        else {
          return response.status(403).json({
            mensagem: 'Sessão inválida'
          })
        }
      }
      else {
        return response.status(403).json({
          mensagem: 'Sessão inválida'
        })
      }
    }
    else {
      return response.status(403).json({
        mensagem: 'Não autorizado'
      })
    }


  }
  else {
    return response.status(500).json({
      mensagem: 'Header Authentication não informado'
    })
  }
});


async function getLoggedUser(data) {
  const user = await User.findById(data.item);
  return user;
}

function generateToken(item) {
  return jwt.sign({ item }, process.env.SECRET, { expiresIn: '30m' });
}

async function authToken(item) {
  const token = item.split(' ')[1];
  try {
    const verify = await jwt.verify(token, process.env.SECRET);
    return verify
  } catch (error) {
    return false;
  }

}

module.exports = routes;