import React from 'react'
import { Form } from 'semantic-ui-react'

export function LoginForm() {
  return (
    <Form>
      <Form.Input name="email" placeholder="Correo electronico" />
      <Form.Input name="password" placeholder="Clave" />

      <Form.Button type='sumbit' primary fluid>
        Ingresar
      </Form.Button>
    </Form>
  );
}
