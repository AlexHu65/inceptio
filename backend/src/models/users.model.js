const mysqlConnection = require('../database');
const handler = require('../handlers/validations.handler');

class Users{ 


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

	getUser(id, res){	
		this.db.query('CALL users(?)' ,[id], (err, rows, fields) =>{
			if(!err){
				return res.json(rows[0]);
			}else{
				return res.json({status: 0, msg: err.sqlMessage});
			}
		})

	}

	login(req, res){

		const {email, password} = req.body;

		const Handler = new handler();
		let encodePass = Handler.encode(password);
		let decodePass = Handler.decode(password);

		console.log('Pass', password);
		console.log('Encode pass', encodePass);
		console.log('Decode pass', decodePass);

		this.db.query('CALL loginUsr(?,?)' ,[email, encodePass], (err, rows, fields) =>{
			if(!err){
				return res.json(rows[0]);
			}else{
				return res.json({status: 0, msg: err.sqlMessage});
			}
		})

	}

}

module.exports = Users;
