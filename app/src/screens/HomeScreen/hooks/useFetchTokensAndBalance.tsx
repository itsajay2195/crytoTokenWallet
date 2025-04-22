import { StyleSheet } from "react-native";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  hideLoader,
  showLoader,
  updateWalletData,
} from "@/store/slices/walletSlice";
import { getETHBalance } from "@/services/wallet";
import { getWalletInstance } from "@/utils/walletUtils";
import { getTokenBalances } from "@/services/token";
import { setPrivateKey as setPrivateKeyToState } from "../../../store/slices/sendTokenSlice";
import { setTokens } from "@/store/slices/tokensSlice";

const useFetchTokensAndBalance = (
  privateKey: any,
  triggerSnackBar: any,
  isFocused: any
) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        dispatch(showLoader());
        //  setLoading(true);
        let result = await getETHBalance(privateKey);
        let { address } = getWalletInstance(privateKey);
        let tokensList = await getTokenBalances(address);
        if (result?.isValid) {
          dispatch(updateWalletData(result));
          dispatch(setPrivateKeyToState(privateKey));
          dispatch(setTokens(tokensList));
        } else {
          triggerSnackBar(result?.message || "Something went wrong");
        }
      } catch (error) {
        triggerSnackBar("Something went wrong");
      } finally {
        dispatch(hideLoader());
      }
    })();
    return () => {
      dispatch(hideLoader());
    };
  }, [isFocused]);
};

export default useFetchTokensAndBalance;
