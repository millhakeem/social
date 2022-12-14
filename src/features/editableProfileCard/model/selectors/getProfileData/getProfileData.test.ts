import { getProfileData } from './getProfileData';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

describe('getProfileData.test', () => {
    test('should return value', () => {
        const data = {
            username: 'admin',
            age: 34,
            first: 'Shitty',
            lastname: 'Wizzard',
            city: 'Biysk',
            country: Country.Russia,
            currency: Currency.RUB,
        };
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: data,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
