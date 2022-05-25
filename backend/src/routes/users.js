const express = require('express');
const router = express.Router();
const serviceUser = require('../services/user.service');
const serviceMovie = require('../services/movies.service');


// Llamamos el servicio
const service = new serviceUser();
const serviceM = new serviceMovie();

//Models


router.post('/users/login', (req, res) => {
	service.login(req, res);
});

router.get('/users', (req, res) => {
	service.get(res);
});


router.get('/users/:id', (req, res) => {
	const {id} = req.params;
	service.getUser(id,res);
});

router.get('/movies', (req, res) => {
	serviceM.get(res);
});


router.get('/movies/:id', (req, res) => {
	const {id} = req.params;
	serviceM.getMovie(id,res);
});




module.exports = router;