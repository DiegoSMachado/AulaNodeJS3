const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');

//Definindo variavel global para o HBS
hbs.registerHelper('anoAtual', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');

//o next espera a função next() para continuar
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Não foi possivel registrar este log');
    }
  });
  next();
});

app.use ((req, res, next) => {
  res.render('maintenance.hbs');
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    tituloPagina: 'Sobre',
    titulo: 'Bem Vindo',
    welcomeMessage: 'Chupa Sociedade',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    tituloPagina: 'Sobre',
    titulo: 'Sobre este Site',
    texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Conectado a porta ${port}`);
});
