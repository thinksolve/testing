<script lang="ts">
	import '@picocss/pico';
	import './pico-modifications.css';
	// import AlertDialog from '$lib/AlertDialog.svelte';
	// let show = false;
	// let message = 'hey';
</script>

<!-- This is for pico-css to remain in darkmode. I could also modify 
in app.html directly:  <html data-theme="dark" > 
... but normally app.html should be left alone.	-->
<svelte:head>
	<script>
		document.documentElement.setAttribute('data-theme', 'dark');
	</script>
</svelte:head>

<!-- <button on:click={() => (show = true)}>open</button> -->
<!-- <AlertDialog bind:show bind:message /> -->

<main>
	<slot />
</main>

<style>
	main {
		padding: 0px 100px;
		/* padding: 50px 100px; */
		display: grid;
		place-content: center;
	}
</style>
