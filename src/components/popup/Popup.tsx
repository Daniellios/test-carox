import React, { useContext, useState } from "react";
import popup_styles from "@/styles/Popup.module.css";
import shared_styles from "@/styles/Shared.module.css";
import { AppContext, IAppContext } from "@/context/appContext";
import Link from "next/link";
import PopupInput from "./PopupInput";
import Close from "../svg/Close";
import WhatsApp from "../svg/WhatsApp";
import Telegram from "../svg/Telegram";

const Popup = () => {
  const { isPopupOpen, togglePopup, handleFormData, formData } = useContext(
    AppContext
  ) as IAppContext;

  const [phone, setPhone] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [IsPhoneError, setIsPhoneError] = useState<boolean>(false);
  const [isNameError, setIsNameError] = useState<boolean>(false);

  const enableErrorMessage = (InvalidField: any) => {
    InvalidField.classList.add(`${popup_styles.input_error}`);
  };

  const removeErrorMessage = (InvalidField: any) => {
    InvalidField.classList.remove(`${popup_styles.input_error}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const FormElement = e.target as HTMLFormElement;
    const isValid = FormElement.checkValidity();
    const InvalidFields = FormElement.querySelectorAll(":invalid");

    InvalidFields.forEach((field) => enableErrorMessage(field));

    if (isValid) {
      InvalidFields.forEach((field) => removeErrorMessage(field));
      setIsNameError(false);
      setIsPhoneError(false);

      setIsLoading(true);
      setTimeout(() => {
        handleFormData({ ...formData, phone, name });
        togglePopup();
        console.log(formData);

        setIsLoading(false);
      }, 2500);
    } else {
      setIsNameError(true);
      setIsPhoneError(true);
    }
  };

  return (
    <div
      className={`${popup_styles.container} ${
        isPopupOpen ? popup_styles.open : popup_styles.closed
      }`}
    >
      <div
        className={`${popup_styles.shadow} ${
          isPopupOpen ? "" : popup_styles.hidden
        } `}
      ></div>

      <button onClick={togglePopup} className={popup_styles.button_close}>
        <Close />
      </button>

      <div className={popup_styles.form_wrapper}>
        <div className={popup_styles.form_header}>
          <h2 className={popup_styles.form_title}>????????????-????????????</h2>
          <p className={popup_styles.form_text}>
            ?????????????????? ??????????, ?? ???? ???????????? ???????????????? ?? ????????, ?????????? ???????????????? ????????????
            ??????????????
          </p>
        </div>

        <form onSubmit={handleSubmit} className={popup_styles.form} noValidate>
          <div className={popup_styles.inputs_container}>
            <PopupInput
              value={phone}
              isError={IsPhoneError}
              onValueEnter={(phone) => setPhone(phone)}
              placeholder="+7 (921) 123 45 67"
              type="tel"
            ></PopupInput>

            <PopupInput
              isError={isNameError}
              value={name}
              onValueEnter={(name) => setName(name)}
              placeholder="??????"
              type="text"
            ></PopupInput>
          </div>

          <div className={popup_styles.submit_container}>
            <button
              className={`${shared_styles.button_filled} ${popup_styles.form_submit}`}
            >
              {isLoading ? (
                <div className={shared_styles.loading_ring}>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "???????????????? ????????????"
              )}
            </button>
            <p className={popup_styles.form_user_agreement}>
              ?????????????? ???? ???????????? ?????????????????? ??????????????, ?????????? ????????????????
              <Link className={popup_styles.form_user_agreement_link} href={""}>
                {" "}
                ???? ?????????????????? ???????????????????????? ????????????
              </Link>
            </p>
          </div>
        </form>

        <div className={popup_styles.socials_container}>
          <div
            className={`${popup_styles.socials_wrap} ${popup_styles.socials_wrap_whatsapp}`}
          >
            <Link href={""}>
              <WhatsApp />
            </Link>
          </div>
          <div className={popup_styles.socials_wrap}>
            <Link href={"https://t.me/DaBlinni"} target="_blank">
              <Telegram />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
