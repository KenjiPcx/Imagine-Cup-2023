export type Warning = {
  text: string;
  reason: string;
};

export type Detection = {
  scam: boolean;
  suspicious_content: {
    text: string;
    reason: string;
  }[];
};

export type CallInfo = {
  id: string;
  scam: string;
  summary: string;
  timestamp: Date;
};
