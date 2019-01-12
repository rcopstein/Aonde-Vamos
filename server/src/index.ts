import http from 'http';
import app from './config/express';

export default http.createServer(app).listen(app.get('port'), () => {
    console.log("Servidor iniciado na porta " + app.get('port') + "\n");
});