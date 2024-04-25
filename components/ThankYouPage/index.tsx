import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import classes from './ThankYouPage.module.css';

export function ThankYouPage() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>Thank you for taking the entrance exam</Title>
          <Text c="dimmed" mt="md">
            We hope you can solve all questions correctly and well and for the next step if you
            success with this exam :
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Live Code With Front End Team</b> – live code with user on google meet and react
              online editor
            </List.Item>
            <List.Item>
              <b>Live Code With Lead Front End</b> – live code with user on google meet and react
              online editor
            </List.Item>
            <List.Item>
              <b>Medical Check Up</b> – you need to medical check up for check your body health
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Continue
            </Button>
            <Button variant="default" radius="xl" size="md" className={classes.control}>
              Detail Our Company
            </Button>
          </Group>
        </div>
        <Image
          src="https://ui.mantine.dev/_next/static/media/image.9a65bd94.svg"
          className={classes.image}
        />
      </div>
    </Container>
  );
}
