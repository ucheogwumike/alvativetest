module.exports = (sequelize, dataType) => {
  const role = sequelize.define('role', {
    name: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      primaryKey: true,
    },
    description: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
  });

  role.sync();

  role.findOrCreate({
    where: { name: 'user' },
    defaults: {
      name: 'user',
      description: 'self permission',
    },
  });

  return role;
};
