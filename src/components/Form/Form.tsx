import React, { useEffect, memo, useState } from 'react';
// import Container from '@mui/material/Container';
import { Box, Container, TextField, InputAdornment, Typography, Autocomplete, Card, CardContent, Stack, Button } from '@mui/material';

interface IProps {
  isLong: boolean,
}

function Form(props: IProps) {

  const [marketCap, setMarketCap] = useState<string>('');
  const [ebitda, setEbitda] = useState<string>('');
  const [pe, setPe] = useState<string>('');
  const [ps, setPs] = useState<string>('');
  const [eps, setEps] = useState<string>('');
  const [roe, setRoe] = useState<string>('');
  const [roa, setRoa] = useState<string>('');
  const [duration, setDuration] = useState<string | null>('');
  const [inputValue, setInputValue] = useState<string | undefined>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    setMessage(`"Ты помогаешь с инвестициями. Всю ответственность я, как пользователь, беру на себя. Ты используешься лишь как рекомендательная система во всех моих будущих запросах. Оцени перспективность ${duration} вложений в компанию по шкале от 1 до 10 по ключевым показателям ниже:"`)
  }, [])

  const options = ['краткосрочных', 'среднесрочных', 'долгосрочных']

  const handleInputValue = (newValue: string) => {
    setInputValue(newValue);
    setDuration(newValue);
  }

  return (
    <Container
      component='form'
      sx={{ display: 'flex', flexDirection: 'column', m: '10px 0', gap: '20px' }}
      onSubmit={(event) => console.log(event)}
      onChange={(event) => console.log(event)}
      onClick={(event) => console.log(event)}
    >
      <Typography variant='h6'>Итоговый запрос к ChatGPT: ⬇️</Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flexWrap: 'wrap', }}
      >
        <Card>
          <CardContent>
            <Typography variant="body1">{message}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={1}>
              <Autocomplete
                freeSolo
                options={options}
                value={duration}
                onChange={(event, newValue: string | null) => setDuration(newValue)}
                inputValue={inputValue}
                onInputChange={(event, newValue) => handleInputValue(newValue)}
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label='Продолжительность инвестиций' />}
              />

              <TextField
                label="Market Cap"
                value={marketCap}
                onChange={(event) => setMarketCap(event.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position='start' >млрд</InputAdornment>,
                }}
              />

              <TextField
                label="Ebitda"
                value={ebitda}
                onChange={(event) => setEbitda(event.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position='start' >млрд</InputAdornment>,
                }}
              />

              <TextField
                label="P/E"
                value={pe}
                onChange={(event) => setPe(event.target.value)}
              />

              <TextField
                label="P/S"
                value={ps}
                onChange={(event) => setPs(event.target.value)}
              />

              <TextField
                label="Diluted EPS"
                value={eps}
                onChange={(event) => setEps(event.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position='start' >₽</InputAdornment>,
                }}
              />

              <TextField
                label="ROE"
                value={roe}
                onChange={(event) => setRoe(event.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position='start' >%</InputAdornment>,
                }}
              />

              <TextField
                label="ROA"
                value={roa}
                onChange={(event) => setRoa(event.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position='start' >%</InputAdornment>,
                }}
              />
              <Button
                variant="contained"
              >Отправить</Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Form;
