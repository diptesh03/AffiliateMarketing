import {
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';
import BaseLayout from 'src/common/layouts/BaseLayout';

//import Link from 'src/common/components/Link';
import Head from 'next/head';
import Logo from 'src/common/components/LogoSign';

/* components */
import Login  from 'src/modules/_auth/component/login/Login';
import 'i18n.js'
import { useTranslation } from "react-i18next";

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const LoginWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);


function Index(props) {

  const { t } = useTranslation();
  console.log(process.env.NEXT_PUBLIC_REACT_APP_API_URL)


  return (
    <LoginWrapper>
      <Head>
        <title>AMRealtix</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
              <Box>
              
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Login/>
    </LoginWrapper>
  );
}

export default Index;

Index.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};

Index.isLogin = true;
