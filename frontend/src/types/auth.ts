export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}
