import { AuthProvider, ProtectRoute } from '../modules/_auth/context/auth-context'

import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from 'src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { SidebarProvider } from 'src/common/contexts/SidebarContext';

function TokyoApp(props) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  const isLogin = Component.isLogin || false;
  const ignoreAuth = Component.ignoreAuth || false;


  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <AuthProvider>
      <ProtectRoute isLogin={isLogin} ignoreAuth={ignoreAuth}> 
        <Head>
          <title></title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <SidebarProvider>
          <ThemeProvider>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </SidebarProvider>
      </ProtectRoute>
    </AuthProvider>
  );
}

export default TokyoApp;
