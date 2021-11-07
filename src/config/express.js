const express = require('express');
const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local'), users.login);