import { object, string } from 'yup';

export const file = (allowedFileTypes: string[], message: string) =>
  object({
    name: string().required(),
    type: string().oneOf(allowedFileTypes, message).required(),
    uri: string().required()
  });
