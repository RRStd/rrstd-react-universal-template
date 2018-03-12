import path from 'path';

import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import Html from './components/Html';
// import App from './components/App';
import routes from './routes';
import createStore from './redux/store/createStore';
import {
  actionCreators as regionActionCreators,
} from './redux/reducers/regions';


// const port = 3113;
const port = 3000;
// const basePath = './';
const basePath = process.cwd();
// const outDir = path.resolve(basePath, 'dist/server/static');
const outDir = path.resolve(basePath, 'static');
const publicPath = '/fe-static';


const app = express();
// app.use(express.static(path.resolve(basePath, outDir)));
app.use(publicPath, express.static(outDir));


const data = {
  title: 'Каталог',
  description: 'Пример вёрстки каталога',
  style: `${ publicPath }/styles/main.css`,
  scripts: [
    // '/client.bundle.js',
    `${ publicPath }/manifest.js`,
    `${ publicPath }/normalize.js`,
    `${ publicPath }/vendor.js`,
    `${ publicPath }/main.js`,
  ],
};

// function renderPage(store, reqPath, router) {
//   console.log('server +');
//   const clientApp =
//     (<App store={store} routes={router} location={reqPath} />);
//   console.log('server ++');
//   data.children = ReactDOM.renderToString(clientApp);
//   console.log('server +++');
//   data.state = store.getState();
//   const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
//   console.log('server +++++');
//   return html;
// }

app.use( (req, res, next) => {
  // console.log('req', req);
  // console.log('req.path:', req.path);
  // console.log('req.url:', req.url);
  const store = createStore({ location: req.path });
  Promise.all([
    store.dispatch(regionActionCreators.getRegions()),
    store.dispatch(regionActionCreators.getCurrentRegion()),
  ])
  .then(() => {
    // console.log('match', req.url);
    match({ routes: routes(store), location: req.url }, (err, redirect, props) => {
      // in here we can make some decisions all at once
      if(err) {
        // there was an error somewhere during route matching
        res.status(500).send(err.message);
      } else if(redirect) {
        // we haven't talked about `onEnter` hooks on routes, but before a
        // route is entered, it can redirect. Here we handle on the server.
        res.redirect(redirect.pathname + redirect.search);
      } else if(props) {
        // if we got props then we matched a route and can render
        // const appHtml = renderToString(<RouterContext {...props}/>)
        // res.send(renderPage(appHtml))
        // const html = renderPage(store, req.path, (
        //   <RouterContext {...props} />
        // ));
        console.log('server +');
        // const routerContext = ( <RouterContext {...props} /> );
        // console.log('server ++');
        // const clientApp = (
        //   <App store={store} routes={routerContext} location={req.path} />
        // );
        const clientApp = (
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>
        );
        // console.log('server +++');
        data.children = ReactDOM.renderToString(clientApp);
        // console.log('server ++++');
        data.state = store.getState();
        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

        // console.log('html');
        // console.log(html);
        res.send(html);
        // next();
      } else {
        // no errors, no redirect, we just didn't match anything
        // res.status(404).send('Not Found')
        next(err);
      }
    });
  })
  .catch( (err, ...rest) => {
    console.log('catch', err, ...rest);
    next(err);
  });

/*
  Promise.all([
    store.dispatch(regionActionCreators.getRegions()),
    store.dispatch(regionActionCreators.getCurrentRegion()),
  ])
  .then(() => {
    const html = renderPage(store, req.path);
    res.send(html);
    next();
  })
  .catch( (err, ...rest) => {
    console.log('catch', err, ...rest);
    next(err);
  });
*/
});

app.listen(port, () => {
  console.log('basePath:', basePath);
  console.log('outDir:', outDir);
  console.log(`Server is running at http://localhost:${ port }`);
});


module.exports = app;
