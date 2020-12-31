module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('candidato', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      nome_vice: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      id_eleicao: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'eleicoes',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      deletado: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      tableName: 'candidato',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('candidato');
  }
};
