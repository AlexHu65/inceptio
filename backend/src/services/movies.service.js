const Model = require('../models/movies.model');

class MovieService{ 

	constructor(){
		this.model = new Model;
	}

	get(res){
		this.model.get(res);				
	}

	getMovie(id, res){
		this.model.getMovie(id, res);				
	}


}

module.exports = MovieService;
