import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  IActivity,
  fetchActivityData,
  getActivity,
} from "@/store/reducers/activitySlice";

const Index: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data: activityData } = useAppSelector((state) => state.activitySlice);

  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState("");
  const [type, setType] = useState("");
  const [participants, setParticipants] = useState(0);
  const [budget, setBudget] = useState(0);

  const handleClick = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await dispatch(getActivity());
      const responseData: IActivity = response.payload as IActivity;

      setActivity(responseData.activity);
      setType(responseData.type);
      setParticipants(responseData.participants);
      setBudget(responseData.price);
    } catch (error) {
      console.error("Error fetching activity:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activityData) {
      setActivity(activityData.activity);
      setType(activityData.type);
      setParticipants(activityData.participants);
      setBudget(activityData.price);
    }
  }, [activityData]);

  useEffect(() => {
    dispatch(fetchActivityData());
  }, []);

  return (
    <>
      <div className={"pageHeader"}>
        <h1>{t("Landing Page")}</h1>
        <p>{t("Landing Page description")}</p>
      </div>

      <div className={"form"}>
        <div className="box">
          <div className="box-100">
            <div className="box-10">
              <label>{t("Activity")}</label>
            </div>
            <div className="box-50">
              <p>{activity}</p>
            </div>
          </div>

          <div className="box-100">
            <div className="box-10">
              <label>{t("Type")}</label>
            </div>
            <div className="box-50">
              <p>{type}</p>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="box-center">
            <div className="box-50">
              <div className="box-10">
                <label>{t("Participant")}</label>
              </div>
              <div className="box-50">
                <p>{participants}</p>
              </div>
            </div>

            <div className="box-50">
              <div className="box-10">
                <label>{t("Budget")}</label>
              </div>
              <div className="box-50">
                <p>${budget}</p>
              </div>
            </div>
          </div>
        </div>

        <button className={"button"} onClick={handleClick} disabled={loading}>
          {loading ? t("Loading...") : t("Get New Activity")}
        </button>
      </div>

      <div className={"pageFooter"}>
        <Link href="/" className="red">
          <span className="center">{t("Sign out")}</span>
        </Link>
      </div>
    </>
  );
};

export default Index;
