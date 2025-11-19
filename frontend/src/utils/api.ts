import axios, { AxiosError } from "axios";

interface ApiOptions {
  baseUrl: string;
  headers: Record<string, string>;
}

export interface Dado {
  id?: number;
  title: string;
  content: string;
}

interface ApiErrorResponse {
  message?: string;
}

class Api {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(options: ApiOptions) {
    this.baseURL = options.baseUrl;
    this.headers = options.headers;
  }

  private handleError(error: AxiosError<ApiErrorResponse>): string {
    if (error.response) {
      return `Error: ${error.response.status} - ${
        error.response.data?.message || error.message
      }`;
    }
    return `Network error: ${error.message}`;
  }

async createDado(data: Dado): Promise<Dado> {
  const { title, content } = data;

  if (!title || !content) {
    return Promise.reject("Todos os campos são obrigatórios.");
  }

  try {
    const res = await axios.post(`${this.baseURL}/dados`, data, {
      headers: this.headers,
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(this.handleError(err));
    }
    throw new Error("Erro inesperado.");
  }
}

async getDados(): Promise<Dado[]> {
  try {
    const res = await axios.get(`${this.baseURL}/dados`, {
      headers: this.headers,
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(this.handleError(err));
    }
    throw new Error("Erro inesperado.");
  }
}

async deleteDado(id: number): Promise<{ message: string }> {
  try {
    const res = await axios.delete(`${this.baseURL}/dados/${id}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(this.handleError(err));
    }
    throw new Error("Erro inesperado.");
  }
}


async updateDado(id: number, fields: Partial<Dado>): Promise<Dado> {
  if (!id) {
    return Promise.reject("O ID é obrigatório.");
  }

  try {
    const res = await axios.patch(
      `${this.baseURL}/dados/${id}`,
      fields,
      { headers: this.headers }
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(this.handleError(err));
    }
    throw new Error("Erro inesperado.");
  }
}

}

export const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
