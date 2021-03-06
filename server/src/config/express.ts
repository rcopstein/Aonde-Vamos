import express from 'express';
import requestIp from 'request-ip';
import bodyParser from 'body-parser';

var app = express();
app.set('port', 3000);

app.use(requestIp.mw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import * as restauranteRoute from '../routes/restaurante';
import * as votacaoRoute from '../routes/votacao';

restauranteRoute.Init(app);
votacaoRoute.Init(app);

export default app;