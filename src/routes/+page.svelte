<script lang="ts">
	// FOR FIRST FORM
	import { submitWithClientJS } from '$lib/utils';

	// FOR SECOND FORM
	import { enhance } from '$app/forms';

	export let form;
	let myTimeout: ReturnType<typeof setTimeout>;
	let duration = 3000; // $:duration = form.cookieLifeInSeconds * 1000
	$: showMessage = form?.success;
	$: if (showMessage) {
		myTimeout = setTimeout(() => {
			showMessage = false;
			clearTimeout(myTimeout);
		}, duration);
	}
</script>

<main>
	<h2>File submission with 3 methods</h2>
	<p>...also simple user form submission: <a href="/simple"> /simple</a></p>

	<!-- #1: Submit with JS; fallback with regular form -->
	<form
		on:submit|preventDefault={submitWithClientJS}
		enctype="multipart/form-data"
		method="POST"
		action="/post"
	>
		<input type="file" name="file" id="file" multiple required />
		<button type="submit">(client JS) </button>
		<span>check console and server logs</span>
	</form>

	<!-- #2: Submit using sveltekit form actions -->
	<form enctype="multipart/form-data" method="POST" use:enhance>
		<input type="file" name="file" id="file" multiple required />
		<button type="submit" class="outline"
			>(form actions)
			{#if form?.success && showMessage}
				<p>{form?.message}</p>
			{/if}
		</button>
		<span>check server logs</span>
	</form>

	<!-- #3: Submit with form  -->
	<form enctype="multipart/form-data" method="POST" action="/post">
		<input type="file" name="file" id="file" multiple required />
		<button type="submit" class="outline contrast">(server endpoint)</button>
		<span>check server logs</span>
	</form>
</main>

<style>
	form {
		padding: 20px 0 0 0;
		margin: 0;
	}

	h2 {
		margin: 0;
		padding: 0;
	}

	[type='submit'] + * {
		visibility: hidden;
	}
	[type='submit']:focus + * {
		visibility: visible;
	}
</style>
