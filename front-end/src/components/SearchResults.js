import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ReviewDialog from './ReviewDialog';
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
      rows={status !== 'success' ? [] : data.reviews.map(prepareRow)}
      onRowClick={params => {
        setDialogReview(params.row);
        setOpen(true);
      }}
      autoHeight
      loading={status === 'loading'}
      rowsPerPageOptions={[20]}
      paginationMode='server'
      rowCount={total}
      columns={columns}
      disableColumnMenu
      disableColumnReorder
      disableColumnFilter
      disableColumnSelector
      disableColumnResize
      disableDensitySelector
      hideFooterSelectedRowCount
      pagination
      page={page}
      pageSize={20}
      onPageChange={onPageChange}
    />
  );

  return (
    <div>
      {status === 'success' && renderReviews()}
      <ReviewDialog open={open} setOpen={setOpen} review={dialogReview} />
    </div>
  );
}

export default SearchResults;
