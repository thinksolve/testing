import { UPLOAD_ENDPOINT } from '$env/static/private';
import { json } from '@sveltejs/kit';
export async function POST({ request }) {
	try {
		let message = '';

		const formData = await request.formData(); // const name = formData.get('name');
		const fieldValues = formData.entries();

		let txtFileName = 'test.txt';

		for (const [key, val] of fieldValues) {
			message += `${key}: ${val} \n`;

			if (key === 'name') {
				txtFileName = `${String(val).toLowerCase().replace(/\s+/g, '-')}.txt`;
			}
		}

		const data = new FormData();

		const file = new File([message], txtFileName, { type: 'text/plain' });
		data.append('file', file);
		await fetch(UPLOAD_ENDPOINT, {
			method: 'POST',
			body: data
		});

		console.log('txtFileName', txtFileName);
		console.log(message);
		const cleanedMessage = message.split('\n').join('');

		return json({ success: true, message: cleanedMessage });
	} catch (error) {
		return json({ error: true });
	}
}
