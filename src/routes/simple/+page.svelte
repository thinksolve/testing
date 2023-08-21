<script lang="ts">
	import AlertDialog from '$lib/AlertDialog.svelte';
	import { name$, email$, message$, resetTimeInSeconds$ } from './store';

	let timeOutId: ReturnType<typeof setTimeout>;
	let dontReset = false;
	$: if (!dontReset) {
		clearTimeout(timeOutId);
		timeOutId = setTimeout(() => {
			if ($name$ !== name$.default) name$.reset();
			if ($email$ !== email$.default) email$.reset();
			if ($message$ !== message$.default) message$.reset();
		}, Number($resetTimeInSeconds$) * 1000);
	}

	// $: $name$, console.log('name$.isDefault()', name$.isDefault());

	const ENDPOINT = '/simple/post';
	let logMessage = '';
	let showDialog = false;

	let disabledDialogFromInput = false;

	async function submitUser() {
		const formData = new FormData();
		const formEntries = { name: $name$, email: $email$, message: $message$ };

		for (const [key, val] of Object.entries(formEntries)) {
			formData.append(key, String(val));
			logMessage += `${key}: ${val} \n`;
		}
		console.log('logMessage', logMessage);
		showDialog = true;

		return;
		// submits to backend
		await fetch(ENDPOINT, {
			method: 'POST',
			body: formData
		}).then((res) =>
			console.log(res.ok ? `file sent to '${ENDPOINT}'` : `error occured sending to '${ENDPOINT}'`)
		);
	}
</script>

<p><a href="/">back to home</a></p>

<!-- for some reason bind logic not working -->
<input type="checkbox" bind:checked={disabledDialogFromInput} />
<input type="checkbox" name="reset" id="reset" bind:checked={dontReset} />
<input type="range" min="0" max="10" bind:value={$resetTimeInSeconds$} />
{#if !dontReset}
	<p>changes to form persist for {$resetTimeInSeconds$} seconds</p>
{/if}

<form on:submit|preventDefault={submitUser} method="POST" action={ENDPOINT}>
	<input type="text" name="name" placeholder="Your name" bind:value={$name$} />
	<input type="email" name="email" placeholder="Your email" bind:value={$email$} />
	<input type="text" name="message" placeholder="Your message" bind:value={$message$} />

	<button type="submit">Submit</button>
	<span>check console and server logs</span>
</form>

<button
	on:click={() => {
		showDialog = true;
		logMessage = 'yooo';
	}}>showDaDialog</button
>

{#if !disabledDialogFromInput}
	<AlertDialog bind:show={showDialog} bind:message={logMessage} />
{/if}

<style>
	* {
		--primary: #1f9cea; /* #1bd8cf; */
	}
	[type='submit'] + * {
		visibility: hidden;
	}
	[type='submit']:focus + * {
		visibility: visible;
	}
	[type='checkbox']:checked + [type='range'] {
		visibility: hidden;
	}
</style>
