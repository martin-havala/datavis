<script>
    import { base } from '$app/paths';
</script>

<div class="body">
    <header>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <a href={base || '/'}>← back home</a>
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
        width: 100%;
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

        :global(section) {
            user-select: none;
        }

        :global(.notes) {
            display: flex;
            flex-direction: column;
            overflow: auto;
        }
        :global(.notes),
        :global(.comments) {
            max-width: 50em;
            margin: 1ex;
            text-align: left;
        }
        :global(h1) {
            padding-left: 1ex;
        }
    }
</style>
