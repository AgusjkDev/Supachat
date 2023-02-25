export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

MyApp.getInitialProps = async appContext => {
    const { res } = appContext.ctx;

    if (!res || res.statusCode !== 404) return;

    appContext.ctx.res.writeHead(301, { Location: "/" });
    appContext.ctx.res.end();
};
