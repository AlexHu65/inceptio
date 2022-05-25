const mysqlConnection = require('../database');
const handler = require('../handlers/validations.handler');

class Movies{ 


	db = null;
	

	constructor(){
		this.db = mysqlConnection;
	}


	get(res){	

		this.db.query(`CALL movies(0)` , (err, rows, fields) =>{
			if(!err){
				return res.json(rows[0]);
			}else{
				console.log('Error en el servicio de get movies', err.sqlMessage);
				return res.json({status: 0, msg: err.sqlMessage});
			}
		})

	}

	getMovie(id, res){	
		this.db.query('CALL movies(?)' ,[id], (err, rows, fields) =>{
			if(!err){
				return res.json(rows[0]);
			}else{
				console.log('Error en el servicio de get movie', err.sqlMessage);
				return res.json({status: 0, msg: err.sqlMessage});
			}
		})

	}
}

module.exports = Movies;
