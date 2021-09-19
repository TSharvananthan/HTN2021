import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const getSentimentProps = sentiment => {
  const percent = Math.round(sentiment * 100);
  if (percent >= 60) {
    return {
      icon: <SentimentVerySatisfiedIcon />,
      color: 'success',
      label: percent,
    };
  } else if (percent >= 40 && percent < 60) {
    return {
      icon: <SentimentSatisfiedIcon />,
      color: 'warning',
      label: percent,
    };
  } else {
    return {
      icon: <SentimentVeryDissatisfiedIcon />,
      color: 'error',
      label: percent,
    };
  }
};

const BootstrapDialogTitle = props => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
};

export default function ReviewDialog({ open, setOpen, review }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {open && review && (
        <BootstrapDialog onClose={handleClose} open={open}>
          <BootstrapDialogTitle onClose={handleClose}>
            Review: <strong>{review.business.name}</strong>
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography variant='body1' gutterBottom>
              "{review.text}"
            </Typography>
            <br/>
            <Typography variant='subtitle1' color='GrayText.secondary' gutterBottom>
              <strong>{review.date}</strong>
            </Typography>
            <Chip {...getSentimentProps(review.sentiment)} />
            <br />
            <Rating name={`{row.id}-rating`} value={review.stars} readOnly />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      )}
    </div>
  );
}
