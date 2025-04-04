import { Response } from 'express';

export const sendSuccess = (res: Response, data: any, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
  });
};

export const sendError = (res: Response, message: string, details?: any, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    error: message,
    details,
  });
};
