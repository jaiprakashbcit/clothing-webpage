import './form-input.styles.scss';

function FormInput({ labelOptions, inputOptions }) {
  const { label, htmlFor } = labelOptions;

  return (
    <div className="group">
      <input
        className="form-input"
        {...inputOptions}
      />
      {label && (
        <label
          htmlFor={htmlFor}
          className={`${inputOptions.value.length > 0 ? 'shrink' : null} form-input-label`}>
          {label}
        </label>
      )}
    </div>
  );
}

export default FormInput;
