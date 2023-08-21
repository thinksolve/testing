export const load = async ({ cookies }) => {
	return {
		name: cookies.get('name'),
		email: cookies.get('email'),
		message: cookies.get('message'),
		resetTimeInSeconds: Number(cookies.get('resetTimeInSeconds'))
	};
};
