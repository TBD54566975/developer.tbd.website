import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

const ReusableTabs = ({MacCommand, WinCommand}) => {
    return (
        <Tabs >
            <TabItem value="mac" label="Mac" default>
                <pre class="prism-code language-bash codeBlock_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module thin-scrollbar">
                    <code class="codeBlockLines_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module">{MacCommand}</code>
                </pre>
            </TabItem>
            <TabItem value="windows" label="Windows">
                <pre class="prism-code language-json codeBlock_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module thin-scrollbar">
                    <code class="codeBlockLines_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module">{WinCommand}</code>
                </pre>
            </TabItem>
        </Tabs>
)};

export default ReusableTabs;