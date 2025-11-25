import nodemailer from 'nodemailer'
import config from '.'

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: true,
	auth: {
		user: config.NODEMAILER_EMAIL_USER,
		pass: config.NODEMAILER_EMAIL_PASS,
	},
})

export default transporter
