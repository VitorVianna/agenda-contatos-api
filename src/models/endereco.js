import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Endereco extends Model {}
  Endereco.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idUsuario: { type: DataTypes.INTEGER, allowNull: false },
    cep: { type: DataTypes.STRING(20), allowNull: false },
    rua: { type: DataTypes.STRING(150), allowNull: false },
    numero: { type: DataTypes.STRING(20), allowNull: false },
    complemento: { type: DataTypes.STRING(100), allowNull: true },
    bairro: { type: DataTypes.STRING(100), allowNull: false },
    cidade: { type: DataTypes.STRING(100), allowNull: false },
    estado: { type: DataTypes.STRING(2), allowNull: false }
  }, {
    sequelize,
    modelName: 'Endereco',
    tableName: 'Enderecos'
  });
  return Endereco;
};
