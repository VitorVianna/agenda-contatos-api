import sequelize from '../config/database.js';
import usuarioFactory from './usuario.js';
import enderecoFactory from './endereco.js';
import contatoFactory from './contato.js';

const Usuario = usuarioFactory(sequelize);
const Endereco = enderecoFactory(sequelize);
const Contato = contatoFactory(sequelize);

// Associations
Usuario.hasMany(Endereco, { foreignKey: 'idUsuario', as: 'enderecos', onDelete: 'CASCADE' });
Endereco.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' });

Usuario.hasMany(Contato, { foreignKey: 'idUsuario', as: 'contatos', onDelete: 'CASCADE' });
Contato.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' });

export { sequelize, Usuario, Endereco, Contato };
