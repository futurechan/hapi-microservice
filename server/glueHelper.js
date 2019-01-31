const db = require('./db').sequelize;
const Role = db.model('Role');
const RolePermission = db.model('RolePermission');

let roles = Role.findAll({
    include: [
        { model: RolePermission, as: 'permissions'}
    ]
})

setInterval(() => {
    roles = Role.findAll({
        include: [
            { model: RolePermission, as: 'permissions'}
        ]
    })
}, 1000 * 60)


module.exports.getRoles = () => {
    return roles;
}