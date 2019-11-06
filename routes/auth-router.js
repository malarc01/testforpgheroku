const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
	res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
	// handle with passport
	res.send('LOGGING OUT');
});

//authenticate with github
router.get(
	'/github',
	passport.authenticate('github', {
		//handle with passport.js
		scope: [ 'profile' ]
	})
);

// callback route for github to redirect to
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
	res.send('Callback URI reached !🎆');
	console.log(res);
	console.log(req);
	console.log('test');
});

module.exports = router;
