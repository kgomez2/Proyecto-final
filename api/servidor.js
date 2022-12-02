import express from "express";
import { createPool } from "mysql2/promise";
import cors from "cors"

const pool = createPool({
    user: 'root',
    password: '',
    host: 'localhost',
    port: 3306,
    database: 'ventas'
})
const app = express();
app.use(cors())

app.get('/login', async(req, res) => {
    const nombre = req.query.nombre
    const contrasena = req.query.contrasena
    const [result] = await pool.query(`SELECT * FROM usuario WHERE nombre='${nombre}' and contrasena='${contrasena}' `)
    res.json(result)
});

app.get('/elementos', async(req, res) => {

    const [result] = await pool.query(`SELECT * FROM producto`)
    res.json(result)
});

app.get('/clientes', async(req, res) => {

    const [result] = await pool.query(`SELECT * FROM cliente`)
    res.json(result)
});

app.get('/vendedores', async(req, res) => {

    const [result] = await pool.query(`SELECT * FROM vendedor`)
    res.json(result)
});

app.get('/facturas', async(req, res) => {
    const [result] = await pool.query(`SELECT * FROM factura`)
    res.json(result)
    
});

app.get('/agregarproducto', async(req, res) => {
    const nombre = req.query.nombre
    const cantidad = req.query.cantidad
    const precio = req.query.precio
    try {
        const [result] = await pool.query(`INSERT INTO producto(nombre,cantidad,precio) VALUES ('${nombre}',${cantidad},${precio}) `)
        const estatus = "ok"
        res.json(estatus)
    } catch {
        const estatus = "error"
        res.json(estatus)
    }
});
app.get('/editarproducto', async(req, res) => {
    const nombre = req.query.nombre
    const id = req.query.id
    const cantidad = req.query.cantidad
    const precio = req.query.precio
    const [result] = await pool.query(`UPDATE producto SET nombre='${nombre}',cantidad=${cantidad},precio=${precio} WHERE id=${id}`)
    res.json(result[0])
});

app.get('/eliminarproducto', async(req, res) => {
    const id = req.query.id
    const [result] = await pool.query(`DELETE FROM producto WHERE id=${id}`)
    res.json(result[0])
});

app.get('/agregarcliente', async(req, res) => {
    const nombre = req.query.nombre
    try {
        const [result] = await pool.query(`INSERT INTO cliente(nombre) VALUES ('${nombre}') `)
        const estatus = "ok"
        res.json(estatus)
    } catch {
        const estatus = "error"
        res.json(estatus)
    }
});
app.get('/editarcliente', async(req, res) => {
    const nombre = req.query.nombre
    const id = req.query.id
    const [result] = await pool.query(`UPDATE cliente SET nombre='${nombre}' WHERE id=${id}`)
    res.json(result[0])
});

app.get('/eliminarcliente', async(req, res) => {
    const id = req.query.id
    const [result] = await pool.query(`DELETE FROM cliente WHERE id=${id}`)
    res.json(result[0])
});
app.get('/agregarvendedor', async(req, res) => {
    const nombre = req.query.nombre
    try {
        const [result] = await pool.query(`INSERT INTO vendedor(nombre) VALUES ('${nombre}') `)
        const estatus = "ok"
        res.json(estatus)
    } catch {
        const estatus = "error"
        res.json(estatus)
    }
});
app.get('/editarvendedor', async(req, res) => {
    const nombre = req.query.nombre
    const id = req.query.id
    const [result] = await pool.query(`UPDATE vendedor SET nombre='${nombre}' WHERE id=${id}`)
    res.json(result[0])
});
app.get('/eliminarvendedor', async(req, res) => {
    const id = req.query.id
    const [result] = await pool.query(`DELETE FROM vendedor WHERE id=${id}`)
    res.json(result[0])
});

app.get('/agregarfactura', async(req, res) => {
    const fecha = req.query.fecha
    const idcliente = req.query.idcliente
    const [result] = await pool.query(`INSERT INTO factura(fecha,idcliente) VALUES ('${fecha}',${idcliente}) `)
    const nofactura = result.insertId
    res.json(nofactura)
});
app.get('/agregarfacturdetalle', async(req, res) => {
    const idproducto = req.query.idproducto
    const cantidad = req.query.cantidad
    const precio = req.query.precio
    const idfactura = req.query.idfactura
    const [result] = await pool.query(`INSERT INTO facturdetalle(idproducto,cantidad,precio,idfactura) VALUES ('${idproducto}',${cantidad},${precio},${idfactura}) `)
    const [result2] = await pool.query(`UPDATE producto SET cantidad=(cantidad-${cantidad})`)
    res.json(result[0])
});

app.listen(3000, () => {
    console.log("El servidor inicio 3000");
});