import React from 'react';
import Layout from '@theme-original/Layout';
import { GlitchWrapper } from '../../components/GlitchWrapper';
export default function LayoutWrapper(props) {
  return (
    <GlitchWrapper>
      <Layout {...props} />
    </GlitchWrapper>
  );
}
