import React, { createContext, useContext, useState } from 'react';

const QuickstartExecutionContext = createContext();

export const QuickstartExecutionProvider = ({ children }) => {
    const [stepsCompleted, setStepsCompleted] = useState([]);

    const markStepCompleted = (stepIndex) => {
        setStepsCompleted((prevSteps) => [...prevSteps, stepIndex]);
    };

    return (
        <QuickstartExecutionContext.Provider value={{ stepsCompleted, markStepCompleted }}>
            {children}
        </QuickstartExecutionContext.Provider>
    );
};

export const useQuickstartExecutionContext = () => {
    return useContext(QuickstartExecutionContext);
};
