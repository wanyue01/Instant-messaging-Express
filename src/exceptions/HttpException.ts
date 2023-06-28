class HTTPException {
  status: number;
  message: string;
  error: any;
  constructor(status: number, message: string, error?: any) {
    this.status = status;
    this.message = message;
    this.error = error || {};
  }
}

export default HTTPException;