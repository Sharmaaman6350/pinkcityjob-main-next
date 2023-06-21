import { AppProps } from "next/app";
import Head from "next/head";
import "@/style/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.css"
import 'react-toastify/dist/ReactToastify.css';
import Script from "next/script";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";


export default function App({ Component, pageProps }: AppProps) {

    return <>
        <Head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="google-site-verification" content="90Jw8rBOqaKqA1LtxlW3brdieliuimLsa4MqTsRvDcw" />
            <link rel="icon" href="/favicon.png" />
        </Head>
        <Header/>
        <Component {...pageProps}/>
        <Footer/>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/js/bootstrap.min.js" />
    </>
}