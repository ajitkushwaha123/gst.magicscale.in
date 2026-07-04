"use client";

import { useEffect } from "react";

export default function ThirdPartyScripts() {
  useEffect(() => {
    let scriptsLoaded = false;

    const loadScripts = () => {
      if (scriptsLoaded) return;
      scriptsLoaded = true;

      // Remove event listeners
      triggerEvents.forEach((event) => {
        window.removeEventListener(event, loadScripts);
      });

      // 1. Initialize Microsoft Clarity
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "u1zyl05z4t");

      // 2. Initialize Google Analytics
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-DDZXQ7G4VW";
      document.head.appendChild(gaScript);

      const gaInline = document.createElement("script");
      gaInline.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-DDZXQ7G4VW');
      `;
      document.head.appendChild(gaInline);

      // 3. Initialize Meta Pixel
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

      fbq('init', '1674228269954185');
      fbq('init', '1405355924591294');
      fbq('track', 'PageView');
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

  return null;
}
