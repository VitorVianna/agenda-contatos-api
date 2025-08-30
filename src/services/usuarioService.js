import { usuarioRepository } from '../repositories/index.js';
import { hashPassword } from '../utils/password.js';

export const usuarioService = {
  async list() {
    const users = await usuarioRepository.findAll();
    return users.map(u => {
      const { senha, ...safe } = u.toJSON();
      return safe;
    });
  },
  async get(id) {
    const u = await usuarioRepository.findById(id);
    if (!u) throw new Error('Usuário não encontrado');
    const { senha, ...safe } = u.toJSON();
    return safe;
  },
  async update(id, data) {
    if (data.senha) {
      data.senha = await hashPassword(data.senha);
    }
    const updated = await usuarioRepository.update(id, data);
    if (!updated) throw new Error('Usuário não encontrado');
    const { senha, ...safe } = updated.toJSON();
    return safe;
  },
  async remove(id) {
    const count = await usuarioRepository.remove(id);
    if (!count) throw new Error('Usuário não encontrado');
    return { deleted: true };
  }
};
