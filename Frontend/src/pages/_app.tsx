import Theme from '../styles/theme';
import Header from '../components/Header/Header'
import axios from 'axios';

function MyApp({ Component, pageProps }) {
  
  return (
    <>
      <Theme>        
        <Component {...pageProps} />
      </Theme>
    </>
  );

}

export default MyApp
