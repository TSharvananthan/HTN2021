import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ReviewDialog from './ReviewDialog';
import { createTheme, lighten } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const defaultTheme = createTheme();

const useStyles = makeStyles(
  theme => {
    const getBackgroundColor = color => lighten(color, 0.6);
    const getHoverBackgroundColor = color => lighten(color, 0.5);

    return {
      root: {
        '& .data-grid-row--error': {
          backgroundColor: getBackgroundColor(theme.palette.error.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
          },
        },
        '& .data-grid-row--warning': {
          backgroundColor: getBackgroundColor(theme.palette.warning.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(theme.palette.warning.main),
          },
        },
        '& .data-grid-row--success': {
          backgroundColor: getBackgroundColor(theme.palette.success.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(theme.palette.success.main),
          },
        },
      },
    };
  },
  { defaultTheme }
);

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

function SearchResults({ status, data, page, onPageChange, total }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dialogReview, setDialogReview] = useState(null);

  useEffect(() => {
    if (!open) {
      setDialogReview(null);
    }
  }, [open]);

  const columns = [
    { field: 'text', headerName: 'Review', flex: 4 },
    { field: 'date', headerName: 'Date', flex: 2 },
    {
      field: 'rating',
      headerName: 'Rating',
      flex: 1,
      renderCell: params => <Rating name={`{row.id}-rating`} value={params.row.stars} readOnly />,
    },
    {
      field: 'sentiment',
      headerName: 'Sentiment',
      flex: 1,
      renderCell: params => <Chip size='small' {...getSentimentProps(params.row.sentiment)} />,
    },
  ];

  const prepareRow = r => {
    const row = { ...r };
    row.id = row._id;
    delete row._id;
    return row;
  };

  const renderReviews = () => (
    <DataGrid
      rows={data?.reviews?.map(prepareRow) || []}
      onRowClick={params => {
        setDialogReview(params.row);
        setOpen(true);
      }}
      getRowClassName={params => {
        const { color } = getSentimentProps(params.row.sentiment);
        return `data-grid-row--${color}`;
      }}
      autoHeight
      loading={status === 'loading'}
      rowsPerPageOptions={[10]}
      paginationMode='server'
      rowCount={total}
      columns={columns}
      disableColumnMenu
      disableColumnReorder
      disableColumnFilter
      disableColumnSelector
      disableColumnResize
      disableDensitySelector
      disableSelectionOnClick
      hideFooterSelectedRowCount
      pagination
      page={page}
      pageSize={10}
      onPageChange={onPageChange}
    />
  );

  return (
    <div className={classes.root}>
      {renderReviews()}
      <ReviewDialog open={open} setOpen={setOpen} review={dialogReview} />
    </div>
  );
}

export default SearchResults;
