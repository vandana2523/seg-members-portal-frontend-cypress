import { faker } from "@faker-js/faker";

export const generateUserData = () => {
    return {
        name: faker.name.fullName(), 
        email: faker.internet.email(),
        address: {
            street: faker.location.streetAddress(), 
            city: faker.location.city(), 
            state: faker.location.state(), 
            zipCode: faker.location.zipCode(), 
            country: faker.location.country() 
        },
        mobileNumber: faker.phone.number(),
        // Add other fields as needed
    };
};

export const generateUpdatedUserData = () => {
    return {
        name: faker.name.fullName(), 
        email: faker.internet.email(),
        address: {
            street: faker.location.streetAddress(), 
            city: faker.location.city(), 
            state: faker.location.state(), 
            zipCode: faker.location.zipCode(), 
            country: faker.location.country() 
        },
        mobileNumber: faker.phone.number(),
        // Add other fields as needed
    };
};

export const generatePersonalDetails = () => {
    return {
        firstName: faker.name.firstName(), 
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        mobileNumber: faker.phone.number('7#########'),
        // Add other fields as needed
    };
};
