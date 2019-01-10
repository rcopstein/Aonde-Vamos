import { Express, Request } from 'express';
import { VotoController } from '../controllers/voto';
import { Voto } from '../models/voto';

function dataValida(req : Request) : Date | null {

    var data = new Date(req.params.ano, req.params.mes, req.params.dia);
    if (!data) return null;
    return data;

}

export function Init(app : Express) {
    
    let controller = new VotoController();

    app.get('/votos/:ano/:mes/:dia', (req, res) => { 

        var data = dataValida(req);
        if (!data) { res.status(400).send('Parametros de data inválidos!'); return; }
        
        var result = controller.listVotosPorDia(data);
        if (result == null) res.status(404).send("Votacao no dia " + data + " não foi encontrada!");
        else res.send(result);

    });

    app.post('/votos/:ano/:mes/:dia', (req, res) => {
        
        var data = dataValida(req);
        if (!data) { res.status(400).send('Parametros de data inválidos!'); return; }

        if (!req.body.matricula) { res.status(400).send("Parâmetro 'matricula' faltando!"); return; }
        if (!req.body.restaurante) { res.status(400).send("Parâmetro 'restaurante' faltando!"); return; }

        var result = controller.addVoto(data, req.body.matricula, req.body.restaurante);

        if (result) res.sendStatus(200);
        else res.sendStatus(400);

    });

}