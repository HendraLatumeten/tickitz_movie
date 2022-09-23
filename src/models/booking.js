const model = {}
const db = require('../config/db')


model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.booking WHERE users_id = $1`,[id])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}
model.getByuser = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT users_id FROM public.users WHERE username = $1', [username])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

model.saveData = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.booking (premiere, movie_name, "date", "time", price, seat, total_payment, users_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, [
                data.premiere,
                data.movie_name,
                data.date,
                data.time,
                data.price,
                data.seat,
                data.total_payment,
                data.users_id
            ])

            .then((data) => {
                resolve('saved successfully')
            })
            .catch((err) => {
                reject(err)
            })
    })
}

model.updateData = (data, id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE public.booking SET premiere= $1, movie_name= $2, "date"= $3, "time"= $4, price= $5, seat= $6, total_payment= $7 WHERE id_booking= $8`, [
                data.premiere,
                data.movie_name,
                data.date,
                data.time,
                data.price,
                data.seat,
                data.total_payment,
                data.id_booking = id
            ])

            .then((data) => {
                resolve('updated successfully')
            })
            .catch((err) => {
                reject(err)
            })
    })
}

model.deleteData = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.booking
        WHERE id_booking = $1`, [
                id_booking = id
            ])
            .then((data) => {
                resolve('deleted successfully')
            })
            .catch((err) => {
                reject(err)
            })
    })
}



module.exports = model