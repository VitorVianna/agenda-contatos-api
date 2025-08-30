import { enderecoService } from '../services/enderecoService.js';
import { enderecoCreateSchema } from '../validators/enderecoValidator.js';

export const enderecoController = {
  async create(req, res) {
    try {
      const { error, value } = enderecoCreateSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });
      const e = await enderecoService.create(Number(req.params.idUsuario), value);
      res.status(201).json(e);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async listByUser(req, res) {
    const list = await enderecoService.listByUser(Number(req.params.idUsuario));
    res.json(list);
  },
  async get(req, res) {
    try {
      const e = await enderecoService.get(Number(req.params.id));
      res.json(e);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
  async update(req, res) {
    try {
      const e = await enderecoService.update(Number(req.params.id), req.body);
      res.json(e);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
  async remove(req, res) {
    try {
      const result = await enderecoService.remove(Number(req.params.id));
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
