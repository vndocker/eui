import { Comparators } from '../../../../src/services/sort';
import { Random } from '../../../../src/services/random';
import { times } from '../../../../src/services/utils';

const random = new Random();

const createCountries = () => [
  { code: 'NL', name: 'Netherlands', flag: '๐ณ๐ฑ' },
  { code: 'CZ', name: 'Czech Republic', flag: '๐จ๐ฟ' },
  { code: 'ZA', name: 'South Africa', flag: '๐ฟ๐ฆ' },
  { code: 'US', name: 'United States', flag: '๐บ๐ฒ' },
  { code: 'AU', name: 'Australia', flag: '๐ฆ๐บ' },
  { code: 'IL', name: 'Israel', flag: '๐ฎ๐ฑ' },
  { code: 'NO', name: 'Norway', flag: '๐ณ๐ด' },
  { code: 'IT', name: 'Italy', flag: '๐ฎ๐น' },
  { code: 'CA', name: 'Canada', flag: '๐จ๐ฆ' },
  { code: 'CG', name: 'Congo', flag: '๐จ๐ฌ' },
  { code: 'CL', name: 'Chile', flag: '๐จ๐ฑ' },
  { code: 'FJ', name: 'Fiji', flag: '๐ซ๐ฏ' },
  { code: 'GB', name: 'United Kingdom', flag: '๐ฌ๐ง' },
  { code: 'GR', name: 'Greece', flag: '๐ฌ๐ท' },
  { code: 'HT', name: 'Haiti', flag: '๐ญ๐น' },
  { code: 'LB', name: 'Lebanon', flag: '๐ฑ๐ง' },
  { code: 'MM', name: 'Myanmar', flag: '๐ฒ๐ฒ' },
  { code: 'MX', name: 'Mexico', flag: '๐ฒ๐ฝ' },
  { code: 'NG', name: 'Nigeria', flag: '๐ณ๐ฌ' },
  { code: 'SG', name: 'Singapore', flag: '๐ธ๐ฌ' },
  { code: 'SO', name: 'Somalia', flag: '๐ธ๐ด' },
  { code: 'TN', name: 'Tunisia', flag: '๐น๐ณ' },
  { code: 'VE', name: 'Venezuela', flag: '๐ป๐ช' },
  { code: 'ZM', name: 'Zambia', flag: '๐ฟ๐ฒ' },
];

const firstNames = [
  'Very long first name that will wrap or be truncated',
  'Another very long first name which will wrap or be truncated',
  'Clinton',
  'Igor',
  undefined,
  'Drew',
  null,
  'Rashid',
  undefined,
  'John',
];

const lastNames = [
  'Very long last name that will wrap or be truncated',
  'Another very long last name which will wrap or be truncated',
  'Gormley',
  'Motov',
  'Minarik',
  'Raines',
  'Krรกl',
  'Khan',
  'Sissel',
  'Dorlus',
];

const github = [
  'martijnvg',
  'elissaw',
  'clintongormley',
  'imotov',
  'karmi',
  'drewr',
  'HonzaKral',
  'rashidkpc',
  'jordansissel',
  'silne30',
];

const dob = new Date(1980, 1, 1);

const createUsers = (countries) => {
  return times(20, (index) => {
    return {
      id: index,
      firstName: index < 10 ? firstNames[index] : firstNames[index - 10],
      lastName: index < 10 ? lastNames[index] : lastNames[index - 10],
      github: index < 10 ? github[index] : github[index - 10],
      dateOfBirth: dob,
      nationality: random.oneToOne(
        countries.map((country) => country.code),
        index
      ),
      online: index % 2 === 0,
    };
  });
};

export const createDataStore = () => {
  const countries = createCountries();
  const users = createUsers(countries);

  return {
    countries,
    users,

    findUsers: (pageIndex, pageSize, sortField, sortDirection) => {
      let items;

      if (sortField) {
        items = users
          .slice(0)
          .sort(
            Comparators.property(sortField, Comparators.default(sortDirection))
          );
      } else {
        items = users;
      }

      let pageOfItems;

      if (!pageIndex && !pageSize) {
        pageOfItems = items;
      } else {
        const startIndex = pageIndex * pageSize;
        pageOfItems = items.slice(
          startIndex,
          Math.min(startIndex + pageSize, items.length)
        );
      }

      return {
        pageOfItems,
        totalItemCount: items.length,
      };
    },

    deleteUsers: (...ids) => {
      ids.forEach((id) => {
        const index = users.findIndex((user) => user.id === id);
        if (index >= 0) {
          users.splice(index, 1);
        }
      });
    },

    cloneUser: (id) => {
      const index = users.findIndex((user) => user.id === id);
      if (index >= 0) {
        const user = users[index];
        users.splice(index, 0, { ...user, id: users.length });
      }
    },

    getCountry: (code) => countries.find((country) => country.code === code),
  };
};
