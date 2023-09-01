import Script from 'next/script'
 
function ScriptGoogle() {
  return (
    <div className="container">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-KKC29V6GZK" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-KKC29V6GZK');
        `}
      </Script>
    </div>
  )
}
 
export default ScriptGoogle