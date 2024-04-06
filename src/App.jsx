import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 50,
    y: window.innerHeight / 2 - 50,
  });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // for resizing the window
  useEffect(() => {
    const handleResize = () => {
      setPosition({
        x: window.innerWidth / 2 - 50,
        y: window.innerHeight / 2 - 50,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // for dragging the box
  const handleMouseDown = (e) => {
    console.log("down");
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });

  };

  // for moving the box
  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }

   };

  // for dropping the box
  const handleMouseUp = async () => {
    setDragging(false);

    if (
      position.x < window.innerWidth / 2 - 50 &&
      position.y < window.innerHeight / 2 - 50
    ) {
      setPosition({
        x: 0,
        y: 0,
      });
    }
    if (
      position.x < window.innerWidth / 2 - 50 &&
      position.y > window.innerHeight / 2 - 50
    ) {
      setPosition({
        x: 0,
        y: window.innerHeight - 100,
      });
    }
    if (
      position.x > window.innerWidth / 2 - 50 &&
      position.y < window.innerHeight / 2 - 50
    ) {
      setPosition({
        x: window.innerWidth - 100,
        y: 0,
      });
    }
    if (
      position.x > window.innerWidth / 2 - 50 &&
      position.y > window.innerHeight / 2 - 50
    ) {
      setPosition({
        x: window.innerWidth - 100,
        y: window.innerHeight - 100,
      });
    }
  };

  return (
    <div
      className="container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="part-a">A</div>
      <div className="part-b">B</div>
      <div className="part-c">C</div>
      <div className="part-d">D</div>
      <div
        className="box"
        style={{ left: position.x, top: position.y }}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
}

export default App;
