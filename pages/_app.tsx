import '../styles/globals.css'
import { AppContext } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import zhTWLocale from "date-fns/locale/zh-TW";
import theme from '../jss/theme';

function MyApp({ Component, pageProps }) {

  return (
    <React.Fragment>
      <Head>
        <title>Smart Toilet</title>
        <link rel="stylesheet" href="/static/main.css" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_16x16.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhTWLocale}>
          <Component {...pageProps} />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps }
}

export default MyApp