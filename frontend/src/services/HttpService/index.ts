import axios, { AxiosInstance, AxiosResponse } from "axios";
import { pathOr } from "ramda";
import { stringify, Stringifiable } from "query-string";
import { authInstance } from "../AuthService/Firebase";
import history from "../../history";

export class HttpService {
  private axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: this.trimSlashes(process.env.REACT_APP_BACKEND_URL!),
    });
    this.axios.interceptors.response.use(
      this.onFulfilledRequest,
      this.onRejectedRequest
    );
  }

  public async get<T>(
    url: string,
    options?: { params: any }
  ): Promise<T | void> {
    if (this.hasToLogin()) {
      return history.push("sign-in");
    }
    const token = await this.buildToken();
    let queryParams = "";
    if (options && options.params) {
      queryParams = this.getQueryStringFromParams(options.params);
    }
    const response = await this.axios.get<T>(
      `${this.trimSlashes(url)}${queryParams}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async post<T>(url: string, data?: any): Promise<T | void> {
    if (this.hasToLogin()) {
      return history.push("sign-in");
    }
    const token = await this.buildToken();
    const response = await this.axios.post<T>(this.trimSlashes(url), data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async put(url: string, data: any) {
    if (this.hasToLogin()) {
      return history.push("sign-in");
    }
    const token = await this.buildToken();

    const response = await this.axios.put(this.trimSlashes(url), data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    return response.data;
  }

  public async delete(url: string) {
    if (this.hasToLogin()) {
      return history.push("sign-in");
    }
    const token = await this.buildToken();

    const response = await this.axios.delete(this.trimSlashes(url), {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  }

  private trimSlashes(str: string): string {
    return str.replace(/\/+\s*$/, "").replace(/^\/+\s*/, "");
  }

  private onFulfilledRequest = (response: AxiosResponse) => response;

  private onRejectedRequest(error: any) {
    if (!error.response) throw error;
    switch (error.response.status) {
      case 401:
      case 403:
        if (!this.hasToLogin()) {
          authInstance?.signOut().then(() => history.push("/sign-in"));
        } else {
          history.push("/sign-in");
        }
        return;
      case 500:
        throw pathOr(error, ["response", "data"], error);
      case 404:
      case 400:
        throw pathOr({ message: error }, ["response", "data"], error);
    }
  }

  private hasToLogin(): boolean {
    return authInstance!.currentUser === null;
  }

  private async buildToken(): Promise<string> {
    let token = await authInstance!.currentUser!.getIdToken();
    return `Bearer ${token}`;
  }

  private getQueryStringFromParams(
    params: Record<
      string,
      string | number | boolean | Stringifiable[] | null | undefined
    >
  ): string {
    return `?${stringify(params)}`;
  }
}

export const httpService = new HttpService();
