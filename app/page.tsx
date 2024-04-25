'use client';

import { Container, Grid, LoadingOverlay } from '@mantine/core';
import { useContext } from 'react';
import { MyContext } from '@/context/MyContext';
import PersonalDetails, { ISearchParams } from '../components/PersonalDetails';
import { ThankYouPage } from '../components/ThankYouPage';
import Form from '@/components/Form';

const HomePage = ({ searchParams }: ISearchParams) => {
  const {
    question,
    total,
    isLogin,
    isLoading,
    refButtonSubmit,
    onSubmitValue,
    isLoadingSubmit,
    isSubmitDone,
  }: any = useContext(MyContext);
  return isSubmitDone ? (
    <ThankYouPage></ThankYouPage>
  ) : (
    <Container pos="relative" style={{ minHeight: 'calc(100vh - 150px)' }}>
      {(isLoading || isLoadingSubmit) && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
          <LoadingOverlay visible overlayProps={{ blur: 1 }} />
        </div>
      )}
      {!isLoading && (
        <Grid justify="center">
          <Grid.Col span={8}>
            {isLogin ? (
              <>
                <div>{`Question ${question?.no} / ${total}`}</div>
                <Form
                  onSubmitValue={onSubmitValue}
                  refButtonSubmit={refButtonSubmit}
                  {...question}
                >
                </Form>
              </>
            ) : (
                <PersonalDetails searchParams={searchParams}></PersonalDetails>
            )}
          </Grid.Col>
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;
