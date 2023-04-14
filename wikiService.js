const apiUrl = 'https://en.wikipedia.org/w/api.php';

// Define the parameters for the API request

// Define an async function to fetch the article content
export async function fetchArticleParagraphs(articleName) {

    const params = new URLSearchParams({
        "action": "query",
        "titles": articleName,
        "prop": 'extracts',
        "explaintext": 1,
        'format': 'json'
    });

    try {
        // Fetch the article content from the API
        const response = await fetch(`${apiUrl}?${params.toString()}`);
        const data = await response.json();

        // Get the page content from the API response
        const pages = data.query.pages;
        const pageContent = pages[Object.keys(pages)[0]].extract;

        // Split the content into an array of paragraphs
        const paragraphs = pageContent.split('\n\n');

        // Do something with the paragraphs
        return paragraphs;
    } catch (error) {
        console.error(error);
    }
}
