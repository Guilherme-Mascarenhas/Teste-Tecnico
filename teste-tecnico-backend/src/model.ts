import { Sequelize, DataTypes, Model, Optional } from 'sequelize';


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});


interface DemoAtt {
  id: string;
  name: string;
}

interface DemoCreate extends Optional<DemoAtt, 'id'> {}

class Demo extends Model<DemoAtt, DemoCreate> implements DemoAtt {
  public id!: string;
  public name!: string;
}

Demo.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Demo'
  }
);

interface FrameAtt {
  id: string;
  html: string;
  order: number;
  demoId?: string;
}

interface FrameCreate extends Optional<FrameAtt, 'id'> {}

class Frame extends Model<FrameAtt, FrameCreate> implements FrameAtt {
  public id!: string;
  public html!: string;
  public order!: number;
  public demoId?: string; 
}


Frame.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Frame'
  }
);


Demo.hasMany(Frame, { as: 'frames', foreignKey: 'demoId' });
Frame.belongsTo(Demo, { as: 'demo', foreignKey: 'demoId' });


export { 
  sequelize, 
  Demo, 
  Frame 
};
