import { authService } from '../services/authService.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';

export const authController = {
  async register(req, res) {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });
      const safeUser = await authService.register(value);
      return res.status(201).json(safeUser);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
  async login(req, res) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });
      const result = await authService.login(value);
      return res.json(result);
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  }
};
