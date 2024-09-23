import React from "react";
import { Language } from "./project.types";

type PropType = {
  language: Language;
};
const ProjectLanguage = ({ language }: PropType) => {
  const badgeSrc = `https://img.shields.io/badge/-${language}-purple?style=flat-square`;
  return <img className="m-0.5" src={badgeSrc} />;
};

export default ProjectLanguage;
