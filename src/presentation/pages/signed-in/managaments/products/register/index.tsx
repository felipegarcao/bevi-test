import { useRegisterProductsControllerDI } from "./types";
import { useRegisterProductController } from "./useRegisterProductController";
import * as Input from '@/presentation/components/Input'
import { Button } from "@/presentation/components/Button";

export function RegisterProducts({ service }: useRegisterProductsControllerDI) {

  const {
    onHandleRegisterProduct,
    loading,
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    },
    params,
    options,
  } = useRegisterProductController({ service })




  return (
    <div className="container mx-auto flex flex-col pt-md-5 pb-md-5 py-2 gap-6">
      <h1 className="text-3xl text-info font-weight-bold" data-testid="PageTitle">
        {params ? "Alterar Produto" : "Cadastrar Produto"}
      </h1>

      <form className="shadow-light  p-4 rounded mt-4 d-flex flex-column gap-3" onSubmit={handleSubmit(onHandleRegisterProduct)}>

        <label className="w-100">
          <span className="font-size sm">Nome do Produto</span>
          <Input.Root error={errors.name?.message}>
            <Input.Control
              type="text"
              {...register('name')}
            data-testid="input-entry-name"
            />
          </Input.Root>
        </label>


        <div className="form-group">
          <label htmlFor="textarea" className="font-size sm">Descrição</label>
          <textarea
            className="form-control shadow-light border"
            data-testid="input-entry-description"
            id="textarea"
            rows={3} {...register('description')}></textarea>
          {errors.description?.message}
        </div>

        <div className="grid grid-cols-2">
          <label className="w-100 col">
            <span className="font-size sm">Preço</span>

            <Input.Root error={errors.price?.message}>
              <Input.Control
                min={0}
                type="number"
                {...register('price')}
                data-testid="input-entry-price"
              />
            </Input.Root>
          </label>

          <label className="w-100 col">
            <span className="font-size sm">Status</span>
            <select
              className="form-select shadow-light p-2 font-size sm border"
              {...register('status', {
                valueAsNumber: true
              })}
              data-testid="input-entry-status"
            >
            
              {
                options.map((o, i) => (
                  <option value={o.value} key={i}>{o.label}</option>
                ))
              }
            </select>
            {errors.status?.message}
          </label>
        </div>

        <div className="grid align-items-center">
          <label className="w-100 col">
            <span className="font-size sm">Quantidade em estoque</span>


            <Input.Root error={errors.stock_quantity?.message}>
              <Input.Control
                type="number"
                {...register('stock_quantity')}
                min={0}
                data-testid="input-entry-stock_quantity"
              />
            </Input.Root>

          </label>
        </div>

        <Button className="mt-4 col" loading={isSubmitting || loading}>
          <span> {params ? 'Alterar' : 'Cadastrar'}</span>
        </Button>

      </form>
    </div>
  )
}