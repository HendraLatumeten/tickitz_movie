const model = {}
const db = require('../config/db')


model.getData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.movie')
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
        db.query(`INSERT INTO public.movie ("name", category, release_date, duration, casts, synopsis, image) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
                data.name,
                data.category,
                data.release_date,
                data.duration,
                data.casts,
                data.synopsis,
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
model.updateData = (data, id) => {
    const query = `UPDATE public.movie SET 
    name           = COALESCE(NULLIF($1, ''), "name"),
    category       = COALESCE(NULLIF($2, ''), category),
    release_date   = COALESCE(NULLIF($3, CURRENT_DATE), release_date),
    duration       = COALESCE(NULLIF($4, CURRENT_TIME), duration),
    casts          = COALESCE(NULLIF($5, ''), casts),
    synopsis       = COALESCE(NULLIF($6, ''), synopsis),
    image       = COALESCE(NULLIF($6, ''), image)
    WHERE id_movie = $7
    RETURNING *`

    return new Promise((resolve, reject) => {
        db.query(query, [
                data.name,
                data.category,
                data.release_date,
                data.duration,
                data.casts,
                data.synopsis,
                id
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
        db.query(`DELETE FROM public.movie
        WHERE id_movie = ${id}`)
            .then((data) => {
                resolve('deleted successfully')
            })
            .catch((err) => {
                reject(err)
            })
    })
}

model.searchData = (name) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.movie WHERE name LIKE $1`, [
                name = name
            ])
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}



model.ascData = (filter) => {
    return new Promise((resolve, reject) => {
        if (filter === 'name') {
            data = `SELECT * FROM public.movie ORDER BY name ASC`

        } else if (filter === 'date') {
            data = `SELECT *  FROM public.movie ORDER BY release_date ASC`
        }
        db.query(data)
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}




module.exports = model