import { fetchApi } from "@/lib/fetch";
import {
  faArrowLeftLong,
  faArrowRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BottomDialog from "@/components/BottomDialog";
import type { InferGetStaticPropsType, GetStaticProps, NextPage } from "next";
import { AppProps } from "next/app";
import MyProgress from "@/components/MyProgress";
import Link from "next/link";
import BackComponent from "@/components/BackComponent";

type MonthlyType = {
  id: string;
  name: string;
  value: string;
  createdAt: number;
  updatedAt?: number;
};

type DataType = {
  count: number;
  rows: MonthlyType[];
};

type AddMonthFormType = {
  month: Date;
};

interface AddMonthFormInterface {
  onSubmit: (value: AddMonthFormType) => void;
  resetForm: boolean;
  submitting: boolean;
}

const Monthly: NextPage<{
  notify: (type: string, message: string) => void;
}> = ({ notify }) => {
  const router = useRouter();

  const [showDialogAdd, setShowDialogAdd] = useState(false);
  const [progress, setProgress] = useState(false);
  const [data, setData] = useState<DataType | null>();

  const getMonth = () => {
    setProgress(true);
    fetchApi({ url: "/month" })
      .then((result) => {
        setData(result);
        setProgress(false);
      })
      .catch(() => setProgress(false));
  };

  const [submitting, setSubmitting] = useState(false);
  const createMonth = ({ month }: AddMonthFormType) => {
    if (submitting) return;
    setSubmitting(true);
    fetchApi({
      url: "/month",
      method: "POST",
      body: { value: moment(month).format("YYYY-MM-DD") },
    })
      .then(() => {
        setSubmitting(false);
        setShowDialogAdd(false);
        notify("success", "Success");
        getMonth();
      })
      .catch((err) => {
        notify("error", err.message);
        setSubmitting(false);
      });
  };

  useEffect(() => {
    getMonth();
    console.log("xxx", router.query);
  }, []);

  const onClickItem = (url: string) => {
    router.push(url);
  };

  return (
    <div className="flex flex-col gap-4">
      <MyProgress show={progress} />
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <BackComponent />
          <h1 className="text-sm">Menu 1</h1>
        </div>
        <button
          className="btn btn-primary btn-sm normal-case"
          onClick={() => setShowDialogAdd(true)}
        >
          <FontAwesomeIcon icon={faPlus} /> Add
        </button>
      </div>
      <table className="table">
        <tbody>
          {data?.rows?.map(({ name }) => (
            <tr key={name} className="hover">
              <td>{name}</td>
              <td className="w-8">
                <Link href={`/monthly/${name}`} shallow={true}>
                  <button
                    // onClick={() => onClickItem(`/monthly/${name}`)}
                    className="btn btn-sm btn-secondary"
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BottomDialog
        title={"Add Month"}
        isShown={showDialogAdd}
        hide={() => setShowDialogAdd(false)}
      >
        <AddMonthForm
          resetForm={showDialogAdd}
          onSubmit={(value) => createMonth(value)}
          submitting={submitting}
        />
      </BottomDialog>
    </div>
  );
};

const AddMonthForm: FC<AddMonthFormInterface> = ({
  onSubmit,
  resetForm,
  submitting,
}) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMonthFormType>({ mode: "all" });

  useEffect(() => {
    reset();
  }, [resetForm]);

  return (
    <form className="h-full flex items-cente" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2 w-full items-start h-full py-4">
        <div className="flex-grow">
          <Controller
            render={({ field: { onChange, onBlur, name, value, ref } }) => (
              <>
                <DatePicker
                  wrapperClassName="w-full"
                  showMonthYearPicker
                  selected={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  name={name}
                  dateFormat={"YYY-MMM"}
                  onFocus={() => console.log("sedang focus")}
                  placeholderText="YYYY-MMM"
                  customInput={
                    <input
                      autoComplete="off"
                      name={name}
                      ref={ref}
                      className={`
                        input input-bordered input-sm
                        text-center rounded-md w-full
                        ${errors?.month && "input-error"}
                      `}
                    />
                  }
                />
                <div className="text-error text-xs text-end">
                  {errors.month && errors.month.message}
                </div>
              </>
            )}
            name={"month"}
            control={control}
            rules={{
              required: { value: true, message: "Choose month and year" },
            }}
          />
        </div>

        <button className="btn btn-primary btn-sm normal-case" type="submit">
          {submitting && (
            <span className="loading m-0 p-0 loading-spinner loading-xs" />
          )}
          Submit
        </button>
      </div>
    </form>
  );
};

export default Monthly;
