"use client";

import { useEffect } from "react";

const CONFIG = {
  googleAnalyticsIds: ["G-XVLEDXG07G"], 
  metaPixelId: "1508937903891015", 
};

// Initialize Meta Pixel synchronously so window.fbq is available immediately for other components
if (typeof window !== "undefined" && !window.fbq) {
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  if(s && s.parentNode){s.parentNode.insertBefore(t,s)}else{document.head.appendChild(t)}}
  (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
  
  window.fbq('init', CONFIG.metaPixelId);
  window.fbq('track', 'PageView');
}

export default function ThirdPartyScripts() {
  useEffect(() => {
    // 1. Initialize Google Analytics
    if (CONFIG.googleAnalyticsIds.length > 0 && !window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(){window.dataLayer.push(arguments);}
      window.gtag('js', new Date());
      CONFIG.googleAnalyticsIds.forEach(id => {
        window.gtag('config', id);
      });

      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.googleAnalyticsIds[0]}`;
      document.head.appendChild(gaScript);
    }
  }, []);

  if (!CONFIG.metaPixelId) return null;

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${CONFIG.metaPixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
