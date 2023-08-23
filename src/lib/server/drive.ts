// import { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from '$env/static/private';
// client_email: GOOGLE_CLIENT_EMAIL,
// private_key: GOOGLE_PRIVATE_KEY
import { GOOGLE_SERVICE_JSON } from '$env/static/private';
import { google } from 'googleapis';

const { client_email, private_key } = JSON.parse(GOOGLE_SERVICE_JSON);

const auth = new google.auth.GoogleAuth({
	credentials: { client_email, private_key },
	scopes: ['https://www.googleapis.com/auth/drive'] // Specify the desired scope
});

export const drive = google.drive({ version: 'v3', auth });
