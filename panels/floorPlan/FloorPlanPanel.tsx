import { Layout } from "../";
import {
  createStyles,
  makeStyles,
  withStyles,
  Typography,
  Tooltip,
  Menu,
  Button,
  Dialog,
  CircularProgress,
} from "@material-ui/core";
import React from "react";
import { KeyboardTimePicker } from "@material-ui/pickers";
import {
  // g_female_01,
  // b1_female_03,
  // b1_accessible_02,
  // g_male_01,
  l_male_01,
  floorOptions,
  floorDeviceMapping,
  normalColor,
  warningColor,
  dangerColor,
  unusedColor,
  timeInterval,
} from "../../constants";
import { FloorPlan, SensorStatus, FloorData, Status } from "../../types";
import Select from "react-select";
import { TopMenu } from "../../components";
import { floorPlanMenuItems } from "../../constants";
import CloseIcon from "@material-ui/icons/Close";
import Router from "next/router";
import { useInterval } from "../../utils";
import {
  getFloorDeviceData,
  getLightSaveTime,
  updateLightSaveTime,
} from "../../api/floor";

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    marginTop: 0,
    borderRadius: "0 0 18px 18px",
    backgroundColor: "#303C47",
  }),
  control: (provided, { selectProps: { width } }) => ({
    ...provided,
    width: width,
    borderRadius: "19px",
    fontSize: "19px",
    fontWeight: "bold",
  }),
  container: (provided, state) => ({
    ...provided,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#6e767e" : "transparent",
    color: "#EBEBEB",
    fontSize: 18,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition, color: "#303C47", fontSize: 19 };
  },
};

const useStyles = makeStyles(() =>
  createStyles({
    menuPaper: {
      border: "3px white solid",
      background: "#172632",
      "& p": {
        color: "#EBEBEB",
      },
      borderRadius: 8,
      padding: 24,
      "& :focus": {
        outline: "none",
      },
    },
    iAQMenuPaper: {
      minWidth: 350,
    },
    menuTitle: {
      fontSize: 23,
    },
    menuText: {
      fontSize: 20,
    },
    floorContainer: {
      padding: "5% 10%",
      position: "relative",
    },
    floorContainer2: {
      padding: "2% 20%",
      position: "relative",
    },
    selectContainer: {
      width: "250px",
      marginLeft: "5%",
      marginTop: "5%",
    },
    saveMode: {
      display: "flex",
    },
    timePickerContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    timePicker: {
      width: "50%",
      marginLeft: "10px",
      marginTop: "8px",
      "& .MuiInputBase-root": {
        color: "#EBEBEB",
        "& .MuiInput-input": {
          textAlign: "center",
        },
        "&:before": {
          borderBottomColor: "white",
        },
        "& svg": {
          fill: "white",
        },
      },
    },
    lightControlHeading: {
      display: "flex",
      justifyContent: "space-between",
      "& .MuiSvgIcon-root": {
        fill: "white",
        cursor: "pointer",
      },
    },
    lightControlTitle: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      "& p": {
        marginLeft: "15px",
      },
    },
    lightControlSubTitle: {
      fontWeight: "bold",
      marginBottom: "12px",
    },
    saveButtonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "12px",
    },
    iAQsubTitle: {
      fontWeight: "bold",
      width: 100,
      lineHeight: "85px",
    },
    dialogPaper: {
      width: "80%",
      borderRadius: 16,
      background: "#0B1A27",
      border: "2px solid white",
    },
    dialogText: {
      color: "#EBEBEB",
      textAlign: "center",
      fontSize: "32px",
      paddingTop: 0,
      paddingBottom: "20px",
    },
    dialogActionContainer: {
      display: "flex",
      justifyContent: "center",
    },
    dialogAction: {
      fontSize: "26px",
      width: "120px",
      borderRadius: "50px",
      fontWeight: "bold",
      margin: 20,
    },
    dialogCloseIconContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    dialogCloseIcon: {
      fontSize: 30,
      margin: 20,
      fill: "white",
    },
    loading: {
      position: "absolute",
      left: "calc(50% - 20px)",
      top: "calc(50% - 20px)",
    },
    floorPlanName: {
      padding: 16,
      fontSize: 24,
      color: "#EBEBEB",
    },
    iaqBarIndicator: {
      flexGrow: 1,
    },
    iaqBarIndicatorValue: {
      textAlign: "center",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      "& p": {
        fontSize: 15,
        fontWeight: "bold",
      },

      "& div": {
        width: 0,
        border: "5px solid transparent",
        borderBottom: "10px solid white",
        position: "relative",
        top: "-10px",

        "&::after": {
          content: '""',
          position: "absolute",
          left: "-5px",
          top: "10px",
          border: "5px solid transparent",
          borderTop: "10px solid white",
        },
      },
    },
    barIndicatorContainer: {
      display: "flex",
      flexGrow: 1,
      borderRadius: 10,
      border: "2px solid white",
      height: 10,

      "& div": {
        flexGrow: 1,
        borderRight: "2px solid white",

        "&:first-of-type": {
          borderRadius: "10px 0 0 10px",
          background: (props: { [key: string]: any }) => props.normalColor,
        },
        "&:nth-of-type(2)": {
          background: (props: { [key: string]: any }) => props.warningColor,
        },
        "&:last-of-type": {
          borderRadius: "0 10px 10px 0",
          borderRight: "none",
          background: (props: { [key: string]: any }) => props.dangerColor,
        },
      },
    },
    barIndicatorContainerTemp: {
      display: "flex",
      flexGrow: 1,
      borderRadius: 10,
      border: "2px solid white",
      height: 10,

      "& div": {
        flexGrow: 1,
        borderRight: "2px solid white",

        "&:first-of-type": {
          borderRadius: "10px 0 0 10px",
          background: (props: { [key: string]: any }) => props.dangerColor,
        },
        "&:nth-of-type(2)": {
          background: (props: { [key: string]: any }) => props.warningColor,
        },
        "&:nth-of-type(3)": {
          background: (props: { [key: string]: any }) => props.normalColor,
        },
        "&:nth-of-type(4)": {
          background: (props: { [key: string]: any }) => props.warningColor,
        },
        "&:last-of-type": {
          borderRadius: "0 10px 10px 0",
          borderRight: "none",
          background: (props: { [key: string]: any }) => props.dangerColor,
        },
      },
    },
    barIndicatorContainerHmd: {
      display: "flex",
      flexGrow: 1,
      borderRadius: 10,
      border: "2px solid white",
      height: 10,

      "& div": {
        flexGrow: 1,
        borderRight: "2px solid white",

        "&:first-of-type": {
          flexGrow: 3,
          borderRadius: "10px 0 0 10px",
          background: (props: { [key: string]: any }) => props.normalColor,
        },
        "&:nth-of-type(2)": {
          background: (props: { [key: string]: any }) => props.warningColor,
        },
        "&:last-of-type": {
          borderRadius: "0 10px 10px 0",
          borderRight: "none",
          background: (props: { [key: string]: any }) => props.dangerColor,
        },
      },
    },
    iaqBarStateContainer: {
      display: "flex",
      borderWidth: "0 2px",
      borderColor: "transparent",
      borderStyle: "solid",

      "& p": {
        flexGrow: 1,
        textAlign: "center",
        borderColor: "white",
        borderWidth: "0 2px 0 0",
        borderStyle: "solid",
        fontSize: 14,
        fontWeight: "bold",
        lineHeight: 1.5,
        "&:last-of-type": {
          borderRight: "none",
        },
        "&:first-of-type": {
          color: (props: { [key: string]: any }) => props.normalColor,
        },
        "&:nth-of-type(2)": {
          color: (props: { [key: string]: any }) => props.warningColor,
        },
        "&:nth-of-type(3)": {
          color: (props: { [key: string]: any }) => props.dangerColor,
        },
      },
    },
    iaqBarStateContainerTemp: {
      display: "flex",
      borderWidth: "0 2px",
      borderColor: "transparent",
      borderStyle: "solid",

      "& p": {
        flexGrow: 1,
        textAlign: "center",
        borderColor: "white",
        borderWidth: "0 2px 0 0",
        borderStyle: "solid",
        fontSize: 14,
        fontWeight: "bold",
        lineHeight: 1.5,
        "&:last-of-type": {
          borderRight: "none",
        },
        "&:first-of-type": {
          color: (props: { [key: string]: any }) => props.dangerColor,
        },
        "&:nth-of-type(2)": {
          color: (props: { [key: string]: any }) => props.warningColor,
        },
        "&:nth-of-type(3)": {
          color: (props: { [key: string]: any }) => props.normalColor,
        },
        "&:nth-of-type(4)": {
          color: (props: { [key: string]: any }) => props.warningColor,
        },
        "&:nth-of-type(5)": {
          color: (props: { [key: string]: any }) => props.dangerColor,
        },
      },
    },
    iaqBarStateContainerHmd: {
      display: "flex",
      borderWidth: "0 2px",
      borderColor: "transparent",
      borderStyle: "solid",

      "& p": {
        flexGrow: 1,
        textAlign: "center",
        borderColor: "white",
        borderWidth: "0 2px 0 0",
        borderStyle: "solid",
        fontSize: 14,
        fontWeight: "bold",
        lineHeight: 1.5,
        "&:last-of-type": {
          borderRight: "none",
        },
        "&:first-of-type": {
          flexBasis: "60%",
          color: (props: { [key: string]: any }) => props.normalColor,
        },
        "&:nth-of-type(2)": {
          flexBasis: "20%",
          color: (props: { [key: string]: any }) => props.warningColor,
        },
        "&:nth-of-type(3)": {
          flexBasis: "20%",
          color: (props: { [key: string]: any }) => props.dangerColor,
        },
      },
    },
    iaqBarDividerValue: {
      display: "flex",

      "& p": {
        transform: "translate(50%, 0)",
        fontSize: 11,
        fontWeight: "bold",
        flexGrow: 1,
        color: "#999999",
        textAlign: "center",
        lineHeight: 1,
        "&:last-of-type": {
          opacity: 0,
        },
      },
    },
    iaqBarDividerValueHum: {
      display: "flex",

      "& p": {
        transform: "translate(50%, 0)",
        fontSize: 11,
        fontWeight: "bold",
        flexGrow: 1,
        color: "#999999",
        textAlign: "center",
        lineHeight: 1,
        "&:first-of-type": {
          opacity: 0,
        },
        "&:nth-of-type(2)": {
          opacity: 0,
        },
        "&:last-of-type": {
          opacity: 0,
        },
      },
    },
  })
);

