const pendingStageMessages = {
  message1:
    "Welcome to the Pending stage! Here, you have full control over the election setup. You can add and configure various elements like seats, parties, employees, and candidate details. Feel free to explore and customize every aspect to ensure a seamless electoral process.",
  message2:
    "In the Pending stage, you have the flexibility to make changes and edits as needed. This is the perfect time to double-check all the details, ensure accuracy, and make any necessary adjustments before moving forward.",
};

const upcomingStageMessages = {
  message1:
    "The election has now entered the Upcoming stage. All the essential information has been shared with the vote collectors, allowing them to prepare and familiarize themselves with the details.",
  message2:
    "During the Upcoming stage, we recommend limiting major edits to avoid inconveniencing the vote collectors' preparation. However, if significant changes are required, you can revert the election back to the Pending stage to make the necessary adjustments.",
};

const ongoingStageMessages = {
  message1:
    "Exciting times! This election has moved to the Ongoing stage, and the voting process is in full swing. Sit back and witness the real-time updates as votes pour in from across the region.",
  message2:
    "During the Ongoing stage, you can access live dashboards, visualizations, and progress reports. However, to maintain the integrity of the process, no edits or modifications to the election details are permitted at this point.",
};

const completedStageMessages = {
  message1:
    "Congratulations! The voting process for this election has been successfully completed. Now, it's time to dive into the comprehensive analysis and insights our platform has to offer.",
  message2:
    "In the Completed stage, you have access to a wealth of data, including detailed results, voter demographics, trend analysis, and projections. Explore the interactive visualizations and reports to gain a deep understanding of the electoral landscape.",
};

const stageTransitionDialogs = {
  pendingToUpcoming:
    "You're about to move this election to the Upcoming stage. This will share the finalized details with the vote collectors, allowing them to prepare for the data collection process. Any major edits after this point may require reverting the election back to the Pending stage. Are you ready to proceed?",
  upcomingToOngoing:
    "Get ready for an exciting phase! By moving this election to the Ongoing stage, you'll witness real-time updates and progress as votes are cast. However, remember that no edits will be permitted during this critical period. Proceed with caution!",
  ongoingToCompleted:
    "The voting process for this election has concluded successfully. By marking it as Completed, you'll gain access to a comprehensive suite of analytical tools, reports, and visualizations, giving you invaluable insights into the electoral landscape. Proceed to unlock the power of data-driven decision-making!",
  upcomingToPending:
    "Moving this election back to the Pending stage will allow you to make significant changes, but it may disrupt the vote collectors' preparation. Are you sure you want to proceed?",
};

export {
  pendingStageMessages,
  upcomingStageMessages,
  ongoingStageMessages,
  completedStageMessages,
  stageTransitionDialogs,
};
