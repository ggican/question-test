'use client';

import { useForm } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';
import { useContext } from 'react';
import { ILoginForm, MyContext } from '@/context/MyContext';

export type ISearchParams = {
  searchParams: {
    id: string;
    token: string;
  };
};
const PersonalDetails = ({ searchParams }: ISearchParams) => {
  const { id, token } = searchParams;
  const { refButtonLogin, onSubmitLogin }: any = useContext(MyContext);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '', company_name: '' },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      company_name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const handleSubmit = async (values: ILoginForm) => {
    onSubmitLogin({ ...values, token, id });
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        label="Name"
        placeholder="Name"
        key={form.key('name')}
        withAsterisk
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="sm"
        label="Email"
        placeholder="Email"
        key={form.key('email')}
        withAsterisk
        {...form.getInputProps('email')}
      />{' '}
      <TextInput
        mt="sm"
        label="Company Name"
        placeholder="Company Name"
        key={form.key('company_name')}
        withAsterisk
        {...form.getInputProps('company_name')}
      />
      <Button ref={refButtonLogin} style={{ display: 'none' }} type="submit" mt="xl" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default PersonalDetails;
