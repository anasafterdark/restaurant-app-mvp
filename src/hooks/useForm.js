import { useCallback, useMemo, useState } from 'react';
export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const handleChange = useCallback((name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }, []);
  const handleSubmit = useCallback((onValid) => async () => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) return onValid(values);
  }, [validate, values]);
  const reset = useCallback(() => { setValues(initialValues); setErrors({}); }, [initialValues]);
  const isValid = useMemo(() => Object.keys(validate(values)).length === 0, [validate, values]);
  return { values, errors, handleChange, handleSubmit, reset, isValid };
}
