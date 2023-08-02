import { useEffect, useState, Dispatch, SetStateAction, useMemo } from 'react';
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  // Typography,
  Autocomplete,
  Card,
  CardContent,
  Stack,
  Button,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface IProps {
  message: string,
  handleMessage: (text: string) => void,
  getResponse: () => void,
}

const Form = (props: IProps) => {

  const [marketCap, setMarketCap] = useState<string | null>(sessionStorage.getItem('marketCap') ?? '');
  const [ebitda, setEbitda] = useState<string | null>(sessionStorage.getItem('ebitda') ?? '');
  const [pe, setPe] = useState<string | null>(sessionStorage.getItem('pe') ?? '');
  const [ps, setPs] = useState<string | null>(sessionStorage.getItem('ps') ?? '');
  const [eps, setEps] = useState<string | null>(sessionStorage.getItem('eps') ?? '');
  const [roe, setRoe] = useState<string | null>(sessionStorage.getItem('roe') ?? '');
  const [roa, setRoa] = useState<string | null>(sessionStorage.getItem('roa') ?? '');
  const [debt, setDebt] = useState<string | null>(sessionStorage.getItem('debt') ?? '');
  const [profit, setProfit] = useState<string | null>(sessionStorage.getItem('profit') ?? '');
  const [duration, setDuration] = useState<string | null>(sessionStorage.getItem('duration') ?? null);
  const [inputValue, setInputValue] = useState<string>('');
  const [currency, setCurrency] = useState<string | null>(sessionStorage.getItem('currency') ?? '₽');

  const content = useMemo(() => {
    return [
      marketCap && `Market Cap: ${marketCap} млрд`,
      ebitda && `Ebitda: ${ebitda} млрд`,
      pe && `P/E: ${pe}`,
      ps && `P/S: ${ps}`,
      eps && `Diluted EPS: ${eps}₽`,
      roe && `ROE: ${roe}%`,
      roa && `ROA: ${roa}%`,
      debt && `Debt/Equity: ${debt}%`,
      profit && `Net Profit Margin: ${profit}%`
    ].filter(Boolean).join('\n  ');
  }, [marketCap, ebitda, pe, ps, eps, roe, roa, debt, profit]);

  const message = useMemo(() => {
    return `Оцени перспективность ${duration} вложений в компанию по шкале от 1 до 10 по ключевым показателям ниже:
  ${content}`;
  }, [content, duration]);

  useEffect(() => {
    props.handleMessage(message);
    console.log('message: ', message);
  }, [props.handleMessage, message, props]);

  const options = ['краткосрочных', 'среднесрочных', 'долгосрочных'];
  const currencies = ['₽', '$', '¥']

  function handleInput(value: string | null, setValue: Dispatch<SetStateAction<string | null>>, name: string) {
    if (!value) { return }
    setValue(value);
    sessionStorage.setItem(name, value);
  }

  const handleInputValue = (newValue: string) => {
    setInputValue(newValue);
    setDuration(newValue);
    sessionStorage.setItem('duration', newValue);
  }

  const handleCurrencyValue = (newValue: string | null) => {
    if (!newValue) {
      setCurrency(currencies[0]);
    } else {
      setCurrency(newValue);
      sessionStorage.setItem('currency', newValue);
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.getResponse();
  }

  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', m: '10px 0', gap: '20px' }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flexWrap: 'wrap', }}
      >
        {/* <Card>
          <CardContent>
            <Typography variant="body1">{props.message}</Typography>
          </CardContent>
        </Card> */}

        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
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
                  onChange={(event) => handleInput(event.target.value, setMarketCap, 'marketCap')}
                  InputProps={{
                    endAdornment: <InputAdornment position='start' >{`млрд ${currency}`}</InputAdornment>,
                  }}
                />

                <TextField
                  label="Ebitda"
                  value={ebitda}
                  onChange={(event) => handleInput(event.target.value, setEbitda, 'ebitda')}
                  InputProps={{
                    endAdornment: <InputAdornment position='start' >{`млрд ${currency}`}</InputAdornment>,
                  }}
                />

                <TextField
                  label="P/E"
                  value={pe}
                  onChange={(event) => handleInput(event.target.value, setPe, 'pe')}
                />

                <TextField
                  label="P/S"
                  value={ps}
                  onChange={(event) => handleInput(event.target.value, setPs, 'ps')}
                />

                <TextField
                  label="Diluted EPS"
                  value={eps}
                  onChange={(event) => handleInput(event.target.value, setEps, 'eps')}
                  InputProps={{
                    endAdornment: <InputAdornment position='start' >{currency}</InputAdornment>,
                  }}
                />

                <TextField
                  label="ROE"
                  value={roe}
                  onChange={(event) => handleInput(event.target.value, setRoe, 'roe')}
                  InputProps={{
                    endAdornment: <InputAdornment position='start' >%</InputAdornment>,
                  }}
                />

                <TextField
                  label="ROA"
                  value={roa}
                  onChange={(event) => handleInput(event.target.value, setRoa, 'roa')}
                  InputProps={{
                    endAdornment: <InputAdornment position='start' >%</InputAdornment>,
                  }}
                />

                <TextField
                  label="Debt/Equity "
                  value={debt}
                  onChange={(event) => handleInput(event.target.value, setDebt, 'debt')}
                  InputProps={{
                    endAdornment: <InputAdornment position='start' >%</InputAdornment>,
                  }}
                />

                <TextField
                  label="Net Profit Margin"
                  value={profit}
                  onChange={(event) => handleInput(event.target.value, setProfit, 'profit')}
                  InputProps={{
                    endAdornment: <InputAdornment position='start' >%</InputAdornment>,
                  }}
                />

                <Button
                  type='submit'
                  variant="contained"
                  onClick={(_) => props.getResponse()}
                  endIcon={<SendIcon />}
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
