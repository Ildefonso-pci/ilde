import { Request, Response } from 'express';

class IndexController {

    public index(req: Request, res: Response) {
        res.json({ text: 'API is in /api/games o API is in /api/mensajes' });
       
    }
}

export const indexController = new IndexController;