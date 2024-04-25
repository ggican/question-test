'use client';

import React from 'react';
import { Flex, Grid, Image, Radio, Textarea } from '@mantine/core';
import { DataType, FormElementType } from '@/context/MyContext';

const FormElement: React.FC<DataType & FormElementType> = (props) => {
  const { form, no, response_type, choices, urlFile } = props;
  const listOption = (choices && choices?.split('|')) || [];
  switch (response_type) {
    case 'text':
      return (
        <Textarea
          required
          placeholder="I want to order your goods"
          minRows={4}
          mt="md"
          key={form.key(no)}
          {...form.getInputProps(no)}
        />
      );
    case 'fileChoice':
      return (
        <div>
          <Grid>
            <Grid.Col span={4}>
              <Image radius="md" h={200} w="auto" src={props?.urlFile} fit="contain" mb="lg" />
            </Grid.Col>
          </Grid>

          <Radio.Group key={form.key(no)} {...form.getInputProps(no)} withAsterisk>
            <Flex gap="sm" direction="column">
              {listOption?.map((item: string, key: number) => (
                <Radio key={`${item}-${key}`} value={item} onChange={() => {}} label={item} />
              ))}
            </Flex>
          </Radio.Group>
        </div>
      );
    case 'choice':
      return (
        <div>
          <Radio.Group key={form.key(no)} {...form.getInputProps(no)} withAsterisk>
            <Flex gap="sm" direction="column">
              {listOption?.map((item: string, key: number) => (
                <Radio key={`${item}-${key}`} value={item} onChange={() => {}} label={item} />
              ))}
            </Flex>
          </Radio.Group>
        </div>
      );
    case 'fileText':
      return (
        <div>
          <Grid>
            <Grid.Col span={4}>
              <Image radius="md" h={200} w="auto" src={urlFile} fit="contain" mb="lg" />
            </Grid.Col>
          </Grid>
          <Textarea
            key={form.key(no)}
            {...form.getInputProps(no)}
            required
            placeholder="I want to order your goods"
            minRows={4}
            mt="md"
          />
        </div>
      );

    default:
      return null; // Handle unknown response_type (optional)
  }
};
export default FormElement;
