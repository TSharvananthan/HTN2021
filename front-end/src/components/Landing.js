import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import useSearchReviews from '../hooks/useSearchReviews';
import SearchResults from './SearchResults';

function Landing() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState(undefined);

  const searchOptions = {
    enabled: !!name,
    onSuccess: data => {
      console.log(data);
    },
  };
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    refetch: searchReviews,
  } = useSearchReviews({ name, location }, searchOptions);

  return (
    <Container component='main' sx={{ mt: 8, mb: 2, bg: '' }} maxWidth='md'>
      <Typography variant='h2' component='h1' gutterBottom>
        Find reviews with AI
      </Typography>
      <Typography variant='h6' component='h2' gutterBottom>
        Simplifying customer reviews so you can find the <strong>best businesses</strong>,{' '}
        <strong>save money</strong>, and get <strong>instant feedback</strong>...
      </Typography>

      <Box
        component='form'
        sx={{
          '& > :not(style)': { mt: 1.5, mb: 1.5 },
        }}
      >
        <TextField
          label='Business name'
          variant='filled'
          margin='dense'
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <TextField
          label='City'
          variant='filled'
          fullWidth
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </Box>
      <Button
        variant='contained'
        disableElevation
        color='primary'
        size='large'
        onClick={() => {
          searchReviews();
        }}
      >
        Search
      </Button>
      <SearchResults isLoading={isLoading} isError={isError} isSuccess={isSuccess} reviews={data} />
    </Container>
  );
}

export default Landing;
