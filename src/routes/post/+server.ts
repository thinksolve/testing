import { json } from '@sveltejs/kit';
import { uploadFileToGoogleDrive } from '$lib/utils.server';

export async function POST({ request }) {
	const { message, error } = await uploadFileToGoogleDrive(request);
	// const { message, error } = await fileUploader(request);

	if (error) {
		return json({ error: true, message: `Error in file submission: ${error}` });
	}
	return json({ success: true, message });
}
