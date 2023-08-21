import { json } from '@sveltejs/kit';
import { fileUploader } from '$lib/utils.server';
// import { durationOfReturnedAsyncFunction } from '$lib/utils.js';

export async function POST({ request, cookies }) {
	// const { message, error } = await durationOfReturnedAsyncFunction(() => fileUploader(request));
	const start = performance.now();
	const { message, error } = await fileUploader(request);
	const duration = Math.floor(performance.now() - start);
	console.log('Duration:', duration);

	let avg: number;
	let count: number;

	const avgAndCount = cookies.get('avgAndCount');

	if (!avgAndCount) {
		cookies.set('avgAndCount', `${duration};1`, { maxAge: 60 * 5 });
	} else {
		const [a, b] = avgAndCount.split(';');
		const [avgPrev, countPrev] = [parseInt(a), parseInt(b)];
		count = countPrev + 1;
		avg = Math.floor((countPrev * avgPrev + duration) / count); // total = prev_total + increment
		cookies.set('avgAndCount', `${avg};${count}`, { maxAge: 60 * 5 });
	}

	if (error) {
		return json({ error: true, message: `Error in file submission: ${error}` });
	}
	return json({ success: true, message });
}
