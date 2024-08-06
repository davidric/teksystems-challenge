import { AxiosRequestConfig } from 'axios';

export interface ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
}

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface UseRequestConfig<T> extends AxiosRequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export interface FormValues {
  username: string;
  request: string;
}
export interface SubmitResponse {
  title: string;
  message: string;
}
