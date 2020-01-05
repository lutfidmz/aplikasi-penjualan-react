import React, { useState } from 'react'
// import komponen material-ui
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

// import styles
import useStyles from './styles'

// react router dom
import { Link, Redirect } from 'react-router-dom'

//import form validator
import isEmail from 'validator/lib/isEmail'

// firebase hook
import { useFirebase } from '../../componens/FirebaseProvider';

// app components
import AppLoading from '../../componens/AppLoading';
import { useSnackbar } from 'notistack'

function LupaPassword() {
    const classes = useStyles()

    const [form, setForm] = useState({
        email: ''
    })

    const [error, setError] = useState({
        email: ''
    })

    const [isSubmitting, setSubmitting] = useState(false)
    const { auth, user, loading } = useFirebase()

    const { enqueueSnackbar } = useSnackbar();

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

        setError({
            ...error,
            [e.target.name]: ''
        })
    }

    const validate = e => {
        const newError = { ...error }

        if (!form.email) {
            newError.email = 'Email wajib diisi'
        } else if (!isEmail(form.email)) {
            newError.email = 'Email tidak valid'
        }

        return newError
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const findErrors = validate()
        if (Object.values(findErrors).some(err => err !== '')) {
            setError(findErrors)
        } else {
            try {
                setSubmitting(true)
                const actionCodeSetting = {
                    url: `${document.location.origin}/login`
                }
                await auth.sendPasswordResetEmail(form.email, actionCodeSetting)
                enqueueSnackbar(`Cek email ${form.email} | sebuah tautan reset password sudah terkirim`, {
                    variant: 'success'
                })
                setSubmitting(false)
            } catch (e) {

                const newError = {}
                switch (e.code) {
                    case 'auth/user-not-found':
                        newError.email = 'Email tidak ditemukan'
                        break;
                    case 'auth/invalid-email':
                        newError.email = 'Email tidak valid'
                        break;
                    default:
                        newError.email = 'Terjadi kesalahan silahkan coba lagi'
                        break;
                }
                setError(newError)
                setSubmitting(false)
            }
        }
    }

    if (loading) {
        return <AppLoading />
    }
    if (user) {
        return <Redirect to="/" />
    }
    // console.log(user)
    return <Container maxWidth="xs" >
        <Paper className={classes.paper}>
            <Typography
                variant="h5"
                component="h1"
                className={classes.title}>Lupa Password</Typography>

            <form onSubmit={handleSubmit} noValidate>
                <TextField
                    id="email"
                    type="email"
                    name="email"
                    margin="normal"
                    label="Alamat Email"
                    fullWidth
                    required
                    value={form.email}
                    onChange={handleChange}
                    helperText={error.email}
                    error={error.email ? true : false}
                    disabled={isSubmitting}
                />

                <Grid container className={classes.buttons}>
                    <Grid item xs>
                        <Button type="submit"
                            color="primary"
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
                        >Kirim</Button>
                    </Grid>

                    <Grid item>
                        <Button
                            component={Link}
                            variant="contained"
                            size="large"
                            to="/login"
                            disabled={isSubmitting}
                        >Login</Button>
                    </Grid>
                </Grid>

            </form>
        </Paper>
    </Container>
}

export default LupaPassword