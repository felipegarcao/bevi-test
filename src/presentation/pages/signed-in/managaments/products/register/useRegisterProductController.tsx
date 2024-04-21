import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom"
import { Products } from "@/domain/usecases/remote/remote-products";
import { CreateProductBodySchema } from "./validation";
import { useRegisterProductsControllerDI } from "./types";
import { toast } from "react-toastify";
import { UnauthorizedError } from "@/domain/errors/unathorizedError";
import { userReducerAdapter } from "@/main/adapters/user-reducer-adapter";
import { SelectObject } from "@/domain/usecases/select-object";

export function useRegisterProductController({ service }: useRegisterProductsControllerDI) {
  const [loading, setLoading] = useState(false);
  const { logout } = userReducerAdapter()
  const navigate = useNavigate();
  const location = useLocation()
  const params: Products.Model = location.state?.product




  const form = useForm<Products.Model>({
    resolver: zodResolver(CreateProductBodySchema),
    defaultValues: {
      description: '',
      name: '',
     status: 1
    },
    values: {
      id: params?.id,
      description: params?.description,
      name: params?.name,
      price: params?.price,
      status: params?.status,
      stock_quantity: params?.stock_quantity
    }
  })

  function handleResetForm() {
    form.reset()
  }

  const options: SelectObject[] = [
    { label: 'Em estoque', value: '1' },
    { label: 'Em Reposição', value: '2' },
    { label: 'Em falta', value: '3' },
  ]

  const onHandleRegisterProduct: SubmitHandler<Products.Model> = async (product: Products.Model) => {
    setLoading(true);

    try {
      const payload: Products.Model = {
        description: product.description,
        name: product.name,
        price:product.price,
        stock_quantity:product.stock_quantity,
        status:product.status
      }

      if (params) {
        handleEditProduct(payload)
      } else {
        handleCreateProduct(payload)
      }
    } catch (error) {
      toast.error(error)

      if (error instanceof UnauthorizedError) {
        toast(error.message, {
          type: "error",
        });
        logout();
      }

    }
  }



  const  handleEditProduct: SubmitHandler<Products.Model> = async (product: Products.Model) => {
    setLoading(true)
    try {
      await service.updated({
        id: params.id,
        description: product.description,
        name: product.name,
        price: Number(product.price),
        stock_quantity: Number(product.stock_quantity),
        status: Number(product.status)
      })

      navigate('/')
      toast.info('Produto Alterado com sucesso.')
      // handleResetForm()

    } catch (error) {

      toast.error(error)

      if (error instanceof UnauthorizedError) {
        toast(error.message, {
          type: "error",
        });
        logout();
      }
    } finally {
      setLoading(false)
    }
  }


  const  handleCreateProduct: SubmitHandler<Products.Model> = async (product: Products.Model) => {
    setLoading(true)
    try {

      await service.create({
        description: product.description,
        name: product.name,
        price: product.price,
        stock_quantity: product.stock_quantity,
        status: product.status
      })

      navigate('/')
      toast.success('Produto cadastrado com sucesso.')
      handleResetForm()

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  }

 


  return {
    form,
    loading,
    onHandleRegisterProduct,
    params,
    options
  }
}