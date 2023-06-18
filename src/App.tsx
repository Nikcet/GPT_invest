import React, { useEffect, memo, useState } from 'react';
import aiAPI from './utils/openAI-API';

import Output from './components/Output/Output';
import Form from './components/Form/Form';
import Info from './components/Info/Info';
import { Container, Grid, Snackbar, Alert, Typography, Divider } from '@mui/material';

// const { Configuration, OpenAIApi } = require("openai");

function App() {

  const [response, setResponse] = useState<string | undefined>('');
  const [message, setMessage] = useState<string>('');
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('Что-то не так, см в консоль.');

  useEffect(() => {
    aiAPI.getRecommendation()
      .then((res) => { setResponse(res) })
      .catch((err) => { console.error(err) });
  }, []);

  const handleMessage = (text: string) => {
    if (text) {
      setMessage(text);
    }
  }

  const getResponse = () => {
    if (!message) { return };
    setResponse('');
    aiAPI.getRecommendation(message)
      .then((res: string) => {
        if (!res) {
          console.log(res);
          handleErrorOpen('Что-то не так, см в консоль.')
          throw new Error(`Что-то не так: ${res}`)
        }
        setResponse(res);
      })
      .catch((err) => console.error(err))
  }

  const handleErrorOpen = (text: string) => {
    setErrorMessage(text);
    setErrorOpen(true);
  }

  const handleErrorClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorOpen(false);
  };

  return (
    <Container sx={{ maxWidth: '1400px' }}>
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
