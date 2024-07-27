const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const saveJSON = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Erro ao salvar o arquivo ${filePath}:`, err);
  }
};

const loadJSON = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Erro ao ler o arquivo ${filePath}:`, err);
    return [];
  }
};

// Middleware de autenticação
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Middleware de autenticação de admin
function isAdmin(req, res, next) {
    if (!req.session.user) {
        res.redirect('/admin');
    } else if (req.session.user.role !== 'admin') {
        res.status(403).send('Acesso negado');
    } else {
        next();
    }
}

router.get('/', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/docs_f', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/docs_f.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

router.get('/docs', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/docs.html'));
});

router.get('/admin', isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../indexx.html'));
});

router.get('/admin_login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin_login.html'));
});

router.get('/message', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/message.html'));
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = user;
        res.redirect('/docs');
    } else {
        res.redirect('/docs_f');
    }
});

router.post('/admin_login', (req, res) => {
    const { username, password } = req.body;

    const admins = JSON.parse(fs.readFileSync('admins.json', 'utf8'));
    const admin = admins.find(a => a.username === username && a.password === password);

    if (admin) {
        req.session.user = { ...admin, role: 'admin' };
        res.redirect('/admin');
    } else {
        res.redirect('/admin_login');
    }
});

router.post('/login_adm', (req, res) => {
    const { username, password } = req.body;

    const admins = JSON.parse(fs.readFileSync('admins.json', 'utf8'));
    const admin = admins.find(a => a.username === username && a.password === password);

    if (admin) {
        req.session.user = { ...admin, role: 'admin' };
        res.redirect('/admin');
    } else {
        res.redirect('/login_f');
    }
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log('Dados recebidos:', { username, password });
    let requests = [];
    if (fs.existsSync('./solicita.json')) {
        try {
            requests = JSON.parse(fs.readFileSync('./solicita.json', 'utf8'));
            if (!Array.isArray(requests)) {
                throw new Error('O arquivo solicita.json não contém um array.');
            }
        } catch (error) {
            console.error('Erro ao ler o arquivo solicita.json:', error);
            requests = [];
        }
    }
    const userExists = requests.some(request => request.username === username);
    if (userExists) {
        return res.send('Este usuário já existe. Por favor, use outro nome de usuário ou aguarde a aprovação.');
    }
    requests.push({ username, password });
    fs.writeFileSync('./solicita.json', JSON.stringify(requests, null, 2));
    res.send('Solicitação de registro enviada com sucesso. Aguarde a aprovação.');
});


router.get('/docs2', isAuthenticated, (req, res) => {
  const messagesFilePath = './messages.json';
  let messages = loadJSON(messagesFilePath).filter(msg => msg.to === req.session.user.username);

  // Marca mensagens como lidas
  messages.forEach(msg => {
    if (!msg.read) {
      msg.read = true;
    }
  });

  // Atualiza o arquivo de mensagens
  saveJSON(messagesFilePath, loadJSON(messagesFilePath));

  res.render('docs', { user: req.session.user, messages });
});

router.post('/send-message', (req, res) => {
  const { username, message } = req.body;
  const messagesFilePath = './messages.json';

  const messages = loadJSON(messagesFilePath);
  const timestamp = new Date().toISOString(); // Adiciona o timestamp

  messages.push({ to: username, from: req.session.user.username, message, timestamp, read: false });
  saveJSON(messagesFilePath, messages);

  res.send({ message: 'Mensagem enviada com sucesso!' });
});

router.delete('/delete-all-messages', isAuthenticated, (req, res) => {
  const messagesFilePath = './messages.json';
  let messages = loadJSON(messagesFilePath);

  // Filtra as mensagens para manter apenas as que não foram enviadas pelo usuário atual
  messages = messages.filter(msg => msg.to !== req.session.user.username);

  // Salva as mensagens filtradas de volta no arquivo
  saveJSON(messagesFilePath, messages);

  res.json({ success: true });
});



router.post('/message', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/message.html'));
});



module.exports = router;
