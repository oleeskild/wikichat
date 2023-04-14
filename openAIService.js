import dotenv from 'dotenv';
dotenv.config();
const model = process.env.USE_GPT_4 ? 'gpt-4' : 'gpt-3.5-turbo';

export async function getEmbeddingVector(textInput) {

    const embeddingResponse = await (await fetch('https://api.openai.com/v1/embeddings', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'text-embedding-ada-002',
            input: textInput
        }),
        method: 'POST'
    })).json()

    const embedding = embeddingResponse.data[0].embedding;
    return embedding;
}

export async function getChatResponse(prompt) {
    const queryResponse = await (await fetch('https://api.openai.com/v1/chat/completions', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model,
            messages: [{ "role": "user", "content": prompt }],
        }),
        method: 'POST'
    })).json()

    const answer = queryResponse.choices[0].message.content;
    return answer;
}
