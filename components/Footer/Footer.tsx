'use client';

import { Container, Group, Button } from '@mantine/core';
import { useContext } from 'react';
import classes from './Footer.module.css';
import { MyContext } from '@/context/MyContext';

const Footer = () => {
  const {
    total,
    orderNumber,
    handleNext,
    handlePrev,
    refButtonLogin,
    isLogin,
    isSubmitDone,
    isLoading,
  }: any = useContext(MyContext);
  const handleSubmitButton = () => {
    refButtonLogin?.current?.click();
  };
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group gap={10} visibleFrom="xs">
          {!isLoading && (
            <>
              {isLogin && !isSubmitDone && (
                <>
                  <Button disabled={orderNumber === 0} variant="light" onClick={handlePrev}>
                    Prev
                  </Button>
                  <Button disabled={orderNumber === total - 1} onClick={handleNext}>
                    Next
                  </Button>
                </>
              )}
              {!isLogin && !isSubmitDone && (
                <Button onClick={handleSubmitButton} className={classes.link}>
                  Start
                </Button>
              )}
            </>
          )}
        </Group>
      </Container>
    </div>
  );
};
export default Footer;
