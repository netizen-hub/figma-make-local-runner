export type DeliveryStatus = "DEV" | "TEST" | "PRE-PROD" | "PROD";
export type ReleaseStatus = "Planning" | "In Progress" | "Ready" | "Released";
export type ViewType = "deliveries" | "releases";

export interface EnvironmentApproval {
  projectManager: boolean;
  securityExpert: boolean;
}

export interface Delivery {
  id: string;
  title: string;
  description: string;
  component: string;
  version: string;
  status: DeliveryStatus;
  assignee: string;
  createdAt: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  tags: string[];
  environmentApprovals: {
    test: EnvironmentApproval;
    preProd: EnvironmentApproval;
    prod: EnvironmentApproval;
  };
}

export interface Release {
  id: string;
  title: string;
  version: string;
  description: string;
  releaseNotes: string;
  deliveryIds: string[];
  status: ReleaseStatus;
  releaseDate: string;
  createdAt: string;
}

export interface NewDelivery {
  title: string;
  description: string;
  component: string;
  version: string;
  assignee: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  tags: string[];
  tagInput: string;
}

export interface NewRelease {
  title: string;
  version: string;
  description: string;
  releaseNotes: string;
  deliveryIds: string[];
  releaseDate: string;
}