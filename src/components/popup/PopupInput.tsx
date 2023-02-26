import React, { FormEvent, useState } from "react";
import popup_styles from "@/styles/Popup.module.css";
import shared_styles from "@/styles/Shared.module.css";

import InputMask, { Props as MaskProps } from "react-input-mask";
import Check from "../svg/Check";

interface IPopupInput {
  value: string;
  type?: string;
  isError: boolean;
  placeholder?: string;
  onValueEnter: (str: string) => void;
  isDisabled?: boolean;
}

const PopupInput: React.FC<IPopupInput> = ({
  value,
  type,
  placeholder,
  onValueEnter,
  isError,
  isDisabled,
}) => {
  const makeMaskInput = (inputProps: MaskProps) => {
    return (
      <input
        className={`${popup_styles.form_input} ${
          popup_styles.form_input_phone
        } ${isError ? popup_styles.input_error : popup_styles.no_input_error}`}
        required={true}
        placeholder={placeholder}
        type={type}
        disabled={isDisabled}
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
            !isError
              ? popup_styles.input_check
              : popup_styles.input_check_hidden
          }`}
        >
          <Check></Check>
        </div>

        {isError && (
          <div className={popup_styles.validationMessage}>Не заполнено</div>
        )}

        {isDisabled ? (
          <div className={shared_styles.disable_overlay_popup}></div>
        ) : (
          ""
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

        {isDisabled ? (
          <div className={shared_styles.disable_overlay_popup}></div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const PhoneInput = RenderPhoneInput();
  const NameInput = RenderNameInput();

  return <>{type === "tel" ? PhoneInput : NameInput}</>;
};

export default PopupInput;
