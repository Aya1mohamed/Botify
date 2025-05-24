import * as yup from 'yup';

export const CreateChatbotSchema = () =>
  yup.object({
    name: yup.string().required('Name is required'),
    documents: yup.array().of(yup.string()).required('Documents are required').min(1, 'At least one document is required'),
  });