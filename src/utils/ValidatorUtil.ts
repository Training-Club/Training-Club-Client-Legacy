import {checkAccountAvailability} from '../requests/Account';

export type UsernameValidatorResponse = {
  valid: boolean;
  errors: {
    minLength: boolean;
    maxLength: boolean;
    specialChars: boolean;
    available: boolean;
  };
};

export async function isValidUsername(
  username: string,
): Promise<UsernameValidatorResponse> {
  console.log('isValiudUsername called');

  let minLength = true;
  let maxLength = true;
  let specialChars = true;
  let available = true;

  if (username.length < 2) {
    minLength = false;
  }

  if (username.length > 16) {
    maxLength = false;
  }

  if (/[^A-Za-z\d_.]/.test(username)) {
    specialChars = false;
  }

  const usernameAvailable: boolean = await checkAccountAvailability(
    'username',
    username,
  );

  if (!usernameAvailable) {
    available = false;
  }

  return new Promise<UsernameValidatorResponse>(async resolve => {
    const result: UsernameValidatorResponse = {
      valid: !minLength && !maxLength && !specialChars && !available,
      errors: {
        minLength,
        maxLength,
        specialChars,
        available,
      },
    };

    resolve(result);
  });
}
