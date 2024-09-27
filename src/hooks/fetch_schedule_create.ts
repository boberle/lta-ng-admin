import useFetchItem from "./_fetch_item.ts";
import { useCallback, useEffect, useState } from "react";
import { buildCreateScheduleURL } from "./_url_builders.ts";
import { formatDate, secondsToTime } from "./utils.ts";

export type ScheduleCreationType = {
  surveyId: string;
  startDate: Date;
  endDate: Date;
  timeRanges: TimeRangeType[];
  userIds: string[];
  groupIds: string[];
};

const convertToDTO = (
  schedule: ScheduleCreationType,
): { [key: string]: any } => {
  return {
    survey_id: schedule.surveyId,
    start_date: formatDate(schedule.startDate),
    end_date: formatDate(schedule.endDate),
    time_ranges: schedule.timeRanges.map((range) => ({
      start_time: secondsToTime(range.startTime),
      end_time: secondsToTime(range.endTime),
    })),
    user_ids: schedule.userIds,
    group_ids: schedule.groupIds,
  };
};

// TODO: const convertToDTO = (schedule: ScheduleCreationType) : {[key: string]: any} => {
// TODO:   return {
// TODO:     survey_id: schedule.surveyId,
// TODO:     start_date: "2024-01-01",
// TODO:     end_date: "2024-01-02",
// TODO:     time_ranges: [{
// TODO:       start_time: "09:00:00",
// TODO:       end_time: "10:00:00",
// TODO:     }],
// TODO:     user_ids: schedule.userIds,
// TODO:     group_ids: schedule.groupIds,
// TODO:   }
// TODO: }

const useFetchCreateSchedule = () => {
  const { fetchItem, isError, statusCode } = useFetchItem<never>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fetchCreateSchedule = useCallback(
    async (data: ScheduleCreationType, token: string) => {
      const url = buildCreateScheduleURL();
      await fetchItem(url, {
        method: "POST",
        jsonData: convertToDTO(data),
        token,
      });
    },
    [fetchItem],
  );

  useEffect(() => {
    setIsSuccess(statusCode === 200);
  }, [statusCode]);

  return {
    fetchCreateSchedule,
    isError,
    isSuccess,
  };
};

export default useFetchCreateSchedule;
