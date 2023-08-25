// Importando o módulo express, que é um framework para criação de aplicativos web em Node.js
import express from 'express';
// Importando o módulo de rotas definido no arquivo 'routes.js'
import routes from './routes';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

// Definindo a classe 'App'
class App {
  // Construtor da classe 'App'
  constructor() {
    // Inicializando o servidor express
    this.server = express();

    // Conectando no MongoDB
    mongoose.connect('mongodb+srv://devhouse:devhouse@devhouse.rsjnbro.mongodb.net/devhouse?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });


    // Configurando os middlewares
    this.middlewares();

    // Configurando as rotas do aplicativo
    this.routes();
  }

  // Método para configurar os middlewares
  middlewares() {

    this.server.use(cors());

    
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    )
    // Utilizando o middleware express.json() para interpretar o corpo das requisições como JSON
    this.server.use(express.json());
  }

  // Método para configurar as rotas
  routes() {
    // Utilizando o módulo de rotas importado para definir as rotas do servidor
    this.server.use(routes);
  }
}

//Exportando o servidor configurado
export default new App().server;
