import { notificationService } from "@hope-ui/solid";

const defaultNotificationDuration = 5000;

export const showNotification = (
  notificationTitle: string,
  notificationDetails: string,
  notificationStatus: "info" | "success" | "warning" | "danger",
  notificationDuration: number = defaultNotificationDuration
) => {
  notificationService.show({
    status: notificationStatus,
    title: notificationTitle,
    description: notificationDetails,
    duration: notificationDuration,
  });
};

export const showLoadingNotification = (
  notificationId: string,
  notificationTitle: string,
  notificationDetails: string,
  notificationStatus: "info" | "success" | "warning" | "danger"
) => {
  notificationService.show({
    id: notificationId,
    status: notificationStatus,
    title: notificationTitle,
    description: notificationDetails,
    persistent: true,
    closable: false,
    loading: true,
  });
};

export const updateLoadingNotification = (
  notificationId: string,
  notificationTitle: string,
  notificationDetails: string,
  notificationStatus: "info" | "success" | "warning" | "danger",
  notificationDuration: number = defaultNotificationDuration
) => {
  notificationService.update({
    id: notificationId,
    status: notificationStatus,
    title: notificationTitle,
    description: notificationDetails,
    duration: notificationDuration,
  });
};

export const showLoadingNotificationForAiProcessing = (
  notificationId: string
) => {
  notificationService.show({
    id: notificationId,
    status: "info",
    title: `Started ${notificationId} job`,
    description:
      "This might take a few moments, it will appear below when complete",
    persistent: true,
    closable: false,
    loading: true,
  });
};

export const updateLoadingNotificationForSuccessfulJob = (
  notificationId: string,
  notificationDuration: number = defaultNotificationDuration
) => {
  notificationService.update({
    id: notificationId,
    status: "success",
    title: `Job ${notificationId} succeeded 🎉`,
    description: `View the results for job ${notificationId} below 👇}!`,
    duration: notificationDuration,
  });
};

export const updateLoadingNotificationForFailedJob = (
  notificationId: string,
  notificationDuration: number = defaultNotificationDuration
) => {
  notificationService.update({
    id: notificationId,
    status: "danger",
    title: `Job ${notificationId} failed`,
    description:
      "😱 Something went wrong. Please look at the console for more details.",
    duration: notificationDuration,
  });
};
