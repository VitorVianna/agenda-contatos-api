import { usuarioService } from '../services/usuarioService.js';
import { usuarioUpdateSchema } from '../validators/usuarioValidator.js';

export const usuarioController = {
  async list(req, res) {
    const users = await usuarioService.list();
    res.json(users);
  },
  async get(req, res) {
    try {
      const user = await usuarioService.get(Number(req.params.id));
      res.json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
  async update(req, res) {
    try {
      const { error, value } = usuarioUpdateSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });
      const user = await usuarioService.update(Number(req.params.id), value);
      res.json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
  async remove(req, res) {
    try {
      const result = await usuarioService.remove(Number(req.params.id));
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
