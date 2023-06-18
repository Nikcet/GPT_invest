import { Container, Box, CircularProgress, Typography, Card, CardContent } from '@mui/material';

interface IProps {
    response: string | undefined
}

function Output(props: IProps) {

    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',
                width: '100%',
            }}>
                <Card>
                    <CardContent>
                        {
                            props.response ? <Typography>{props.response}</Typography> : <CircularProgress />
                        }
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default Output;
