import type { DeliveryStatus, ReleaseStatus, Delivery } from "./types";

export const statusColumns: DeliveryStatus[] = ["DEV", "TEST", "PRE-PROD", "PROD"];
export const releaseStatusColumns: ReleaseStatus[] = ["Planning", "In Progress", "Ready", "Released"];

export const getStatusColor = (status: DeliveryStatus) => {
  switch (status) {
    case "DEV":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
    case "TEST":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800";
    case "PRE-PROD":
      return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800";
    case "PROD":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
  }
};

export const getReleaseStatusColor = (status: ReleaseStatus) => {
  switch (status) {
    case "Planning":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
    case "In Progress":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800";
    case "Ready":
      return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800";
    case "Released":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800";
  }
};

export const canMoveToStatus = (delivery: Delivery, targetStatus: DeliveryStatus) => {
  switch (targetStatus) {
    case 'TEST':
      return delivery.environmentApprovals.test.projectManager && delivery.environmentApprovals.test.securityExpert;
    case 'PRE-PROD':
      return delivery.environmentApprovals.preProd.projectManager && delivery.environmentApprovals.preProd.securityExpert;
    case 'PROD':
      return delivery.environmentApprovals.prod.projectManager && delivery.environmentApprovals.prod.securityExpert;
    case 'DEV':
      return true; // Always can move back to DEV
    default:
      return false;
  }
};