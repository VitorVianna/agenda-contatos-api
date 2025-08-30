import { enderecoRepository, usuarioRepository } from '../repositories/index.js';

export const enderecoService = {
  async create(idUsuario, data) {
    const user = await usuarioRepository.findById(idUsuario);
    if (!user) throw new Error('Usuário não encontrado');
    return enderecoRepository.create({ ...data, idUsuario });
  },
  async listByUser(idUsuario) {
    return enderecoRepository.findByUser(idUsuario);
  },
  async get(id) {
    const e = await enderecoRepository.findById(id);
    if (!e) throw new Error('Endereço não encontrado');
    return e;
  },
  async update(id, data) {
    const e = await enderecoRepository.update(id, data);
    if (!e) throw new Error('Endereço não encontrado');
    return e;
  },
  async remove(id) {
    const count = await enderecoRepository.remove(id);
    if (!count) throw new Error('Endereço não encontrado');
    return { deleted: true };
  }
};
