import React from 'react';
import testmd from '!!raw-loader!./test.md';
import fm from 'front-matter';
const ReadFrontMatter = () => {
  console.log(fm(testmd));
  return <div>Test</div>;
};

export default ReadFrontMatter;
