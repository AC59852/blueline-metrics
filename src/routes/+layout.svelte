<script>
	import NavComponent from "$lib/components/NavComponent.svelte";

  let { children } = $props();
</script>

<NavComponent />

{@render children()}