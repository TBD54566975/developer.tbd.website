import React from "react";

export const createRequiredContext = <T,>(): [
  () => T,
  React.Provider<T | null>,
] => {
  const context = React.createContext(null);

  const useContext = () => {
    const contextValue = React.useContext(context);

    if (contextValue === null) {
      throw new Error("Context value is null");
    }

    return contextValue;
  };

  return [useContext, context.Provider];
};

export const createOptionalContext = <T,>(): [
  () => T,
  React.Provider<T | null>,
] => {
  const context = React.createContext(null);

  const useContext = () => {
    const contextValue = React.useContext(context);
    return contextValue;
  };

  return [useContext, context.Provider];
};
