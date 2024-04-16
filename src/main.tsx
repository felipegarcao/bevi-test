import 'react-toastify/dist/ReactToastify.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import ReactDOM from 'react-dom/client'
import Routes from './main/routes/index.tsx'

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux';
import { store } from './infra/redux-store/store.ts';
import { ToastContainer } from 'react-toastify';

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
