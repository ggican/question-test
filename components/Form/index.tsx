'use client';

import React from 'react';
import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormElementProps } from '@/context/MyContext';
import FormElement from './FormElement';

const Form: React.FC<FormElementProps> = (props) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {},
  });

  return (
    <form onSubmit={form.onSubmit((values) => props.onSubmitValue(values))}>
      <h2>{props.question}</h2>
      <FormElement {...props} form={form} />
      <Button ref={props?.refButtonSubmit} display="none" type="submit" mt="sm">
        Submit
      </Button>
    </form>
  );
};

export default Form;
