import { useState } from "react";

const useSubmit = (submitFunction, onSubmitSuccess) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    setSubmitting(true);
    setError(undefined);
    try {
      await submitFunction(data);
      onSubmitSuccess();
    } catch (e) {
      setError(e);
    } finally {
      setSubmitting(false);
    }
  }
  return { handleSubmit, submitting, error };
}

export default useSubmit;