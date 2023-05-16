<script>
    import { base } from '$app/paths';
</script>

<section>
    <h1>Director ratings</h1>
    <p>
        Some directors are able to keep constant rating on IMDB, some not. <br/>
        And others... others age like wine. Congrats to Pedro Almodóvar.
    </p>
    <img
        src="{base}/images/director_ratings.png"
        alt="Chart comparing directors age to their average IMDB rating. Some age like wine, some not."
    />
    <hr />
    <p>
        Source worksheet can be founded on <a href="https://www.kaggle.com/code/sawio47/notebookdb38d3850f"
            >kaggle.com</a
        >.
    </p>
    <p>
        Data source:
        <a href="http://imdb.com/interfaces/">imdb.com</a>
    </p>
</section>

<style>
    section {
        text-align: center;
    }
    img {
        max-width: 80vmin;
        margin: auto;
    }
</style>
