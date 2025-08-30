import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Contato extends Model {}
  Contato.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idUsuario: { type: DataTypes.INTEGER, allowNull: false },
    numeroTelefone: { type: DataTypes.STRING(30), allowNull: false }
  }, {
    sequelize,
    modelName: 'Contato',
    tableName: 'Contatos'
  });
  return Contato;
};
