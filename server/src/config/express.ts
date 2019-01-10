import express from 'express';
import bodyParser from 'body-parser';

var app = express();
app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import * as restauranteRoute from '../routes/restaurante';
import * as votacaoRoute from '../routes/votacao';
import * as votoRoute from '../routes/voto';

restauranteRoute.Init(app);
votacaoRoute.Init(app);
votoRoute.Init(app);

export default app;