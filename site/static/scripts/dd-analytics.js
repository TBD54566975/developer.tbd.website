window.DD_RUM && window.DD_RUM.init({
    clientToken: 'pub4c8b1a9ef4c424ef4d0ce30adaedc6d0',
    applicationId: '3937f727-75df-40e8-bed7-84fd4ef7bcf6',
    site: 'datadoghq.com',
    service: 'tbd.website',
    env: 'devtest',
    // Specify a version number to identify the deployed version of your application in Datadog 
    // version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
});

window.DD_RUM &&
window.DD_RUM.startSessionReplayRecording();