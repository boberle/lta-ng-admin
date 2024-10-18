import { ChangeEvent, useState } from "react";
import { ScheduleCreationType } from "../../../hooks/fetch_schedule_create.ts";
import { secondsToTime, timeToSeconds } from "../../../hooks/utils.ts";

const ScheduleCreationForm = ({
  onSubmit,
}: {
  onSubmit: (schedule: ScheduleCreationType) => void;
}) => {
  const [schedule, setSchedule] = useState<ScheduleCreationType>({
    surveyId: "",
    startDate: new Date(),
    endDate: new Date(),
    timeRanges: [{ startTime: 0, endTime: 0 }],
    userIds: [""],
    groupIds: [""],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSchedule({
      ...schedule,
      [name]: value,
    });
  };

  const handleDateChange = (name: "startDate" | "endDate", value: string) => {
    setSchedule({
      ...schedule,
      [name]: new Date(value),
    });
  };

  const handleTimeRangeChange = (
    index: number,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    console.log(value);
    const newTimeRanges = schedule.timeRanges.map((timeRange, i) =>
      i === index ? { ...timeRange, [field]: timeToSeconds(value) } : timeRange,
    );
    setSchedule({
      ...schedule,
      timeRanges: newTimeRanges,
    });
  };

  const addTimeRange = () => {
    setSchedule({
      ...schedule,
      timeRanges: [...schedule.timeRanges, { startTime: 0, endTime: 0 }],
    });
  };

  const removeTimeRange = (index: number) => {
    const newTimeRanges = schedule.timeRanges.filter((_, i) => i !== index);
    setSchedule({
      ...schedule,
      timeRanges: newTimeRanges,
    });
  };

  // Handler for userIds and groupIds changes
  const handleArrayChange = (
    field: "userIds" | "groupIds",
    index: number,
    value: string,
  ) => {
    const newArray = schedule[field].map((item, i) =>
      i === index ? value : item,
    );
    setSchedule({
      ...schedule,
      [field]: newArray,
    });
  };

  // Handler to add a new user or group ID
  const addArrayItem = (field: "userIds" | "groupIds") => {
    setSchedule({
      ...schedule,
      [field]: [...schedule[field], ""],
    });
  };

  // Handler to remove a user or group ID
  const removeArrayItem = (field: "userIds" | "groupIds", index: number) => {
    const newArray = schedule[field].filter((_, i) => i !== index);
    setSchedule({
      ...schedule,
      [field]: newArray,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validatedSchedule = {
      ...schedule,
      userIds: schedule.userIds.filter((id) => id.trim() !== ""),
      groupIds: schedule.groupIds.filter((id) => id.trim() !== ""),
    };
    onSubmit(validatedSchedule);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Survey ID:</label>
        <input
          type="text"
          name="surveyId"
          value={schedule.surveyId}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={schedule.startDate.toISOString().substring(0, 10)}
          onChange={(e) => handleDateChange("startDate", e.target.value)}
        />
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={schedule.endDate.toISOString().substring(0, 10)}
          onChange={(e) => handleDateChange("endDate", e.target.value)}
        />
      </div>

      <div>
        <label>
          Time Ranges <b>(NOTE: these are UTC)</b>:
        </label>
        {schedule.timeRanges.map((timeRange, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="time"
              value={secondsToTime(timeRange.startTime)}
              onChange={(e) =>
                handleTimeRangeChange(index, "startTime", e.target.value)
              }
            />
            <input
              type="time"
              value={secondsToTime(timeRange.endTime)}
              onChange={(e) =>
                handleTimeRangeChange(index, "endTime", e.target.value)
              }
            />
            <button type="button" onClick={() => removeTimeRange(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addTimeRange}>
          Add Time Range
        </button>
      </div>

      <div>
        <label>User IDs:</label>
        {schedule.userIds.map((userId, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            <input
              type="text"
              value={userId}
              onChange={(e) =>
                handleArrayChange("userIds", index, e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => removeArrayItem("userIds", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem("userIds")}>
          Add User ID
        </button>
      </div>

      <div>
        <label>Group IDs:</label>
        {schedule.groupIds.map((groupId, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            <input
              type="text"
              value={groupId}
              onChange={(e) =>
                handleArrayChange("groupIds", index, e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => removeArrayItem("groupIds", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem("groupIds")}>
          Add Group ID
        </button>
      </div>

      <button type="submit">Submit Schedule</button>
    </form>
  );
};

export default ScheduleCreationForm;
