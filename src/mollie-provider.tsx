import React, { createContext, useState, FC, useEffect } from "react";

export const MOLLIE_JS_URL = 'https://js.mollie.com/v1/mollie.js';
export const MOLLIE_JS_SCRIPT_ID = 'mollie-js-cdn-script';

export interface MollieConfig {
    profileId: string;
    options?: {
        locale: string;
        testmode: boolean;
    };
    isLoaded: boolean;
    mollieObject: any;
};
  
export const MollieComponentContext = createContext<MollieConfig>({
    profileId: '',
    options: {
      locale: '',
      testmode: false,
    },
    mollieObject: null,
    isLoaded: false,
  });

  type Props = {
    children: React.ReactNode;
  } & Pick<MollieConfig, 'profileId' | 'options'>;

  export const MollieComponentProvider: FC<Props> = ({ children, ...restProps }) => {
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [mollie, setMollie] = useState(null);

    useEffect(() => {
        let script = document
        .getElementById(MOLLIE_JS_SCRIPT_ID) as HTMLScriptElement;

        if (!script) {
          script = document.createElement("script");
          script.src = MOLLIE_JS_URL;
          script.setAttribute('id', MOLLIE_JS_SCRIPT_ID);
          script.async = true;
          script.onload = () => setIsLoaded(true);
          script.onerror = () => console.error(`Failed to load script: ${MOLLIE_JS_URL}`);
          document.head.appendChild(script);
        } else {
          setIsLoaded(true);
        }

        return () => {
          document.head.removeChild(script);
        };
      }, []);

      useEffect(() => {
        if (isLoaded) setMollie((window as any).Mollie(restProps.profileId, {...(restProps?.options || {})}));
      }, [isLoaded])

    return (
      <MollieComponentContext.Provider value={{ ...restProps, isLoaded, mollieObject: mollie }}>
        {children}
      </MollieComponentContext.Provider>
    )
  }