import http from 'http';
import app from './config/express';

http.createServer(app).listen(app.get('port'), () => {
    console.log("Servidor iniciado na porta " + app.get('port'));
});