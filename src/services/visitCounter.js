
import {
  onValue,
  ref,
  runTransaction,
} from "firebase/database";

import { getFirebaseDatabase } from "./firebase";

const VISITS_PATH = "stats/totalVisits";
const SESSION_KEY = "cielovivo_visit_registered";

let registrationPromise = null;
let registeredInCurrentPage = false;

function getVisitsRef() {
  return ref(getFirebaseDatabase(), VISITS_PATH);
}

/**
 * Registra una visita por pestaña durante su sesión.
 */
export function registerVisit() {
  if (typeof window === "undefined") {
    return Promise.resolve({
      registered: false,
      reason: "browser-unavailable",
    });
  }

  let alreadyRegistered = registeredInCurrentPage;

  try {
    alreadyRegistered =
      alreadyRegistered ||
      window.sessionStorage.getItem(SESSION_KEY) === "true";
  } catch (error) {
    console.warn("No se pudo consultar sessionStorage:", error);
  }

  if (alreadyRegistered) {
    return Promise.resolve({
      registered: false,
      reason: "already-registered",
    });
  }

  if (registrationPromise) {
    return registrationPromise;
  }

  let visitsRef;

  try {
    visitsRef = getVisitsRef();
  } catch (error) {
    return Promise.reject(error);
  }

  registrationPromise = runTransaction(
    visitsRef,
    (currentValue) => {
      const currentCount =
        Number.isSafeInteger(currentValue) && currentValue >= 0
          ? currentValue
          : 0;

      return currentCount + 1;
    },
    { applyLocally: false }
  )
    .then((result) => {
      if (!result.committed) {
        return {
          registered: false,
          reason: "transaction-not-committed",
        };
      }

      registeredInCurrentPage = true;

      try {
        window.sessionStorage.setItem(SESSION_KEY, "true");
      } catch (error) {
        console.warn("No se pudo guardar la sesión:", error);
      }

      return {
        registered: true,
        total: result.snapshot.val(),
      };
    })
    .finally(() => {
      registrationPromise = null;
    });

  return registrationPromise;
}

/**
 * Escucha los cambios del contador en Firebase.
 */
export function subscribeToVisitCount(onUpdate, onError) {
  let visitsRef;

  try {
    visitsRef = getVisitsRef();
  } catch (error) {
    onError?.(error);
    return () => {};
  }

  return onValue(
    visitsRef,
    (snapshot) => {
      const value = snapshot.val();

      const total =
        Number.isSafeInteger(value) && value >= 0
          ? value
          : 0;

      onUpdate(total);
    },
    (error) => {
      if (onError) {
        onError(error);
      } else {
        console.error("Error al consultar las visitas:", error);
      }
    }
  );
}
