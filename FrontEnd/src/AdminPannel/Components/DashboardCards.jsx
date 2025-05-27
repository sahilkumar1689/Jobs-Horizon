// components/Dashboard.jsx
import React from "react";
// import "./Dashboard.css";
import StatCard from "./StatCard";
// import TopCandidates from "./TopCandidates";
// import VacancyStats from "./VacancyStats";

import interviewIcon from "/AdminAssets/interviewShedule.png";
import appliedIcon from "/AdminAssets/appliedJobs.png";
import taskBidsIcon from "/AdminAssets/taskBid.png";
import applicationIcon from "/AdminAssets/applicationSent.png";
import profileViewedIcon from "/AdminAssets/profileViewed.png";
import newMessagesIcon from "/AdminAssets/newMessage.png";
import articlesAddedIcon from "/AdminAssets/ArticleAdded.png";
import cvAddedIcon from "/AdminAssets/CvAdded.png";
import TopCandidates from "./TopCandidates";
import VacancyStats from "./VacancyStats";
import VacancyStatsChart from "./VacancyStats";

function DashboardCards() {
  const statCardsRowOne = [
    {
      icon: interviewIcon,
      value: "1568",
      percentage: 25,
      isPositive: true,
      title: "Interview Schedules",
    },
    {
      icon: appliedIcon,
      value: "284",
      percentage: 5,
      isPositive: true,
      title: "Applied Jobs",
    },
    {
      icon: taskBidsIcon,
      value: "136",
      percentage: 12,
      isPositive: true,
      title: "Task Bids Won",
    },
    {
      icon: applicationIcon,
      value: "985",
      percentage: 5,
      isPositive: true,
      title: "Application Sent",
    },
    {
      icon: profileViewedIcon,
      value: "165",
      percentage: 15,
      isPositive: true,
      title: "Profile Viewed",
    },
    {
      icon: newMessagesIcon,
      value: "2356",
      percentage: 2,
      isPositive: false,
      title: "New Messages",
    },
    {
      icon: articlesAddedIcon,
      value: "254",
      percentage: 2,
      isPositive: true,
      title: "Articles Added",
    },
    {
      icon: cvAddedIcon,
      value: "548",
      percentage: 48,
      isPositive: true,
      title: "CV Added",
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="stats-row">
          {statCardsRowOne.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              percentage={stat.percentage}
              isPositive={stat.isPositive}
              title={stat.title}
            />
          ))}
        </div>

        <div className="dashboard-bottom">
          {/* <VacancyStats /> */}
          <VacancyStatsChart />
          <TopCandidates />
        </div>
      </div>
    </div>
  );
}

export default DashboardCards;
