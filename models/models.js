const sequelize = require('../db')
const {DataTypes} = require('sequelize')

//Пользователи
const User = sequelize.define('user', {
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    email:{type: DataTypes.STRING, unique: true, allowNull:false},
    password:{type: DataTypes.STRING, allowNull:false}
})

//Вакансии
const Vacancy = sequelize.define('vacancy', {
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title:{type: DataTypes.STRING,  allowNull:false},
    nameCompany:{type: DataTypes.STRING, allowNull:false},
    salaryFrom:{type: DataTypes.INTEGER},
    salaryTo: {type: DataTypes.INTEGER},
    contacts:{type: DataTypes.STRING},
})

//Категории
const Category = sequelize.define('category', {
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type: DataTypes.STRING, unique: true, allowNull:false}
})

//Занятость (частичная, полная, подработка)
const Employment = sequelize.define('employment', {
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type: DataTypes.STRING, unique: true, allowNull:false}
})

//График (Полный, сменный, гибкий)
const Schedule = sequelize.define('schedule', {
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type: DataTypes.STRING, unique: true, allowNull:false}
})

//Опты работы (Нет опыта, от 1 до 3 лет, от 3 до 6 лет, Более 6 лет)
const Experience = sequelize.define('experience', {
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type: DataTypes.STRING, unique: true, allowNull:false}
})

//Описние к вакансии
const Description = sequelize.define('description', {
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    text:{type: DataTypes.TEXT, defaultValue:'Нет описания'}
})


User.hasMany(Vacancy)
Vacancy.belongsTo(User)

Category.hasMany(Vacancy)
Vacancy.belongsTo(Category)

Employment.hasMany(Vacancy)
Vacancy.belongsTo(Employment)

Schedule.hasMany(Vacancy)
Vacancy.belongsTo(Schedule)

Experience.hasMany(Vacancy)
Vacancy.belongsTo(Experience)

Vacancy.hasOne(Description, {onDelete: 'cascade', hooks: true})
Description.belongsTo(Vacancy)




module.exports = {
    User, Vacancy, Category, Schedule, Employment, Experience, Description
}