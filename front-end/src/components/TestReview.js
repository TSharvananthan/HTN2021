import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router';
import useTestReview from '../hooks/useTestReview';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

const getSentimentProps = sentiment => {
  if (!sentiment) return {};
  const percent = Math.round(sentiment * 100);
  if (percent >= 60) {
    return {
      icon: <SentimentVerySatisfiedIcon />,
      color: 'success',
      label: `${percent}%`,
      desc: 'Very Satisfied',
    };
  } else if (percent >= 40 && percent < 60) {
    return {
      icon: <SentimentSatisfiedIcon />,
      color: 'warning',
      label: `${percent}%`,
      desc: 'Satisfied',
    };
  } else {
    return {
      icon: <SentimentVeryDissatisfiedIcon />,
      color: 'error',
      label: `${percent}%`,
      desc: 'Not Satisfied',
    };
  }
};

function TestReview() {
  const history = useHistory();
  const [review, setName] = useState('');
  const [sentiment, setSentiment] = useState(null);

  const apiOptions = {
    enabled: false,
    onSuccess: data => setSentiment(data.sentiment),
  };

  const { status, refetch: processReview } = useTestReview(review, apiOptions);

  const onSubmit = () => {
    processReview();
  };

  const sentimentProps = getSentimentProps(sentiment);

  return (
    <Container component='main' sx={{ mt: 8, mb: 2 }} maxWidth='lg'>
      <Typography variant='h2' component='h1' gutterBottom>
        <IconButton onClick={() => history.push('/')} size='large'>
          <ArrowBackIcon />
        </IconButton>
        {'   '} Sentimentality
      </Typography>
      <Typography variant='h6' component='h2' gutterBottom>
        Type in your own review and let our model analyse the sentiment
      </Typography>

      <Grid container justify='center' spacing={2} alignItems='center'>
        <Grid item xs={12}>
          <TextField
            label='Review comment'
            multiline
            minRows={5}
            maxRows={10}
            variant='filled'
            margin='dense'
            fullWidth
            value={review}
            onChange={e => setName(e.target.value)}
            error={review !== '' && review.length < 50}
            helperText={
              review !== '' && review.length < 50
                ? 'Review needs to be at least 100 characters'
                : ''
            }
            required
          />
        </Grid>
        <Grid item>
          <Button
            size='large'
            fullWidth
            variant='text'
            color='primary'
            disabled={review.length < 50}
            onClick={onSubmit}
          >
            Analyse Sentiment
          </Button>
        </Grid>
        {status === 'success' && sentiment && (
          <Grid item xs={12}>
            <Paper
              variant='outlined'
              square
              sx={{ p: 2, bgcolor: `${sentimentProps.color}.main`, color: '#fff' }}
            >
              <Chip {...sentimentProps} />
              <Typography variant='button'>
                <strong>{sentimentProps.desc}</strong>
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default TestReview;
