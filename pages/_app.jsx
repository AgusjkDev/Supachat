import App from "next/app";

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

MyApp.getInitialProps = async appContext => {
    const appProps = await App.getInitialProps(appContext);

    if (appContext.ctx.res?.statusCode === 404) {
        appContext.ctx.res.writeHead(301, { Location: "/" });
        appContext.ctx.res.end();

        return;
    }

    return { ...appProps };
};
