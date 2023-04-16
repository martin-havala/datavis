import fetch from 'node-fetch';
import {JSDOM} from 'jsdom';
import {Birthplace, FamilyMember, PlaceLocation} from './family.model';
const fs = require('fs');

/**
 * Small wrapper method for getting the actual HTML content of a website
 * @param {string} url The URL to get the HTML for
 * @return {Promise<string>} The HTML content as string
 */
const getWebsiteContent = async (url: string): Promise<Document> => {
    // Simple HTTP call
    await new Promise((resolve) => {
        setTimeout(resolve, 1200);
    });
    const fullUrl = url.startsWith('http') ?
        url :
        url.startsWith('//') ?
            `https:${url}` :
            `https://en.wikipedia.org${url}`;
    // console.info('Getting:  ' + fullUrl);
    const content = await fetch(fullUrl);

    const dom: JSDOM = new JSDOM(await content.text());
    const doc: Document = dom.window.document;
    return doc;
};

/**
 * Checks Wikipedia 'place' page and extracts geolocation
 * @param {string} url address of location wabpage
 * @return {PlaceLocation} place name and map location
 */
const getCoordinates = async (url: string): Promise<PlaceLocation | null> => {
    // Simple HTTP call
    if (!url) {
        return null;
    }
    const doc: Document = await getWebsiteContent(url);
    const location = {
        lat: parseFloat(doc.querySelector('.p-latitude')?.textContent ?? ''),
        lng: parseFloat(doc.querySelector('.p-longitude')?.textContent ?? ''),
    } as PlaceLocation;
    return location.lat && location.lng ? location : null;
};

/**
 * Extract Wikipedia link from side panel detail
 * @param {Document} doc current document
 * @param {string} text wiki side-table row name
 * @return {Birthplace} place name and map location
 */
const queryTableForLink = (doc: Document, text: string): string | null => {
    const links = Array.from(doc.querySelectorAll('th'))
        .find((el) => el.textContent === text)
        ?.nextElementSibling?.querySelectorAll('a');
    if (!links) return null;
    const link = Array.from(links).find((a) => a.href.startsWith('/') && !a.closest('.reference')); // TODO check me
    return link ? link.href : null;
};

/**
 * Scrapes Wikipedia location  - it look's for place name & GPS coordinates
 * @param {Document} doc current document
 * @param {string} selector wiki sidetable row name
 * @return {Birthplace} place name and map location
 */
const scrapePlace = async (doc: Document, selector: string): Promise<Birthplace | null> => {
    const url = queryTableForLink(doc, selector);
    if (!url) return null;

    const placeDom = await getWebsiteContent(url);
    const name = placeDom.querySelector('#firstHeading')?.textContent ?? '';
    const coordinatesUrl = (placeDom.querySelector('#coordinates .plainlinks a') as HTMLAnchorElement)?.href;
    const coords = await getCoordinates(coordinatesUrl);
    if (name == 'Kingdom of Hungary (1526–1867)') {
        return {
            name: 'Kingdom of Hungary (1526–1867)',
            lat: 47.491857,
            lng: 18.991798,
        };
    }
    if (!name || !coords) {
        console.error('PLACE coords' + url);
    }

    return placeDom ? ({name, ...coords} as Birthplace) : null;
};

const getPersonFromWeb = async (url: string | null, level: number): Promise<FamilyMember | null> => {
    if (!url) return null;

    const doc = await getWebsiteContent(url);
    return scrapePerson(doc, url, level++);
};

const scrapePerson = async (doc: Document, url: string, level: number): Promise<FamilyMember | null> => {
    const name = (doc.querySelector('.mw-page-title-main') as HTMLElement)?.textContent ?? '';
    if (level++ > 6) return null;
    const fatherUrl = queryTableForLink(doc, 'Father');
    const motherUrl = queryTableForLink(doc, 'Mother');

    console.info('analysing', url);
    const father = await getPersonFromWeb(fatherUrl, level);
    const mother = await getPersonFromWeb(motherUrl, level);
    const res: FamilyMember = {
        name,
        url,
        imgSrc: (doc.querySelector('.infobox-image.photo img') as HTMLImageElement)?.src,
        father,
        mother,
        birthplace: await scrapePlace(doc, 'Born'),
    };
    return res;
};
/**
 * Scraper method which tries to get the value of an input element defined by the
 * provided 'cssSelector' on the provided 'url'
 * @param {string} url The URL to be crawled
 * @param {string} selector The selector to apply to find the input element
 * @return {Promise<string | null | undefined>} The value of the found input element, if found
 */
const scrape = async (url: string, selector: string): Promise<FamilyMember | null> => {
    // Get the HTML of the URL
    const doc = await getWebsiteContent(url);
    // Create JSDOM to have a virtual DOM we can query

    // Search for the input element we want the value for and return it's value
    return scrapePerson(doc, url, 0);
};

/**
 * Simple main method to set up the parameters for our scraping
 * and posting its result
 */
const main = async (): Promise<void> => {
    // Prepare our variables
    const url: string = 'https://en.wikipedia.org/wiki/Elizabeth_II';

    const nameSelector: string = '.infobox-above';
    // Run the Crawler
    const scrapedResult: FamilyMember = (await scrape(url, nameSelector)) as FamilyMember;
    // Print the parameters + result
    console.log('---------------------');
    console.log(`Crawling URL: '${url}'`);
    console.log(`CSS Selector : '${nameSelector}'`);
    console.log('---------------------');
    console.log(`Result: '${JSON.stringify(scrapedResult)}'\n`);

    try {
        fs.writeFileSync('royals.json', JSON.stringify(scrapedResult, null, 4));
        console.log('JSON data is saved.');
    } catch (err) {
        console.error(err);
    }
};

main();
