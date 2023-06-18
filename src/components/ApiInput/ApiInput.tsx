import { useEffect, useState } from 'react';
import {
    Box,
    Container,
    TextField,
    Card,
    CardContent,
} from '@mui/material';

interface IProps {
    handleKey: (keyString: string) => void,
    key: string,
}

function ApiInput(props: IProps) {

    // const [key, setKey] = useState<string | null>('');


    return (
        <Container
            sx={{ display: 'flex', flexDirection: 'column', m: '10px 0', gap: '20px' }}
        >
            <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flexWrap: 'wrap', }}
            >
                <Card>
                    <CardContent>
                        <TextField
                            fullWidth
                            label="Open AI API ключ"
                            value={props.key}
                            type="password"
                            onChange={(event) => props.handleKey(event.target.value)}
                        />

                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default ApiInput;
