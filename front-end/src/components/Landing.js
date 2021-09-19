import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import useSearchReviews from '../hooks/useSearchReviews';
import SearchResults from './SearchResults';
import { Link } from 'react-router-dom';

function Landing() {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const searchOptions = {
    enabled: !!name,
    onSuccess: data => {
      setTotal(data.pagination.total);
    },
  };
  const { data, status } = useSearchReviews(
    { businessName: name, page, pageSize: 10 },
    searchOptions
  );

  return (
    <Container component='main' sx={{ mt: 8, mb: 2 }} maxWidth='lg'>
      <Typography variant='h2' component='h1' gutterBottom>
        Sentimentality
      </Typography>
      <Typography variant='h6' component='h2' gutterBottom>
        Simplifying customer reviews so you can find the <strong>best businesses</strong>,{' '}
        <strong>save money</strong>, and get <strong>instant feedback</strong>. <br />
        <Link to='/test'>Test it yourself</Link> or search for existing reviews below
      </Typography>

      <Grid container justify='center' spacing={2} alignItems='center'>
        <Grid item xs={12} md={6}>
          <TextField
            label='Business name'
            variant='filled'
            margin='dense'
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <SearchResults
            status={status}
            data={data}
            page={page}
            total={total}
            onPageChange={newPage => newPage > 0 && setPage(newPage)}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Landing;
