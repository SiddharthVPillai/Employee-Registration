const ImageComponent = ({ path }) => {
  return (
    <div>
      <img
        src={path}
        alt="profile"
        style={{ height: "10rem", width: "10rem" }}
      />
    </div>
  );
};
export default ImageComponent;
