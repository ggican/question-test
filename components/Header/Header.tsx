'use client';

import {
  Container,
  useMantineColorScheme,
  Switch,
  useMantineTheme,
  rem,
  Button,
  Title,
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useContext } from 'react';
import classes from './Header.module.css';
import { MyContext } from '@/context/MyContext';

const Header = () => {
  const theme = useMantineTheme();
  const { setColorScheme } = useMantineColorScheme();
  const { isLogin, refButtonSubmit, isSubmitDone, isLoading }: any = useContext(MyContext);

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <MantineLogo size={28} />
        <Title order={3}>{!isSubmitDone ? 'Next Js Question Test' : 'Thank you very much'}</Title>
        {!isLoading && (
          <>
            {isLogin && !isSubmitDone && (
              <Button
                style={{ marginRight: 10 }}
                onClick={() => {
                  refButtonSubmit.current.click();
                }}
              >
                Submit
              </Button>
            )}
          </>
        )}

        <div className={classes.stickyButton}>
          <Switch
            size="md"
            defaultChecked={localStorage?.getItem('mantine-color-scheme-value') === 'dark'}
            color="dark.4"
            onLabel={sunIcon}
            offLabel={moonIcon}
            onChange={(event) => setColorScheme(!event.currentTarget.checked ? 'light' : 'dark')}
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
