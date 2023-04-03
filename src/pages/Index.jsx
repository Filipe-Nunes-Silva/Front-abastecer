import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { publicApi, api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Index() {
    const navigate = useNavigate();

    const goToVehicles = () => {
        navigate('/vehicles');
    };

    const goToFueling = () => {
        navigate('/fuelings');
    };

    const goToUsers = () => {
        navigate('/users');
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>

                <Grid
                    container
                    spacing={2}
                    columns={{ xs: 6, sm: 6, md: 12 }}
                    alignItems="center"
                    sx={{ marginTop: '20px' }}
                >

                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Card
                            sx={{ maxWidth: 345, width: '100%', cursor: 'pointer' }}
                            onClick={goToVehicles}

                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`${publicApi}/images/cars.png`}
                                    alt="Vehicles"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Veículos
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Gerenciar veículos.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Card
                            sx={{ maxWidth: 345, width: '100%', cursor: 'pointer' }}
                            onClick={goToFueling}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`${publicApi}/images/fueling.jpg`}
                                    alt="Cars"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Abastecimentos
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Gerenciar abastecimentos.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Card
                            sx={{ maxWidth: 345, width: '100%', cursor: 'pointer' }}
                            onClick={goToUsers}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`${publicApi}/images/user.jpg`}
                                    alt="Cars"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Usúarios
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Gerenciar usúarios.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                </Grid>
            </Box>
        </>
    );
}