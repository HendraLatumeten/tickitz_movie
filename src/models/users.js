const model = {}
const db = require('../config/db')


model.getData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.users ORDER BY created_at DESC')
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

model.getByuser = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.users WHERE username = $1', [username])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

model.saveData = (data,image) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.users (username, "password",role, image)VALUES($1, $2, $3, $4)`, [
                data.username,
                data.hashPassword,
                data.role,
                image

            ])

            .then((data) => {
                resolve('saved successfully')
            })
            .catch((err) => {
                reject(err)
            })
    })
}


model.deleteData = (users_id) => {
    return new Promise((resolve, reject) => {
        console.log(users_id)
        db.query(`DELETE FROM public.users WHERE users_id = ${users_id}`)
            .then((data) => {
                resolve('deleted successfully')
            })
            .catch((err) => {
                reject(err)
            })
    })
}



module.exports = model