import { Express } from 'express';
import { RestauranteController } from '../controllers/restaurante';

export function Init(app : Express) {
    
    let restauranteController = new RestauranteController();

    app.get('/restaurantes', (req, res) => { 
        res.send(restauranteController.listRestaurantes()); 
    });

    app.get('/restaurante/:id', (req, res) => { 
        var result = restauranteController.getRestaurante(req.params.id);
        if (result == null) res.status(404).send("Restaurante '" + req.params.id + "' não foi encontrado!");
        else res.send(result); 
    });

}