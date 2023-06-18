import React, { useEffect, memo, useState } from 'react';
// import Container from '@mui/material/Container';
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Typography,
  Autocomplete,
  Card,
  CardContent,
  Stack,
  Button,
} from '@mui/material';

interface IProps {
  // isLong: boolean,
  message: string,
  handleMessage: (text: string) => void,
  getResponse: () => void,
}

function Form(props: IProps) {

  const [marketCap, setMarketCap] = useState<string | null>('');
  const [ebitda, setEbitda] = useState<string | null>('');
  const [pe, setPe] = useState<string | null>('');
  const [ps, setPs] = useState<string | null>('');
  const [eps, setEps] = useState<string | null>('');
  const [roe, setRoe] = useState<string | null>('');
  const [roa, setRoa] = useState<string | null>('');
  const [debt, setDebt] = useState<string | null>('');
  const [profit, setProfit] = useState<string | null>('');
  const [duration, setDuration] = useState<string | null>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [currency, setCurrency] = useState<string | null>('₽');
  // const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const content = [
      marketCap && `Market Cap: ${marketCap} млрд,`,
      ebitda && `Ebitda: ${ebitda} млрд,`,
      pe && `P/E: ${pe},`,
      ps && `P/S: ${ps},`,
      eps && `Diluted EPS: ${eps}₽,`,
      roe && `ROE: ${roe}%,`,
      roa && `ROA: ${roa}%,`,
      debt && `Debt/Equity: ${debt}%,`,
      profit && `Net Profit Margin: ${profit}%`
    ].filter(Boolean).join('\n  ');

    const message = `"Оцени перспективность ${duration} вложений в компанию по шкале от 1 до 10 по ключевым показателям ниже: 
  ${content}"`;

    props.handleMessage(message);
  }, [debt, duration, ebitda, eps, marketCap, pe, profit, props, ps, roa, roe]);

  const options = ['краткосрочных', 'среднесрочных', 'долгосрочных'];
  const currencies = ['₽', '$', '¥']

  const handleInputValue = (newValue: string) => {
    setInputValue(newValue);
    setDuration(newValue);
  }

  const handleCurrencyValue = (newValue: string | null) => {
    if (!newValue) {
      setCurrency(currencies[0]);
    } else {
      setCurrency(newValue);
    }
  }

  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', m: '10px 0', gap: '20px' }}
    >
      <Typography variant='h6'>Итоговый запрос к ChatGPT: ⬇️</Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flexWrap: 'wrap', }}
      >
        <Card>
          <CardContent>
            <Typography variant="body1">{props.message}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <form onSubmit={props.getResponse}>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', width: '100%', gap: '10px' }}>
                  <Autocomplete
                    sx={{ flexGrow: '1' }}
                    options={currencies}
                    value={currency}
                    onChange={(_, newValue: string | null) => handleCurrencyValue(newValue)}
                    renderInput={(params) => <TextField {...params} label='Валюта' />}
                  />

                  <Autocomplete
                    sx={{ flexGrow: '2' }}
                    freeSolo
                    options={options}
                    value={duration}
                    onChange={(_, newValue: string | null) => setDuration(newValue)}
                    inputValue={inputValue}
                    onInputChange={(_, newValue: string) => handleInputValue(newValue)}
                    renderInput={(params) => <TextField {...params} label='Продолжительность инвестиций' />}
                  />
                </Box>

                <TextField
                  label="Market Cap"
                  value={marketCap}
                  onChange={(event) => setMarketCap(event.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position='start' >{`млрд ${currency}`}</InputAdornment>,
                  }}
                />

                <TextField
                  label="Ebitda"
                  value={ebitda}
                  onChange={(event) => setEbitda(event.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position='start' >{`млрд ${currency}`}</InputAdornment>,
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
                    endAdornment: <InputAdornment position='start' >{currency}</InputAdornment>,
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

                <TextField
                  label="Debt/Equity "
                  value={debt}
                  onChange={(event) => setDebt(event.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position='start' >%</InputAdornment>,
                  }}
                />

                <TextField
                  label="Net Profit Margin"
                  value={profit}
                  onChange={(event) => setProfit(event.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position='start' >%</InputAdornment>,
                  }}
                />

                <Button
                  variant="contained"
                  onClick={(_) => props.getResponse()}
                >Отправить</Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Form;
