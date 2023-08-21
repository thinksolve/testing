import { get, writable } from 'svelte/store';

export const name$ = resettable('Rich Harris');
export const email$ = resettable(`noazul@t.co`);
export const message$ = resettable(`Just here so I won't get fined 🍿`);
export const resetTimeInSeconds$ = resettable(5);

export function resettable(defaultValue: string | number) {
	const store = writable(defaultValue);
	const { subscribe, set, update } = store;

	return {
		subscribe,
		set,
		update,
		reset: () => set(defaultValue),
		default: defaultValue,
		isDefault: () => get(store) === defaultValue // not reactive
	};
}

// broken: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores#implementing_our_custom_to-dos_store
export const localStore = (key: string, value: string) => {
	// const { subscribe, set, update } = writable('Hich Rarris');

	const inLocal = localStorage.getItem(key);
	let saved = '';
	if (inLocal) {
		saved = JSON.parse(inLocal);
	} else {
		localStorage.setItem(key, value);
	}
	const { subscribe, set, update } = writable(saved); // create the underlying writable store

	// const secure = true;
	return {
		subscribe,
		set: (value: string) => {
			localStorage.setItem(key, value); // save also to local storage as a string
			return set(value);
		},
		update
	};

	// return {
	// 	subscribe,
	// 	set: (value) => {
	// 		document.cookie = `${key}=${value}; max-age=10; SameSite=None${secure ? '; Secure' : ''}`;
	// 	},
	// 	update
	// };
};
