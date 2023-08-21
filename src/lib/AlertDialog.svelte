<script lang="ts">
	import { sineOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	export let show = false;
	export let message = '';
	export let duration = 4000;
	let timeoutId: ReturnType<typeof setTimeout>;
	$: if (show) {
		clearInterval(timeoutId);
		timeoutId = setTimeout(() => {
			show = false;
			message = '';
		}, duration);
	}
</script>

{#key show}
	<!-- <modal-overlay class:hide={!show}> -->

	<modal-content
		class:hide={!show}
		on:click={() => (show = false)}
		on:keydown={() => (show = false)}
		tabindex="0"
		role="button"
		in:fly={{ y: -50, easing: sineOut }}
		out:fly={{ y: -50, duration: 200 }}
	>
		{message}
	</modal-content>
	<!-- </modal-overlay> -->
{/key}

<style>
	* {
		--primary: rgb(128, 128, 128, 0);
	}
	/* modal-overlay {
		pointer-events: none;
		position: absolute;
		width: 100vw;
		height: 100vh;
		margin: 0;
		padding: 0;
		top: 0;
		right: 0;
	} */
	modal-content {
		pointer-events: auto;
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		padding: 50px;

		background-color: rgb(128, 128, 128, 0.1);
		backdrop-filter: blur(5px);
		display: grid;
		place-items: center;
		border-radius: 20px;
	}

	.hide {
		display: none;
	}
</style>
