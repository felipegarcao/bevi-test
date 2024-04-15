import { useState } from "react"

export function useLoginController() {

  const [visibilePassword, setVisiblePassword] = useState(true);


  return {
    visibilePassword,
    setVisiblePassword
  }
}