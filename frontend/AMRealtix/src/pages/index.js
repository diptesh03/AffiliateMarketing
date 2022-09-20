import {
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';
import BaseLayout from 'src/common/layouts/BaseLayout';

import Link from "next/link"

//import Link from 'src/common/components/Link';
import Head from 'next/head';
import Logo from 'src/common/components/LogoSign';

/* components */
import 'i18n.js'
import { useTranslation } from "react-i18next";

const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2|3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);


function Overview(props) {

  const { t } = useTranslation();


  return (
    <OverviewWrapper>
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
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};

Overview.ignoreAuth = true;

