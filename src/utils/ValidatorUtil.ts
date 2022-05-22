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

export type EmailValidatorResponse = {
  valid: boolean;
  errors: {
    format: boolean;
    minLength: boolean;
    maxLength: boolean;
    available: boolean;
  };
};

export type PasswordValidatorResponse = {
  valid: boolean;
  errors: {
    match: boolean;
    minLength: boolean;
    maxLength: boolean;
    specialChars: boolean;
  };
};

export async function isValidUsername(
  username: string,
): Promise<UsernameValidatorResponse> {
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
      valid: minLength && maxLength && specialChars && available,
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

export async function isValidEmail(
  email: string,
): Promise<EmailValidatorResponse> {
  let minLength = true;
  let maxLength = true;
  let format = true;
  let available = true;

  if (email.length < 2) {
    minLength = false;
  }

  if (email.length > 64) {
    maxLength = false;
  }

  if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    )
  ) {
    format = false;
  }

  const emailAvailable: boolean = await checkAccountAvailability(
    'email',
    email,
  );

  if (!emailAvailable) {
    available = false;
  }

  return new Promise<EmailValidatorResponse>(async resolve => {
    const result: EmailValidatorResponse = {
      valid: minLength && maxLength && format && available,
      errors: {
        format,
        minLength,
        maxLength,
        available,
      },
    };

    resolve(result);
  });
}

export async function isValidPassword(
  password: string,
  confirmPassword: string,
): Promise<PasswordValidatorResponse> {
  let match = true;
  let minLength = true;
  let maxLength = true;
  let specialChars = true;

  if (password.length < 8) {
    minLength = false;
  }

  if (password.length > 32) {
    maxLength = false;
  }

  if (password !== confirmPassword) {
    match = false;
  }

  if (/^[ A-Za-z\d_@./#&+-]*$/.test(password)) {
    specialChars = false;
  }

  return new Promise<PasswordValidatorResponse>(async resolve => {
    const result: PasswordValidatorResponse = {
      valid: match && minLength && maxLength && specialChars,
      errors: {
        match,
        minLength,
        maxLength,
        specialChars,
      },
    };

    resolve(result);
  });
}
