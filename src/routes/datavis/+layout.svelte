<script>
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
</script>

<div class="body">
    <header>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span on:click={() => goto(base || '/')}>←</span>
        <a href={base || '/'}>← back home</a>
    </header>
    <div class="content">
        <slot />
    </div>
</div>

<style lang="scss">
    .body {
        --headerHeight: 2em;
        display: grid;
        grid-template-areas: 'header' 'content';
        height: 100vh;
        overflow: hidden;
        width: 100vw;
        grid-template-rows: 2em auto;
    }
    header {
        grid-area: header;
        display: flex;
        width: 100%;
        justify-content: space-between;
        line-height: 2em;
        z-index: 1000;
        background: #202022;
        border-bottom: #404044 1px solid;

        a,
        span {
            padding: 0 1em;
            cursor: pointer;
            text-decoration: none;
        }
    }
    .content {
        grid-area: content;
        overflow: auto;
    }
</style>
