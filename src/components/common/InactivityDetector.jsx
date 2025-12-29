import { useEffect, useState, useRef, useContext, useCallback } from "react";
import { Modal, Button, ProgressBar } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { INACTIVITY_CONFIG } from "../../config/inactivityConfig";

const InactivityDetector = () => {
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(INACTIVITY_CONFIG.COUNTDOWN_TIME / 1000);
  

  const timeoutRef = useRef(null);
  const countdownRef = useRef(null);
  const throttleRef = useRef(null);
  const lastActivityRef = useRef(Date.now());
  const showModalRef = useRef(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    showModalRef.current = showModal;
  }, [showModal]);


  const clearAllTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    if (throttleRef.current) {
      clearTimeout(throttleRef.current);
      throttleRef.current = null;
    }
  }, []);


  const handleTimeout = useCallback(() => {

    dispatch({ type: "CLEAR" });

    localStorage.clear();


    setShowModal(false);


    clearAllTimers();


    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [dispatch, location.pathname, navigate, clearAllTimers]);


  const startCountdown = useCallback(() => {
    const initialCountdown = INACTIVITY_CONFIG.COUNTDOWN_TIME / 1000;
    setCountdown(initialCountdown);
    
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [handleTimeout]);


  const resetInactivityTimer = useCallback((skipModalCheck = false) => {

    if (!skipModalCheck && showModalRef.current) return;


    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }


    if (showModalRef.current) {
      setShowModal(false);
      setCountdown(INACTIVITY_CONFIG.COUNTDOWN_TIME / 1000);
    }


    lastActivityRef.current = Date.now();


    timeoutRef.current = setTimeout(() => {
      setShowModal(true);
      startCountdown();
    }, INACTIVITY_CONFIG.INACTIVITY_TIME);
  }, [startCountdown]);

  const handleActivity = useCallback(() => {
    if (showModalRef.current) return;

    const now = Date.now();
    const timeSinceLastActivity = now - lastActivityRef.current;


    if (timeSinceLastActivity < INACTIVITY_CONFIG.THROTTLE_OTHER_EVENTS) {
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
      throttleRef.current = setTimeout(() => {
        resetInactivityTimer();
      }, INACTIVITY_CONFIG.THROTTLE_OTHER_EVENTS - timeSinceLastActivity);
      return;
    }

    resetInactivityTimer();
  }, [resetInactivityTimer]);


  const handleFrequentActivity = useCallback(() => {
    const now = Date.now();

    if (now - lastActivityRef.current > INACTIVITY_CONFIG.THROTTLE_FREQUENT_EVENTS) {
      handleActivity();
    }
  }, [handleActivity]);


  const handleConfirm = useCallback(() => {

    resetInactivityTimer(true);
  }, [resetInactivityTimer]);


  useEffect(() => {
    const frequentEvents = ["mousemove"];
    const otherEvents = [
      "mousedown",
      "keypress",
      "keydown",
      "scroll",
      "touchstart",
      "click",
      "focus",
    ];


    frequentEvents.forEach((event) => {
      window.addEventListener(event, handleFrequentActivity, { passive: true });
    });

    otherEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });


    resetInactivityTimer();

    return () => {
      frequentEvents.forEach((event) => {
        window.removeEventListener(event, handleFrequentActivity);
      });
      otherEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      clearAllTimers();
    };
  }, [handleActivity, handleFrequentActivity, resetInactivityTimer, clearAllTimers]);

  const countdownPercentage = (countdown / (INACTIVITY_CONFIG.COUNTDOWN_TIME / 1000)) * 100;

  return (
    <Modal
      show={showModal}
      onHide={() => {}}
      backdrop="static"
      keyboard={false}
      centered
      size="sm"
    >
      <Modal.Header className="bg-warning text-dark custom-navbar-header" >
        <Modal.Title>¿Sigues en línea?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p className="mb-3">
          No hemos detectado actividad reciente. ¿Sigues aquí?
        </p>
        <div className="mb-3">
          <ProgressBar
            now={countdownPercentage}
            variant="danger"
            animated
            className="mb-2"
          />
          <small className="text-muted">
            Redirigiendo en {countdown} segundo{countdown !== 1 ? "s" : ""}...
          </small>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleConfirm} className="w-100">
          Sí, sigo aquí
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InactivityDetector;

