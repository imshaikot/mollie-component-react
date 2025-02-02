import { useContext } from "react";
import { MollieComponentContext } from "../mollie-provider";

type MollieHook = {
  createToken: () => Promise<{ token?: string; error: Error; }>;
  _mollie: any;
  isLoaded: boolean;
}

export const useMollie = (): MollieHook => {
  const { mollieObject, isLoaded } = useContext(MollieComponentContext);
  return {
    createToken: () => {
      if (!isLoaded) throw new Error('createToken has been called before Mollie properly loaded');
      return mollieObject.createToken();
    },
    _mollie: mollieObject,
    isLoaded,
  };
};

