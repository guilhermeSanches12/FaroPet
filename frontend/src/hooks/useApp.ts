import { useContext } from "react";
import { AppCtx } from "@/context/AppContext";

export function useApp() {
  return useContext(AppCtx);
}
