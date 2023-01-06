import BaseService from "./Base.service";
import {ITF_ApiResponse} from "@/TS";

class ExampleServiceClass extends BaseService {
  buy = (data: any): Promise<ITF_ApiResponse> => {
    return this.axiosInstance().get(``);
  };
}

export const ExampleService = new ExampleServiceClass();
