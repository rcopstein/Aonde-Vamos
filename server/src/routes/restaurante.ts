import { Express } from 'express';
import RestauranteController from '../controllers/restaurante';

export function Init(app : Express) {

    app.get('/restaurantes', (_, res) => { 

        res.send(RestauranteController.listRestaurantes()); 

    });

    app.get('/restaurante/:id', (req, res) => { 

        var result = RestauranteController.getRestaurante(req.params.id);
        if (result == null) res.status(404).send("Restaurante '" + req.params.id + "' não foi encontrado!");
        else res.send(result); 

    });

}