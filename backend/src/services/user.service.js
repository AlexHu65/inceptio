const Model = require('../models/users.model');

class UserService{ 

	constructor(){
		this.model = new Model;
	}

	
	get(res){
		this.model.get(res);				
	}

	getUser(id, res){
		this.model.getUser(id, res);				
	}

	login(req, res){
		this.model.login(req, res);
	}

}

module.exports = UserService;
