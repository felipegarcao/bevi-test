import { forwardRef, ComponentProps } from 'react';

export type InputPrefixProps = ComponentProps<'div'>;

export const Prefix = forwardRef<HTMLDivElement, InputPrefixProps>((props, ref) => {
  return <div ref={ref} className='d-flex align-items-center' {...props} />;
});

export type InputControlProps = ComponentProps<'input'>

export const Control = forwardRef<HTMLInputElement, InputControlProps>((props, ref) => {
  const { ...rest } = props;

  return (

    <input
      ref={ref}
      className={`form-control flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 shadow-none font-size sm`}
      {...rest}
    />

  );
});

export type InputRootProps = ComponentProps<'div'> & { error?: string };

export const Root = forwardRef<HTMLDivElement, InputRootProps>(({ error, ...props }, ref) => {
  return (
    <>
      <div
        ref={ref}
        className="input-group d-flex w-full align-items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-light rounded"
        {...props}
      />

      {error && <div className="text-danger font-size xs">{error}</div>}
    </>

  );
});
