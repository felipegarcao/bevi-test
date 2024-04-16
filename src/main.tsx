import ReactDOM from 'react-dom/client'
import Routes from './main/routes/index.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './infra/redux-store/store.ts';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './globals.scss'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes />
    </Provider>
    <ToastContainer limit={1} pauseOnFocusLoss={false} toastStyle={{
      fontSize: 14
    }}  />
  </BrowserRouter>
)
