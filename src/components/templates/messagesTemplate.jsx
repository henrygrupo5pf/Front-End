import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ShowMessage() {
  return {
    // userId: () => {
    //   toast.error("User ID es requerido.", {
    //     position: "top-right",
    //   });
    // },
    nombreProducto: () => {
      toast.error("Nombre es requerido.", {
        position: "top-right",
      });
    },
    categoriaProducto: () => {
        toast.error("La Categoría es requerida..", {
          position: "top-right",
        });
      },
      costoProducto: () => {
        toast.error("Costo es requerido.", {
          position: "top-right",
        });
      },
      descripcionProducto: () => {
        toast.error("La Descripcion del producto es requerida.", {
          position: "top-right",
        });
      },
  };
}