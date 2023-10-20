import { Web5 } from '@web5/api';

export default defineNuxtPlugin({
    async setup (nuxtApp) {
        let web5;
        let myDID;

        ({ web5, did: myDID } = await Web5.connect({
            sync: '5s'
        }));

        return {
            provide: {
                web5,
                myDID
            }
        };
    },
});