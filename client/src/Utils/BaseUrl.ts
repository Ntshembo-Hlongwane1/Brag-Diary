// import { config } from 'dotenv';
// config();
enum BaseURL {
  dev = 'http://localhost:5000',
  prod = '',
}

export const url =
  process.env.NODE_ENV === 'production' ? BaseURL.prod : BaseURL.dev;
