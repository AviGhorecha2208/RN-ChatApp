import { HttpStatusCode } from 'axios';

// Common Interfaces
export interface CommonApiResponse<T> {
  data: T;
  status_code: HttpStatusCode;
  message: string;
  status: number;
  status_text: string | null | undefined;
}

export type NavigateFunction = <T extends keyof ScreenParams>(
  screen: T,
  params?: ScreenParams[T],
) => void;

export type ErrorWithMessage = {
  message: string;
  error?: string;
};

export interface RegisterUserResponse {
  username: string;
  id: number | null;
  created_at: string;
  expires_at: string;
}

export interface Room {
  id: number;
  name: string;
  created_at: string;
  expires_at: string;
}
