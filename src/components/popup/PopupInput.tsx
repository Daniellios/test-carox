import React, { FormEvent, useState } from "react";
import popup_styles from "@/styles/Popup.module.css";

import InputMask, { Props as MaskProps } from "react-input-mask";
import Check from "../svg/Check";

interface IPopupInput {
  value: string;
  type?: string;
  isError: boolean;
  placeholder?: string;
  onValueEnter: (str: string) => void;
  disabled?: boolean;
}

const PopupInput: React.FC<IPopupInput> = ({
  value,
  type,
  placeholder,
  onValueEnter,
  isError,
  disabled,
}) => {
  const makeMaskInput = (inputProps: MaskProps) => {
    return (
      <input
        className={`${popup_styles.form_input} ${
          popup_styles.form_input_phone
        } ${isError ? popup_styles.input_error : ""}`}
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

        <div
          className={` ${
            value !== "" && !isError
              ? popup_styles.input_check
              : popup_styles.input_check_hidden
          }`}
        >
          <Check></Check>
        </div>

        {isError && (
          <div className={popup_styles.validationMessage}>Не заполнено</div>
        )}
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
          className={`${popup_styles.form_input} ${
            isError ? popup_styles.input_error : ""
          }`}
          type={type}
          placeholder={placeholder}
        />

        <div
          className={` ${
            value !== "" && !isError
              ? popup_styles.input_check
              : popup_styles.input_check_hidden
          }`}
        >
          <Check></Check>
        </div>

        {isError && (
          <div className={popup_styles.validationMessage}>Не заполнено</div>
        )}
      </div>
    );
  };

  const PhoneInput = RenderPhoneInput();
  const NameInput = RenderNameInput();

  return <>{type === "tel" ? PhoneInput : NameInput}</>;
};

export default PopupInput;
