import { ComponentProps } from "react";


export type ButtonProps = ComponentProps<'button'> & {
  loading?: boolean;
};




export function Button({ loading, children, className,  ...props }: ButtonProps) {
  return (
    <button className={`btn btn-dark d-flex align-items-center justify-content-center  gap-2 ${className}`} {...props}>
      {loading ? <div className="spinner-border spinner-border-sm" role="status"></div> : children}
    </button>
  )
}