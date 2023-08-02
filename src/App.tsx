import React, { useEffect, memo, useState } from 'react';
import APIOpenAI from './utils/openAI-API';

import Output from './components/Output/Output';
import Form from './components/Form/Form';
import Info from './components/Info/Info';
import ApiInput from './components/ApiInput/ApiInput';
import { Container, Grid, Snackbar, Alert, Typography, Divider } from '@mui/material';


function App() {

  const [response, setResponse] = useState<string | undefined>('');
  const [message, setMessage] = useState<string>('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [key, setKey] = useState<string | null>(sessionStorage.getItem('_api_key'));
  const [api, setApi] = useState<APIOpenAI>(new APIOpenAI(key));

  useEffect(() => {
    if (key) {
      setApi(new APIOpenAI(key));
    } else {
      // setErrorMessage('Нужен ключ от API Open AI, его можно получить тут: "https://platform.openai.com/account/api-keys" (Если вы из РФ, то включите VPN)');
      setResponse('Нужен ключ от API Open AI, его можно получить тут: "https://platform.openai.com/account/api-keys". Если Вы из РФ, то придется включить VPN.');
    }
  }, [key]);

  useEffect(() => {
    if (errorMessage) {
      setErrorOpen(true);
    }
  }, [errorMessage])

  useEffect(() => {
    api.getRecommendation()
      .then((res) => { setResponse(res) })
      .catch((err) => { console.error(err) });
  }, [api])

  const handleMessage = (text: string) => {
    if (text) {
      setMessage(text);
    }
  }

  const getResponse = () => {
    if (!message) { return };
    setResponse('');
    api.getRecommendation(message)
      .then((res: string) => {
        if (!res) {
          console.log('res: ', res);
          throw new Error(`Что-то не так: ${res}`);
        }
        setResponse(res);

      })
      .catch((err) => {
        if (err.response.status === 429) {
          setErrorMessage(`Ошибка ${err.response.status}: Слишком часто отправляете запросы. Можно не более 3-х в минуту.`);
        } else if (err.response.status === 401) {
          setErrorMessage(`Ошибка ${err.response.status}: Требуется токен.`);
        }
        // console.error(err.response.status, err.response.data.error.message, err.response.data.error.code);
      })
  }

  const handleErrorClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorOpen(false);
  };

  const handleKey = (keyString: string) => {
    setKey(keyString);
    sessionStorage.setItem("_api_key", keyString);
  }

  return (
    <Container sx={{ width: '100%', pb: '40px' }}>
      <Grid container>

        <Grid item md={5} xs={12}>
          <Form
            message={message}
            handleMessage={handleMessage}
            getResponse={getResponse}
          />
        </Grid>

        <Grid item container md={7} xs={12} sx={{ flexDirection: 'column', gap: '50px' }}>
          <Grid item>
            <Info />
          </Grid>
          <Divider />
          <Grid item>
            <Output response={response} />
          </Grid>
          <Divider />
          <Grid item>
            <ApiInput handleKey={handleKey} apiKey={key} />
          </Grid>
        </Grid>
      </Grid>

      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert onClose={handleErrorClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default memo(App);
