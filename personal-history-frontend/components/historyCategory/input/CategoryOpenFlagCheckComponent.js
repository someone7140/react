export default function CategoryOpenFlagCheckComponent(prop) {
  const fieldName = `${prop.fieldArrayName}.${prop.index}.${prop.fieldName}`;
  return (
    <>
      <input
        id={fieldName}
        type="checkbox"
        name={fieldName}
        {...prop.register(fieldName)}
        checked={prop.checked}
        onChange={prop.onChange}
        className="w-4 h-4"
      />
    </>
  );
}
