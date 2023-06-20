import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    TextField,
    Card,
    CardContent,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { VisibilityIcon } from '../../Icons/visibilityIcon';
import { VisibilityOffIcon } from '../../Icons/visibilityOffIcon';

interface IProps {
    handleKey: (keyString: string) => void,
    apiKey: string | null,
}

function ApiInput(props: IProps) {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


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
                            value={props.apiKey ?? ''}
                            type={showPassword ? 'text' : 'password'}
                            onChange={(event) => props.handleKey(event.target.value)}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end" >
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                    </CardContent>
                </Card>
            </Box>
        </Container >
    );
}

export default ApiInput;
