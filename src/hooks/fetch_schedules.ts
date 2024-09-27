import useFetchItem from "./_fetch_item.ts";
import { useCallback } from "react";
import { buildGetScheduleListURL } from "./_url_builders.ts";
import { timeToSeconds } from "./utils.ts";

type SchedulesListResponse = {
  schedules: ScheduleListItemResponse[];
};

type TimeRangeResponse = {
  start_time: string;
  end_time: string;
};

type ScheduleListItemResponse = {
  id: string;
  survey_id: string;
  start_date: string;
  end_date: string;
  time_ranges: TimeRangeResponse[];
  user_ids: string[];
  group_ids: string[];
};

const convertDAOToScheduleList = (
  dao: SchedulesListResponse,
): ScheduleListItemType[] => {
  try {
    return dao.schedules.map((item: ScheduleListItemResponse) => ({
      id: item.id,
      surveyId: item.survey_id,
      startDate: new Date(item.start_date),
      endDate: new Date(item.end_date),
      timeRanges: item.time_ranges.map((range: TimeRangeResponse) => ({
        startTime: timeToSeconds(range.start_time),
        endTime: timeToSeconds(range.end_time),
      })),
      userIds: item.user_ids,
      groupIds: item.group_ids,
    }));
  } catch {
    throw new Error("Failed to convert DAO to schedule list");
  }
};

const useFetchSchedules = () => {
  const { item, fetchItem, isLoading, isError } = useFetchItem<
    ScheduleListItemType[]
  >(convertDAOToScheduleList);

  const fetchSchedules = useCallback(
    (token: string) => {
      const url = buildGetScheduleListURL();
      fetchItem(url, { token });
    },
    [fetchItem],
  );

  return {
    schedules: item,
    fetchSchedules,
    isLoading,
    isError,
  };
};

export default useFetchSchedules;
