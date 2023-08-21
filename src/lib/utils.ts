// event.preventDefault(); // not needed since using '|preventDefault' with svelte
// export async function submitWithClientJS({ target }: { target: HTMLFormElement }) {

// const filesInput = target.elements.namedItem('file') as HTMLInputElement;
export async function submitWithClientJS({ target }: SubmitEvent) {
	const filesInput = (target as HTMLFormElement).elements.namedItem('file') as HTMLInputElement;
	const filesList = filesInput.files as FileList;

	let submittedFileNames = '\nSubmitted files:\n';
	const formData = new FormData();

	for (const file of filesList) {
		if (file instanceof File) {
			submittedFileNames += `${file.name}; `;
			formData.append('file', file);
		}
	}

	console.log(submittedFileNames);

	const res = await fetch('/post', {
		method: 'POST',
		body: formData
	});
	console.log(res.ok ? await res.json() : res.statusText);
}

// measures duration for an async function that returns a value
export async function durationOfReturnedAsyncFunction<T>(func: () => Promise<T>): Promise<T> {
	const start = performance.now();
	const result = await func();
	const duration = performance.now() - start;
	console.log('Duration:', duration);

	return result;
}

export const cookeh = {
	set: function (
		name: string,
		value: string | boolean,

		{ seconds = 60 * 60 * 24, secure = true } = {}
		// { seconds = 60 * 60 * 24, secure = !get(isSafari) } = {}
	) {
		// if (!is_client) return;
		document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${seconds}; SameSite=None${
			secure ? '; Secure' : ''
		}`;
		console.log(`${name} cookie set; secure: ${secure}`);
	},

	get: function (name: string) {
		// if (!is_client) return;
		const match = document.cookie.match(`${name}=(.*?)(;|$)`);
		return match ? decodeURIComponent(match[1]) : '';
	},

	eat: function (...names: string[]) {
		// if (!is_client) return;
		names.forEach((name) => (document.cookie = `${name}=; max-age=0;`));
	}
};

export function clickOutside(node: HTMLElement, callback: () => void) {
	// if (node.className.includes('hide')) return;

	async function handleClick({ target }: Event) {
		console.log('target', target);

		if (target !== node) {
			callback();
			console.log('clicked outside!');
		}
		// if (node && node.contains(target as HTMLElement)) return;

		// callback();
		// console.log('clicked outside!');
	}

	document.addEventListener('click', handleClick);

	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		}
	};
}
