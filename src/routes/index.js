import CoreLayout from 'layouts/containers/CoreLayout';

import Home from './Home';
import News from './News';
import Article from './Article';
import NotFound from './NotFound';
import AboutRoute from './Home/routes/About';


const getDefaultChildRoutes = store => [
  Article(store),
  AboutRoute(store),
  NotFound(store),
];

const getDynamicChildRoutesMap = store => ({
  news: News(store),
});

export const createRoutes = store => ({
  path: '/',
  getComponent: (nextState, cb) => cb(null, CoreLayout),
  indexRoute: Home(store),
  getChildRoutes: (partialNextState, cb) => {
    // const modules = store.getState().app.get('availableModules').toJS();
    const modules = [ 'news' ];
    const dynamicChildRoutes = [];
    const dynamicChildRoutesMap = getDynamicChildRoutesMap(store);
    modules.forEach((moduleName) => {
      if(dynamicChildRoutesMap[moduleName]) {
        dynamicChildRoutes.push(dynamicChildRoutesMap[moduleName]);
      }
    });
    return cb(null, [ ...dynamicChildRoutes, ...getDefaultChildRoutes(store) ]);
  },
});

export default createRoutes;
