'use-strict';

import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  Application,
} from 'express';
import createError from 'http-errors';

import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

// ADMIN
import homeAdminRouter from './app/route.app.homeAdmin';

// APP
import appAccountRouter from './app/route.app.account';
import appSignInRouter from './app/route.app.signIn';
import appSiteRouter from './app/route.app.site';
import appProfileRouter from './app/route.app.profile';
import appPostRouter from './app/route.app.post';
import appCategoryRouter from './app/route.app.category';
import appLocationRouter from './app/route.app.location';
import appBookmarkRouter from './app/route.app.bookmark';
import appHistoryRouter from './app/route.app.history';
import themeRouter from './app/route.app.theme';
import bannerRouter from './app/route.app.banner';
import appApplicationRouter from './app/route.app.application';
import appSearchRouter from './app/route.app.search';
import appNotificationRouter from './app/route.app.notification';
import chatRouter from './app/route.app.chat';
import fcmRouter from './app/route.app.fcm-token';
import { checkLanguageParams } from '../middlewares/utils/midleware.checkLanguageParams';

const route = (app: Application) => {
  app.all('/', (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  //SWAGGER
  const swaggerOptions: Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Swagger API',
        version: '1.0.0',
        description: 'HiJobs App API',
      },
      servers: [
        {
          url: "https://neoworks.vn"
        },
        {
            url: "https://aiworks.vn",
        },
        {
          url: 'http://localhost:5000',
        },
      ],
    },
    apis: [
      `${__dirname}/../swagger/*.yaml`,
      `${__dirname}/../swagger/**/*.yaml`,
      `${__dirname}/../src/swagger/*.yaml`, // FOR NPM WEBPACK (DEBUG MODE)
      `${__dirname}/../src/swagger/**/*.yaml`, // FOR NPM WEBPACK (DEBUG MODE)
    ],
  };
  const swaggerDocs = swaggerJSDoc(swaggerOptions);

  app.use(checkLanguageParams);

  app.use('/api/v1/apis-doc', serve, setup(swaggerDocs));

  // ADMIN ROUTES
  app.use('/api/v1/home-admin', homeAdminRouter);

  // APP ROUTES
  app.use('/api/v1/sign-in', appSignInRouter); // SIGN IN
  app.use('/api/v1/accounts', appAccountRouter); // ACCOUNT
  app.use('/api/v1/profiles', appProfileRouter); // PROFILE
  app.use('/api/v1/posts', appPostRouter); // POST
  app.use('/api/v1/categories', appCategoryRouter); // CATEGORY
  app.use('/api/v1/locations', appLocationRouter); // LOCATION
  app.use('/api/v1/bookmarks', appBookmarkRouter); // BOOKMARK
  app.use('/api/v1/themes', themeRouter); // THEME
  app.use('/api/v1/banners', bannerRouter); // BANNER
  app.use('/api/v1/history', appHistoryRouter); // APPLICATION
  app.use('/api/v1/application', appApplicationRouter); // APPLICATION
  app.use('/api/v1/search', appSearchRouter); // SEARCH
  app.use('/api/v1/notification', appNotificationRouter); // NOTIFICATION
  app.use('/api/v1/chats', chatRouter); // CHAT
  app.use('/api/v1/fcm-token', fcmRouter); // FCM TOKEN
  app.use('/api/v1', appSiteRouter); // SITE

  // ERROR ROUTES
  app.use((req: Request, res: Response, next: NextFunction) => {
    return next(createError(404));
  });

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    return res.status(err.status || 500).json({
      code: err.status || 500,
      success: false,
      message: err.message,
    });
  };

  app.use(errorHandler);
};

export default route;
