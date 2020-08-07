import { Request, Response } from 'express';


import pool from '../database';

class UsersController {

    public async list(req: Request, res: Response): Promise<void> {
        const users = await pool.query('SELECT * FROM users');
        res.json({ users } );
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const users = await pool.query('SELECT * FROM users WHERE id = ?', [id]);  
        console.log(users.length);
        if (users.length > 0) {
            return res.json({ users } );
        }
        res.status(404).json({ text: "No exists el usuario" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO users set ?', [req.body]);
        res.json({ message: 'Usuario Guardado' });
    }  
  
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE users set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "El usuario a sido actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: "El usuario a sido Eliminado" });
    }
}

const usersController = new UsersController;
export default usersController;