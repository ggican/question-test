'use client';

import axios from 'axios';
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from 'react';
import { verifyToken } from '@/auth';

export type IOnSubmitValue = (values: any) => void;
export type IButtonRef = React.MutableRefObject<HTMLButtonElement | null>;

export type DataType = {
  no: string;
  question: string;
  response_type: string;
  choices?: string;
  urlFile?: string;
};

export type FormElementType = {
  form: any;
};

export type FormElementProps = {
  onSubmitValue: IOnSubmitValue;
  refButtonSubmit: IButtonRef;
} & DataType;

export type IQuestionValue = {
  [key: string]: string;
};

// Define context type
export type MyContextType = {
  orderNumber: number;
  setOrderNumber: Dispatch<SetStateAction<number>>;
  handleNext: () => void;
  handlePrev: () => void;
  onSubmitValue: IOnSubmitValue;
  data: DataType[];
  question: DataType;
  total: number;
  isLogin: boolean;
  refButtonLogin: IButtonRef;
  refButtonSubmit: IButtonRef;
  onSubmitLogin: (values: IProfileDetails) => void;
  tokenLocal: string;
  isLoading: boolean;
  isLoadingSubmit: boolean;
  isSubmitDone: boolean;
};
export type MyContextProviderProps = {
  children: ReactNode;
};
export type IProfileDetails = {
  name: string;
  email: string;
  token: string;
  id: string;
  tokenBearer: string;
  company_name: string;
};
export type ILoginForm = {
  name: string;
  email: string;
  company_name: string;
};

// Create a new context
export const MyContext = createContext<MyContextType | undefined>(undefined);

// Context provider component

export const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const refButtonLogin = useRef<HTMLButtonElement>(null);
  const refButtonSubmit = useRef<HTMLButtonElement>(null);
  const [orderNumber, setOrderNumber] = useState<number>(0);
  const [tokenLocal, setToken] = useState<string>('');
  const [isLogin, setLogin] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isLoadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [isSubmitDone, submitDone] = useState<boolean>(false);
  const [allQuestion, setAllQuestion] = useState<DataType[]>([]);
  const total: number = data?.results?.questions?.length;
  const handleNext = () => {
    if (orderNumber === total + 1 - 1) {
      return;
    }
    const resultNumber = orderNumber + 1;
    setOrderNumber(resultNumber);
    localStorage.setItem('number', `${resultNumber}`);
  };
  const handlePrev = () => {
    const resultNumber = orderNumber - 1;
    setOrderNumber(resultNumber);
    localStorage.setItem('number', `${resultNumber}`);
  };

  const onSubmitLogin = async (values: IProfileDetails) => {
    setLoadingSubmit(true);
    const response = await axios.post('/api/login', values);
    const result = response.data;
    if (result?.code === 200) {
      await onGetQuestion({
        ...result?.data,
        tokenBearer: result?.token,
      });
      setToken(result?.token);
      setLogin(true);
      localStorage.setItem('token', result?.token);
    }
    setLoadingSubmit(false);
  };

  const onGetQuestion = async (values: IProfileDetails) => {
    const response = await axios.get(`/api/test/${values?.id}`, {
      headers: {
        Authorization: `Bearer ${values?.tokenBearer}`,
      },
    });
    if (response?.status === 200) {
      setAllQuestion(response?.data?.results?.questions);
    }
  };

  const onClearLogin = () => {
    setToken('');
    setLogin(false);
    localStorage.setItem('token', '');
  };

  const onVerifyToken = async (localToken: string | null) => {
    if (localToken) {
      const result = await verifyToken(localToken);
      if (result) {
        await onGetQuestion({ ...result, tokenBearer: localToken });
        setToken(localToken);
        setLogin(true);
      } else {
        onClearLogin();
      }
    } else {
      onClearLogin();
    }
    setLoading(false);
  };

  const onSubmitValue = async (values: IQuestionValue) => {
    setLoadingSubmit(true);
    const result = await verifyToken(tokenLocal);
    const response = await axios.post(
      `/api/test/${result?.id}`,
      {
        ...values,
      },
      {
        headers: {
          Authorization: `Bearer ${tokenLocal}`,
        },
      }
    );
    if (response?.status === 200) {
      submitDone(true);
    }
    setLoadingSubmit(false);
  };

  useEffect(() => {
    const localStorageNumber = localStorage && localStorage.getItem('number');
    const currentNumber: number = localStorageNumber ? Number(localStorageNumber) : 0;
    setOrderNumber(currentNumber || 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    const localToken = localStorage ? localStorage.getItem('token') : '';
    onVerifyToken(localToken);
  }, []);

  return (
    <MyContext.Provider
      value={{
        isLogin,
        orderNumber,
        setOrderNumber,
        handlePrev,
        handleNext,
        data: data?.results?.questions || [],
        question: allQuestion[orderNumber],
        total: total + 1,
        refButtonLogin,
        onSubmitLogin,
        tokenLocal,
        isLoading,
        refButtonSubmit,
        onSubmitValue,
        isLoadingSubmit,
        isSubmitDone,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

const data = {
  status: 'success',
  results: {
    testid: '1234',
    teststatus: 'TODO',
    questions: [
      {
        no: '1',
        question: 'This is an example question which re ?',
        response_type: 'text',
        choices: '',
      },
      {
        no: '2',
        question: 'This is an example question which re ?',
        response_type: 'choice',
        choices: 'A|B|C|D',
      },
      {
        no: '3',
        question: 'This is an example question which re ?',
        response_type: 'file',
        choices: '',
      },
    ],
  },
};
