import React, { HTMLInputTypeAttribute } from "react";
import classNames from "classnames/bind";
import styles from "./TextInput.module.scss";
import ControlledTextInputType, {
  TextInputType,
} from "../../../types/Form/FormInputs/TextInput";
import FormInputWrapper from "../FormInputWrapper";
import FormIcon from "../FormIcon";

const cx = classNames.bind(styles);

const TextInput: React.FC<TextInputType> = ({
  name,
  placeholder = "",
  className = "",
  style,
  showIcon = false,
  isDisabled = false,
  isValidated = false,
  isError = false,
  inputRef,
  onChange,
  onBlur,
  unit,
  type = "text",
  value = "",
  step = "any",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      if (e.target.value) {
        if (typeof step === "number" && step % 1 === 0) {
          onChange(parseInt(e.target.value));
        } else {
          onChange(parseFloat(e.target.value));
        }
      } else {
        onChange(undefined);
      }
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`${styles.wrapper} ${className}`} style={style}>
      <div className={styles.inputContainer}>
        <input
          id={name}
          className={cx("input", {
            "input--error": isError,
            "input--disabled": isDisabled,
            "input--truncated": showIcon,
          })}
          placeholder={placeholder}
          ref={inputRef}
          onChange={handleChange}
          onBlur={onBlur}
          value={value}
          type={type as HTMLInputTypeAttribute}
          step={type === "number" ? step : undefined}
          disabled={isDisabled}
        />

        {showIcon && (
          <FormIcon
            isValidated={isValidated}
            isError={isError}
            isDisabled={isDisabled}
          />
        )}
      </div>

      {unit && <div className={styles.unit}>{unit}</div>}
    </div>
  );
};

const ControlledTextInput = (props: ControlledTextInputType) => {
  return <FormInputWrapper {...props} as={TextInput} />;
};

export default ControlledTextInput;
