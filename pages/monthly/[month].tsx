import MyProgress from "@/components/MyProgress";
import { faArrowLeftLong, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import BackComponent from "@/components/BackComponent";
import { usePathname } from "next/navigation";
import { Budgeting } from "@/models/Budgeting";
import { fetchApi } from "@/lib/fetch";
import moment from "moment";
import BottomDialog from "@/components/BottomDialog";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import { NextPage } from "next";

enum TypeEnum {
  in = "in",
  out = "out",
}
type DialogType = {
  action: string;
  type: TypeEnum;
  title: string;
  data?: any;
};

type FormType = {
  id: string | null;
  name: string;
  amount: number;
  type: TypeEnum;
};
interface FormInterface {
  onSubmit: (data: FormType) => void;
  type: TypeEnum;
  progress: boolean;
}

const PerMonth: NextPage<{
  notify: (type: string, message: string) => void;
}> = ({ notify }) => {
  const router = useRouter();
  const [progress, setProgress] = useState<boolean>(false);
  const pathname = usePathname();
  const { month } = router.query;
  const [budgeting, setBudgeting] = useState<Budgeting | null>(null);

  const getBudget = useCallback((month: string) => {
    setProgress(true);
    fetchApi({ url: `/budgeting/${month}` })
      .then((result) => {
        setBudgeting(result);
        setProgress(false);
      })
      .catch(() => setProgress(false));
  }, []);

  useEffect(() => {
    // getBudget();
    if (month) {
      getBudget(month.toString());
    }
  }, [month, getBudget]);

  const [dialog, setDialog] = useState<DialogType | null>(null);
  const onSubmit = (data: FormType) => {
    setProgress(true);
    fetchApi({
      url: `/budgeting/${month}`,
      method: "POST",
      body: { ...data },
    })
      .then(() => {
        getBudget(month?.toString() || "");
        setProgress(false);
        setDialog(null);
        notify("success", "Success");
      })
      .catch((err) => {
        setProgress(false);
        notify("error", err.message);
      });
  };

  return (
    <div className="flex flex-col gap-4 text-base-content">
      <MyProgress show={progress} />
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <BackComponent to="/monthly" from={pathname} />
          <h1 className="text-sm">
            {moment(budgeting?.month?.value).format("MMM YYYY")}
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <div className="shadow-lg flex flex-col gap-4 rounded-md bg-white p-4 md:p-4">
          <div className="text-sm font-semibold text-base-content py-1 flex justify-between border-b items-center pb-2">
            <div>SO</div>
            <button
              onClick={() =>
                setDialog({ action: "create", title: "Add", type: TypeEnum.in })
              }
              className="btn btn-xs btn-circle btn-primary"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          <table className="text-sm w-full">
            <tbody className="text-xs">
              {budgeting?.ins?.map(({ _id, amount, name }) => {
                return (
                  <tr key={_id}>
                    <td>{name}</td>
                    <td className="text-right">
                      IDR{Number(amount).toLocaleString("id")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="border-t flex justify-between text-sm font-semibold">
            <div>Total</div>
            <div>
              IDR
              {Number(
                budgeting?.ins?.reduce((a, b) => a + Number(b.amount), 0)
              ).toLocaleString("id")}
            </div>
          </div>
        </div>

        <div className="shadow-lg flex flex-col gap-4 rounded-md bg-white p-4 md:p-4">
          <div className="text-sm font-semibold text-base-content py-1 flex justify-between border-b items-center pb-2">
            <div>OS</div>
            <button
              onClick={() =>
                setDialog({
                  action: "create",
                  title: "Add",
                  type: TypeEnum.out,
                })
              }
              className="btn btn-xs btn-circle btn-primary"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          <table className="text-sm w-full">
            <tbody className="text-xs">
              {budgeting?.outs?.map(({ _id, amount, name }) => {
                return (
                  <tr key={_id}>
                    <td>{name}</td>
                    <td className="text-right">
                      IDR{Number(amount).toLocaleString("id")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="border-t flex justify-between text-sm font-semibold">
            <div>Total</div>
            <div>
              IDR
              {Number(
                budgeting?.outs?.reduce((a, b) => a + Number(b.amount), 0)
              ).toLocaleString("id")}
            </div>
          </div>
        </div>
      </div>
      <BottomDialog
        title={dialog?.title}
        isShown={!!dialog}
        hide={() => setDialog(null)}
      >
        {dialog?.action === "create" ? (
          <Form
            onSubmit={(data) => onSubmit(data)}
            type={dialog.type}
            progress={progress}
          />
        ) : (
          <></>
        )}
      </BottomDialog>
    </div>
  );
};

const Form: FC<FormInterface> = ({ onSubmit, type, progress }) => {
  const {
    setValue,
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>({
    mode: "all",
  });

  useEffect(() => {
    setValue("type", type);
  }, [setValue, type]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <TextInput
          name="name"
          label="Name"
          type="text"
          register={register("name", {
            required: { value: true, message: "Please fill name" },
          })}
          error={errors?.name}
        />
        <TextInput
          name="amount"
          label="Amount"
          type="number"
          register={register("amount", {
            required: { value: true, message: "Please fill amount" },
          })}
          error={errors?.amount}
        />
        <div className="flex justify-end">
          <button
            className={`btn btn-primary btn-sm ${progress && "btn-disabled"}`}
          >
            {progress === true && (
              <span className="loading loading-spinner loading-sm" />
            )}
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default PerMonth;
