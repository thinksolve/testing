import { fileUploader } from '$lib/utils.server';

export const actions = {
	default: async function ({ request }) {
		const { message, error } = await fileUploader(request);

		if (error) {
			return { error: true, message: `Error in file submission: ${error}` };
		}
		return { success: true, message };
	}
};
