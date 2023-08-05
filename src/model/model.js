const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const sequelize = new Sequelize('assignment', process.env.USER_NAME , process.env.USER_PASSWORD , {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {msg: "USERNAME_EXISTS"},
    validate: {
      notEmpty: {msg: "INVALID_REQUEST"},
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {msg: "INVALID_REQUEST"},
      isEmail: {msg: "INVALID_EMAIL"} 
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {msg:"INVALID_REQUEST"},
      isStrongPassword(value) {
        // RegEx for strong password
        let strongPasswordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (!strongPasswordRegEx.test(value)) {
          throw new Error('INVALID_PASSWORD');
        }
      }
    }
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {msg: "INVALID_REQUEST"}
    }
  },
  age: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    validate: {
      notEmpty: {msg: "INVALID_AGE"},
      isPositiveInteger(value) {
        if (value <= 0 || !Number.isInteger(value)) {
          throw new Error('INVALID_AGE');
        }
      }
    }
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['male', 'female', 'non-binary']],
        msg: 'GENDER_REQUIRED'
      }
    }
  }
}, {
  hooks: {
    beforeValidate: (user) => {
      if (typeof user.username === 'string') {
        user.username = user.username?.trim();
        user.password = user.password?.trim();
        user.email = user.email?.trim().toLowerCase();
      }
    },
    beforeCreate: async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    },
  },
},
);

User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  delete values.password;
  delete values.updatedAt;
  delete values.createdAt;
  return values;
};

User.prototype.isValidPassword = async function (password) {
  const ismatch = await bcrypt.compare(password, this.password);
  return ismatch;
};

User.findByCredentials = async function (username, password) {
  const user = await User.findOne({ where: {username} })
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }
  const isMatch = await user.isValidPassword(password)
  if (!isMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }
  return user
};

User.prototype.generateAuthToken = function() {
  const user = this;
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY , { expiresIn: 3600 });  
  return token;
};

const Data = sequelize.define('Data', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {msg:"KEY_EXISTS"},
    validate: {
      notEmpty: {msg: 'INVALID_KEY'},
      isString(value) {
        if (typeof value !== 'string') {
          throw new Error('INVALID_KEY');
        }
      }
    }
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {msg: 'INVALID_VALUE'},
      isNotNull(value) {
        if (value === null) {
          throw new Error('INVALID_VALUE');
        }
      }
    }
  },
  userId: {
    type: DataTypes.INTEGER,  
    references: {
      model: User, // 'users' refers to table name
      key: 'id', // 'id' refers to column name in users table
    }
  }
});

sequelize.sync().then(() => console.log("Tables created successfully")).catch(error => console.log(error));
 
module.exports = {
  User,
  Data
};  
