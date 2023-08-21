<script>
	// import { cookeh } from '$lib/utils';
	import { name$ } from '.././routes/simple/store';
	import AlertDialog from './AlertDialog.svelte';

	let showDialog = false;
	$: message = String($name$);
</script>

<button
	on:click={() => {
		console.log('$name$', $name$);
		// console.log("cookeh.get('name')", cookeh.get('name'));
		showDialog = true;
	}}
>
	console log
</button>
<AlertDialog bind:message bind:show={showDialog} />

<style>
	button {
		--primary: rgba(0, 255, 183, 0.689);
	}
</style>
