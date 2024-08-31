import { useState, useEffect } from "react";

function useScreenOrientation() {
  const [orientation, setOrientation] = useState(
    window.screen.orientation.type
  );

  useEffect(() => {
    const handleOrientationChange = () =>
      setOrientation(window.screen.orientation.type);
    window.addEventListener("orientationchange", handleOrientationChange);
    return () =>
      window.removeEventListener("orientationchange", handleOrientationChange);
  }, []);

  return orientation;
}

export default useScreenOrientation;
