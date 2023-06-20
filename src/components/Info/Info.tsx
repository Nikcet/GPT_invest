import { Container, Typography, Card, CardContent, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Info() {

    return (
        <Container sx={{
            display: 'flex',
            height: '100%',
            marginTop: '10px',
        }}>
            <Stack sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Card>
                    <CardContent sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <ArrowBackIcon />
                        <Typography variant='h6'> Итоговый запрос к ChatGPT</Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography>Продолжая использовать это приложение, Вы подтверждаете, что всю ответственность вы, как пользователь, берете на себя. Бот используется лишь как рекомендательная система.</Typography>
                    </CardContent>
                </Card>
            </Stack>
        </Container>
    );
}

export default Info;
