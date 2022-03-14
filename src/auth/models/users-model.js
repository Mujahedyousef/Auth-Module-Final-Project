"use strict";


const user = (sequelize, DataTypes) => sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'editor', 'writer', 'user'),
        defaultValue: 'user'
    },
    token: {
        type: DataTypes.VIRTUAL
    },
    actions: {
        type: DataTypes.VIRTUAL,
        get() {
            const acl = {
                user: ["read"],
                writer: ["read", "create"],
                editor: ["read", "create", "update"],
                admin: ["read", "create", "update", "delete"]
            }
            return acl[this.role];
        }
    }
})

module.exports = user;