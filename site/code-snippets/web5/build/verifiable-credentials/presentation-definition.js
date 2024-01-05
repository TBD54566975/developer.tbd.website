import { PresentationExchange } from '@web5/credentials';


export async function validatePresentationDefinition(pd) {
const validation = PresentationExchange.validateDefinition({ 
    presentationDefinition: pd 
});
return validation;
}


