const passport = require('passport');
const GithubStrategy = require('passport-github2');
const key = require('./keys');

passport.use(
	new GithubStrategy(
		{
			// options for the GithubStrategy
			callbackURL: '/auth/github/redirect',
			clientID: key.github.clientID,
			clientSecret: key.github.clientSecret
		},
		(accessToken, refreshToken, profile, done) => {
			//passport callback function
			console.log('passport callback function fired');
			console.log(profile);
		}
	)
);
