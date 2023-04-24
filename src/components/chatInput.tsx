'use client';

import { useState } from 'react';
import { useMutation } from 'react-query';

const ChatInput = () => {
    console.log('Rendering Chat component')
    const [ inputText, setInputText ] = useState('');

    const addChat = async (prompt: string) => {
        const response = await fetch('/api/chatGPT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: inputText
            })
        });

        console.log('Response:', response);

        const data = await response.json();
        console.log('Add chat data:', data);
        return data;
    };

    const { isSuccess, isLoading, isError, data, error, mutate } = useMutation(addChat);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate(inputText);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={inputText} onChange={(e) => handleChange(e)} />
                <button type='submit'>Submit</button>
                {isLoading && <div>Loading...</div>}
                {(isError && error instanceof Error) && <div>Error: {error.message}</div>}
                {isSuccess && <div>{data.response}</div>}
            </form>
        </div>
    );
};

export default ChatInput;
