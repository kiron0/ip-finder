/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import AppError from '../errors/AppError';
import { TErrorSources } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
          let statusCode = 500;
          let message = 'Something went wrong!';
          let errorSources: TErrorSources = [
                    {
                              path: '',
                              message: 'Something went wrong',
                    },
          ];

          if (err instanceof AppError) {
                    statusCode = err?.statusCode;
                    message = err.message;
                    errorSources = [
                              {
                                        path: '',
                                        message: err?.message,
                              },
                    ];
          } else if (err instanceof Error) {
                    message = err.message;
                    errorSources = [
                              {
                                        path: '',
                                        message: err?.message,
                              },
                    ];
          }

          if (config.node_env === 'production') {
                    return res.status(statusCode).json({
                              success: false,
                              message,
                    });
          }

          return res.status(statusCode).json({
                    success: false,
                    message,
                    errorSources,
                    err,
                    stack: err?.stack,
          });
};

export default globalErrorHandler;