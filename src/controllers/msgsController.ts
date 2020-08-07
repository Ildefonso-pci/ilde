import { Request, Response } from 'express';


import pool from '../database';

class GamesController {

    public async list(req: Request, res: Response): Promise<void> {
        const msgs = await pool.query('SELECT * FROM msgs');
        res.json({msgs});
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM msgs WHERE id = ?', [id]);
        console.log(games.length);
        if (games.length > 0) {
            return res.json(games[0]);
        }
        res.status(404).json({ text: "No exists mensages" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO msgs set ?', [req.body]);
        res.json({ message: 'Mensaje Save' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE msgs set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The mensage was Updated" });
    }
  
    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM msgs WHERE id = ?', [id]);
        res.json({ message: "The mensage was deleted" });
    }
}

const gamesController = new GamesController;
export default gamesController;