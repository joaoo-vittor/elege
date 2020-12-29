module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tipo_candidato', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_user: {
        type: Sequelize.INTEGER,
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
      tipo: {
        type: Sequelize.STRING(30),
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
      tableName: 'tipo_candidato',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tipo_candidato');
  }
};