const SaveButton = withStyles(() => ({
  root: {
    borderRadius: "25px",
    backgroundColor: "#FBB71F",
    fontWeight: "bold",
    fontSize: "19px",
    padding: "6px 25px",
    "&:hover": {
      backgroundColor: "#fac450",
    },
  },
}))(Button);

const CancleButton = withStyles(() => ({
  root: {
    backgroundColor: "#f3314b",
    "&:hover": {
      backgroundColor: "#a61125",
    },
  },
}))(Button);

const initialLightControlMenuState = {
  mouseX: null,
  mouseY: null,
};

const initialIAQMenuState = {
  mouseX: null,
  mouseY: null,
};

interface FloorPlanPanelProps {
  floor: string | undefined;
}

const FloorPlanPanel = ({ floor }: FloorPlanPanelProps) => {
  const classes = useStyles({ normalColor, warningColor, dangerColor });

  const [lightControlMenuState, setLightControlMenuState] = React.useState<{
    mouseX: null | number;
    mouseY: null | number;
  }>(initialLightControlMenuState);
  const [iAQMenuState, setIAQMenuState] = React.useState<{
    mouseX: null | number;
    mouseY: null | number;
  }>(initialIAQMenuState);
  const [startTime, setStartTime] = React.useState<Date | null>(
    new Date("2020-10-01T22:00:00")
  );
  const [endTime, setEndTime] = React.useState<Date | null>(
    new Date("2020-10-02T08:00:00")
  );
  const [selectedStartTime, setSelectedStartTime] = React.useState<Date | null>(
    new Date("2020-10-01T22:00:00")
  );
  const [selectedEndTime, setSelectedEndTime] = React.useState<Date | null>(
    new Date("2020-10-02T08:00:00")
  );

  const [open, setOpen] = React.useState(false);

  const [data, setData] = React.useState<FloorData>();

  const [initialLoadStatus, setInitialLoadStatus] = React.useState<Status>(
    Status.blank
  );
  const [
    updateLightSaveTimeStatus,
    setUpdateLightSaveTimeStatus,
  ] = React.useState<Status>(Status.blank);

  let ignore = false;

  const fetchLightSaveTime = async () => {
    try {
      const lightSaveTimeData = await getLightSaveTime();
      if (!ignore) {
        // turn_on为lightsave结束，turn_off为lightsave开始
        const startTime = new Date(
          `2020-10-01T${lightSaveTimeData.turn_off}:00`
        );
        const endTime = new Date(`2020-10-02T${lightSaveTimeData.turn_on}:00`);
        setStartTime(startTime);
        setSelectedStartTime(startTime);
        setEndTime(endTime);
        setSelectedEndTime(endTime);
      }
    } catch {}
  };

  React.useEffect(() => {
    if (floor === "g_female_01" || floor === undefined) fetchLightSaveTime();
    return () => {
      ignore = true;
    };
  }, [floor]);

  const fetchData = async () => {
    try {
      const floorDeviceData = await getFloorDeviceData({
        deviceId: "1", //  floorDeviceMapping[floor || "g_female_01"],
      });
      if (!ignore) {
        setData(floorDeviceData);
        setInitialLoadStatus(Status.success);
      }
    } catch {
      if (!ignore) {
        setInitialLoadStatus(Status.failure);
      }
    }
  };

  React.useEffect(() => {
    setInitialLoadStatus(Status.inProgress);
  }, [floor]);

  useInterval(fetchData, timeInterval, true, () => {
    ignore = true;
  });

  React.useEffect(() => {
    if (updateLightSaveTimeStatus !== Status.inProgress) return;
    const updateTime = async () => {
      try {
        const turn_off = `${selectedStartTime
          .getHours()
          .toString()
          .padStart(
            2,
            "0"
          )}:${selectedStartTime.getMinutes().toString().padStart(2, "0")}`;
        const turn_on = `${selectedEndTime
          .getHours()
          .toString()
          .padStart(2, "0")}:${selectedEndTime
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;
        // turn_on为lightsave结束，turn_off为lightsave开始
        await updateLightSaveTime(turn_on, turn_off);
        if (!ignore) {
          setStartTime(selectedStartTime);
          setEndTime(selectedEndTime);
          setUpdateLightSaveTimeStatus(Status.success);
          fetchLightSaveTime();
        }
      } catch {
        if (!ignore) {
          setUpdateLightSaveTimeStatus(Status.failure);
        }
      }
    };
    updateTime();
    return () => {
      ignore = true;
    };
  }, [updateLightSaveTimeStatus]);

  // x, y为中心点坐标
  const renderLiquidSoap = (x, y) => (
    <svg
      x={x - 6.4095}
      y={y - 12.7025}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="45.405"
      viewBox="0 0 12.819 25.405"
    >
      <path
        fill="#FFF"
        d="M19.663,0a.907.907,0,1,0,0,1.815h1.831V3.63h-.916V6.653A7.2,7.2,0,0,0,16,13.61V24.5a.912.912,0,0,0,.916.907H27.9a.912.912,0,0,0,.916-.907V13.61a7.2,7.2,0,0,0-4.578-6.957V3.63h-.916V1.815H28.82V0Z"
        transform="translate(-16.001)"
      />
    </svg>
  );

  // x, y为中心点坐标
  // 不知为啥和design上尺寸对不上？边框的问题？
  // x缩放0.864341273
  const renderProgressBar = (x, y, value, status, tooltip = true) => {
    let color = normalColor;
    if (status === SensorStatus.normal) {
      color = normalColor;
    } else if (status === SensorStatus.warning) {
      color = warningColor;
    } else {
      color = dangerColor;
    }
    return (
      <Tooltip title={tooltip ? `${100 * value}%` : ""} arrow>
        <svg
          x={x - 26.725}
          y={y - 8.7955}
          xmlns="http://www.w3.org/2000/svg"
          width="61.839"
          height="17.591"
          viewBox="0 0 61.839 17.591"
        >
          <defs>
            <clipPath id="cut-off-border">
              <path d="M2.8,0H59.035c1.548,0,2.8,2.78,2.8,6.209v5.174c0,3.429-1.255,6.209-2.8,6.209H2.8c-1.548,0-2.8-2.78-2.8-6.209V6.209C0,2.78,1.255,0,2.8,0Z" />
            </clipPath>
          </defs>
          <g
            transform="translate(0 0)"
            style={{ fill: "none", transform: "scale(0.864341273, 1)" }}
          >
            <path
              style={{ stroke: "none", fill: "#0B1A27" }}
              d="M2.8,0H59.035c1.548,0,2.8,2.78,2.8,6.209v5.174c0,3.429-1.255,6.209-2.8,6.209H2.8c-1.548,0-2.8-2.78-2.8-6.209V6.209C0,2.78,1.255,0,2.8,0Z"
            />
            <rect
              width={`${100 * value}%`}
              height="100%"
              fill={color}
              clipPath="url(#cut-off-border)"
            />
            <path
              style={{ stroke: "none", fill: "#FFF" }}
              d="M 3.02545166015625 1.999995231628418 C 2.693058013916016 2.370471000671387 2.000003814697266 3.786379814147949 2.000003814697266 6.208644866943359 L 2.000003814697266 11.38250541687012 C 2.000003814697266 13.80476093292236 2.693058013916016 15.22066974639893 3.02545166015625 15.59114456176758 L 58.8133544921875 15.59114456176758 C 59.145751953125 15.22066974639893 59.83880233764648 13.80476093292236 59.83880233764648 11.38250541687012 L 59.83880233764648 6.208644866943359 C 59.83880233764648 3.786379814147949 59.145751953125 2.370471000671387 58.8133544921875 1.999995231628418 L 3.02545166015625 1.999995231628418 M 2.80377197265625 -5.7220458984375e-06 L 59.0350341796875 -5.7220458984375e-06 C 60.58351135253906 -5.7220458984375e-06 61.83880233764648 2.779705047607422 61.83880233764648 6.208644866943359 L 61.83880233764648 11.38250541687012 C 61.83880233764648 14.81144523620605 60.58351135253906 17.59114456176758 59.0350341796875 17.59114456176758 L 2.80377197265625 17.59114456176758 C 1.255294799804688 17.59114456176758 3.814697265625e-06 14.81144523620605 3.814697265625e-06 11.38250541687012 L 3.814697265625e-06 6.208644866943359 C 3.814697265625e-06 2.779705047607422 1.255294799804688 -5.7220458984375e-06 2.80377197265625 -5.7220458984375e-06 Z"
            />
          </g>
        </svg>
      </Tooltip>
    );
  };

  // x, y为中心点坐标
  const renderTissue = (x, y) => (
    <svg
      x={x - 13.7095}
      y={y - 12.7025}
      xmlns="http://www.w3.org/2000/svg"
      width="27.419"
      height="25.405"
      viewBox="0 0 27.419 25.405"
    >
      <path
        style={{ fill: "#FFF" }}
        d="M18.076,19.474a.525.525,0,0,0,.486.328h3.187l-1.7-8.786a7.235,7.235,0,0,1-.97-.381,9.02,9.02,0,0,0-4.24-.968A.542.542,0,0,0,14.4,9.9a.535.535,0,0,0-.048.5Z"
        transform="translate(-9.134 -8.17)"
      />
      <path
        style={{ fill: "#FFF" }}
        d="M32.684,18.468a.53.53,0,0,0,.486-.328l3.722-9.078a.527.527,0,0,0-.259-.677,17.656,17.656,0,0,0-7.005-1.549,2.323,2.323,0,0,0-2.363,2.12c-.059.214-.107.369-.151.488l1.745,9.024h3.825Z"
        transform="translate(-14.729 -6.837)"
      />
      <path
        style={{ fill: "#FFF" }}
        d="M25.8,40.617c-3.046,0-4.707.931-4.707,1.41s1.661,1.41,4.707,1.41,4.708-.931,4.708-1.41S28.848,40.617,25.8,40.617Z"
        transform="translate(-12.093 -22.006)"
      />
      <path
        style={{ fill: "#FFF" }}
        d="M29.589,21.885a.549.549,0,0,0-.5-.312H26.259L24.6,25.486a1.659,1.659,0,0,1-1.52.983H14.682a1.637,1.637,0,0,1-1.52-.983L11.5,21.573H8.668a.543.543,0,0,0-.5.312L5.36,27.833H32.4Z"
        transform="translate(-5.17 -13.392)"
      />
      <path
        style={{ fill: "#FFF" }}
        d="M5,35.413v8.856a.54.54,0,0,0,.548.529H31.871a.54.54,0,0,0,.548-.529V35.413Zm13.71,6.63c-2.972,0-5.983-.851-5.983-2.469s3.011-2.469,5.983-2.469,5.977.851,5.977,2.469S21.682,42.043,18.71,42.043Z"
        transform="translate(-5 -19.393)"
      />
    </svg>
  );

  const handleLightClick = (event: React.MouseEvent<HTMLOrSVGElement>) => {
    setSelectedStartTime(startTime);
    setSelectedEndTime(endTime);
    setLightControlMenuState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleIAQClick = (event: React.MouseEvent<HTMLOrSVGElement>) => {
    setIAQMenuState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleLightClose = () => {
    setLightControlMenuState(initialLightControlMenuState);
  };

  const handleIAQClose = () => {
    setIAQMenuState(initialIAQMenuState);
  };

  // x, y为中心点坐标
  const renderLightOn = (x, y, control = true) => (
    <svg
      x={x - 30.4415}
      y={y - 38.256}
      xmlns="http://www.w3.org/2000/svg"
      width="60.883"
      height="63.66"
      viewBox="0 0 60.883 63.66"
      onClick={control ? handleLightClick : null}
    >
      <path
        style={{ fill: "#fbb71f" }}
        d="M41.634,963.362C33.69,963.362,26,969.525,26,978.243c0,11.311,8.468,13.68,8.468,21.6H48.8c0-7.919,8.468-10.287,8.468-21.6C57.268,969.525,49.578,963.362,41.634,963.362ZM40.188,966.7c.849-.04,1.569.391,1.547,1.242a1.354,1.354,0,0,1-1.262,1.344,9.79,9.79,0,0,0-8.183,12.58,1.3,1.3,0,1,1-2.483.753A12.357,12.357,0,0,1,40.188,966.7Zm-5.72,35.745v2.606H48.8v-2.606Zm0,5.211a2.609,2.609,0,0,0,2.606,2.606h9.12a2.609,2.609,0,0,0,2.606-2.606Zm4.56,3.908a2.606,2.606,0,1,0,5.211,0Z"
        transform="translate(-10.871 -950.511)"
      />
      <line
        style={{ stroke: "#fbb71f", strokeWidth: "4px", fill: "#none" }}
        y2="11.725"
        transform="translate(31.089 0)"
      />
      <line
        style={{ stroke: "#fbb71f", strokeWidth: "4px", fill: "#none" }}
        y2="11.725"
        transform="translate(53.345 8.474) rotate(45)"
      />
      <line
        style={{ stroke: "#fbb71f", strokeWidth: "4px", fill: "#none" }}
        y2="11.725"
        transform="translate(7.538 8.474) rotate(-45)"
      />
      <line
        style={{ stroke: "#fbb71f", strokeWidth: "4px", fill: "#none" }}
        y2="11.725"
        transform="translate(11.725 27.377) rotate(90)"
      />
      <line
        style={{ stroke: "#fbb71f", strokeWidth: "4px", fill: "#none" }}
        y2="11.725"
        transform="translate(60.883 27.377) rotate(90)"
      />
    </svg>
  );

  // x, y为左上角坐标
  const renderIAQ = (x, y, status) => {
    let color = normalColor;
    if (status === SensorStatus.normal) {
      color = normalColor;
    } else if (status === SensorStatus.warning) {
      color = warningColor;
    } else {
      color = dangerColor;
    }
    return (
      <svg
        x={x}
        y={y}
        onClick={handleIAQClick}
        xmlns="http://www.w3.org/2000/svg"
        width="63"
        height="63"
        viewBox="0 0 63 63"
      >
        <g transform="translate(-0.408 -0.222)">
          <circle
            style={{ fill: "#fff" }}
            cx="31.5"
            cy="31.5"
            r="31.5"
            transform="translate(0.408 0.222)"
          />
          <path
            style={{ fill: color, fillRule: "evenodd" }}
            d="M46.232,14.651A22.491,22.491,0,0,1,50.71,27.982a19.654,19.654,0,0,1-2.831,10.68Q44.971,43.32,37.611,46.1v.026a1.757,1.757,0,0,1,.052.206,19.508,19.508,0,0,0,1.055,3.526,1.061,1.061,0,0,1-1.39,1.39,1.016,1.016,0,0,1-.592-.566A19.718,19.718,0,0,1,35.6,46.949a.572.572,0,0,1-.1-.386c-.034-.154-.06-.3-.077-.437v-.051a3.345,3.345,0,0,1-.077-.438,34.677,34.677,0,0,1-.206-4.066,36.247,36.247,0,0,1,1.184-8.081,45.828,45.828,0,0,0,1.107-5.61q.077-.875.077-1.57v-.1q-.308.823-.695,1.724-.9,2.11-1.982,4.684A28.253,28.253,0,0,0,33,41.57q-.025,1.158.052,2.393a33.464,33.464,0,0,1-4.092-3.423,11.2,11.2,0,0,1-3.088-7.695,11.719,11.719,0,0,1,1.441-5.276q.747-1.441,3.165-5.018,4.606-6.82,4.607-11.735a23.3,23.3,0,0,0-.438-3.706Q34.394,5.772,34.188,5A28.047,28.047,0,0,1,46.232,14.651Z"
            transform="translate(-6.415 3.394)"
          />
        </g>
      </svg>
    );
  };

  const handleStartTimeChange = (date: Date | null) => {
    setSelectedStartTime(date);
  };

  const handleEndTimeChange = (date: Date | null) => {
    setSelectedEndTime(date);
  };

  const renderIAQMenu = () => (
    <Menu
      keepMounted
      open={iAQMenuState.mouseY != null}
      onClose={handleIAQClose}
      autoFocus={false}
      anchorReference="anchorPosition"
      anchorPosition={
        iAQMenuState.mouseY !== null && iAQMenuState.mouseX !== null
          ? { top: iAQMenuState.mouseY, left: iAQMenuState.mouseX }
          : undefined
      }
      classes={{
        paper: `${classes.menuPaper} ${classes.iAQMenuPaper}`,
      }}
    >
      {initialLoadStatus === Status.success && (
        <div>
          <div className={classes.lightControlHeading}>
            <div className={classes.lightControlTitle}>
              {initialLoadStatus === Status.success &&
                renderIAQ(0, 0, data.sensor_iaq.status)}
              <Typography className={classes.menuTitle}>空氣質素</Typography>
            </div>
            <CloseIcon onClick={handleIAQClose} />
          </div>
          <div className={classes.saveMode}>
            <Typography
              className={`${classes.menuText} ${classes.iAQsubTitle}`}
            >
              H2S:{" "}
            </Typography>
            <div className={classes.iaqBarIndicator}>
              <div
                className={classes.iaqBarIndicatorValue}
                style={{
                  transform: `translate(${
                    data.sensor_iaq.value.H2S > 0.003
                      ? "33.3%"
                      : data.sensor_iaq.value.H2S > 0.001
                      ? "0"
                      : "-33.3%"
                  }, 7px)`,
                }}
              >
                <Typography>{`${data.sensor_iaq.value.H2S}ppm`}</Typography>
                <div></div>
              </div>
              <div className={classes.barIndicatorContainer}>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={classes.iaqBarStateContainer}>
                <Typography>極佳</Typography>
                <Typography>良好</Typography>
                <Typography>較差</Typography>
              </div>
              <div className={classes.iaqBarDividerValue}>
                <Typography>0.001ppm</Typography>
                <Typography>0.003ppm</Typography>
                <Typography>0.003ppm</Typography>
              </div>
            </div>
          </div>
          <div className={classes.saveMode}>
            <Typography
              className={`${classes.menuText} ${classes.iAQsubTitle}`}
            >
              NH3:{" "}
            </Typography>
            <div className={classes.iaqBarIndicator}>
              <div
                className={classes.iaqBarIndicatorValue}
                style={{
                  transform: `translate(${
                    data.sensor_iaq.value.NH3 > 0.15
                      ? "33.3%"
                      : data.sensor_iaq.value.NH3 > 0.01
                      ? "0"
                      : "-33.3%"
                  }, 7px)`,
                }}
              >
                <Typography>{`${data.sensor_iaq.value.NH3}ppm`}</Typography>
                <div></div>
              </div>
              <div className={classes.barIndicatorContainer}>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={classes.iaqBarStateContainer}>
                <Typography>極佳</Typography>
                <Typography>良好</Typography>
                <Typography>較差</Typography>
              </div>
              <div className={classes.iaqBarDividerValue}>
                <Typography>0.01ppm</Typography>
                <Typography>0.15ppm</Typography>
                <Typography>0.15ppm</Typography>
              </div>
            </div>
          </div>
          <div className={classes.saveMode}>
            <Typography
              className={`${classes.menuText} ${classes.iAQsubTitle}`}
            >
              PM2.5:{" "}
            </Typography>
            <div className={classes.iaqBarIndicator}>
              <div
                className={classes.iaqBarIndicatorValue}
                style={{
                  transform: `translate(${
                    data.sensor_iaq.value.pm2d5 > 100
                      ? "33.3%"
                      : data.sensor_iaq.value.pm2d5 > 50
                      ? "0"
                      : "-33.3%"
                  }, 7px)`,
                }}
              >
                <Typography>{`${data.sensor_iaq.value.pm2d5}ug/m3`}</Typography>
                <div></div>
              </div>
              <div className={classes.barIndicatorContainer}>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={classes.iaqBarStateContainer}>
                <Typography>極佳</Typography>
                <Typography>良好</Typography>
                <Typography>較差</Typography>
              </div>
              <div className={classes.iaqBarDividerValue}>
                <Typography>50ug/m3</Typography>
                <Typography>100ug/m3</Typography>
                <Typography>65ug/m3</Typography>
              </div>
            </div>
          </div>
          <div className={classes.saveMode}>
            <Typography
              className={`${classes.menuText} ${classes.iAQsubTitle}`}
            >
              溫度:{" "}
            </Typography>
            <div className={classes.iaqBarIndicator}>
              <div
                className={classes.iaqBarIndicatorValue}
                style={{
                  transform: `translate(${
                    data.sensor_iaq.value.temperature > 29
                      ? "40%"
                      : data.sensor_iaq.value.temperature > 27
                      ? "20%"
                      : data.sensor_iaq.value.temperature > 22
                      ? "0"
                      : data.sensor_iaq.value.temperature > 20
                      ? "-20%"
                      : "-40%"
                  }, 7px)`,
                }}
              >
                <Typography>{`${data.sensor_iaq.value.temperature}℃`}</Typography>
                <div></div>
              </div>
              <div className={classes.barIndicatorContainerTemp}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={classes.iaqBarStateContainerTemp}>
                <Typography>較差</Typography>
                <Typography>良好</Typography>
                <Typography>極佳</Typography>
                <Typography>良好</Typography>
                <Typography>較差</Typography>
              </div>
              <div className={classes.iaqBarDividerValue}>
                <Typography>20℃</Typography>
                <Typography>22℃</Typography>
                <Typography>27℃</Typography>
                <Typography>29℃</Typography>
                <Typography>29℃</Typography>
              </div>
            </div>
          </div>
          <div className={classes.saveMode}>
            <Typography
              className={`${classes.menuText} ${classes.iAQsubTitle}`}
            >
              濕度:{" "}
            </Typography>
            <div className={classes.iaqBarIndicator}>
              <div
                className={classes.iaqBarIndicatorValue}
                style={{
                  transform: `translate(${
                    data.sensor_iaq.value.humidity > 90
                      ? "calc(40% - 2px)"
                      : data.sensor_iaq.value.humidity > 80
                      ? "calc(20% - 2px)"
                      : "calc(-20% + 2px)"
                  }, 7px)`,
                }}
              >
                <Typography>{`${data.sensor_iaq.value.humidity}%`}</Typography>
                <div></div>
              </div>
              <div className={classes.barIndicatorContainerHmd}>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={classes.iaqBarStateContainerHmd}>
                <Typography>極佳</Typography>
                <Typography>良好</Typography>
                <Typography>較差</Typography>
              </div>
              <div className={classes.iaqBarDividerValueHum}>
                <Typography>80%</Typography>
                <Typography>80%</Typography>
                <Typography>80%</Typography>
                <Typography>90%</Typography>
                <Typography>90%</Typography>
              </div>
            </div>
          </div>
        </div>
      )}
    </Menu>
  );

  const renderLightControlMenu = () => (
    <Menu
      keepMounted
      open={lightControlMenuState.mouseY !== null}
      onClose={handleLightClose}
      autoFocus={false}
      anchorReference="anchorPosition"
      anchorPosition={
        lightControlMenuState.mouseY !== null &&
        lightControlMenuState.mouseX !== null
          ? {
              top: lightControlMenuState.mouseY,
              left: lightControlMenuState.mouseX,
            }
          : undefined
      }
      classes={{
        paper: classes.menuPaper,
      }}
    >
      <div>
        <div className={classes.lightControlHeading}>
          <div className={classes.lightControlTitle}>
            {renderLightOn(0, 0)}
            <Typography className={classes.menuTitle}>燈光控制</Typography>
          </div>
          <CloseIcon onClick={handleLightClose} />
        </div>
        <div className={classes.saveMode}>
          <Typography
            className={`${classes.menuText} ${classes.lightControlSubTitle}`}
          >
            狀態:{" "}
          </Typography>
          <Typography className={classes.menuText}>開啟</Typography>
        </div>
        <Typography
          className={`${classes.menuText} ${classes.lightControlSubTitle}`}
        >
          節能模式
        </Typography>
        <div className={classes.timePickerContainer}>
          <Typography className={classes.menuText}>開始時間: </Typography>
          <KeyboardTimePicker
            margin="normal"
            label=""
            value={selectedStartTime}
            onChange={handleStartTimeChange}
            ampm={false}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
            className={classes.timePicker}
            cancelLabel="取消"
            okLabel="確定"
          />
        </div>
        <div className={classes.timePickerContainer}>
          <Typography className={classes.menuText}>結束時間: </Typography>
          <KeyboardTimePicker
            margin="normal"
            label=""
            value={selectedEndTime}
            onChange={handleEndTimeChange}
            ampm={false}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
            className={classes.timePicker}
          />
        </div>
        <div className={classes.saveButtonContainer}>
          <SaveButton
            variant="contained"
            color="primary"
            onClick={handleDialogOpen}
          >
            保存
          </SaveButton>
        </div>
      </div>
    </Menu>
  );

  // 渲染厕纸
  const renderToiletPaper = (x, y) => (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="26.181"
      height="32.91"
      viewBox="0 0 26.181 32.91"
    >
      <g
        id="Group_352"
        data-name="Group 352"
        transform="scale(0.864341273) translate(-244.311 -256.446)"
      >
        <path
          id="Path_183"
          data-name="Path 183"
          d="M13.873,47.706l1.657,1.556,2.341,1.274,2.852.894,3.172.441,3.272-.028,3.137-.51,2.687-.913L31.85,35.949,23.86,34.83h0l-3.2-.454-.009,0-.018,0-2.882-.9a.121.121,0,0,1-.018-.01.081.081,0,0,1-.013,0l-2.375-1.292a.167.167,0,0,1-.017-.014.217.217,0,0,1-.019-.012l-1.695-1.6a.15.15,0,0,1-.026-.037s-.007-.005-.009-.009l-.649-1.276V44.154l.061,1.818Z"
          transform="translate(231.379 237.485)"
          fill="#fff"
        />
        <path
          id="Path_184"
          data-name="Path 184"
          d="M17.789,5.12,15.4,6.546,13.753,8.267l-.817,1.888L13,12.085l.931,1.872,1.752,1.688,2.476,1.378,3.018.962,3.353.486,3.461-.035,3.318-.552,2.955-1.027,2.389-1.426L38.3,13.71l.817-1.888-.058-1.931-.931-1.871L36.37,6.333,33.894,4.955l-3.018-.962-3.353-.486-3.461.035-3.318.552Zm4.084,5.72a.188.188,0,0,1,0-.037.167.167,0,0,1,0-.033v0l.207-.587a.193.193,0,0,1,.019-.032.168.168,0,0,1,.015-.026l0,0h0l.463-.533a.2.2,0,0,1,.02-.015.139.139,0,0,1,.018-.018l.689-.45a.155.155,0,0,1,.018-.007.192.192,0,0,1,.017-.01l.871-.329.015,0,.014-.006.987-.193c.005,0,.01,0,.015,0l.013,0L26.3,8.513c.006,0,.01,0,.015,0h.012l1.023.121c.005,0,.009,0,.014,0h.015l.926.268a.171.171,0,0,1,.016.008l.017,0,.775.4a.122.122,0,0,1,.017.013.124.124,0,0,1,.019.011l.577.5a.167.167,0,0,1,.018.024.171.171,0,0,1,.02.023l.324.567h0a.155.155,0,0,1,.011.035.173.173,0,0,1,.011.034h0l.066.6a.018.018,0,0,1,0,0,.188.188,0,0,1,0,.037.167.167,0,0,1,0,.033v0l-.207.587s0,0,0,.005a.171.171,0,0,1-.03.053l-.466.537a.159.159,0,0,1-.018.013.15.15,0,0,1-.02.02l-.689.45s-.008,0-.013,0a.138.138,0,0,1-.022.014l-.871.329-.017,0s-.008,0-.013.005l-.987.193-.025,0h0l-1.038.035h-.028L24.7,13.343l-.009,0-.019,0-.932-.268a.17.17,0,0,1-.018-.009c-.005,0-.01,0-.015,0l-.775-.4c-.006,0-.009-.008-.014-.012a.155.155,0,0,1-.021-.012l-.577-.5a.165.165,0,0,1-.028-.037s-.007-.006-.01-.01l-.324-.567v0a.189.189,0,0,1-.017-.05.126.126,0,0,1,0-.015h0l-.066-.6S21.873,10.841,21.873,10.84Z"
          transform="translate(231.375 252.94)"
          fill="#fff"
        />
        <path
          id="Path_185"
          data-name="Path 185"
          d="M57.928,36.1a.171.171,0,0,1,.035.013.168.168,0,0,1,.027.015.177.177,0,0,1,.027.024.224.224,0,0,1,.02.025.189.189,0,0,1,.015.031.159.159,0,0,1,.01.035c0,.005,0,.01,0,.015L59.275,51.9l2.155-1.286L63.077,48.9l.818-1.891V29.117l-.5,1.156s-.005,0-.007.008a.179.179,0,0,1-.028.045l-1.687,1.762a.232.232,0,0,1-.019.013.17.17,0,0,1-.019.017L59.21,33.566s-.009,0-.013,0a.184.184,0,0,1-.02.012L56.189,34.62a.147.147,0,0,1-.018,0l-.012,0-3.347.557-.027,0h0l-1.129.012,6.257.9A.125.125,0,0,1,57.928,36.1Z"
          transform="translate(206.598 235.708)"
          fill="#fff"
        />
      </g>
    </svg>
  );

  // 渲染消毒剂
  const renderSanitizer = (x, y) => (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="26.74"
      height="35.674"
      viewBox="0 0 26.74 35.674"
    >
      <g
        id="Group_176"
        data-name="Group 176"
        transform="scale(0.864341273) translate(-9.929 -65.101)"
      >
        <path
          style={{ fill: "#fff" }}
          d="M48.044,9.274a1.306,1.306,0,0,1-1.337,1.274H37.348V14.37h1.337a1.307,1.307,0,0,1,1.337,1.274v3.822H32V15.644a1.307,1.307,0,0,1,1.337-1.274h1.337V10.548H33.337a1.276,1.276,0,1,1,0-2.548h13.37A1.306,1.306,0,0,1,48.044,9.274Z"
          transform="translate(-16.723 57.101)"
        />
        <path
          style={{ fill: "#fff" }}
          d="M73.348,27.778a2.68,2.68,0,1,1-5.348,0C68,26.194,70.674,23,70.674,23S73.348,26.194,73.348,27.778Z"
          transform="translate(-36.679 48.471)"
        />
        <path
          style={{ fill: "#fff" }}
          d="M34.707,41h-10.7A3.92,3.92,0,0,0,20,44.822V62.659H38.718V44.822A3.92,3.92,0,0,0,34.707,41ZM33.37,52.466H30.7v2.548H28.022V52.466H25.348V49.918h2.674V47.37H30.7v2.548H33.37Z"
          transform="translate(-10.071 38.115)"
        />
      </g>
    </svg>
  );

  // 渲染坐厕
  const renderToilet = (x, y, status) => {
    let color = normalColor;
    if (status === SensorStatus.normal) {
      color = normalColor;
    } else if (status === SensorStatus.warning) {
      color = warningColor;
    } else if (status === SensorStatus.danger) {
      color = dangerColor;
    } else {
      color = unusedColor;
    }
    return (
      <svg
        x={x}
        y={y}
        xmlns="http://www.w3.org/2000/svg"
        width="64.49"
        height="64.49"
        viewBox="0 0 64.49 64.49"
      >
        <path
          style={{ fill: color }}
          d="M32.245,0A32.245,32.245,0,1,1,0,32.245,32.245,32.245,0,0,1,32.245,0Z"
        />
        <path
          style={{ fill: "#fff" }}
          d="M33.7,139.052s8.63-1.4,8.63-7.452v-3.057H14.589s-2.6-.573-2.6-2.436V115.155a2.384,2.384,0,0,0-2.466-2.293H2.466A2.384,2.384,0,0,0,0,115.155v36.126H30.958Z"
          transform="translate(14.333 -99.288)"
        />
      </svg>
    );
  };
  // 渲染平面图
  const renderTailetlist = () => (
    <React.Fragment>
      <svg width="1024" height="768" xmlns="http://www.w3.org/2000/svg">
        {/* <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ --> */}
        <g>
          <title>background</title>
          <rect
            fill="transparent"
            id="canvas_background"
            height="770"
            width="1026"
            y="-1"
            x="-1"
          />
          <g
            display="none"
            overflow="visible"
            y="0"
            x="0"
            height="100%"
            width="100%"
            id="canvasGrid"
          >
            <rect
              fill="url(#gridpattern)"
              stroke-width="0"
              y="0"
              x="0"
              height="100%"
              width="100%"
            />
          </g>
        </g>
        <g>
          <title>Layer 1</title>
          <line
            id="svg_1"
            y2="20.10938"
            x2="986.5"
            y1="267.10938"
            x1="986.5"
            stroke-width="5"
            stroke="#fff"
            fill="none"
          />
          <line
            id="svg_2"
            y2="20.10938"
            x2="989.5"
            y1="22.10938"
            x1="14.5"
            stroke-width="5"
            stroke="#fff"
            fill="none"
          />
          <line
            id="svg_3"
            y2="20.10938"
            x2="14.5"
            y1="744.10938"
            x1="21.5"
            stroke-width="5"
            stroke="#fff"
            fill="none"
          />
          <line
            id="svg_4"
            y2="750.10938"
            x2="50.5"
            y1="750.10938"
            x1="49.5"
            stroke-width="5"
            stroke="#fff"
            fill="none"
          />
          <line
            id="svg_7"
            y2="267.10938"
            x2="988.5"
            y1="267.10938"
            x1="899.5"
            stroke-width="5"
            stroke="#fff"
            fill="none"
          />
          <line
            id="svg_8"
            y2="265.10938"
            x2="901.5"
            y1="736.10938"
            x1="901.5"
            stroke-width="5"
            stroke="#fff"
            fill="none"
          />
          <line
            id="svg_13"
            y2="743.10938"
            x2="19.5"
            y1="742.10938"
            x1="767.5"
            fill-opacity="null"
            stroke-opacity="null"
            stroke-width="5"
            stroke="#fff"
            fill="none"
          />
          <line
            id="svg_14"
            y2="740.10938"
            x2="764.5"
            y1="598.10938"
            x1="762.5"
            fill-opacity="null"
            stroke-opacity="null"
            stroke-width="5"
            stroke="#fff"
            fill="none"
          />
          <path
            id="svg_20"
            d="m260.5,682.10938"
            opacity="0.5"
            fill-opacity="null"
            stroke-opacity="null"
            stroke-width="5"
            stroke="#fff"
            fill="none"
          />
          <line
            id="svg_32"
            y2="199.10938"
            x2="362.5"
            y1="23.10938"
            x1="362.5"
            fill-opacity="null"
            stroke-opacity="null"
            stroke-width="5"
            stroke="#fff"
            fill="none"
          />
          <line
            id="svg_33"
            y2="196.10938"
            x2="175.5"
            y1="23.10938"
            x1="174.5"
            stroke-width="5"
            stroke="#fff"
            fill="none"
          />
          <line
            id="svg_34"
            y2="194.10938"
            x2="782.5"
            y1="23.10938"
            x1="781.5"
            stroke-width="5"
            stroke="#fff"
            fill="none"
          />
          <rect
            x="200"
            y="610"
            rx="20"
            ry="20"
            width="520"
            height="100"
            style={{ fill: "transparent", stroke: "#ffffff", strokeWidth: "5" }}
          />
          <line
            id="svg_41"
            y2="194.10938"
            x2="562.5"
            y1="22.10938"
            x1="561.5"
            stroke-width="5"
            stroke="#fff"
            fill="none"
          />
        </g>
      </svg>
    </React.Fragment>
  );

  const renderFloorPlan = (floor: string) => {
    let floorPlan: FloorPlan;
    floorPlan = l_male_01;
    return (
      <React.Fragment>
        <div className={classes.floorContainer2}>
          {initialLoadStatus === Status.inProgress && (
            <CircularProgress className={classes.loading} />
          )}
          <svg viewBox={`0 0 ${floorPlan.width} ${floorPlan.height}`}>
            {floor === "l_male_01" && renderTailetlist()}
            {initialLoadStatus === Status.success &&
              Object.keys(floorPlan).map((key) => {
                switch (key) {
                  case "toiletPapers":
                    return floorPlan[key].map((coordinate, index) => {
                      return renderToiletPaper(coordinate.x, coordinate.y);
                    });
                  case "toiletPaperProgressBars":
                    return floorPlan[key].map((coordinate, index) => {
                      return renderProgressBar(
                        coordinate.x + 30.9195,
                        coordinate.y + 8.7955,
                        0.8,
                        1,
                        false
                      ); // extractedData.value, extractedData.status
                    });
                  case "sanitizers":
                    return floorPlan[key].map((coordinate, index) => {
                      let sensor_id = index + 1;
                      if (floor === "g_female_01" && index === 1) sensor_id = 9;
                      const extractedData = data.sensor_sanitizer.find(
                        (item) => item.sensor_id === sensor_id.toString()
                      );
                      if (extractedData !== undefined) {
                        return renderSanitizer(coordinate.x, coordinate.y);
                      }
                    });
                  case "sanitizerProgressBars":
                    return floorPlan[key].map((coordinate, index) => {
                      let sensor_id = index + 1;
                      if (floor === "g_female_01" && index === 1) sensor_id = 9;
                      if (floor === "g_male_01") sensor_id = 17 - index;
                      const extractedData = data.sensor_sanitizer.find(
                        (item) => item.sensor_id === sensor_id.toString()
                      );
                      if (extractedData !== undefined) {
                        let value = 1,
                          status = SensorStatus.normal;
                        if (extractedData.value === 0) {
                          value = 0.1;
                          status = SensorStatus.danger;
                        }
                        return renderProgressBar(
                          coordinate.x + 30.9195,
                          coordinate.y + 8.7955,
                          value,
                          status,
                          false
                        );
                      }
                    });
                  case "light":
                    return renderLightOn(floorPlan[key].x, floorPlan[key].y);
                  case "light2":
                    return renderLightOn(
                      floorPlan[key].x,
                      floorPlan[key].y,
                      false
                    );
                  case "iaq":
                    return renderIAQ(
                      floorPlan[key].x,
                      floorPlan[key].y,
                      data.sensor_iaq.status
                    );
                  case "ashcanProgressBars":
                    return floorPlan[key].map((coodrinate, index) => {
                      return renderProgressBar(
                        coodrinate.x,
                        coodrinate.y,
                        0.8,
                        1,
                        false
                      );
                    });
                  case "tissues":
                    return floorPlan[key].map((coordinate, index) => {
                      return renderTissue(
                        coordinate.x + 13.7095,
                        coordinate.y + 12.7025
                      );
                      // }
                    });
                  case "soaps":
                    return floorPlan[key].map((coordinate, index) => {
                      return renderLiquidSoap(
                        coordinate.x + 6.4095,
                        coordinate.y + 12.7025
                      );
                      // }
                    });
                  case "tissueProgressBars":
                    return floorPlan[key].map((coordinate, index) => {
                      return renderProgressBar(
                        coordinate.x + 30.9195,
                        coordinate.y + 8.7955,
                        0.6,
                        1,
                        false
                      ); // extractedData.value, extractedData.status
                      // }
                    });
                  case "soapProgressBars":
                    return floorPlan[key].map((coordinate, index) => {
                      return renderProgressBar(
                        coordinate.x + 30.9195,
                        coordinate.y + 8.7955,
                        0.8,
                        status,
                        false
                      ); // value
                    });
                  default:
                }
              })}
          </svg>
        </div>
        <Typography className={classes.floorPlanName}>
          {floorOptions.find((item) => item.value === floor).label ||
            floorOptions[0].label}
        </Typography>
      </React.Fragment>
    );
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDialogConfirm = () => {
    handleDialogClose();
    setUpdateLightSaveTimeStatus(Status.inProgress);
  };

  const renderConfirmDialog = () => (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        paper: classes.dialogPaper,
      }}
    >
      <div className={classes.dialogCloseIconContainer}>
        <CloseIcon
          onClick={handleDialogClose}
          className={classes.dialogCloseIcon}
        />
      </div>
      <div>
        <Typography className={classes.dialogText}>確定你的更改?</Typography>
      </div>
      <div className={classes.dialogActionContainer}>
        <Button
          variant="contained"
          onClick={handleDialogConfirm}
          color="primary"
          className={classes.dialogAction}
        >
          YES
        </Button>
        <CancleButton
          variant="contained"
          onClick={handleDialogClose}
          color="primary"
          className={classes.dialogAction}
        >
          NO
        </CancleButton>
      </div>
    </Dialog>
  );

  const handleSelectChange = (e) => {
    e.value && Router.push(`/floorPlan?floor=${e.value}`);
  };

  const renderFloorSelect = () => (
    <div className={classes.selectContainer}>
      <Select
        options={floorOptions}
        styles={customStyles}
        value={
          floorOptions.find((item) => item.value === floor) || floorOptions[0]
        }
        onChange={handleSelectChange}
        isSearchable={false}
      />
    </div>
  );

  return (
    <Layout current="floorPlan">
      <TopMenu menuItems={floorPlanMenuItems} current={0} />
      {renderFloorSelect()}
      {renderFloorPlan(floor ? floor : "l_male_01")}
      {renderLightControlMenu()}
      {renderIAQMenu()}
      {renderConfirmDialog()}
    </Layout>
  );
};

export default FloorPlanPanel;
