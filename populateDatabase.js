import dotenv from 'dotenv'

import { fetchArticleParagraphs } from './wikiService.js';
import { getEmbeddingVector } from './openAIService.js';
import { upsertVector } from './vectorDB.js';

dotenv.config()

//Get first argument from command line
const articleName = process.argv[2];

//Get our knowledge base
const paragraphs = await fetchArticleParagraphs(articleName);

//Create embeddings
let embeddings = [];
for (const paragraph of paragraphs) {
    const embedding = await getEmbeddingVector(paragraph); 
    embeddings.push({ embedding: embedding, text: paragraph });
}

for(const embedding of embeddings) {
    upsertVector(articleName.split(' ').join('') + 'Wiki', embedding.embedding, embedding.text)
}

