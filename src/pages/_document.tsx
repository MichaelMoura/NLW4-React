import Document, {Html,Head,Main,NextScript} from 'next/document';
//no document podemos colocar coisas que são globais
export default class MyDocument extends Document{
    render(){
        return (
            <Html>
                <Head>
                <link rel="shortcut icon" href="/favicon.png" type="image/png"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet"/>
                </Head>
                <body>kkkkb
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}