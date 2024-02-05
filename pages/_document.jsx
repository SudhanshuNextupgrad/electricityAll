import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='app sidebar-mini'>
        <Main />
        <NextScript />
        <script src="js/jquery-3.4.0.min.js"></script>
        <script src="/js/popper.min.js"></script>
        <script src="/js/bootstrap.min.js"></script>
      </body>
    </Html>
  )
}
