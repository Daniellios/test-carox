import React, { useState, type FC } from "react";

import { createContext } from "react";

export interface IAppProps {
  children: React.ReactNode;
}

export interface IFormData {
  creditSum: number;
  firstPayment: number;
  creditTime: number;
  totalSum: number;
  monthlyPayment: number;
  name: string;
  phone: string;
}

export interface IAppContext {
  isSideMenuOpen: boolean;
  isPopupOpen: boolean;
  formData: IFormData;
  handleFormData: (form: IFormData) => void;
  togglePopup: () => void;
  toggleMenu: () => void;
}

export const AppContext = createContext<IAppContext | null>(null);

export const AppState: FC<IAppProps> = ({ children }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<IFormData>({
    creditSum: 0,
    creditTime: 0,
    firstPayment: 0,
    monthlyPayment: 0,
    name: "",
    phone: "",
    totalSum: 0,
  });

  const handleFormData = (updatedForm: IFormData) => {
    setFormData({ ...formData, ...updatedForm });
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <AppContext.Provider
      value={{
        isSideMenuOpen,
        toggleMenu,
        isPopupOpen,
        togglePopup,
        formData,
        handleFormData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
