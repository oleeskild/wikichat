import dotenv from 'dotenv'
import { getEmbeddingVector } from './openAIService.js';
import { getClosestEmbeddings } from './vectorDB.js';
import { getChatResponse } from './openAIService.js';
dotenv.config()

//Get first argument from command line
const article = process.argv[2];
const query = process.argv[3];
if(process.argv.length < 4) {
    console.log('Please provide an article and a query')
    //usage tip
    console.log('node query.js "The Beatles" "Who was the drummer of the Beatles?"')
    process.exit(1)
}

const articleClassName = article.split(' ').join('') + 'Wiki';

const embedding = await getEmbeddingVector(query);

const textSections = await getClosestEmbeddings(articleClassName, embedding);

let prompt = `You are an enthusiastic librarian that helps people discover knowledge, with helpful explanations.
Given the following paragraphs from an article, what is the best answer to the question.
If you can't find the answer in the article, please write "Sorry, I can't find anything about this in the article about ${article}".

Paragraphs from article: ${textSections.map(x=>x.text).join('\n\n')}

Question:"""
${query}
"""
`

const answer = await getChatResponse(prompt);
console.log(answer)