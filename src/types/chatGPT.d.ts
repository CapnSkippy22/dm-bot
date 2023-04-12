interface ChatGptResponse {
    choices: {
        text: string;
        index: number;
        finish_reason: string;
    }[];
}
