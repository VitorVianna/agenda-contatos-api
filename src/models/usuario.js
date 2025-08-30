import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Usuario extends Model {}
  Usuario.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(120), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
    senha: { type: DataTypes.STRING(120), allowNull: false },
    dataNascimento: { type: DataTypes.DATEONLY, allowNull: true },
    rg: { type: DataTypes.STRING(20), allowNull: true },
    cpf: { type: DataTypes.STRING(20), allowNull: true, unique: true }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios'
  });
  return Usuario;
};
