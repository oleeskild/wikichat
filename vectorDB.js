import weaviate from 'weaviate-ts-client';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config()

const client = weaviate.client({
    scheme: 'https',
    host: process.env.WEAVIATE_HOSTNAME,
    apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY),
});

export async function upsertVector(collectionName, vector, text) {
    return await client.data.creator()
        .withClassName(collectionName)
        .withId(crypto.createHash('md5').update(text).digest("hex"))
        .withProperties({ text })
        .withVector(vector)
        .do()
        .catch((e) => { console.log('Got An error, skipping'); console.error(e) })
}

export async function getClosestEmbeddings(collectionName, embedding, limit = 3) {
    const res = await client.graphql
        .get()
        .withClassName(collectionName)
        .withFields('text')
        .withLimit(limit)
        .withNearVector(
            {
                vector: embedding,
            })
        .do()

    return res.data.Get[collectionName]
}