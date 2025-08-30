import { contatoService } from '../services/contatoService.js';
import { contatoCreateSchema } from '../validators/contatoValidator.js';

export const contatoController = {
  async create(req, res) {
    try {
      const { error, value } = contatoCreateSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });
      const c = await contatoService.create(Number(req.params.idUsuario), value);
      res.status(201).json(c);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async listByUser(req, res) {
    const list = await contatoService.listByUser(Number(req.params.idUsuario));
    res.json(list);
  },
  async get(req, res) {
    try {
      const c = await contatoService.get(Number(req.params.id));
      res.json(c);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
  async update(req, res) {
    try {
      const c = await contatoService.update(Number(req.params.id), req.body);
      res.json(c);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
  async remove(req, res) {
    try {
      const result = await contatoService.remove(Number(req.params.id));
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
