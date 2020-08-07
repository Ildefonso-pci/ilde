import express, { Router } from 'express';

import msgsController from '../controllers/msgsController';

class MsgRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', msgsController.list);
        this.router.get('/:id', msgsController.getOne);
        this.router.post('/', msgsController.create);
        this.router.put('/:id', msgsController.update);
        this.router.delete('/:id', msgsController.delete);
    }

}

export default new MsgRoutes().router;

