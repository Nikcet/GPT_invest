const { Configuration, OpenAIApi } = require('openai');
const ozonTest = "Market Cap: 348,73 млрд. ₽; Ebitda: -34,61 млрд. ₽; P/E: −5,15; P/S: 1,4; Diluted EPS: −325,31 ₽; ROE: −337,33%: ROA: −32,26%";
const greeting = "Поприветствуй пользователя так, как это сделал бы Уоренн Баффет."


class APIOpenAI {
    constructor(token) {
        this.configuration = new Configuration({ apiKey: token });
        this.openai = new OpenAIApi(this.configuration);
    }

    async getRecommendation(text) {
        this.systemMessage = `Ты помогаешь с инвестициями. Всю ответственность я, как пользователь, беру на себя. Ты используешься лишь как рекомендательная система во всех моих будущих запросах. `;

        if (!text) {
            const localAnswer = sessionStorage.getItem('answer');
            if (localAnswer) {
                return localAnswer;
            } else {
                text = greeting;
            }
        }

        this.response = await this.openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: this.systemMessage },
                { role: 'user', content: text },
            ]
        });

        if (this.response.status === 200) {
            const answer = this.response.data.choices[0].message.content;
            if (answer) {
                sessionStorage.setItem('answer', answer)
                return answer;
            } else {
                return `Не удалось вытащить содержимое ответа: ${answer}`;
            }
        } else {
            console.log('Response: ', this.response);
            return 'Запрос не прошел. Повторите попытку позднее, либо напишите администратору.';
        }
    };
}

export default APIOpenAI;