export default function OccupationInputComponent(prop) {
  return (
    <>
      <label htmlFor="occupation">職業/肩書</label>
      <br />
      <input
        id="occupation"
        type="text"
        name="occupation"
        className="w-64 border-solid border-2"
        {...prop.register("occupation")}
      />
    </>
  );
}
