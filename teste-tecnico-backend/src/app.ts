import express, { Request, Response } from 'express'; // Tipos do Express
import bodyParser from 'body-parser';
import { sequelize, Demo, Frame } from './model';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.get('/demos', async (req : Request, res : Response) => {
    try {
        const demos = await Demo.findAll({
            include: [{
                model: Frame,
                as: 'frames',
                order: [['order', 'ASC']] 
            }],
            order: [['frames', 'order', 'ASC']] 
        });
        res.status(200).json(demos);
        
    } catch (error) {
        console.error('Error listing demos:', error);
        res.status(500).json({ error: 'Error listing demos' }); 
    }
});

app.put('/frames/:id', async (req : Request, res : Response) => {
    const { id } = req.params;
    const { html } = req.body;
    try {
        const frame = await Frame.findByPk(id);
        if (!frame) {
          return res.status(404).json({ error: 'Frame not found' });
        }

        frame.html = html || frame.html;
        await frame.save();
        res.status(200).json(frame);

      } catch (error) {
        console.error('Error updating frame:', error);
        res.status(500).json({ error: 'Error updating frame' });
      }
});

export default app;
