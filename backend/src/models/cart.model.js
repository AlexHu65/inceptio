const mysqlConnection = require('../database');
const handler = require('../handlers/validations.handler');

class Carts{ 


	db = null;
	

	constructor(){
		this.db = mysqlConnection;
	}

	get(res){	

		this.db.query(`CALL users(0)` , (err, rows, fields) =>{
			if(!err){
				return res.json(rows[0]);
			}else{
				return res.json({status: 0, msg: err.sqlMessage});
			}
		})

	}

	getCarrito(id, res){	
		this.db.query('CALL users(?)' ,[id], (err, rows, fields) =>{
			if(!err){
				return res.json(rows[0]);
			}else{
				return res.json({status: 0, msg: err.sqlMessage});
			}
		})

	}

	save(req){

		const {total, movie} = req.body;

		const date  = new Date().getDate();
		const pagado = false;

		this.db.query('CALL createCart(?,?,?,?)' ,[total, movie, pagado, date ], (err, rows, fields) =>{
			if(!err){
				return res.json(rows[0]);
			}else{
				return res.json({status: 0, msg: err.sqlMessage});
			}
		})
	}

}

module.exports = Carts;
