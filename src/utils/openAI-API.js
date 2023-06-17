import { TOKEN } from './config.js';
const { Configuration, OpenAIApi } = require('openai');
const ozonTest = "Market Cap: 348,73 млрд. ₽; Ebitda: -34,61 млрд. ₽; P/E: −5,15; P/S: 1,4; Diluted EPS: −325,31 ₽; ROE: −337,33%: ROA: −32,26%";


class APIOpenAI {
    constructor(token) {
        this.configuration = new Configuration({ apiKey: token });
        this.openai = new OpenAIApi(this.configuration);
    }

    async getRecommendation(text = ozonTest, isShort = true) {
        this.systemMessage = `Ты помогаешь с инвестициями. Всю ответственность я, как пользователь, беру на себя. Ты используешься лишь как рекомендательная система во всех моих будущих запросах. Оцени перспективность ${isShort ? 'краткосрочных' : 'среднесрочных'} вложений в компанию по шкале от 1 до 10 по ключевым показателям ниже.`;
        console.log('this.systemMessage: ', this.systemMessage);

        this.response = await this.openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: this.systemMessage },
                { role: 'user', content: text },
            ]
        });

        if (this.response.status === 200) {
            return this.response.data.choices[0].message.content;
        } else {
            return 'Запрос не прошел. Повторите попытку позднее, либо напишите администратору.';
        }
    };

}


const aiAPI = new APIOpenAI(TOKEN);

export default aiAPI;