import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, InputLabel, Stack, LinearProgress, Input } from '@mui/material';

import AnimateButton from 'components/@extended/AnimateButton';
import config from 'configs/index';
import * as userServices from 'services/userServices';

// ============================|| FIREBASE - REGISTER ||============================ //

const EditUser = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const profileApi = async () => {
            const result = await userServices.getUserProfile(id);
            setUser(result.resultObj);
        };
        profileApi();
    }, []);

    const putUser = async (data) => {
        const result = await userServices.putUser(data);
    };

    const handleChange = (e) => {
        e.preventDefault();
        const newUser = { ...user };
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const variable = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            dob: user.dob,
            email: user.email,
            phoneNumber: user.phoneNumber
        };
        putUser(variable);
        const timeOut = setTimeout(() => {
            clearTimeout(timeOut);
            navigate(config.routes.user);
        }, 1000);
    };

    return (
        <>
            <form noValidate onSubmit={(e) => onSubmit(e)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                            <Input
                                name="firstName"
                                value={user?.firstName ? user?.firstName : ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            ></Input>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <Input
                                name="lastName"
                                value={user?.lastName ? user?.lastName : ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            ></Input>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="email">Emal</InputLabel>
                            <Input
                                name="email"
                                value={user?.email ? user?.email : ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            ></Input>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="dob">Date of birth</InputLabel>
                            <Input
                                type="datetime-local"
                                name="dob"
                                value={user?.dob ? user?.dob : ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            ></Input>
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="phoneNumber">PhoneNumber</InputLabel>
                            <Input
                                name="phoneNumber"
                                type="number"
                                value={user?.phoneNumber ? user?.phoneNumber : ''}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            ></Input>
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        {loading ? (
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>
                        ) : (
                            <AnimateButton>
                                <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                                    Save
                                </Button>
                            </AnimateButton>
                        )}
                    </Grid>
                    <Grid item xs={12}></Grid>
                </Grid>
            </form>
        </>
    );
};

export default EditUser;
