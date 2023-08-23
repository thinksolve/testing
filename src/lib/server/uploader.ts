import { drive } from './drive';
import { GOOGLE_DRIVE_FOLDER } from '$env/static/private';
const ALLOWED_FILE_TYPES = /\.(heic|jpg|jpeg|png|md|pdf|doc|docx|txt)$/i;

export async function uploader(file: File, uploadFolder = GOOGLE_DRIVE_FOLDER) {
	if (!ALLOWED_FILE_TYPES.test(file.name)) return;

	const { data } = await drive.files.create({
		media: {
			mimeType: file.type
		},
		requestBody: {
			name: file.name,
			parents: [uploadFolder]
		},
		fields: 'id,name'
	});
	console.log(`🚀 Uploaded: ${data.name} ${data.id} `);
}
