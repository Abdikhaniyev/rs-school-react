import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../redux/store';

export default function Home() {
  const { state } = useLocation();
  const { latestForms } = useAppSelector((state) => state.layout);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state && state?.id) {
      cardRef.current?.classList.add('active');
      setTimeout(() => {
        cardRef.current?.classList.remove('active');
      }, 2000);
    }
  }, [state]);

  return (
    <div>
      <h1>Home</h1>
      <h2>Last created forms</h2>

      <div className="forms-grid">
        {latestForms.map((form, index) => (
          <div key={index} ref={form?.id === state?.id ? cardRef : null} className="form-card">
            <div className="card__image">
              <img src={form.imageBase64 as string} alt={form.name} />
            </div>
            <div className="card__content">
              <h3>Name: {form.name}</h3>
              <p>Email: {form.email}</p>
              <p>Age: {form.age}</p>
              <p>Gender: {form.gender}</p>
              <p>Country: {form.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
