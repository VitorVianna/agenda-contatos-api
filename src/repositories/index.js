import { Usuario, Endereco, Contato } from '../models/index.js';

export const usuarioRepository = {
  async create(data) { return Usuario.create(data); },
  async findByEmail(email) { return Usuario.findOne({ where: { email } }); },
  async findById(id) { return Usuario.findByPk(id, { include: ['enderecos', 'contatos'] }); },
  async findAll() { return Usuario.findAll({ include: ['enderecos', 'contatos'] }); },
  async update(id, data) {
    await Usuario.update(data, { where: { id } });
    return this.findById(id);
  },
  async remove(id) { return Usuario.destroy({ where: { id } }); },
};

export const enderecoRepository = {
  async create(data) { return Endereco.create(data); },
  async findById(id) { return Endereco.findByPk(id); },
  async findByUser(idUsuario) { return Endereco.findAll({ where: { idUsuario } }); },
  async update(id, data) {
    await Endereco.update(data, { where: { id } });
    return this.findById(id);
  },
  async remove(id) { return Endereco.destroy({ where: { id } }); },
};

export const contatoRepository = {
  async create(data) { return Contato.create(data); },
  async findById(id) { return Contato.findByPk(id); },
  async findByUser(idUsuario) { return Contato.findAll({ where: { idUsuario } }); },
  async update(id, data) {
    await Contato.update(data, { where: { id } });
    return this.findById(id);
  },
  async remove(id) { return Contato.destroy({ where: { id } }); },
};
