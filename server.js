app.post('/register', (req, res) => {
    const { username, password, role, subjects, language_proficiency, region } = req.body;
    const query = `INSERT INTO users (username, password, role, subjects, language_proficiency, region)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [username, password, role, subjects, language_proficiency, region], function (err) {
      if (err) {
        res.send('Error registering user');
      } else {
        res.send('User registered successfully. <a href="/login.html">Login here</a>');
      }
    });
  });
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.get(query, [username, password], (err, row) => {
      if (err) {
        res.send('Error logging in');
      } else if (row) {
        if (row.role === 'teacher') {
          res.redirect('/teacher.html');
        } else if (row.role === 'student') {
          res.redirect('/student.html');
        } else {
          res.send('Invalid role assigned.');
        }
      } else {
        res.send('Invalid username or password');
      }
    });
  });
  