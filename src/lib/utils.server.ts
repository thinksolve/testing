import { UPLOAD_ENDPOINT } from '$env/static/private';

export async function fileUploader(request: Request) {
	try {
		const filesIterator = (await request.formData()).values();
		// const files = Array.from(filesIterator) as File[];
		const filesToUpload = new FormData();
		const ALLOWED_FILE_TYPES = /\.(heic|jpg|jpeg|png|md|pdf|doc|docx|txt)$/i;
		let includedFileNames = '\nSubmitted files: \n';
		let excludedFileNames = '\nExcluded files: \n';

		for (const file of filesIterator) {
			// for (const file of files) {
			if (file instanceof File) {
				if (ALLOWED_FILE_TYPES.test(file.name)) {
					includedFileNames += `${file.name}; `;
					filesToUpload.append('file', file, file.name);
				} else {
					excludedFileNames += `${file.name}; `;
				}
			}
		}

		await fetch(UPLOAD_ENDPOINT, {
			method: 'POST',
			body: filesToUpload
		});

		const message = `${includedFileNames} \n${excludedFileNames}`;
		console.log(message);

		const cleanedMessage = message.replace(/\n/g, '');

		return { message: cleanedMessage, error: null };
	} catch (error) {
		return { message: null, error: error };
	}
}
