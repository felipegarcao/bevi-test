import * as InputBase from '@/presentation/components/Input'

import { render, fireEvent, screen } from '@testing-library/react'
import {faker} from '@faker-js/faker'

const makeSut = (fieldName: string): void => {
  render(
    <InputBase.Root>
      <InputBase.Control name={fieldName} />
    </InputBase.Root>
  )
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field) as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field) as HTMLInputElement

    fireEvent.focus(input)

    expect(input.readOnly).toBe(false)
  })

  
})