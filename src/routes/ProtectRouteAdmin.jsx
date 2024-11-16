import { useEffect, useState } from "react"
import useEcomStore from "../store/ecom-store";
import { currentAdmin } from "../api/auth";
import LoadingToRedirect from "../routes/LoadingToRedirect";

// eslint-disable-next-line react/prop-types
const ProtectRouteAdmin = ({element}) => {

  const [ok, setOk] = useState(false);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    if (user && token) {
      // send to back
      currentAdmin(token)
        .then(() => setOk(true))
        .catch(() => setOk(false))
    }
  }, [])

  return ok ? element : <LoadingToRedirect />
}

export default ProtectRouteAdmin;