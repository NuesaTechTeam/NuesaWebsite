import useSEO from "../hooks/useSEO";
import { AdminGate } from "../components/Elections";

/** /elections/admin: the admin dashboard, reachable even while the voter portal is open. */
const ElectionsAdmin = () => {
  useSEO({
    title: "Elections Admin",
    description: "NUESA ABUAD elections administration. Restricted access.",
  });

  return <AdminGate />;
};

export default ElectionsAdmin;
