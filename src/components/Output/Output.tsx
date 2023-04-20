import React, { useEffect, memo, useState } from 'react';
import aiAPI from '../../utils/openAI-API';
// const { Configuration, OpenAIApi } = require("openai");

function Output() {

    const [response, setResponse] = useState('Hello, Mr. Investor');

    useEffect(() => {
        setResponse('Ожидайте ответа...');
        aiAPI.getRecommendation()
            .then((res) => { setResponse(res) })
            .catch((res) => { console.log(res) });
    }, []);

    return (
        <p className='output'>{response}</p>
    );
}

export default Output;
