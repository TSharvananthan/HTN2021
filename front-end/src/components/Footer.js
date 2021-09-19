import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary'>
      {'Sentimentality © '}
      <Link color='inherit'>
        Hack The North 2021
      </Link>
      {'.'}
    </Typography>
  );
}

const Footer = () => (
  <Box
    component='footer'
    sx={{
      py: 3,
      px: 2,
      mt: 'auto',
      backgroundColor: theme => theme.palette.grey[300],
    }}
  >
    <Container maxWidth='lg'>
      <Typography variant='body1'>AI powered review analysis</Typography>
      <Copyright />
    </Container>
  </Box>
);

export default Footer;