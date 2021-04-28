const User = require('../models/user');
const bcrypt = require("bcrypt");
const express = require('express');
const routes = express.Router();
const salt = bcrypt.genSaltSync(5);

routes.post('/sign_up', async (request, response) => {
  try {
    let data = request.body;

    const checkExists = await User.findOne({ email: data.email });

    console.log(checkExists);


    if (checkExists) {
      return response.status(500).send({
        mensagem: 'E-mail já existente'
      });

    }
    else {

      data.senha = bcrypt.hashSync(data.senha, salt);

      const query = await User.create(data);

      return response.status(201).send(query);
    }

  } catch (error) {
    console.log(error);
    return response.status(500).send({
      mensagem: 'Ocurreu um erro ao criar o usuário',
    })
  }
})

routes.post('/sign_in', async (request, response) => {
  try {

    let { email, senha } = request.body;

    const query = await User.findOne({ email: email });

    if (query) {
      console.log(query)
      if (bcrypt.compareSync(senha, query.senha)) {


        await query.updateOne({ ultimo_login: new Date })

        return response.status(200).send(query)
      }
      else {
        return response.status(401).send({
          mensagem: 'Senha incorreta'
        })
      }
    }
    else {
      return response.status(401).send({
        mensagem: 'Não foi possível localizar este usuário'
      })
    }


  } catch (error) {
    console.log(error);
    return response.status(500).send({
      mensagem: 'Ocurreu um erro ao criar o usuário',
    })
  }
})

module.exports = routes;