import React from "react";
import popup_styles from "@/styles/Popup.module.css";

import InputMask, { Props as MaskProps } from "react-input-mask";

interface IPopupInput {
  value: string;
  type?: string;
  placeholder?: string;
  onValueEnter: (str: string) => void;
  disabled?: boolean;
}

const PopupInput: React.FC<IPopupInput> = ({
  value,
  type,
  placeholder,
  onValueEnter,
  disabled,
}) => {
  const makeMaskInput = (inputProps: MaskProps) => {
    return (
      <input
        className={`${popup_styles.form_input} ${popup_styles.form_input_phone}`}
        required={true}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        {...inputProps}
      ></input>
    );
  };

  const RenderPhoneInput = () => {
    return (
      <div className={popup_styles.phone_input_wrapper}>
        <InputMask
          mask="+7 (999) 999 99 99"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onValueEnter(e.target.value)}
        >
          {
            // @ts-ignore
            makeMaskInput
          }
        </InputMask>

        <div className={popup_styles.phone_input_placeholder}>
          <p className={popup_styles.phone_input_placeholder_title}>
            Телефон <span className={popup_styles.transparent}>*</span>
          </p>
        </div>
      </div>
    );
  };

  const RenderNameInput = () => {
    return (
      <div className={popup_styles.name_input_wrapper}>
        <input
          required={true}
          value={value}
          onChange={(e) => onValueEnter(e.target.value)}
          className={popup_styles.form_input}
          type={type}
          placeholder={placeholder}
        />
      </div>
    );
  };

  const PhoneInput = RenderPhoneInput();
  const NameInput = RenderNameInput();

  return <>{type === "tel" ? PhoneInput : NameInput}</>;
};

export default PopupInput;
