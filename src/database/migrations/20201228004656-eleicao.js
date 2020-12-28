module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('eleicoes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      quantidade_candidatos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ativo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      deletado: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }, {
      tableName: 'eleicoes',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('eleicoes');
  }
};
