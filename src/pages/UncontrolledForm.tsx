import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { boolean, mixed, number, object, ref, string, ValidationError } from 'yup';

import { useGetCountriesQuery } from '../redux/actions/country';
import { addForm } from '../redux/slices/layoutSlice';
import { useAppDispatch } from '../redux/store';

export const FormSchema = object().shape({
  name: string()
    .required('Name is required')
    .matches(/^[A-Z][a-z]*$/, 'Name should start with an uppercase letter'),
  age: number()
    .required('Age is required')
    .positive('Age should be a positive number')
    .integer('Age should be a whole number'),
  email: string().required('Email is required').email('Invalid email address'),
  password: string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/,
      'Password must contain at least 8 characters, one number, one uppercase letter, and one special character'
    ),
  passwordConfirmation: string()
    .required('Confirm Password is required')
    .oneOf([ref('password')], 'Passwords must match'),
  gender: string().required('Gender is required'),
  term: boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
  image: mixed<File>()
    .required('Picture is required')
    .test(
      'fileSize',
      'File size is too large',
      (value: File | undefined) => value && value.size <= 1024 * 1024 * 16 // 16 MB
    )
    .test(
      'fileType',
      'Invalid file type. Only PNG and JPEG are allowed',
      (value) => value && ['image/png', 'image/jpeg'].includes(value.type)
    ),
  country: string().required('Country is required'),
});

export interface FormValues {
  name: string | undefined;
  age: string | undefined;
  email: string | undefined;
  password: string | undefined;
  passwordConfirmation: string | undefined;
  gender: string;
  term: boolean | undefined;
  image: File | undefined;
  imageBase64?: string | ArrayBuffer | null;
  country: string | undefined;
}

export default function UncontrolledForm() {
  const { data } = useGetCountriesQuery();
  const [error, setError] = useState<ValidationError | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const termRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject;
      };
    });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    const age = ageRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirmation = passwordConfirmationRef.current?.value;
    const gender = maleRef.current?.checked ? 'Male' : 'Female';
    const term = termRef.current?.checked;
    const image = imageRef.current?.files?.[0];
    const imageBase64 = imageRef.current?.files?.[0]
      ? await getBase64(imageRef.current?.files?.[0])
      : null;
    const country = countryRef.current?.value;

    const data: FormValues = {
      name,
      age,
      email,
      password,
      passwordConfirmation,
      gender,
      term,
      image,
      imageBase64,
      country,
    };

    try {
      await FormSchema.validateSync(data, { abortEarly: false });
      setError(null);

      if (FormSchema.isValidSync(data) && imageRef.current?.files?.[0]) {
        dispatch(addForm(data));
        navigate('/');
      }
    } catch (error) {
      setError(error as ValidationError);
    }
  };

  return (
    <div>
      <h1>Uncontrolled Form</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form__item">
          <label htmlFor="name">Name:</label>
          <input ref={nameRef} name="name" type="text" id="name" />
          <small className="error">{error?.inner.find((e) => e.path === 'name')?.message}</small>
        </div>

        <div className="form__item">
          <label htmlFor="age">Age:</label>
          <input ref={ageRef} name="age" type="number" id="age" />
          <small className="error">{error?.inner.find((e) => e.path === 'age')?.message}</small>
        </div>

        <div className="form__item">
          <label htmlFor="email">Email:</label>
          <input ref={emailRef} name="email" type="email" id="email" />
          <small className="error">{error?.inner.find((e) => e.path === 'email')?.message}</small>
        </div>

        <div className="form__item">
          <label htmlFor="password">Password:</label>
          <input ref={passwordRef} name="password" type="password" id="password" />
          <small className="error">
            {error?.inner.find((e) => e.path === 'password')?.message}
          </small>
        </div>

        <div className="form__item">
          <label htmlFor="passwordConfirmation">Password Confirmation:</label>
          <input
            ref={passwordConfirmationRef}
            name="passwordConfirmation"
            type="password"
            id="passwordConfirmation"
          />
          <small className="error">
            {error?.inner.find((e) => e.path === 'passwordConfirmation')?.message}
          </small>
        </div>

        <div className="form__item">
          <label htmlFor="male">Gender:</label>

          <div className="form__item">
            <label htmlFor="male">Male</label>
            <input
              ref={maleRef}
              name="gender"
              type="radio"
              id="male"
              value={'Male'}
              defaultChecked
            />
          </div>
          <div className="form__item">
            <label htmlFor="female">Female</label>
            <input name="gender" type="radio" id="female" value={'female'} />
          </div>
          <small className="error">{error?.inner.find((e) => e.path === 'gender')?.message}</small>
        </div>

        <div className="form__item checkbox">
          <input ref={termRef} type="checkbox" name="term" id="term" defaultChecked={false} />
          <label htmlFor="term">I accept the terms and conditions</label>
          <small className="error">{error?.inner.find((e) => e.path === 'term')?.message}</small>
        </div>

        <div className="form__item">
          <label htmlFor="image">Image:</label>
          <input
            ref={imageRef}
            name="image"
            type="file"
            accept="image/png, image/jpeg"
            id="image"
          />
          <small className="error">{error?.inner.find((e) => e.path === 'image')?.message}</small>
        </div>

        <div className="form__item">
          <label htmlFor="country">Country:</label>
          <input ref={countryRef} list="countries" name="country" id="country" />
          <datalist id="countries">
            {data?.map((country) => (
              <option key={country.name.official} value={country.name.official} />
            ))}
          </datalist>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
