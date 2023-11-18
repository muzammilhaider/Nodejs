// const bcrypt = require('bcrypt')
const bcryptjs = require('bcryptjs')
const config = require('../knex/knex.js')
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body
    config('users')
        .where({'email': email})
        .first()
        .then(async (user) => {
            if (!user) {
                res.json({message : 'Invalid credentials'})
            } else if (user.deleted_at != null) {
                res.json({message : 'Invalid credentials'})
            } else {
                // return Promise.all([
                //     bcryptjs.compare(password, user.password),
                //     Promise.resolve(user)
                // ]).then(result => {
                //     if (!result[0]) throw new Error('Wrong password')
                //     const user = result[1]
                    
                // })
                await bcryptjs.compare(password, user.password)
                    .then((pass) => {
                        // if (!pass) throw new Error('Wrong password')
                        if (!pass) res.json({message : 'Invalid credentials'})
                        const secret = 'node_crud'
                        const payload = {
                            user_id : user.id,
                            name : user.first_name + ' ' + user.last_name,
                            email : user.email
                        }
                        // jwt.sign(payload, secret, (err, token) => {
                        //     // if (err) throw new Error('Sign in error')
                        //     if (err) res.json({message : 'Something went wrong'})
                        //     res.json({token, user})
                        // })
                        const token = jwt.sign(
                            payload,
                            secret,
                            {
                                expiresIn : '5h'
                            }
                        )
                        res.json({token, user})
                    }).catch((err) => {
                        res.send(err)
                })
            }
        })
}

module.exports = { login }