import React from "react";
import { formatBytes } from "~/utils/formatBytes";

type Props = {
  siteDetails: {
    title: string;
    url: string;
    server: string | undefined;
    contentType: string | undefined;
    contentLength: number;
    connection: string | undefined;
  };
};

const SiteDetails = ({ siteDetails }: Props) => {
  return (
    <div className="text-shadow-primary-lg mb-7 space-y-3 pl-4 pr-8 pt-2">
      <div className="text-base">
        <span className="text-base font-medium uppercase">Title: </span>
        {siteDetails.title || "N/A"}
      </div>
      <div className="text-base">
        <span className="text-base font-medium uppercase">content type: </span>
        {siteDetails.contentType ?? "N/A"}
      </div>
      <div className="text-base">
        <span className="text-base font-medium uppercase">Status: </span>
        200
      </div>
      <div className="text-base">
        <span className="text-base font-medium uppercase">connection: </span>
        {siteDetails.connection ?? "N/A"}
      </div>
      <div className=" text-base">
        <span className="text-base font-medium uppercase">Server: </span>
        {siteDetails.server ?? "N/A"}
      </div>
      <div className=" text-base">
        <span className="text-base font-medium uppercase">Body Length: </span>
        {siteDetails.contentLength
          ? formatBytes(siteDetails.contentLength)
          : "N/A"}
      </div>
    </div>
  );
};

export default SiteDetails;
