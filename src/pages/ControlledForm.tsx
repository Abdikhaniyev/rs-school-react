import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';

import { useGetCountriesQuery } from '../redux/actions/country';
import { addForm, FormValues } from '../redux/slices/layoutSlice';
import { useAppDispatch } from '../redux/store';

import { FormSchema } from './UncontrolledForm';

export default function ControlledForm() {
  const { data } = useGetCountriesQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
    mode: 'onChange',
  });
  const onSubmit = (data: FormValues) => {
    if (FormSchema.isValidSync(data)) {
      data.imageBase64 = data.image?.[0] ? URL.createObjectURL(data.image[0]) : null;
      data.image = undefined;
      const id = Math.random().toString(36).substring(2, 9);
      dispatch(addForm({ ...data, id }));
      navigate('/', { state: { id: id } });
    }
  };

  const { onChange, ...image } = register('image');

  return (
    <div>
      <h1>Controlled Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form__item">
          <label htmlFor="name">Name:</label>
          <input {...register('name')} type="text" id="name" />
          <small className="error">{errors.name?.message}</small>
        </div>

        <div className="form__item">
          <label htmlFor="age">Age:</label>
          <input {...register('age')} type="number" id="age" />
          <small className="error">{errors.age?.message}</small>
        </div>

        <div className="form__item">
          <label htmlFor="email">Email:</label>
          <input {...register('email')} type="email" id="email" />
          <small className="error">{errors.email?.message}</small>
        </div>

        <div className="form__item">
          <label htmlFor="password">Password:</label>
          <input {...register('password')} type="password" id="password" />
          <small className="error">{errors.password?.message}</small>
        </div>

        <div className="form__item">
          <label htmlFor="passwordConfirmation">Password Confirmation:</label>
          <input {...register('passwordConfirmation')} type="password" id="passwordConfirmation" />
          <small className="error">{errors.passwordConfirmation?.message}</small>
        </div>

        <div className="form__item">
          <label htmlFor="male">Gender:</label>

          <div className="form__item">
            <label htmlFor="male">Male</label>
            <input {...register('gender')} type="radio" id="male" value={'Male'} defaultChecked />
          </div>
          <div className="form__item">
            <label htmlFor="female">Female</label>
            <input {...register('gender')} type="radio" id="female" value={'female'} />
          </div>
          <small className="error">{errors.gender?.message}</small>
        </div>

        <div className="form__item checkbox">
          <input {...register('term')} type="checkbox" id="term" defaultChecked={false} />
          <label htmlFor="term">I accept the terms and conditions</label>
          <small className="error">{errors.term?.message}</small>
        </div>

        <div className="form__item">
          <label htmlFor="image">Image:</label>
          <input
            {...image}
            onChange={(e) => {
              onChange(e);
            }}
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            multiple={false}
          />
          <small className="error">{errors.image?.message}</small>
        </div>

        <div className="form__item">
          <label htmlFor="country">Country:</label>
          <input {...register('country')} list="countries" id="country" />
          <datalist id="countries">
            {data?.map((country) => (
              <option key={country.name.common} value={country.name.common} />
            ))}
          </datalist>
        </div>

        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </button>
      </form>
    </div>
  );
}
