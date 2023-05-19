import { Formik, Field, Form, FormikHelpers } from 'formik';
import {myRequest} from '../utilits'

interface Values {
  IdInstance: string;
  ApiTokenInstance: string;
}

const SignupForm = (func: Function) => {
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          IdInstance: '',
          ApiTokenInstance: '',
        }}
        onSubmit={async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          setSubmitting(false);

          console.log(values)
          const IdInstance = Number(values.IdInstance)
          const ApiTokenInstance = values.ApiTokenInstance

          const url = `https://api.green-api.com/waInstance${IdInstance}/getStateInstance/${ApiTokenInstance}`

          const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

          const res = await myRequest(url, requestOptions)

          if (res.stateInstance !== undefined) {
            func(IdInstance, ApiTokenInstance)
          }

        }}
      >
        <Form>
          <label htmlFor="IdInstance">IdInstance</label>
          <Field id="IdInstance" name="IdInstance" placeholder="" />

          <label htmlFor="ApiTokenInstance">ApiTokenInstance</label>
          <Field id="ApiTokenInstance" name="ApiTokenInstance" placeholder="" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignupForm;
