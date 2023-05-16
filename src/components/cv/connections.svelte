<script>
    import { base } from '$app/paths';
</script>

<div class="profile">
    <h1>Martin Havala</h1>
    <div class="networks">
        <a href="https://twitter.com/sawio" target="_parent">twitter</a>
        <a href="https://github.com/martin-havala" target="_parent">github</a>
        <a href="https://www.linkedin.com/in/martin-havala-4690b5214" target="_parent">linkedin</a>
    </div>
    <!-- <img src="{base}/images/profile_pic.jpg" alt="Profile picture" aria-hidden="true" /> -->
</div>

<style lang="scss">
    section {
        h1 {
            margin: 0;
        }
    }
    .profile {
        margin: 0 1em;
        display: flex;
        justify-content: start;
        align-items: center;
        // img {
        //     width: 5em;
        //     border-radius: 50%;
        //     padding-right: 1em;
        //     margin-left: 3em;
        //     position: relative;
        //     height: 5em;
        // }
    }
    .networks {
        font-size: 0.8em;
        margin-left: 3em;
    }
    a {
        padding: 0.5ex;
    }
</style>
