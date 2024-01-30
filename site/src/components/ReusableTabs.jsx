import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock'

const ReusableTabs = ({MacCommand, WinCommand}) => {
    return (
        <Tabs >
            <TabItem value="mac" label="Mac" default>
                <CodeBlock language="bash">
                    {MacCommand}
                </CodeBlock>
                
            </TabItem>
            <TabItem value="windows" label="Windows">
                <CodeBlock language="bash">
                    {WinCommand}
                </CodeBlock>
            </TabItem>
        </Tabs>
)};

export default ReusableTabs;