const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;
const mainRouter = require('./routes/main');
const apiRouter = require('./routes/api');
app.set('view engine', 'ejs'); // Configura o EJS como motor de template
app.set('views', path.join(__dirname, 'views')); // Define o diretório de views

app.use(session({
    secret: '6MZ3|c81xy%L2773+$+#+$-$+#7', 
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', mainRouter);
app.use('/api', apiRouter);

const fs = require('fs');

app.use(express.json()); 
const usersFilePath = './users.json';
const requestsFilePath = './solicita.json';

const loadJSON = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Erro ao ler o arquivo ${filePath}:`, err);
    return [];
  }
};

const saveJSON = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Erro ao salvar o arquivo ${filePath}:`, err);
  }
};

app.get('/admin/requests', (req, res) => {
  const requests = loadJSON(requestsFilePath);
  res.json(requests);
});

app.post('/admin/requests/:username', (req, res) => {
  const username = req.params.username;
  let requests = loadJSON(requestsFilePath);
  let users = loadJSON(usersFilePath);
  const index = requests.findIndex(req => req.username === username);
  if (index !== -1) {
    const [acceptedRequest] = requests.splice(index, 1);
    users.push(acceptedRequest);
    saveJSON(usersFilePath, users);
    saveJSON(requestsFilePath, requests);
    res.status(200).json({ message: `Solicitação do usuário ${username} aceita e adicionada aos usuários.` });
  } else {
    res.status(404).json({ message: `Solicitação do usuário ${username} não encontrada.` });
  }
});

app.delete('/admin/requests/:username', (req, res) => {
  const username = req.params.username;
  let requests = loadJSON(requestsFilePath);
  requests = requests.filter(request => request.username !== username);
  saveJSON(requestsFilePath, requests);

  res.status(200).json({ message: `Solicitação do usuário ${username} deletada com sucesso.` });
});

app.get('/admin/users', (req, res) => {
  const users = loadJSON(usersFilePath);
  res.json(users);
});

app.delete('/admin/users/:username', (req, res) => {
  const username = req.params.username;
  let users = loadJSON(usersFilePath);
  users = users.filter(user => user.username !== username);
  saveJSON(usersFilePath, users);

  res.status(200).json({ message: `Usuário ${username} deletado com sucesso.` });
});

app.get('/', (req, res) => {
  res.redirect('/login');
});

// Importa o módulo fs
//const fs = require('fs');

// Rota para adicionar uma nova chave
app.post('/admin/keys', (req, res) => {
  const { key, limit } = req.body;
  
  if (!key || isNaN(limit)) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  
  try {
    // Carrega o arquivo JSON
    const data = fs.readFileSync('requestCount.json', 'utf8');
    const jsonData = JSON.parse(data);
    
    // Adiciona a nova chave e limite
    jsonData.keyLimits[key] = { limit, valid: true };
    
    // Salva o arquivo JSON atualizado
    fs.writeFileSync('requestCount.json', JSON.stringify(jsonData, null, 2), 'utf8');
    
    res.status(200).json({ message: 'Chave adicionada com sucesso' });
  } catch (err) {
    console.error('Erro ao adicionar chave:', err);
    res.status(500).json({ error: 'Erro ao adicionar chave' });
  }
});


app.delete('/admin/keys/:key', (req, res) => {
  const keyToDelete = req.params.key;

  try {
    const data = fs.readFileSync('requestCount.json', 'utf8');
    const jsonData = JSON.parse(data);

    // Verifica se a chave existe no requestCount e keyLimits
    if (jsonData.requestCount[keyToDelete] || jsonData.keyLimits[keyToDelete]) {
      // Remove a chave dos contadores de requisições e limites
      delete jsonData.requestCount[keyToDelete];
      delete jsonData.keyLimits[keyToDelete];

      // Salva os dados atualizados no arquivo
      fs.writeFileSync('requestCount.json', JSON.stringify(jsonData, null, 2), 'utf8');

      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Chave não encontrada.' });
    }
  } catch (err) {
    console.error('Erro ao manipular o arquivo JSON:', err);
    res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
