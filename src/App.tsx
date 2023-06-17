import React, { useEffect, memo, useState } from 'react';
import aiAPI from './utils/openAI-API';

import Output from './components/Output/Output';
import Form from './components/Form/Form';
// import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// const { Configuration, OpenAIApi } = require("openai");

function App() {

  const [response, setResponse] = useState<string | undefined>('');
  const [isLong, setIsLong] = useState<boolean>(true);

  useEffect(() => {
    aiAPI.getRecommendation()
      .then((res) => { setResponse(res) })
      .catch((res) => { console.log(res) });
  }, []);

  return (
    <Grid container>
      <Grid item md={5} xs={12}>
        <Output response={response} />
      </Grid>
      <Grid item md={7} xs={12}>
        <Form isLong={isLong} />
      </Grid>
    </Grid>
  );
}

export default memo(App);
