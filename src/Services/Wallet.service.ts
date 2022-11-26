import BaseService from "./Base.service";
import {ITF_ApiResponse} from "@/TS";

class WalletServiceClass extends BaseService {
  getReferralInfo = (walletAddress: string): Promise<ITF_ApiResponse> => {
    return this.axiosInstance().get(`https://aptospad.app/api/v1/wallet/infos/${walletAddress}`);
  };

  addReferral = (data: {
    public_key: string;
    address: string;
    signature: string;
    referrer: string;
  }): Promise<ITF_ApiResponse> => {
    return this.axiosInstance().post(`https://aptospad.app/api/v1/wallet/mapping-ref`, data);
  };
}

export const WalletService = new WalletServiceClass();
