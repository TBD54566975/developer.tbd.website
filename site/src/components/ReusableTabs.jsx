import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

const ReusableTabs = ({MacCommand, WinCommand}) => {
    return (
        <Tabs >
            <TabItem value="mac" label="Mac" default>
                {MacCommand}
            </TabItem>
            <TabItem value="windows" label="Windows">
                {WinCommand}
            </TabItem>
        </Tabs>
)};

// Set default commands if not provided
ReusableTabs.defaultProps = {
    MacCommand: `curl -X PUT localhost:8080/v1/dids/key -d '{"keyType":"Ed25519"}'`,
    WinCommand: `curl -X PUT localhost:8080/v1/dids/key -d "{\"keyType\":\"Ed25519\"}"`,
};

export default ReusableTabs;