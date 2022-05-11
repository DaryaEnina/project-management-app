type SignInFormValues = {
  login: string;
  password: string;
};

interface SignUpFormValues extends SignInFormValues {
  name: string;
}

interface SignUpErrorObject {
  name?: FieldError | undefined;
  login?: FieldError | undefined;
  password?: FieldError | undefined;
}
