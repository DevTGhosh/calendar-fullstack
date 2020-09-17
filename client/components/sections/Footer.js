import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const StickyFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  padding: 1rem;
  background-color: #f7fafc;
  margin-top: auto;
`;

const Footer = () => (
  <StickyFooter>
    <Grid container justify={'center'} spacing={2}>
      <Grid item>
        <Typography align={'center'} gutterBottom color={'textSecondary'}>
          Created by Devjyoti Ghosh © Copyright 2020
        </Typography>
      </Grid>
    </Grid>
  </StickyFooter>
);

export default Footer;
