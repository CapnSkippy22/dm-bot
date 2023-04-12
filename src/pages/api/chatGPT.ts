import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('Submitting Prompt:', req.body.prompt);
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_CHATGPT_API_KEY}`
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: req.body.prompt,
            max_tokens: 100,
            temperature: 0,
            top_p: 1,
            n: 1
        })
    });

    if (response.ok) {
        const data: ChatGptResponse = await response.json();
        console.log('Reponse Good, Data:', data, response.status);
        if (data.choices) {
            res.status(200).json({ response: data.choices[0].text });
        }
    } else {
        console.log('Error:', response.status, response.statusText);
        res.status(response.status);
    }
}
