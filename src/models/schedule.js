const model = {}
const db = require('../config/db')


model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.schedule WHERE users_id = $1`, [id])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

model.saveData = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.schedule (movie_name, price, premiere, "location", date_start, date_end, "time", users_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [
                data.movie_name,
                data.price,
                data.premiere,
                data.location,
                data.date_start,
                data.date_end,
                data.time,
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
    const query = `UPDATE public.schedule SET 
    movie_name  = COALESCE(NULLIF($1, ''), "movie_name"),
    price       = COALESCE(NULLIF($2, 0), price),
    premiere    = COALESCE(NULLIF($3, ''), premiere),
    location    = COALESCE(NULLIF($4, ''), location),
    date_start  = COALESCE(NULLIF($5, CURRENT_DATE), date_start),
    date_end    = COALESCE(NULLIF($6, CURRENT_DATE), date_end),
    time        = COALESCE(NULLIF($7, CURRENT_TIME), time),
    users_id    = COALESCE(NULLIF($8, ''), users_id)
    WHERE id_schedule = $9
    RETURNING *`
    return new Promise((resolve, reject) => {
        db.query(query, [
                data.movie_name,
                data.price,
                data.premiere,
                data.location,
                data.date_start,
                data.date_end,
                data.time,
                data.users_id,
                id
            ])

            .then((data) => {
                resolve('updated successfully')
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}


model.deleteData = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.schedule
        WHERE id_schedule = $1`, [
                id_movie = id
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