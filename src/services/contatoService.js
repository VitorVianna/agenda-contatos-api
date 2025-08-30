import { contatoRepository, usuarioRepository } from '../repositories/index.js';

export const contatoService = {
  async create(idUsuario, data) {
    const user = await usuarioRepository.findById(idUsuario);
    if (!user) throw new Error('Usuário não encontrado');
    return contatoRepository.create({ ...data, idUsuario });
  },
  async listByUser(idUsuario) {
    return contatoRepository.findByUser(idUsuario);
  },
  async get(id) {
    const c = await contatoRepository.findById(id);
    if (!c) throw new Error('Contato não encontrado');
    return c;
  },
  async update(id, data) {
    const c = await contatoRepository.update(id, data);
    if (!c) throw new Error('Contato não encontrado');
    return c;
  },
  async remove(id) {
    const count = await contatoRepository.remove(id);
    if (!count) throw new Error('Contato não encontrado');
    return { deleted: true };
  }
};
