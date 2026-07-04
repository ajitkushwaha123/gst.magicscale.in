"use client";

import { useEffect } from "react";

// Easily manage multiple tracking IDs here
const CONFIG = {
  googleAnalyticsIds: ["G-XVLEDXG07G"], // You can add multiple GA IDs here in the future
  metaPixelIds: ["1223249586587487"], // Add or remove Meta Pixel IDs here
};

export default function ThirdPartyScripts() {
  useEffect(() => {
    let scriptsLoaded = false;

    const loadScripts = () => {
      if (scriptsLoaded) return;
      scriptsLoaded = true;

      // Remove event listeners once loaded
      triggerEvents.forEach((event) => {
        window.removeEventListener(event, loadScripts);
      });

      // 1. Initialize Google Analytics dynamically
      if (CONFIG.googleAnalyticsIds.length > 0) {
        // Load the main gtag script using the first ID
        const gaScript = document.createElement("script");
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.googleAnalyticsIds[0]}`;
        document.head.appendChild(gaScript);

        // Initialize dataLayer and configure all IDs
        const gaInline = document.createElement("script");
        let configString = "";
        CONFIG.googleAnalyticsIds.forEach(id => {
          configString += `gtag('config', '${id}');\n`;
        });

        gaInline.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${configString}
        `;
        document.head.appendChild(gaInline);
      }

      // 2. Initialize Meta Pixels dynamically
      if (CONFIG.metaPixelIds.length > 0) {
        (function(f,b,e,v,n,t,s) {
          if(f.fbq) return;
          n=f.fbq=function(){
            n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments);
          };
          if(!f._fbq) f._fbq=n;
          n.push=n;
          n.loaded=!0;
          n.version='2.0';
          n.queue=[];
          t=b.createElement(e);
          t.async=!0;
          t.src=v;
          s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s);
        })(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js');

        CONFIG.metaPixelIds.forEach(id => {
          window.fbq('init', id);
        });
        window.fbq('track', 'PageView');
      }
    };

    const triggerEvents = ["mouseover", "keydown", "touchstart", "scroll"];

    triggerEvents.forEach((event) => {
      window.addEventListener(event, loadScripts, { passive: true });
    });

    return () => {
      triggerEvents.forEach((event) => {
        window.removeEventListener(event, loadScripts);
      });
    };
  }, []);

  if (CONFIG.metaPixelIds.length === 0) return null;

  return (
    <noscript>
      {CONFIG.metaPixelIds.map((id) => (
        <img
          key={id}
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
          alt=""
        />
      ))}
    </noscript>
  );
}
