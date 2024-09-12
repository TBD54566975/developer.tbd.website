import { ToneTypes } from "@site/lib/utils";
import React from "react";

const AccordionToneContext = React.createContext<{ tone?: ToneTypes } | null>(
  null,
);

const AccordionToneProvider = ({
  children,
  tone = "yellow",
}: {
  children: React.ReactNode;
  tone?: ToneTypes;
}) => {
  return (
    <AccordionToneContext.Provider value={{ tone }}>
      {children}
    </AccordionToneContext.Provider>
  );
};

export const useAccordionTone = () => {
  const context = React.useContext(AccordionToneContext);
  return context;
};

export default AccordionToneProvider;
