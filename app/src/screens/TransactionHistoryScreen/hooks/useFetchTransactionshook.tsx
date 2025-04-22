import { StyleSheet } from "react-native";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  hideTransactionLoader,
  setTransactions,
  showTransactionLoader,
} from "@/store/slices/transactionHistorySlice";
import { getTransactions } from "@/services/wallet";
import { useSnackBar } from "@/context/SnackBarProvider";

const useFetchTransactionshook = (privateKey: string) => {
  const dispatch = useDispatch();
  const { triggerSnackBar } = useSnackBar();
  useEffect(() => {
    (async () => {
      try {
        dispatch(showTransactionLoader());
        let data = await getTransactions(privateKey);
        dispatch(setTransactions(data));
      } catch (error) {
        triggerSnackBar("Something went wrong, please try again ");
      } finally {
        dispatch(hideTransactionLoader());
      }
    })();

    return () => {
      dispatch(setTransactions([]));
      dispatch(setTransactions(hideTransactionLoader()));
    };
  }, []);
};

export default useFetchTransactionshook;

const styles = StyleSheet.create({});
