const { Pool } = require('pg');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: true
});

const cool = require('cool-ascii-faces');
const express = require('express');
const authRoutes = require('./routes/auth-router');
const passportSetup = require('./config/passport-setup');
const path = require('path');
const PORT = process.env.PORT || 7777;

express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.use('/auth', authRoutes)
	.get('/', (req, res) => res.render('home'))
	.get('/db', async (req, res) => {
		try {
			const client = await pool.connect();
			const result = await client.query('SELECT * FROM test_table');
			const results = { results: result ? result.rows : null };
			res.render('pages/db', results);
			client.release();
		} catch (err) {
			console.error(err);
			res.send('Error' + err);
		}
	})
	.get('/cool', (req, res) => res.send(cool()))
	.listen(PORT, () => console.log(`Listening on ${PORT}`));
