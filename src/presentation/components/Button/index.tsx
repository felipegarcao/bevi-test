import { ComponentProps } from "react";


export type ButtonProps = ComponentProps<'button'> & {
  loading?: boolean;
  variant?: 'danger' | 'warning' | 'default' | 'success';
};

export function Button({ loading, children, className, ...props }: ButtonProps) {
  return (
    <button className={`btn btn-dark d-flex align-items-center justify-content-center  gap-2 ${className}`} {...props} disabled={loading}>
      {loading ? <div className="spinner-border spinner-border-sm" style={{width: 25, height: 25}} role="status"></div> : children}
    </button>
  )
}