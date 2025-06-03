import { Outlet } from "react-router";
import Commheader from '../comm-header';

export default function CommLayout() {
  return (
    <>
      <Commheader />
      <Outlet />
    </>
  );
}
