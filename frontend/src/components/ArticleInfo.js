import React from 'react';
import { Button } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const ArticleInfo = (props) => {
  const theme = createTheme({
    palette: {
      veriperi: {
        main: '#6667AB',
        contrastText: '#fff',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {props.title}
        </Grid>
        <Grid item xs={3}>
          {props.publisher}
        </Grid>
        <Grid item xs={3}>
          <Link to={`/article/${props.id}`} style={{ textDecoration: 'none' }}>
            <Button
              variant='text'
              color='veriperi'
              endIcon={<LoginOutlinedIcon />}>
              입장하기
            </Button>
          </Link>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ArticleInfo;
