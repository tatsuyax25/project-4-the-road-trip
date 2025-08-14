export default function Loading() {
  return (
    <div className="ui grid" style={{ height: "100vh", alignItems: "center", justifyContent: "center" }}>
      <div className="ui column" style={{ maxWidth: 450, textAlign: "center" }}>
        <div className="ui loader"></div>
        <p>Loading</p>
      </div>
    </div>
  );
}