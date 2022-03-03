export default function activityDropDown() {
  const activities = [
    "Education",
    "Recreational",
    "Social",
    "DIY",
    "Charity",
    "Cooking",
    "Relaxation",
    "Music",
    "Busywork",
  ];
  return (
    <>
      <option>All Types</option>
      {activities.map(a => (
        <option key={a.toLowerCase()} value={a.toLowerCase()}>
          {a}
        </option>
      ))}
    </>
  );
}
