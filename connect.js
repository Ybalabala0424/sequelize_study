const Sequelize = require('sequelize');//引入sequelize包
const sequelize = new Sequelize('sequelize_test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false
});//设置连接池
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });//用authenticate函数来测试连接
const User=sequelize.define('user',{
    firstName:{
        type:Sequelize.STRING
    },
    lastName:{
        type:Sequelize.STRING
    },
    userid:{
        type:Sequelize.STRING,allowNull:false
    }
});//设置user表
// User.sync({}).then(() => {
    // return User.create({
    //     firstName: 'test1',
    //     lastName: '1',
    //     userid:'2017101009'
    // });
// });//增加user表中的一条数据
// User.findAll({where:{firstName:'find'}}).then(users => {
//     console.log(users.toJSON());
// });//查找表中firstName属性为find的数据
// User.destroy({where:{firstName:'destory'}}).then(users=>{
//     console.log(users.toJSON());
// });//删除firstName为destory的数据
// User.update({lastName:'uapdate'},{where:{lastName:'down'}}).then(users=>{
//     console.log(users.toJSON());
// });//更新lastName是update的数据为down
const Task=sequelize.define('task',{
    taskName:{
        type:Sequelize.STRING,
    },
    userid:{
        type:Sequelize.STRING,allowNull:false
    }
});
// Task.sync({force: true}).then(() => {
    // return Task.create({
    //     taskName:'study01',
    //     userid:'2017101009'
    // });
// });
User.hasMany(Task,{foreignKey: 'userid'});
User.findAll({
    where:{
        firstName: 'zhang'
    },
    include:[{
        model:Task
    }]
}).then(result=>{
    console.log(result);
});//多表查找
// Task.findOne({
//     where:{
//         taskName: 'study01'
//     }
// }).then(result=>{
//     let userid =result.userid;
//     User.update({
//         firstName:'change'
//     },{
//         where:{
//             userid:userid
//         }
//     }).then(re=>{
//         console.log(result);
//     })
// });//多表更新
