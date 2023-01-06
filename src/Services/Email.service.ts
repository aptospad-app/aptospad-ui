import BaseService from "./Base.service";
import {ITF_ApiResponse} from "@/TS";

class EmailServiceClass extends BaseService {
  addNewsletter = (email: string): Promise<ITF_ApiResponse> => {
    return this.axiosInstance().post(`https://aptospad.app/api/v1/email/subscribe`, {email});
  };
}

export const EmailService = new EmailServiceClass();
