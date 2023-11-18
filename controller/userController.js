const bcryptjs = require('bcryptjs')
const config = require('../knex/knex.js')
// const knex = require('knex')
const utils = require('../utils/helper.js')

const getUsers = async (req, res) => {
    try {
        const users = await config('users')
        res.json(users)
    } catch (error) {
        
    }
}

const registration = async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    config('users')
        .where({'email': email})
        .first()
        .then(async (user) => {
            if (user) {
                res.status(409).json({
                    status : "error",
                    data: {},
                    message : "Email already exists"
                })
            } else {
                let hashPass = await bcryptjs.hash(password, 10)
                await config('users').insert([
                    {
                        first_name,
                        last_name: last_name ? last_name : '',
                        email,
                        password : hashPass 
                    }
                ])
                res.status(201).json({
                    status: "success",
                    data: {},
                    message: "User created successfully"
                })
            }
        } )
}

const userUpdate = async (req, res) => {
    const { first_name, last_name, password } = req.body
    let id = req.params.id
    config('users')
        .where({id})
        .first()
        .then(async (user) => {
            utils.userNotFound(req, res, user, 'User not found')
            // if (!user) {
            //     res.status(404).json({
            //         status: 'error',
            //         data: {},
            //         message: 'User not found'
            //     })
            // }

            if (password != '') {
                let hashPass = await bcryptjs.hash(password, 10)
                user.password = hashPass
            }

            user.first_name = first_name
            user.last_name = last_name
            return config('users')
                .where({id})
                .update({
                    ...user,
                    updated_at : config.raw('CURRENT_TIMESTAMP')
                })
                .then(() => {
                    res.status(200).json({
                        status: 'success',
                        data: id,
                        message: 'User updated successfully'
                })
            })
        })
}

const deleteUser = async (req, res) => {
    let id = req.params.id
    config('users')
        .where({id})
        .first()
        .then(async (user) => {
            utils.userNotFound(req, res, user, 'User not found')
            // if (!user) {
            //     res.status(404).json({
            //         status: 'error',
            //         data: {},
            //         message: 'User not found'
            //     })
            // }
            if (user.deleted_at != null) {
                res.status(404).json({
                    status: 'error',
                    data: {},
                    message: 'User already deleted'
                })
            } else {
                return config('users')
                    .where({id : req.params.id})
                    .update({
                        deleted_at : config.raw('CURRENT_TIMESTAMP')
                    })
                    .then(() => {
                        res.status(200).json({
                            status: 'success',
                            data: id,
                            message: 'User deleted successfully'
                    })
                })
            }
        })
}

const viewUser = async (req, res) => {
    let id = req.params.id
    config('users')
        .where({id})
        .first()
        .then(async (user) => {
            utils.userNotFound(req, res, user, 'User not found')
            // if (!user) {
            //     res.status(404).json({
            //         status: 'error',
            //         data: {},
            //         message: 'User not found'
            //     })
            // } 
            if (user.deleted_at != null) {
                res.status(404).json({
                    status: 'error',
                    data: {},
                    message: 'User not found'
                })
            }

            return res.status(200).json({
                status: 'success',
                data : user,
                message : 'User fetched successfully'
            })
        })
}

module.exports = { getUsers, registration, userUpdate, deleteUser, viewUser }