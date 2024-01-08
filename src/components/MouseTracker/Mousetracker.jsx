function Mousetracker({ mousePosition = { x: 0, y: 0 }, radius }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${mousePosition.x - radius}px`,
        top: `${mousePosition.y - radius}px`,
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        borderRadius: "50%",
        background: "red", // Circle color
        opacity: 0.5,
        transition: "height 0.1s, width 0.1s",
      }}
    />
  );
}
export default Mousetracker;
