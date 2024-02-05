import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ShowMessage() {
  return {
    userId: () => {
      toast.error("User ID es requerido.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    nombreProducto: () => {
      toast.error("Nombre es requerido.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    categoriaProducto: () => {
        toast.error("La Categoría es requerida..", {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
      costoProducto: () => {
        toast.error("Costo es requerido.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
      descripcionProducto: () => {
        toast.error("La Descripcion del producto es requerida.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
  };
}
