import { ComponentProps } from "react";


export type ButtonProps = ComponentProps<'button'> & {
  loading?: boolean;
  variant?: 'danger' | 'warning' | 'default' |  'ghost' | 'light';
};

export function Button({ loading, children, variant  = 'default', className, ...props }: ButtonProps) {

  const variants = [
    {name: 'danger', className: 'btn-danger'},
    {name: 'light', className: 'btn-light'},
    {name: 'default', className: 'btn-dark'},
    {name: 'warning', className: 'btn-warning'},
    {name: 'ghost', className: ''}
  ]

  const selectedVariant = variants.find(item => item.name === variant)

  return (
    <button data-testid={variant} className={`${className} btn p-2 d-flex align-items-center justify-content-center  gap-2 ${selectedVariant.className}`} disabled={loading} {...props} >
      {loading ? <div  data-testid="loading" className="spinner-border spinner-border-sm" style={{width: 25, height: 25}} role="status"></div> : children}
    </button>
  )
}