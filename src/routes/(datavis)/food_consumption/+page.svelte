<script>
    import { base } from '$app/paths';
</script>

<section>
    <h1>Food consumption in Slovakia</h1>
    <img
        src="{base}/images/food_consumption.jpeg"
        alt="Chart displaying food in Slovakia. Animal vs plant production is almost 50:50"
    />
    <hr />
    <p>
        Source worksheet can be founded on <a href="https://observablehq.com/d/0375fa66b155f997">observablehq.com</a>.
    </p>
    <p>
        Data source:
        <a href="https://datacube.statistics.sk/#!/view/en/VBD_SLOVSTAT/ps2040rs/v_ps2040rs_00_00_00_en"
            >statistics.sk</a
        >
    </p>
</section>

<style>
    section {
        text-align: center;
    }
    img {
        max-width: 70vmin;
        margin: auto;
    }
</style>
