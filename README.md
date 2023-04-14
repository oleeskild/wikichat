# WikiChat

A demo project allowing you to query a Wikipedia articles using GPT-4, Weaviate and OpenAI Embeddings.

## Setup
```bash
npm install
```
Sign up for OpenAI and [Weaviate](https://console.weaviate.cloud/dashboard), and create a new cluster.

Rename the `.env.template` file to `.env` and replace the values with your API keys and Weaviate hostname. 
If you have access to GPT-4 you can enable that by setting the USE_GPT4 flag to true. Otherwise, it will use GPT-3.5.

## Running it

First you need to create a collection of Embeddings in your vector database from a article. For example:

```bash
node populateDatabase.js "The Beatles"
```


When this is done, you can start querying that article using the query.js script:

```bash
node query.js "The Beatles" "Do you know who the drummer of The Beatles was?"
```

After a couple of seconds, and answer should appear:
```bash
>The original drummer of The Beatles was Pete Best, but he was replaced by Ringo Starr in mid-August 1962.
```


If you want to query another article, you first have to run the populateDatabase.js script. Note that the article name used for both scripts is casesensitive.