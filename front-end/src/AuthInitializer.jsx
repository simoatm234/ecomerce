// AuthInitializer.jsx
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { me } from './app/services/thunkFunctions/userThunk';


export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      dispatch(me()).finally(() => setChecked(true));
    } else {
      setChecked(true);
    }
  }, [dispatch]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return children;
}
