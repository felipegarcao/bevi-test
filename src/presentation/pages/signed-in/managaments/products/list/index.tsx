
import { PlusCircle, Search } from 'lucide-react'

export function ListProducts() {
  return (
    <div className="container mx-auto flex flex-col pt-5 pb-5 gap-6">
      <h1 className="text-3xl  text-[#24ccDB] font-weight-bold">Produtos Cadastrados</h1>

      <div className='mt-5'>
        <div className="row align-items-center">
          <div className="col-lg-10">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Buscar produtos..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2"><Search /></span>
              </div>
            </div>
          </div>

          <button type='button' className='col-lg-2 btn btn-info d-flex align-items-center justify-content-center text-white font-weight-bold gap-3'>
            <PlusCircle size={18} />
            Novo
          </button>

        </div>
      </div>


      <div className='shadow p-3 rounded mt-5'>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">Stock</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Calcinha</td>
                <td>3000</td>
                <td>Ativo</td>
                <td>12</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}