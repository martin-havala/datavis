<script lang="ts">
    import Cv from '../components/cv/cv.svelte';
    import Hobbies from '../components/cv/hobbies.svelte';
    import Tech from '../components/cv/tech.svelte';

    let selectedTech: string | null = null;
</script>

<svelte:head>
    <title>Martin Havala</title>
</svelte:head>
<section>
    <div class="column"><Cv bind:selectedTech /></div>
    <div class="column">
        <Tech bind:selectedTech />
        <Hobbies bind:selectedTech />
    </div>
    <!-- <Datavis /> -->
</section>

<style>
    section {
        display: grid;
        width: 100%;
        grid-template-columns: 2fr 1fr;
        grid-template-rows: 1fr;
    }
    .column {
        padding: 1em;
    }
</style>
