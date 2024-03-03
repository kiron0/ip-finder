import moment from 'moment';
import catchAsync from '../../utils/catchAsync';

const getIP = catchAsync(async (req, res) => {
          const { format } = req.query;

          const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
          const date = moment().format('dddd, Do MMMM YYYY')

          if (format === 'json') {
                    res.type('application/json');
                    res.send({
                              ip,
                              requestedDate: date,
                    })
          } else if (format === 'html') {
                    res.type('text/html');
                    res.render('ip', {
                              ip,
                              date,
                    });
          } else if (format === 'text') {
                    res.type('text/plain');
                    res.send(ip);
          } else if (!format) {
                    res.type('text/html');
                    res.render('ip', {
                              ip,
                              date,
                    });
          } else if (format === 'xml') {
                    res.type('application/xml');
                    res.send(`<?xml version="1.0" encoding="UTF-8"?>
                    <ip>${ip}</ip>
                    <date>${date}</date>`);
          } else {
                    throw new Error('Invalid format');
          }
});

export const GetIPControllers = {
          getIP,
};