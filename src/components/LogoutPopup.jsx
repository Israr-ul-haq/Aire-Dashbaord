import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Logoutpopup = (navigate) => {
  //   const navigate = useNavigate();
  Swal.fire({
    title: "Are you sure, you want to Logout",
    text: "This action can’t be undone",
    showCancelButton: true,
    confirmButtonText: `Yes`,
    cancelButtonText: "No",
    reverseButtons: true,
  }).then(async (result) => {
    debugger;
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      localStorage.removeItem("AireUser");
      navigate("/account/login");
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
};

export default Logoutpopup;
